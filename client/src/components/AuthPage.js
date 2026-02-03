import React, { useState } from 'react';
import { Eye, EyeOff, BookOpen } from 'luicide-react';
import { authAPI } from '../utils/api;'

//AuthPage Component - hanles both login and register

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');


        try {
            let data;

            if(isLogin) {
                // Login request
                data = await authAPI.login({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                // Register request
                data = await authAPI.register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
            }

            // Store token in localStorage
            localStorage.setItem('token', data.data.token);
            localStorgae.setItem('user', JSON.stringify(data.data));

            //Redirect to home page
            window.location.href = '/home';
        } catch  (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }



return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
            {/* Logo/Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gry-900">The Dex</h1>
                <p className="text-gray-600 mt-2">Create stunning presentations about history's greatest figures!</p>
            </div>

            {/* Auth Form Card */}
            <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="flex mb-6">
                    <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 text-center font-medium transition-colors ${
                        isLogin
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'txt-gray-500 border-b-2 border-transparent hover:text-gray-700'
                    }`}
                    >
                        Login
                    </button>
                    <button 
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-2 text-center font-medium transition-colors ${
                        !isLogin
                           ? 'text-indigo-600 border-b-2 border-indigo-600'
                           : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                      }`}
                    >
                       Register 
                    </button>
                </div>

                <div className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                              Username
                            </label>
                            <input
                               type="text"
                               id="username"
                               name="username"
                               value={formData.username}
                               onChange={handleChange}
                               onKeyPress={handleKeyPress}
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                               placeholder="Choose a username"
                            />
                        </div>
                    )}

                    <div>
                       <label htmlFor="email" classname="block text-sm font-medium text-gray-700 mb-1">
                         Email
                       </label>
                       <input 
                         type="email"
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         onKeyPress={handleKeyPress}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-500 focus:border-transparent outline-none transition" 
                         placeholder="your@gmail.com"
                    />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text=gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                               type={showPassword ? 'text' : 'password'}
                               id="password"
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                               onKeyPress={handleKeyPress}
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-10"
                               placeholder="........"
                             />
                             <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                            >
                                {showPassword ? <EyeOff classname="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>  
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red 50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg fot-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not allowed"
                           >
                            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
                            </button>     
                     </div>

                     {isLogin && (
                        <div className="mt-4 text-center">
                            <button className="text-sm text-indigo-600 hover:text-indigo-700">
                                Forgot password?
                            </button>
                          </div>  
                     )}
            </div>

            <p className="text-center text-gray-600 text-sm mt-6">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                    {isLogin ? 'Register here' : 'Login here'}
                </button>
            </p>
        </div>
    </div>
);
};



export default AuthPage; 