const express = require('express');
const {hashPassword, comparePassword} = require('../utils/auth');
const {connection} = require('../config/db');
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyAdmin = require('../middlewares/adminAuth');

const router = express.Router();


router.post('/register', async (req, res) => {
    const {firstname, lastname, nationalID, telephoneNumber, emailAddress,
         department, position, laptopManufacturer, model, serialNumber, password } = req.body;

    if(!firstname|| !lastname || !nationalID || !telephoneNumber || !emailAddress
        || !department || !position || !laptopManufacturer || !model || !serialNumber || !password){
            return res.status(400).json({message : 'All fields are required'});
        }

    try{
        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (firstname, lastname, nationalID, telephoneNumber, emailAddress,department, position, laptopManufacturer, model, serialNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [firstname, lastname, nationalID, telephoneNumber, emailAddress,
            department, position, laptopManufacturer, model, serialNumber, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: 'Database error' });
                  }
                  
                  res.status(201).json({ message: 'Data added successfully', data: results });
                
        });

    } catch(error){
        res.status(500).json({message: 'Failed to create user', error: error. message});
    }
});


router.post('/login', async (req, res) => {

    const {emailAddress, password} = req.body;
    if(!emailAddress || !password){
        res.status(400).json({message : "Email address and password are required"});
    }

    try{
        const query = "SELECT * FROM users WHERE emailAddress = ?";
        connection.query(query, [emailAddress], async (err, results) => {
            if(err){
                res.status(500).json({message : "Database error", err});
                return;
            }

            if(results.length === 0){
                res.status(404).json({message : "User not found"});
            }

            const user = results[0];
            const isMatch = await comparePassword(password, user.password);
            if(!isMatch){
                res.status(401).json({message : "Invalid email or password!"});
            }

            // const token = jwt.sign(
            //     {userId : user.id },
            //     secretKey = process.env.JWT_SECRET,
            //     {expiresIn: '1h'}
            // );
    
            // res.status(200).json({ token })
            res.status(200).json({message : "Login successful"});
        });
       
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({message : "Login failed", error: error.message});
    }
});
    
router.get('/admin-only', (req, res, next) =>{
    req.user = {
        id: 1,
        email: "uwumviyana@gmail.com ",
        role: "admin"
    };
    next();
}
,verifyAdmin, (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const query = `SELECT * FROM users LIMIT ? OFFSET ?`;
    connection.query(query,[limit, offset], (err, results) => {

        if(err){
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        const countQuery = "SELECT COUNT(*) as total FROM users";

        connection.query(countQuery, (err, countResult) => {

            if (err) {
                console.error('Error fetching user count:', err);
                return res.status(500).json({ message: 'Database error', err: err.message });
            }

            const total = countResult[0].total;

            res.status(200).json({
                total,
                page,
                limit,
                data: results
            });
        });
    });
});



module.exports = router;


