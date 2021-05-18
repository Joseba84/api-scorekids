const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const { kids, images } = require("./src/queries");
const createKidsHandler = require("./src/kids/CreateKidsHandler");

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

createKidsHandler(app, kids);

app.get("/characters-images", images.getImages);

app.use((request, response) => {
	response.status(404).json({
		error: "Not found"
	});
});

const server = app.listen(PORT, () => {
	console.log("App listening on port %s, in environment %s!", PORT, process.env.NODE_ENV);
});

module.exports = server;