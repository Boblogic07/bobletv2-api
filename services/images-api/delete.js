import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

let TABLE_NAME = process.env.TABLE_NAME;

export async function main(event, context) {
  const params = {
    TableName: TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      uploadId: event.pathParameters.id
    }
  };

  try {
    // TODO: Need to handle delete here
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
