const express = require('express');
const {hashPassword, comparePassword} = require('../utils/auth');
const {connection} = require('../config/db');
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyAdmin = require('../middlewares/adminAuth');
const verifyToken = require('../middlewares/tokenAuth');

const router = express.Router();


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user in the system with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: User's first name.
 *               lastname:
 *                 type: string
 *                 description: User's last name.
 *               emailAddress:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               department:
 *                 type: string
 *                 description: Department the user belongs to.
 *               position:
 *                 type: string
 *                 description: User's job position.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data added successfully
 *                 data:
 *                   type: object
 *                   description: Details of the inserted user.
 *       400:
 *         description: All fields are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required
 *       500:
 *         description: Database error or failed to create user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.post('/register', async (req, res) => {
    const {firstname, lastname, emailAddress,
         department, position, password } = req.body;

    if(!firstname|| !lastname || !emailAddress
        || !department || !position || !password){
            return res.status(400).json({message : 'All fields are required'});
        }

    try{
        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO users (firstname, lastname, emailAddress,department, position, password) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [firstname, lastname, emailAddress,
            department, position, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: 'Database error' });
                  }
                  console.log(req.body);
                  res.status(201).json({ message: 'Data added successfully', data: results });
                
        });

    } catch(error){
        res.status(500).json({message: 'Failed to create user', error: error. message});
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user.
 *       400:
 *         description: Email address and password are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email address and password are required
 *       401:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password!
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Database error or login failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

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

            const token = jwt.sign(
                {userId:user.id, role:user.role },
                process.env.JWT_SECRET,
                {expiresIn: '15m'}
            );
            
            res.status(200).json({ token, user })
        });
       
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({message : "Login failed", error: error.message});
    }
});
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: |
 *         Use the "Authorize" button to enter your JWT token in the format:
 *         ```
 *         Bearer your.jwt.token.here
 *         ```
 * /admin-only:
 *   get:
 *     summary: Get users (Admin only)
 *     description: Retrieve a paginated list of users, accessible only to admin users. Admin credentials and a valid token are required to access this endpoint.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           description: Number of users per page.
 *     security:
 *       - bearerAuth: []  # Indicates that this endpoint requires a bearer token
 *     responses:
 *       200:
 *         description: Successfully retrieved user list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of users.
 *                 page:
 *                   type: integer
 *                   description: Current page number.
 *                 limit:
 *                   type: integer
 *                   description: Number of users per page.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: User ID.
 *                       emailAddress:
 *                         type: string
 *                         format: email
 *                         description: User's email address.
 *                       role:
 *                         type: string
 *                         description: User's role.
 *       500:
 *         description: Database error or failed to fetch users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Database error
 *     x-token-info: 
 *       description: |
 *         To access this endpoint, you must provide a valid JWT token in the Authorization header.
 *         Use the "Authorize" button in Swagger UI to enter your token in the format:
 *         ```
 *         Bearer your.jwt.token.here
 *         ```
 *         Ensure you have admin credentials to access this endpoint.
 */


router.get('/admin-only', verifyToken, verifyAdmin, (req, res) => {

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


