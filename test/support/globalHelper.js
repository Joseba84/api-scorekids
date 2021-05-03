/* eslint-disable no-undef */
process.env.NODE_ENV = "test";


global.chaiHttp = require("chai-http");
global.chai = require("chai");
global.sinon = require("sinon");
global.assert = chai.assert;
global.expect = chai.expect;

chai.should();
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
chai.use(chaiHttp);