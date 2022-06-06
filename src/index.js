import express from "express";
import cors from "cors";


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", async (req, res) => {
    const url = `${req.protocol}://${req.get("host")}${req.url}`
    res.send(`Nothing here. Visit ${url}home`)
})

app.use("/home", express.static("home")); 

app.use("/wish", express.static("wish")); 

app.listen(port, () => {
    console.log(`Happy Birthday is listening on port ${port}`);
})