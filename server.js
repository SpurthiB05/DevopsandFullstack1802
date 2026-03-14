const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

const app = express();

/* Middleware */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "dashboardSecret",
    resave: false,
    saveUninitialized: true
}));

/* Static Files */

app.use(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/covidDashboard")
.then(()=>console.log("✅ MongoDB Connected"))
.catch(err=>console.log("Mongo Error:",err));

/* Routes */

app.use("/auth",authRoutes);
app.use("/data",dataRoutes);

/* Default Page */

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","login.html"));
});

/* Start Server */

app.listen(3000,()=>{
    console.log("🚀 Server running at http://localhost:3000");
});