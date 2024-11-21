"use strict";

import { lambdaHandler } from "../../app.mjs";
import { expect } from "chai";

import getEvent from "../events/appsync-get.json" assert { type: "json" };
import createEvent from "../events/appsync-create.json" assert { type: "json" };
import updateEvent from "../events/appsync-update.json" assert { type: "json" };
import deleteEvent from "../events/appsync-delete.json" assert { type: "json" };

const context = {};

describe("Tests Lambda handler", function () {
  it("verifies successful response", async () => {
    const result = await lambdaHandler(getEvent, context);

    expect(result).to.be.an("string");
    expect(result).to.be.equal("Hello, User");
  });
});
