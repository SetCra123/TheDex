const { User } = require('../models');



const getProfile = async () => {
    try {
      const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedFigures', 'name imageUrl occupation')
      .populate('presentations', 'title createdAt');

    res.json({
        success: true,
        data: user
    });  
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      }); 
    }
};

//update profile

const updateProfile = async (req, res) => {
    try {
      const fieldsToUpdate = {
        username: req.body.username,
        email: req.body.email
      };

      Object.keys(fieldsToUpdate).forEach(key =>
        fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
      );

      const user = await User.findByIdAndUpdate(
        req.user.id,
        fieldsToUpdate,
        {
            new: true,
            runValidators: true
        }
      ).select('-password');

      res.json({
        success: true,
        data: user
      });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
        
    }
};

// delete account

const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        res.json({
            success: true,
            message: 'User account deleted successfully'
        });

    } catch (err) {
       res.status(500).json({
        success: failure,
        error: err.message
       });    
    }
};


//Add figure to saved List

const saveFigure = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      
      const isAlreadySaved = user.savedFigures.some(
        id => id.toString() === req.params.figureId
      );

      if (isAlreadySaved) {
        return res.status(400).json({
            success: false,
            error: 'Figure already saved'
        });
      }

      user.savedFigures.push(req.params.figureId);
      await user.save();

      res.json({
        success: true, 
        data: user.savedFigures
      });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
        
    }
};

// remove figure from saved list
const removeSavedFigure = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.savedFigures = user.savedFigures.filter(
            id => id.toString() !== req.params.figureId
        );

        await user.save();

        res.json({
            success: true,
            data: user.savedFigures
        });

    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
};

// get saved figures

const getSavedFigures = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
           .populate('savedFigures', 'name birthYear deathYear occupation imageUrl');

        res.json({
            success: true,
            length: user.savedFigures.length,
            data: user.savedFigures
        });

    } catch (err) {
      res.staus(500).json({
        success: false,
        error: err.message
      });
    }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  saveFigure,
  removeSavedFigure,
  getSavedFigures,


}