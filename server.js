require("dotenv").config();
const {PORT, DATABASE_URL} = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");



mongoose.connect(DATABASE_URL)
mongoose.connection
    .on("open", () => console.log("you are connected to mongodb"))
    .on("close", () => console.log("you are disconnected from mongoodb"))
    .on("error", (error) => console.log(error))

// MODEL
const TelecomSchema = new mongoose.Schema({
    Rating: Number,
    Task_Complete: String,
    Feedback: String
})

const Telecom = mongoose.model("Telecom", TelecomSchema)

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));

// ROUTES
app.get("/", (req, res) => {
    res.send("ET Phone Home")
})

// INDEX
app.get("/telecom", async (req, res) => {
    try {
        res.status(200).json(await Telecom.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// CREATE
app.post("/telecom", async (req, res) => {
    try {
        res.status(200).json(await Telecom.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

//Delete
app.delete("/telecom/:id", async (req, res) => {
    try {
        res.status(200).json(await Telecom.findByIdAndRemove(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

//Update
app.put("/telecom/:id", async (req, res) => {
    try {
        res.status(200).json(await Telecom.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// LISTENER
app.listen(PORT, () => console.log(`Delta, Delta Delta, Can I help ya, help ya, help ya on port ${PORT}`))
