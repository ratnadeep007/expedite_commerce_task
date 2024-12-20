"use strict";

import { expect } from "chai";
import { lambdaHandler } from "../../app.mjs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import sinon from "sinon";

const context = {};

import getEvent from "../events/product/appsync-get.json" assert { type: "json" };
import createEvent from "../events/product/appsync-create.json" assert { type: "json" };
import updateEvent from "../events/product/appsync-update.json" assert { type: "json" };
import deleteEvent from "../events/product/appsync-delete.json" assert { type: "json" };

describe("Tests Lambda handler", function () {
  let sendStub;

  beforeEach(() => {
    sendStub = sinon.stub(DynamoDBDocumentClient.prototype, "send");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("handles get product", async () => {
    const mockItem = {};
    sendStub.resolves({ Item: mockItem });
    const result = await lambdaHandler(getEvent, context);

    expect(sendStub.firstCall.args[0]).to.be.instanceOf(GetCommand);
  });

  it("handles new product", async () => {
    const mockItem = {};
    sendStub.resolves({ Item: mockItem });
    const result = await lambdaHandler(createEvent, context);

    expect(sendStub.firstCall.args[0]).to.be.instanceOf(PutCommand);
  });

  it("handles update product", async () => {
    const mockItem = {};
    sendStub.resolves({ Item: mockItem });
    const result = await lambdaHandler(updateEvent, context);

    expect(sendStub.firstCall.args[0]).to.be.instanceOf(UpdateCommand);
  });

  it("handles delete product", async () => {
    const mockItem = {};
    sendStub.resolves({ Item: mockItem });
    const result = await lambdaHandler(deleteEvent, context);

    expect(sendStub.firstCall.args[0]).to.be.instanceOf(DeleteCommand);
  });
});
