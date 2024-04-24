const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan")
const cors = require("cors");
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = 8000;

//Connect to database
connectDB().then(() => {});

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/guests", require("./routes/guestRoutes"));
app.use("/api/bunks", require("./routes/bunkRoutes"));
app.use("/api/lockers", require("./routes/lockerRoutes"));

app.get("/", (req, res) => {
    res.send({message: "connected"}).status(200);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;