import React, { useEffect, useState } from 'react';
import { initializeDatabase, getTransactions, getStatistics, getPriceRange, getCategoryCount } from './api';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css';

function App() {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [priceRange, setPriceRange] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize database 
  useEffect(() => {
    async function initializeData() {
      try {
        await initializeDatabase();
      } catch (err) {
        setError('Failed to initialize database');
      }
    }
    initializeData();
  }, []);

  // Fetch data 
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const transactionsRes = await getTransactions(month, page, 10, search);
        const statsRes = await getStatistics(month);
        const priceRangeRes = await getPriceRange(month);
        const categoryCountRes = await getCategoryCount(month);

        setTransactions(transactionsRes.data);
        setStatistics(statsRes.data);
        setPriceRange(priceRangeRes.data);
        setCategoryCount(categoryCountRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [month, page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Transactions Dashboard
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select 
                onChange={(e) => setMonth(e.target.value)} 
                value={month} 
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Search transactions..." 
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
              />
            </div>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <TransactionTable
                transactions={transactions}
                page={page}
                setPage={setPage}
                perPage={10}
                totalItems={transactions.length}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <Statistics data={statistics} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              <div className="bg-white rounded-lg shadow-sm p-4">
                <BarChart data={priceRange} />
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <PieChart data={categoryCount} />
              </div>
            </div>
          </div>
        )}

       
<footer className="bg-white border-t mt-8">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
        <ul className="space-y-2 text-gray-600">
          <li>
            <a href="transaction@gmail.com" className="hover:text-blue-600 transition-colors">
              Email: transaction@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:2361321" className="hover:text-blue-600 transition-colors">
              Phone: 0542-22361360
            </a>
          </li>
          <li>Address: ABC Tower</li>
          <li>Pune City, Pin-Code-12345</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
        <ul className="space-y-2 text-gray-600">
          <li>
            <a href="/about" className="hover:text-blue-600 transition-colors">
              About Us
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
        <ul className="space-y-2 text-gray-600">
          <li>
            <a 
              href="https://twitter.com/transaction-board" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors"
            >
              Twitter
            </a>
          </li>
          <li>
            <a 
              href="https://linkedin.com/company/transaction-board" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a 
              href="https://facebook.com/transaction-board" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors"
            >
              Facebook
            </a>
          </li>
          <li>
            <a 
              href="https://instagram.com/transaction-board" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t text-center text-gray-600">
      <p>Transaction-Board. All rights reserved ©2024.</p>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}

export default App;