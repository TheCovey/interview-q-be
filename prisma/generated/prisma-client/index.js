"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Industry",
    embedded: false
  },
  {
    name: "Tag",
    embedded: false
  },
  {
    name: "Availability",
    embedded: false
  },
  {
    name: "Booking",
    embedded: false
  },
  {
    name: "Review",
    embedded: false
  },
  {
    name: "Response",
    embedded: false
  },
  {
    name: "Report",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://interviewq-server-3a176657f4.herokuapp.com`
});
exports.prisma = new exports.Prisma();
