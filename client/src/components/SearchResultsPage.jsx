import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, BookOpen, Calendar, Briefcase, User } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}`})
    };
};


const figuresAPI = {
    search: async (params) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/figures/search?${queryString}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Search failed');
      return data;
    }
  };
  
  const SearchResultsPage = () => {
    // Get query from URL
    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get('query') || '';
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(urlQuery);
    const [figures, setFigures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFigure, setSelectedFigure] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      // Perform search when component loads if there's a query
      if (urlQuery) {
        performSearch(urlQuery);
      } else {
        setLoading(false);
      }
    }, []);
  
    const performSearch = async (query) => {
      if (!query.trim()) return;
  
      setLoading(true);
      setError('');
  
      try {
        const data = await figuresAPI.search({ query });
        setFigures(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = () => {
      if (searchQuery.trim()) {
        // Update URL and trigger new search
        window.history.pushState({}, '', `/search?query=${encodeURIComponent(searchQuery)}`);
        performSearch(searchQuery);
      }
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
  
    const handleViewDetails = async (figureId) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/figures/${figureId}`, {
          headers: getAuthHeaders()
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedFigure(data.data);
          setShowModal(true);
        }
      } catch (err) {
        console.error('Error fetching figure details:', err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleBackToHome = () => {
    navigate('/home');
    //   window.location.href //;
    };
  
    const closeModal = () => {
      setShowModal(false);
      setSelectedFigure(null);
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-red shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Historical Figures</h1>
              </div>
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </header>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for a historical figure..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
  
          {/* Search Results Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {urlQuery ? `Search Results for "${urlQuery}"` : 'Search for Historical Figures'}
            </h2>
            {!loading && urlQuery && (
              <p className="text-gray-600 mt-1">
                {figures.length} {figures.length === 1 ? 'result' : 'results'} found
              </p>
            )}
          </div>
  
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 mt-4">Searching...</p>
            </div>
          )}
  
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
  
          {/* No Results */}
          {!loading && !error && figures.length === 0 && urlQuery && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any historical figures matching "{urlQuery}"
              </p>
              <button
                onClick={handleBackToHome}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Try a different search
              </button>
            </div>
          )}
  
          {/* Results Grid */}
          {!loading && !error && figures.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {figures.map((figure) => (
                <div
                  key={figure._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Figure Image */}
                  <div className="h-56 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                    {figure.imageUrl ? (
                      <img
                        src={figure.imageUrl}
                        alt={figure.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span class="text-white text-6xl font-bold">${figure.name.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-white text-6xl font-bold">
                        {figure.name.charAt(0)}
                      </span>
                    )}
                  </div>
  
                  {/* Figure Information */}
                  <div className="p-5">
                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {figure.name}
                    </h3>
  
                    {/* Birth/Death Years */}
                    {(figure.birthYear || figure.deathYear) && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>
                          {figure.birthYear || '?'} - {figure.deathYear || 'Present'}
                        </span>
                      </div>
                    )}
  
                    {/* Known For */}
                    {figure.knownFor && figure.knownFor.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Known For</p>
                        <div className="flex flex-wrap gap-1">
                          {figure.knownFor.slice(0, 2).map((item, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs"
                            >
                              {item}
                            </span>
                          ))}
                          {figure.knownFor.length > 2 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              +{figure.knownFor.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
  
                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(figure._id)}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Modal for Figure Details */}
        {showModal && selectedFigure && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedFigure.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
  
              {/* Modal Content */}
              <div className="p-6">
                {/* Image and Basic Info */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Image */}
                  <div className="md:w-1/3">
                    <div className="h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                      {selectedFigure.imageUrl ? (
                        <img
                          src={selectedFigure.imageUrl}
                          alt={selectedFigure.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-6xl font-bold">
                          {selectedFigure.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
  
                  {/* Basic Info */}
                  <div className="md:w-2/3">
                    {/* Life Span */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Life Span</p>
                      <p className="text-lg text-gray-900">
                        {selectedFigure.birthYear || '?'} - {selectedFigure.deathYear || 'Present'}
                      </p>
                      {selectedFigure.birthPlace && (
                        <p className="text-sm text-gray-600 mt-1">Born in {selectedFigure.birthPlace}</p>
                      )}
                    </div>
  
                    {/* Occupation */}
                    {selectedFigure.occupation && selectedFigure.occupation.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Occupation</p>
                        <p className="text-gray-900">{selectedFigure.occupation.join(', ')}</p>
                      </div>
                    )}
  
                    {/* Category */}
                    {selectedFigure.category && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {selectedFigure.category.charAt(0).toUpperCase() + selectedFigure.category.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Biography */}
                {selectedFigure.biography && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Biography</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedFigure.biography}</p>
                  </div>
                )}
  
                {/* Known For */}
                {selectedFigure.knownFor && selectedFigure.knownFor.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Known For</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFigure.knownFor.map((item, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Achievements */}
                {selectedFigure.achievements && selectedFigure.achievements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Major Achievements</h3>
                    <ul className="space-y-2">
                      {selectedFigure.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
  
                {/* Quotes */}
                {selectedFigure.quotes && selectedFigure.quotes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Notable Quotes</h3>
                    <div className="space-y-4">
                      {selectedFigure.quotes.map((quote, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                          <p className="text-gray-800 italic mb-2">"{quote.text}"</p>
                          {quote.context && (
                            <p className="text-sm text-gray-600">— {quote.context}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Create Presentation Button */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <button
                    onClick={() => {
                      window.location.href = `/select-template?figureId=${selectedFigure._id}`;
                    }}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    Create Presentation About {selectedFigure.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default SearchResultsPage;
    
    
    



