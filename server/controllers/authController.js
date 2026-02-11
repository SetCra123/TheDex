const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//generate token
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRE || '30d'
   });
};

// @ desc   Register new user
// @route   POST /api/auth/resister
// @access  Public
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

    console.log('=== REGISTER USER ===');
    console.log('Registration data:', { username, email });
    
    // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide username, email, and password'
            });
        }

        //Check if user exists already 
        const userExists = await User.findOne({ $or: [{ email }, { username }]})
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'User already exists with that email or username'
            });
        }
        
        

        //Create a user 
        const user = await User.create({
            username,
            email,
            password
        });

        //Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        });
       } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
       }
     };


     const login = async (req, res) => {
      try {
        
        const { email, password } = req.body;
        
        console.log('1️⃣ Login attempt with:', req.body);
  
        // Validate input
        if (!email || !password) {
          console.log('❌ Missing email or password');
          return res.status(400).json({
              success: false,
              error: 'Please provide email and password'
          });
        }
  
        console.log('2️⃣ Finding user...');
        const user = await User.findOne({ email }).select('+password');
        
        console.log('3️⃣ User found:', user ? 'Yes' : 'No');
        
        if (!user) {
          console.log('❌ User not found in database');
          return res.status(401).json({
              success: false,
              error: 'Invalid credentials'
          });
        }
  
        console.log('4️⃣ Stored password hash:', user.password);
        console.log('5️⃣ Input password:', password);

        console.log('6️⃣ About to compare passwords...');
  
        // Check password
        const isMatch = await user.comparePassword(password);
        
        console.log('7️⃣ Password match result:', isMatch);
        
        if (!isMatch) {
          console.log('❌ Passwords do not match');
          return res.status(401).json({
              success: false,
              error: 'Invalid credentials'
          });
        }
  
        console.log('8️⃣ ✅ Login successful! Generating token...');
  
        // Generate sign in token
        const token = generateToken(user._id);
  
        console.log('9️⃣ ✅ Sending response with token');
  
        res.json({
          success: true,
          data: {
              id: user._id,
              username: user.username,
              email: user.email,
              token
          }
        });
      } catch (err) {
        console.error('💥 Login error:', err);  
        res.status(500).json({
              success: false,
              error: err.message
          });
      }
  };


// @desc Logout user
// @route POST /api/auth/logout
// @access Private

// 

const getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');


        res.json({
            success,
            data: user
        });
    } catch (err) {
        res.status(500).json({
           success: false,
           error: err.message 
        });
    }
};


const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;


        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Please provide current and new password'
            });
        }


        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }


        //Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        //Generate new token
        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
      const { newPassword } = req.body;
      const { resetToken } = req.params;
  
      if (!newPassword) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a new password'
        });
      }
  
      // Verify reset token
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Invalid reset token'
        });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      // Generate new login token
      const token = generateToken(user._id);
  
      res.json({
        success: true,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          token
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }
  };

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user found with that email'
      });
    }

    // Generate reset token (send this via email)
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: err.message
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });

  }
};



const logout = async (req, res) => {
  try {
    //Logout is handled client side by removing the token
    // Endpoint is used for logginh, tracking purposes
    res.json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
  }
};


module.exports = {
    register,
    generateToken, 
    login,
    logout,
    getAuthenticatedUser,
    resetPassword,
    updatePassword,
    forgotPassword,

}