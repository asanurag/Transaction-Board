const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Initialize database 
router.get('/initialize', async (req, res) => {
    try {
        const { data } = await axios.get(process.env.API_URL);
        await Transaction.deleteMany({});
        await Transaction.insertMany(data);
        res.send("Database initialized with data");
    } catch (error) {
        console.error("Error initializing database:", error);
        res.status(500).send("Failed to initialize database");
    }
});

router.get('/', async (req, res) => {
    const { month, page = 1, perPage = 10, search = '' } = req.query;
    const monthInt = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1;

    try {
        const transactions = await Transaction.aggregate([
            {
                $addFields: { month: { $month: "$dateOfSale" } }
            },
            {
                $match: {
                    month: monthInt,
                    $or: [
                        { title: new RegExp(search, 'i') },
                        { description: new RegExp(search, 'i') },
                        { price: new RegExp(search, 'i') }
                    ]
                }
            },
            { $skip: (page - 1) * perPage },
            { $limit: parseInt(perPage) }
        ]);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve transactions" });
    }
});


router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    const monthInt = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1;

    try {
        const statistics = await Transaction.aggregate([
            {
                $addFields: { month: { $month: "$dateOfSale" } }
            },
            {
                $match: { month: monthInt }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$sold", true] }, "$price", 0]
                        }
                    },
                    soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                    notSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                }
            }
        ]);

        res.json(statistics[0] || { totalAmount: 0, soldItems: 0, notSoldItems: 0 });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve statistics" });
    }
});



router.get('/price-range', async (req, res) => {
    const { month } = req.query;
    const monthInt = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1;

    const ranges = [
        { range: "0-100", min: 0, max: 100 },
        { range: "101-200", min: 101, max: 200 },
        { range: "201-300", min: 201, max: 300 },
        { range: "301-400", min: 301, max: 400 },
        { range: "401-500", min: 401, max: 500 },
        { range: "501-600", min: 501, max: 600 },
        { range: "601-700", min: 601, max: 700 },
        { range: "701-800", min: 701, max: 800 },
        { range: "801-900", min: 801, max: 900 },
        { range: "901+", min: 901, max: Infinity },
    ];

    try {
        const priceRangeData = await Promise.all(ranges.map(async (range) => {
            const count = await Transaction.aggregate([
                {
                    $addFields: { month: { $month: "$dateOfSale" } }
                },
                {
                    $match: {
                        month: monthInt,
                        price: { $gte: range.min, $lt: range.max }
                    }
                },
                {
                    $count: "count"
                }
            ]);

            return { range: range.range, count: count[0]?.count || 0 };
        }));

        res.json(priceRangeData);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve price range data" });
    }
});


router.get('/category-count', async (req, res) => {
    const { month } = req.query;
    const monthInt = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1;

    try {
        const categoryCounts = await Transaction.aggregate([
            {
                $addFields: { month: { $month: "$dateOfSale" } }
            },
            {
                $match: { month: monthInt }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(categoryCounts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve category counts" });
    }
});


module.exports = router;
