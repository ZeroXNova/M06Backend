const express = require("express");
var cors = require("cors");
const Song = require("./models/songs.js");
const app = express();

app.use(cors());

app.use(express.json());
const router = express.Router();

//grab all db Songs
router.get("/songs", async(req,res) =>{
    try{
        const songs = await Song.find({});
        res.send(songs);
        console.log(songs);
    }
    catch (err){
        console.log(err);
    }

});

// grab single song
router.get("/songs/:id", async (req,res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song);
    }
    catch (err){
        res.status(400).send(err);
    }
});

//create a song
router.post("/songs", async(req,res) => {
    try{
        const song = await new Song(req.body);
        await song.save();
        res.status(201).json(song);
        console.log(song);
    }
    catch{
        res.status(400).send(err);
    }
})

//update uses a put request
router.put("/songs/:id", async(req,res) =>{
    //to find song, request the id, then search for it
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
            res.status(400).send(err)
    }
})

app.use("/api", router);
app.listen(3000);