const router = require('express').Router();

// controller
const tenantController = require("../controller/controller");

// Middleware
const { companyAuth } = require('../middleware/auth');

router.post('/add-company', tenantController.addCompany);
router.post('/login-company', tenantController.loginCompany);


router.post('/add-employee', companyAuth, tenantController.addEmployeeInCompany);


module.exports = router;