const express = require("express");
const cors = require("cors");
require("dotenv").config();

const guitarDatabaseRoutes = require('./routes/guitars');

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use("/guitars", guitarDatabaseRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});