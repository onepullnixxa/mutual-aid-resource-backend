////////////////////////////////
//        DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Middleware Import
const cors = require("cors");
const morgan = require("morgan");


////////////////////////////////
//     DATABASE CONNECTION
////////////////////////////////
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


///////////////////////////////
//         MODELS
///////////////////////////////
const PersonSchema = new mongoose.Schema({
    name: String,
    img: String,
    donateLink: String,
    contentText: String,       
});

const Person = mongoose.model("Person", PersonSchema);


///////////////////////////////
//        MIDDLEWARE
///////////////////////////////
app.use(cors()); // To prevent cors errors, open access to all origins
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse json bodies 


///////////////////////////////
//          ROUTES
///////////////////////////////
//        TEST ROUTE
app.get("/", (req, res) => {
    res.send("yooooooo");
});

// INDEX ROUTE
app.get("/home", async (req, res) => {
    try {
        // Send all people
        res.json(await Person.find({}));
    } catch (error) {
        // Send error
        res.status(400).json(error);
    }
});

// CREATE ROUTE
app.post("/home", async (req, res) => {
    try {
        // Send all people
        res.json(await Person.create(req.body));
    } catch (error) {
        // Send error
        res.status(400).json(error);
    }
});



///////////////////////////////
//          LISTENER
///////////////////////////////
app.listen(PORT, () => console.log(`ayyeee lol this is your lil helper in PORT ${PORT}`));