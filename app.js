const express = require("express");
const connect = require("./schemas")
const app = express();
const port = 3000;

connect();

const articlesRouter = require("./routes/articles");

const requestMiddleware = (req, res, next) => {
    console.log("Requset URL:", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.json());
app.use(requestMiddleware);

app.use("/api", [articlesRouter]);  // cartsRouter

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});