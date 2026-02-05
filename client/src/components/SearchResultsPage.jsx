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
        const response = await fetch (`${API_BASE_URL}/figures/search?${queryString}`,{
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Search failed');
        return data;
    }
};

const SearchResultsPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [figures, setFigures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //RUn search whenever URL query parameter changes
    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            setSearchQuery(query);
            performSearch(query);
        } else {
          setLoading(false);  
        }
    }, [searchParams]);

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
                // Update URL with new search query
                navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            }
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };

        const handleCardClick = (figureId) => {
            // Navigate to figure detail page
            navigate(`/figure/${figureId}`);
        };

        const handleBackToHome = () => {
            navigate('/home');
        };
    
    
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
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
                    Search Results for "{searchParams.get('query')}"  
                  </h2>  
                  {!loading && (
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

                {/* No results */}
                {!loading && !error && figures.length === 0 && (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found.</h3>
                    <p className="text-gray-600 mb-4">
                        We couldn't find any historical figures matching "{searchParams.get('query')}"
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
                          onClick={() => handleCardClick(figure._id)}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                        >
                          {/* Figure Image/Icon */}
                          <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            {figure.imageUrl ? (
                                <img 
                                   src={figure.imageUrl}
                                   alt={figure.name}
                                   className="w-full h-full object-cover"
                                />   
                            ) : (
                                <span className="text-white text-6xl font-bold">
                                    {figure.name.charAt(0)}
                                </span>
                            )}
                            </div> 

                         {/* Figure Information */}

                         <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {figure.name}
                            </h3>
                        
                        {/* Birth/Death Years */}
                        {(figure.birthYear || figure.deathYear) && (
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>
                                    {figure.birthYear && `${figure.birthYear}`}
                                    {figure.birthYear && `${figure.deathYear && ' - '}`}
                                    {figure.birthYear && `${figure.deathYear}`}
                                </span>
                                </div>
                        )}

                        {/* Occupation */}
                        {figure.occupation && figure.occupation.length > 0 && (
                           <div className="flex items-start text-sm text-gray-600 mb-2">
                             <Briefcase className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                             <span className="line-clamp-2">
                                {figure.occupation.join(', ')}
                             </span>
                            </div>  
                        )}

                        {/* Category Badge */}
                        {figure.category && (
                          <div className="mt-3">
                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                               {figure.category.charAt(0).toUpperCase() + figure.category.slice(1)}
                            </span>  
                          </div>  
                        )}

                        {/* View Details Button */}
                        <button
                           onClick={(e) => {
                             e.stopPropagation();
                             handleCardClick(figure._id);
                           }}
                           className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition font-medium"
                        >
                            View Details    
                        </button>   
                      </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>

      );
    };



export default SearchResultsPage;
    
    
    
    
    



