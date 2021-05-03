const db = require("../../models");

const getImages = (req, res) => {
	return db.Image.findAll()
		.then((images) => {
			return res.send(images);
		})
		.catch((err) => {
			console.log("There was an error querying images", JSON.stringify(err));
			return res.send(err);
		});
};

module.exports = {
	getImages
};