require('dotenv').config();

module.exports = {
    BaseURL: process.env.BASE_URL || 'http://localhost:3000',
    testUser: process.env.TEST_USER,
    testPassword: process.env.TEST_PASSWORD
};