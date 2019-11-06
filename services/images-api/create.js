import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

let TABLE_NAME = process.env.TABLE_NAME;

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      uploadId: uuid.v1(),
      comment: data.comment,
      image: data.image,
      createdAt: Date.now()
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false});
  }
}
