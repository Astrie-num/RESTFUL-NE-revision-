const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const comparePassword = async (plainPassword, hashedPassword)  => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {hashPassword, comparePassword};