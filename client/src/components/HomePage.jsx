import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, TrendingUp, Plus, Presentation, LogOut } from 'lucide-react';
import { presentationsAPI } from '../utils/API';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userPresentations, setUserPresentations] = useState([]);
    const [popularPresentations, setPopularPresentations] = useState([])
    const [popularSearches] = useState([
        'Marcus Garvey',
        'Martin Luther King Jr.',
        'Dr. Sebi',
        'Katherine Johnson',
        'Albert Einstein',
        'Madam CJ Walker'
    ]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        //Fetch user's presentations
        fetchUserPresentations();

        //Fetch popular presentations (mock data for now)
        fetchPopularPresentations();

    }, []);

    const fetchUserPresentations = async () => {
        try {
            const data = await presentationsAPI.getUserPresentations();
            setUserPresentations(data.data);
        } catch (error) {
          console.error('Error fetching presentations:', error);  
        } finally {
          setLoading(false);  
        }
    };
    
    const fetchPopularPresentations = async () => {
        // Mock popular presentations - in production, this would come from API
        setPopularPresentations([
            {
                id: '1',
                title: 'Einstein: The Theory of Relativity',
                figureName: 'Albert Einstein',
                creator: 'Sarah Johnson',
                views: 1245,
                thumbnail: ''
            },
            {
                id: '2',
                title: 'MLK: I Have a Dream',
                figureName: 'Martin Luther King Jr.',
                creator: 'Emily Rodriguez',
                views: 2156,
                thumbnail: ''
            },
            {
                id: '3',
                title: 'Hidden Figures',
                figureName: 'Katherine Johnson',
                creator: 'Stanna Hoy',
                views: 8973,
                thumbnail: ''
            },
            

        
        ]);
    };


 const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Navigate to search results page with query
    window.location.href = `search?query=${encodeURIComponent(searchQuery)}`;
 };

 const handlePopularSearch = (term) => {
    setSearchQuery(term);
    window.location.href = `/search?query=${encodeURIComponent(term)}`;
 };

 const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
 };

 const handleCreatePresentation = () => {
    window.location.href = '/create';
 };

 const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Welcome to The (in)Dex</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username || 'User'}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section: Search Area & User Presentations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Search Area - Left Half */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Search Historical Figures</h2>
            
            {/* Search Bar */}
            <div className="mb-6">
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

            {/* Popular Searches */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearch(term)}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm hover:bg-indigo-100 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Presentations - Right Half */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">My Presentations</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : userPresentations.length === 0 ? (
              <div className="text-center py-8">
                <Presentation className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No presentations yet</p>
                <button
                  onClick={handleCreatePresentation}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Create your first presentation
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {userPresentations.slice(0, 5).map((presentation) => (
                  <div
                    key={presentation._id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => window.location.href = `/presentation/${presentation._id}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{presentation.title}</h3>
                      <p className="text-sm text-gray-500">
                        {presentation.figureId?.name || 'Unknown Figure'}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(presentation.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popular Presentations Section - Full Width */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Presentations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPresentations.map((presentation) => (
              <div
                key={presentation.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => window.location.href = `/presentation/${presentation.id}`}
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {presentation.figureName.charAt(0)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{presentation.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{presentation.figureName}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>by {presentation.creator}</span>
                    <span>{presentation.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Presentation Section - Full Width */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Plus className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Create a New Presentation</h2>
            <p className="text-indigo-100 mb-6">
              Search for a historical figure and bring their story to life with our interactive presentation tools
            </p>
            <button
              onClick={handleCreatePresentation}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;