const express = require("express");
const problemRouter = express.Router();

//CREATE
problemRouter.post("/create" , problemCreate);
problemRouter.patch("/:id" , problemUpdate);
problemRouter.delete("/:id" , problemDelete);
//FETCH
//normal user excess
problemRouter.post("/:id" , problemFetch);
problemRouter.post("/" , getAllProblem);
problemRouter.get("/user" , solvedProblem);
