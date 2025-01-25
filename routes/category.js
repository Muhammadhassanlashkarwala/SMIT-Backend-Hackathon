import express from "express";

const categoryRouter = express.Router();

categoryRouter.post('/', (req, res) => {
    res.send('Category Page')
})