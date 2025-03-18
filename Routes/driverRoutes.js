const express = require('express');
const router = express.Router();
const driverController = require('../Controllers/driverController');

router.get('/dashboard', driverController.isDriver, driverController.getDashboard);
router.get('/g2-page', driverController.isDriver, driverController.getG2Page);
router.post('/g2-page', driverController.isDriver, driverController.postG2Page);
router.get('/g-page', driverController.isDriver, driverController.getGPage);

module.exports = router;