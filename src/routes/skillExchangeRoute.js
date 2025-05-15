import express from "express";

const skillExchangeRoute = express.Router();

skillExchangeRoute.get('/');
skillExchangeRoute.get("/:id");

export default skillExchangeRoute;