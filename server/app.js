const express = require("express")

const app = express();
require("dotenv/config")
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hai there...")
})


//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//artist route
const artistRoute = require("./routes/artist")
app.use("/api/artist/", artistRoute)

//album route
const albumRoute = require("./routes/album")
app.use("/api/album/", albumRoute)

//song route
const songRoute = require("./routes/song")
app.use("/api/song/", songRoute)

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB CONNECTED");
    });

app.listen(4000, () => console.log("Listening to port 4000"))
