// Database
const { switchDB, getDBInstance } = require('../config/db');


async function companyAuth(req, res, next) {
    try {
        const db = await getDBInstance();
        const headerToken = req.headers.authorization ? req.headers.authorization : null;

        // Find token
        const findToken = await db.TenantSession.findOne({ token: headerToken });
        if (!findToken) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Users',
            });
        };

        // Find company
        const findCompany = await db.Tenant.findOne({ _id: findToken.company_id }, '_id company_name database');
        // console.log('findCompany :>> ', findCompany);
        if (!findCompany) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Users',
            });
        };
        // let data = findCompany.toJSON();
        req.database = findCompany.database;
        req.user = findCompany;
        next();
    } catch (error) {
        console.log('error :>> ', error);
        res.status(400).send({
            success: false,
            message: "Something went wrong"
        });
    }
};


module.exports = {
    companyAuth
}