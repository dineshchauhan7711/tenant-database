const MESSAGES = {

    // Company
    '1001': 'Company added successfully.',
    '1002': 'Get data successfully.',
    '1003': 'Email already exists.',
    '1004': 'Your credentials are not match our record.',
    '1005': 'Log in successfully.',

    // Employee
    '2001': 'Employee added successfully.',

    // Common
    '9000': 'Please Enter Valid data!',
    '9001': 'Not found',
    '9999': 'Something went wrong!',
}

module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};
