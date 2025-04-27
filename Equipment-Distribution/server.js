const express = require('express');
const {connectDB} = require ('./config/db');
const authRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
// require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger');


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use('/', authRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
})