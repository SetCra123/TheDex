import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, ChevronLeft, ChevronRight, Home, Download, Palette } from 'lucide-react';
import { API_BASE_URL, getAuthHeaders, handleResponse } from '../utils/API';

// API configuration
// const API_BASE_URL = 'http://localhost:5000/api';

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'Content-Type': 'application/json',
//     ...(token && { 'Authorization': `Bearer ${token}` })
//   };
// };

// const handleResponse = async (response) => {
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error || 'Something went wrong');
//   return data;
// };

const PresentationPreviewPage = () => {
  const [presentation, setPresentation] = useState(null);
  const [figure, setFigure] = useState(null);
  const [template, setTemplate] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Get presentation ID from URL
  const params = new URLSearchParams(window.location.search);
  const presentationId = params.get('id') || window.location.pathname.split('/').pop();

  useEffect(() => {
    fetchPresentationData();
  }, [presentationId]);

  const fetchPresentationData = async () => {
    setLoading(true);
    try {
      // Fetch presentation
      const presResponse = await fetch(`${API_BASE_URL}/presentations/${presentationId}`, {
        headers: getAuthHeaders()
      });
      const presData = await handleResponse(presResponse);
      setPresentation(presData.data);

      // Fetch figure data
      const figResponse = await fetch(`${API_BASE_URL}/figures/${presData.data.figureId._id || presData.data.figureId}`, {
        headers: getAuthHeaders()
      });
      const figData = await handleResponse(figResponse);
      setFigure(figData.data);

      // Fetch template
      const tempResponse = await fetch(`${API_BASE_URL}/templates/${presData.data.templateId._id || presData.data.templateId}`, {
        headers: getAuthHeaders()
      });
      const tempData = await handleResponse(tempResponse);
      setTemplate(tempData.data);

    } catch (error) {
      console.error('Error fetching presentation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Presentation is already saved when created, just show confirmation
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const nextSlide = () => {
    if (currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const renderSlideContent = (slide) => {
    if (!figure || !template) return null;

    const colorScheme = template.colorSchemes[0] || {};
    const slideStyles = {
      background: `linear-gradient(135deg, ${colorScheme.primary || '#667eea'} 0%, ${colorScheme.secondary || '#764ba2'} 100%)`
    };

    switch (slide.slideType) {
      case 'title':
        return (
          <div className="h-full flex flex-col items-center justify-center text-white p-12" style={slideStyles}>
            <h1 className="text-6xl font-bold mb-6 text-center">{figure.name}</h1>
            <p className="text-2xl mb-4">{figure.birthYear} - {figure.deathYear || 'Present'}</p>
            <p className="text-xl opacity-90">{figure.occupation?.join(' • ')}</p>
          </div>
        );

      case 'biography':
        return (
          <div className="h-full p-12 bg-white">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colorScheme.primary }}>
              Biography
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                {figure.imageUrl ? (
                  <img
                    src={figure.imageUrl}
                    alt={figure.name}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div 
                    className="w-full h-96 flex items-center justify-center rounded-lg text-white text-8xl font-bold"
                    style={{ background: slideStyles.background }}
                  >
                    {figure.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-lg leading-relaxed text-gray-700 mb-4">
                  {figure.biography}
                </p>
                {figure.birthPlace && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Born:</span> {figure.birthPlace}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="h-full p-12 bg-gray-50">
            <h2 className="text-4xl font-bold mb-8" style={{ color: colorScheme.primary }}>
              Key Moments
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  {figure.birthYear}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">Birth</h3>
                  <p className="text-gray-700">Born in {figure.birthPlace || 'Unknown'}</p>
                </div>
              </div>
              {figure.deathYear && (
                <div className="flex items-start">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ backgroundColor: colorScheme.secondary }}
                  >
                    {figure.deathYear}
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Legacy</h3>
                    <p className="text-gray-700">Remembered for lasting impact on history</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="h-full p-12 bg-white">
            <h2 className="text-4xl font-bold mb-8" style={{ color: colorScheme.primary }}>
              Major Achievements
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {figure.achievements?.slice(0, 6).map((achievement, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg shadow-md border-l-4"
                  style={{ borderColor: colorScheme.accent }}
                >
                  <div className="flex items-start">
                    <span 
                      className="text-3xl font-bold mr-4"
                      style={{ color: colorScheme.primary }}
                    >
                      {index + 1}
                    </span>
                    <p className="text-gray-700 text-lg">{achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quotes':
        const quote = figure.quotes?.[0];
        return (
          <div 
            className="h-full flex flex-col items-center justify-center p-12 text-white"
            style={slideStyles}
          >
            <div className="max-w-4xl text-center">
              <div className="text-8xl mb-6 opacity-50">"</div>
              <p className="text-3xl italic mb-8 leading-relaxed">
                {quote?.text || 'A legacy of inspiration and achievement.'}
              </p>
              {quote?.context && (
                <p className="text-xl opacity-90">— {quote.context}</p>
              )}
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="h-full p-12 bg-gray-50">
            <h2 className="text-4xl font-bold mb-8" style={{ color: colorScheme.primary }}>
              Legacy & Impact
            </h2>
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-gray-700">
                {figure.name} left an indelible mark on history through their contributions to {figure.occupation?.join(', ')}.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                {figure.knownFor?.slice(0, 3).map((item, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-lg text-center text-white"
                    style={{ backgroundColor: colorScheme.primary }}
                  >
                    <p className="text-lg font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-xl">Slide type: {slide.slideType}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white">Loading presentation...</p>
        </div>
      </div>
    );
  }

  if (!presentation || !figure) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Presentation not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.location.href = '/home'}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <div className="text-gray-400">|</div>
          <h1 className="text-white font-semibold">{presentation.title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {saved && (
            <span className="text-green-400 text-sm">✓ Saved to My Presentations</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Slide Display */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {presentation.slides[currentSlide] && renderSlideContent(presentation.slides[currentSlide])}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-white">
              Slide {currentSlide + 1} of {presentation.slides.length}
            </span>
            <div className="flex space-x-2">
              {presentation.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentSlide ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === presentation.slides.length - 1}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationPreviewPage;