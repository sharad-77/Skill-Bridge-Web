import express from "express";

const certificateRoute = express.Router();

certificateRoute.get('/');
certificateRoute.get("/:id");

export default certificateRoute;