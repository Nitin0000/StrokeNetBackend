const express = require("express");
const app = express();
const userrouter = require("./router");

app.use(express.json());

app.use('/',userrouter);

module.exports = app;