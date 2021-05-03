const db = require("../../models");
const kidValidation = require("../../src/kids/validations/KidValidation");

const getHome = (req, res) => {
	res.status(200).json({ msg: "Welcome to score kids API"});
};

const getKids = (req, res) => {
	return db.Kid.findAll()
		.then((kids) => {
			return res.send(kids);
		})
		.catch((err) => {
			console.log("There was an error querying kids", JSON.stringify(err));
			res.status(400).send(err);
		});
};

const getKidById = (req, res) => {
	const id = parseInt(req.params.id);

	const validation = kidValidation(req.params);
	if (validation.error) {
		return res.status(422).json({
			errors: validation.error.details[0].message
		});
	}

	return db.Kid.findByPk(id)
		.then((kid) => res.send(kid))
		.catch((err) => {
			console.log("***Error finding kid", JSON.stringify(err));
			res.status(400).send(err);
		});
};

const createKid = (req, res) => {
	const { name, score, image } = req.body;
	return db.Kid.create({ name, score, image })
		.then((kid) => res.send(kid))
		.catch((err) => {
			console.log("***There was an error creating a kid", JSON.stringify(err));
			return res.status(400).send(err);
		});
};

const updateKid = (req, res) => {
	const id = parseInt(req.params.id);
	const { name, score, image } = req.body;

	return db.Kid.findByPk(id)
		.then((kid) => {
			return kid.update({ name, score, image })
				.then(() => res.send(kid))
				.catch((err) => {
					console.log("***Error updating kid", JSON.stringify(err));
					res.status(400).send(err);
				});
		});
};

const deleteKid = (req, res) => {
	const id = parseInt(req.params.id);
	return db.Kid.findByPk(id)
		.then((kid) => kid.destroy({ force: true }))
		.then(() => res.send({ id }))
		.catch((err) => {
			console.log("***Error deleting kid", JSON.stringify(err));
			res.status(400).send(err);
		});
};

module.exports = {
	getHome,
	getKids,
	getKidById,
	createKid,
	updateKid,
	deleteKid
};