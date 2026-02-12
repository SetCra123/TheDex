// import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';

// const apiClient = axios.create({
//     baseURL: API_BASE_URL,
// });

// Helper function to get auth headers
 export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}`})
    };
};


// Helper function to handle API responses
export async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
    }

    return data;
}

//------------------------------------------------
// AUTH ENDPOINTS
//------------------------------------------------

export const authAPI = {
    // Register new user 
    register: async(userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },


    // Login user
login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
},

// Logout user
logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
},

// Get current authenticated user
getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        heaers: getAuthHeaders()
    });
    return handleResponse(response);
},


// Update password
updatePassword: async (passwords) => {
    const response = await fetch(`${API_BASE_URL}/auth/updatepassword`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(passwords)
    });
    return handleResponse(response);
}

};

//-------------------------------------------------------------------------
// FIGURES ENDPOINTS
//-------------------------------------------------------------------------

export const figuresAPI = {
    // Serch figures
    search: async (params) => {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/figures/search?${queryString}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    //Get popular figures
    getPopular: async () => {
        const response = await fetch(`${API_BASE_URL}/figures/popular`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Get figure by ID
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/figures/${id}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Create figure (admin only)
    create: async (figureData) => {
        const response = await fetch(`${API_BASE_URL}/figures`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(figureData)
        });
        return handleResponse(response);
    }
};

//----------------------------------------------------------------------------
// PRESENTATIONS ENDPOINTS
//----------------------------------------------------------------------------

export const presentationsAPI = {
    // Get user's presentations
    getUserPresentations: async () => {
        const response = await fetch(`${API_BASE_URL}/prsentations`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // create presentations
    create: async (presentationData) => {
        const response = await fetch(`${API_BASE_URL}/presentations`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(presentationData)
        });
        return handleResponse(response);
    },


    // Get presentation by ID
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/presentations/${id}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },


    // Update presentation 
    update: async (id, presentationData) => {
        const response = await fetch(`${API_BASE_URL}/presentations/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(presentationData)
        });
        return handleResponse(response);
    },

    // Delete presentation
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/presentations/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};


// -------------------------------------------------------------------------
// TEMPLATES ENDPOINTS
// -------------------------------------------------------------------------

export const templatesAPI = {
    // Get all templates 
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/templates`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Get template by ID
    getById: async (id) => {
        const response = await fetch (`${API_BASE_URL}/templates/${id}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};


//-----------------------------------------------------------------------------
// USER ENDPOINTS
//-----------------------------------------------------------------------------

export const userAPI = {
    // Get user profile
    getProfile: async () => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Update profile
    updateProfile: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            medthod: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData)
        });
    },


    // Delete account
    deleteAccount: async () => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Get saved figures
    getSavedFigures: async () => {
        const response = await fetch(`${API_BASE_URL}/users/saved`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },


    // Save a figure
    saveFigure: async (figureId) => {
        const response = await fetch(`${API_BASE_URL}/users/saved/${figureId}`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    
    // Remove saved figure
    removeSavedFigure: async (figureId) => {
        const response = await fetch(`${API_BASE_URL}/users/saved/${figureId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};

// Default export with all APIs
export default {
    baseURL: API_BASE_URL,
    headers: getAuthHeaders,
    response: handleResponse,
    auth: authAPI,
    figures: figuresAPI,
    presentations: presentationsAPI,
    templates: templatesAPI,
    user: userAPI,

  };