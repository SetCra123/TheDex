const router = require('express').Router();

const figureRoutes = require('./figureRoutes');
const presentationRoutes = require('./presentationRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authroutes');
const templateRoutes = require('./templateRoutes');

router.use('/figures', figureRoutes);
router.use('/presentations', presentationRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/templates', templateRoutes);



module.exports = router; 