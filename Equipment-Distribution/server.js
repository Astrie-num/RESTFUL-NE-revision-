const express = require('express');
const {connectDB} = require ('./config/db');
const authRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
// require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger');
const cors = require('cors');




const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/', authRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
})