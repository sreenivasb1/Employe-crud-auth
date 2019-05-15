const express = require('express')
const router = express.Router();

const cntrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', cntrlUser.register);
router.post("/authenticate", cntrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, cntrlUser.userProfile);

module.exports = router;
