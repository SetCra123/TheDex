import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Check, Sparkles, Layout, Palette } from 'lucide-react';
import { templatesAPI, figuresAPI, presentationsAPI } from '../utils/API';

// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  return data;
};

// API functions
// const templatesAPI = {
//   getAll: async () => {
//     const response = await fetch(`${API_BASE_URL}/templates`, {
//       headers: getAuthHeaders()
//     });
//     return handleResponse(response);
//   }
// };

// const figuresAPI = {
//   getById: async (id) => {
//     const response = await fetch(`${API_BASE_URL}/figures/${id}`, {
//       headers: getAuthHeaders()
//     });
//     return handleResponse(response);
//   }
// };

// const presentationsAPI = {
//   create: async (presentationData) => {
//     const response = await fetch(`${API_BASE_URL}/presentations`, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//       body: JSON.stringify(presentationData)
//     });
//     return handleResponse(response);
//   }
// };

const TemplateSelectionPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [figureName, setFigureName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  
  // Get figureId from URL
  const params = new URLSearchParams(window.location.search);
  const figureId = params.get('figureId');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch templates from database
        const templatesData = await templatesAPI.getAll();
        setTemplates(templatesData.data);

        // Fetch figure name for display
        if (figureId) {
          const figureData = await figuresAPI.getById(figureId);
          setFigureName(figureData.data.name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [figureId]);

  const handleCreatePresentation = async () => {
    if (!selectedTemplate || !figureId) return;

    setCreating(true);

    try {
      const data = await presentationsAPI.create({
        figureId,
        templateId: selectedTemplate,
        title: `${figureName} - Presentation`
      });

      if (data.success) {
        // Navigate to presentation editor
        window.location.href = `/presentation/${data.data._id}`;
      }
    } catch (error) {
      console.error('Error creating presentation:', error);
      alert('Failed to create presentation: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Presentation</h1>
                {figureName && (
                  <p className="text-sm text-gray-600">About {figureName}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Choose Your Template
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a stunning template to showcase the story of {figureName || 'this historical figure'}
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => {
            const firstColorScheme = template.colorSchemes?.[0] || {};
            const previewGradient = `linear-gradient(135deg, ${firstColorScheme.primary || '#667eea'} 0%, ${firstColorScheme.secondary || '#764ba2'} 100%)`;
            
            return (
              <div
                key={template._id}
                onClick={() => setSelectedTemplate(template._id)}
                className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template._id
                    ? 'ring-4 ring-indigo-600 transform scale-105'
                    : 'hover:shadow-xl hover:scale-102'
                }`}
              >
                {/* Preview */}
                <div 
                  className="h-48 relative"
                  style={{ background: previewGradient }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layout className="w-16 h-16 text-white opacity-50" />
                  </div>
                  {selectedTemplate === template._id && (
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                      <Check className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>

                  {/* Slide Structure Info */}
                  {template.slideStructure && template.slideStructure.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Includes {template.slideStructure.length} Slides
                      </p>
                      <div className="space-y-1">
                        {template.slideStructure.slice(0, 4).map((slide, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="capitalize">{slide.slideType}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Scheme */}
                  {firstColorScheme && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Color Palette
                      </p>
                      <div className="flex space-x-2">
                        {firstColorScheme.primary && (
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: firstColorScheme.primary }}
                            title="Primary"
                          />
                        )}
                        {firstColorScheme.secondary && (
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: firstColorScheme.secondary }}
                            title="Secondary"
                          />
                        )}
                        {firstColorScheme.accent && (
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: firstColorScheme.accent }}
                            title="Accent"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Select Button */}
                <div className="px-6 pb-6">
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                      selectedTemplate === template._id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedTemplate === template._id ? 'Selected' : 'Select Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Button */}
        {selectedTemplate && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Palette className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to Create?
              </h3>
              <p className="text-gray-600 mb-6">
                You've selected the <span className="font-semibold">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </span> template. Click below to start building your presentation.
              </p>
                              <button
                onClick={handleCreatePresentation}
                disabled={creating}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-2"
              >
                {creating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Create Presentation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* No Selection State */}
        {!selectedTemplate && (
          <div className="text-center text-gray-500 py-8">
            <p>Select a template above to continue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelectionPage;