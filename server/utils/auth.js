const jwt = require('jsonwebtoken');
const User = require('../models/User');


//  Protect routes - verify token
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route',
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            console.log('req.user:', req.user);
            console.log('req.user._id:', req.user?._id);

            if (!req.user) {
                console.error('User not found in database for ID:', decoded.id);
                return res.status(401).json({
                    success: false,
                    message: 'User not found',
                });
            }
            next();
        

    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });

    }
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
    });
    }
};

// Authorize specific roles
const authorize = (...roles)  => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route',
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'User role is not authorized to this account'
            });
        }
      next();

    };
};


module.exports = { protect, authorize };