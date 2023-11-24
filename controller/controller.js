// Modules
const bcrypt = require('bcryptjs');
const validator = require("validatorjs");

// Files
const config = require('../config/config');

// Database
const { switchDB, getDBInstance } = require('../config/db');


// Login company
async function loginCompany(req, res) {
    let validation = new validator(req.body, {
        email: 'required|email',
        password: 'required',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    try {
        const { email, password } = req.body;
        const db = await getDBInstance();
        const findCompany = await db.Tenant.findOne({ email: email });
        if (!findCompany) {
            return RESPONSE.error(res, 1004, 401);
        };
        if (!await bcrypt.compareSync(password, findCompany.password)) {
            return RESPONSE.error(res, 1004, 401);
        };

        let token = await db.TenantSession.create({ company_id: findCompany._id })
        let response = findCompany.toJSON();
        response.token = token.token
        delete response.password;
        return RESPONSE.success(res, 1005, response);
    } catch (error) {
        console.log('error :>> ', error);
        return RESPONSE.error(res, 9999);
    }
};

//Add company
async function addCompany(req, res) {
    let validation = new validator(req.body, {
        name: 'required',
        database: 'required',
        company_name: 'required',
        email: 'required|email',
        password: 'required',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    try {
        const { name, email, password, company_name, database } = req.body;
        const db = await getDBInstance();
        const findCompany = await db.Tenant.findOne({ email: email });
        if (findCompany) {
            return RESPONSE.error(res, 1003, 409);
        };
        const company = await db.Tenant.create({
            name,
            email,
            password,
            company_name,
            database
        });
        return RESPONSE.success(res, 1001, company);
    } catch (error) {
        console.log('error :>> ', error);
        return RESPONSE.error(res, 9999);
    }
};


async function addEmployeeInCompany(req, res) {
    let validation = new validator(req.body, {
        name: 'required',
        email: 'required|email',
        password: 'required',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    try {
        const { body: { name, email, password }, user, database } = req;
        const companyDB = await switchDB(database);

        // Check email already exists or not   
        const checkEmail = await companyDB.Employee.findOne({ email: email });
        if (checkEmail) {
            return RESPONSE.error(res, 1003, 409);
        };

        // Create a new employee
        await companyDB.Employee.create({
            name,
            email,
            password,
            company_id: user._id
        });
        return RESPONSE.success(res, 2001);
    } catch (error) {
        console.log('error :>> ', error);
        return RESPONSE.error(res, 9999);
    }
};


module.exports = {
    addCompany,
    addEmployeeInCompany,
    loginCompany
}

