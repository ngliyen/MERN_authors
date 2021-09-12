const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// import config
require("./server/config/mongoose.config");

// allow cross-origin requests
app.use(cors());

// process post request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// import routes
const AllRoutes = require("./server/routes/author.routes");
AllRoutes(app);

app.listen(port, ()=>console.log(`Listening on port ${port}`));