import React, { useState } from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ image, title, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 max-w-4xl max-h-[90vh] w-full flex flex-col shadow-2xl transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-[70vh] object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/400";
              e.target.alt = "Image not available";
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TransactionTable = ({ transactions, page, setPage, perPage, totalItems }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Transactions</h2>
        <div className="w-full overflow-hidden rounded-lg border border-gray-200">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto min-w-max">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="hidden md:table-cell px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sold</th>
                  <th className="px-4 sm:px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.id}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.title}</td>
                    <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs xl:max-w-md truncate">{tx.description}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <span className="font-medium text-green-600">${tx.price}</span>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        tx.sold 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tx.sold ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        {tx.image ? (
                          <img
                            src={tx.image}
                            alt={tx.title}
                            className="w-full h-full object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition-opacity duration-200"
                            onClick={() => setSelectedImage({ image: tx.image, title: tx.title })}
                            onError={(e) => {
                              e.target.src = "/api/placeholder/80/80";
                              e.target.alt = "Image not available";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>

      <ImageModal 
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.image}
        title={selectedImage?.title}
      />
    </div>
  );
};

export default TransactionTable;