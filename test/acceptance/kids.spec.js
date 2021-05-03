/* eslint-disable no-undef */

require("./../support/globalHelper");
const server = require("../../index.js");
const db = require("./../../models/");
const Kid = db.Kid;

describe("Kids", () => {
	let kidFake;
	beforeEach(async () => {
		kidFake = {
			id: 3,
			name: "Manuel",
			score: 2,
			image: "",
			createdAt: "2021-04-25T11:07:13.432Z",
			updatedAt: "2021-04-25T11:07:23.398Z"
		};

		Kid.destroy({
			where: {},
			truncate: true
		});

		server.close();
		await Kid.create(kidFake);
	});

	describe("/GET kids", () => {
		it("should GET all the kids", (done) => {
			chai.request(server)
				.get("/kids")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.an("array");
					done();
				});
		});
	});

	describe("/GET/:id kid", async() => {
		it("should GET a kid by the given id", (done) => {
			chai.request(server)
				.get(`/kids/${kidFake.id}`)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.id).to.equal(kidFake.id);
					expect(res.body.name).to.equal(kidFake.name);
					expect(res.body.score).to.equal(kidFake.score);
					done();
				});
		});
	});

	describe("/POST kid", () => {
		it("should POST new kid", (done) => {
			const kid = {
				name: "Manuel",
				score: 2
			};
			chai.request(server)
				.post("/kids")
				.send(kid)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.name).to.equal(kid.name);
					expect(res.body.score).to.equal(kid.score);
					done();
				});
		});
	});

	describe("/PUT kid", () => {
		it("should UPDATE new kid", (done) => {
			const kidUpdate = {
				name: "JoxeMari",
				score: 1,
				image: "dragon.jpg"
			};
			chai.request(server)
				.put(`/kids/${kidFake.id}`)
				.send(kidUpdate)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.name).to.equal(kidUpdate.name);
					expect(res.body.score).to.equal(kidUpdate.score);
					expect(res.body.image).to.equal(kidUpdate.image);
					done();
				});
		});
	});

	describe("/DELETE kid", () => {
		it("should DELETE kid", (done) => {
			const kidUpdate = {
				name: "JoxeMari",
				score: 1
			};
			chai.request(server)
				.delete(`/kids/${kidFake.id}`)
				.send(kidUpdate)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.id).to.equal(kidFake.id);
					done();
				});
		});
	});
});
