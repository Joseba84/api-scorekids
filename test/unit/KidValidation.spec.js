const { expect } = require("chai");
const validate = require("../../src/kids/validations/KidValidation");

/* eslint-disable no-undef */
require("./../support/globalHelper");

describe("KidValidation", () => {
	context("without a id", function () {
		it("rejects the request", function () {
			const validation = validate({});
			expect(validation.error.message).to.equal("\"id\" is required");
		});
	});

	context("with a wrong type", function () {
		it("rejects the request", function () {
			const validation = validate({ id: "foo"});
			expect(validation.error.message).to.equal("\"id\" must be a number");
		});
	});

	context("with a id is out of range", function () {
		it("rejects the request", function () {
			const validation = validate({ id: -1 });
			expect(validation.error.message).to.equal("\"id\" must be greater than or equal to 0");
		});
	});

	context("with a id", function () {
		it("accepts the request", function () {
			const validation = validate({ id: 1 });
			expect(validation).to.deep.equal({ value: { id: 1 } });
		});
	});
});