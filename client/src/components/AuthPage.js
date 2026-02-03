import React, { useState } from 'react';
import { Eye, EyeOff, BookOpen } from 'luicide-react';

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
            const endpoint = isLogin ? 'ap'
        }
    }
}