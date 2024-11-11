const Statistics = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <p className="text-blue-600 text-sm font-medium mb-2">Total Sale Amount</p>
          <p className="text-3xl font-bold text-blue-900">${data.totalAmount}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <p className="text-green-600 text-sm font-medium mb-2">Total Sold Items</p>
          <p className="text-3xl font-bold text-green-900">{data.soldItems}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <p className="text-purple-600 text-sm font-medium mb-2">Total Not Sold Items</p>
          <p className="text-3xl font-bold text-purple-900">{data.notSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;