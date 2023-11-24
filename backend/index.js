import express from "express";
import products from "./data/products.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("API is Running!");
});
app.get("/api/products", (req, res) => {
    res.send(products);
});
app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p._id === req.params.id);

    res.send(product);
});

app.listen(PORT, () => {
    process.stdout.write(`Server is running at http://localhost:${PORT}\n`);
});
