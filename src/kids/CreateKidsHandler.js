
module.exports = function(app, queries) {
	app.get("/", queries.getHome);
	app.get("/kids", queries.getKids);
	app.get("/kids/:id", queries.getKidById);
	app.post("/kids", queries.createKid);
	app.put("/kids/:id", queries.updateKid);
	app.delete("/kids/:id", queries.deleteKid);
};