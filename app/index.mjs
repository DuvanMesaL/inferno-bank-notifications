// index.mjs (notifications)

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// usa la global real; tras renombrar ya no hay choque, pero esto es aún más robusto:
const REGION = (globalThis.process?.env?.AWS_REGION) || "us-east-1";
const TABLE  = (globalThis.process?.env?.NOTIFICATIONS_TABLE) || "notifications-table";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }), {
  marshallOptions: { removeUndefinedValues: true },
});

const ok  = (code, data) => ({ statusCode: code, body: JSON.stringify(data) });
const bad = (code, msg)  => ({ statusCode: code, body: JSON.stringify({ ok: false, error: msg }) });

export const consumer = async (event) => {
  console.log("SQS event records:", event?.Records?.length || 0);

  for (const r of event.Records || []) {
    try {
      let bodyText = r.body;
      if (typeof bodyText !== "string") bodyText = String(bodyText);
      console.log("RAW BODY:", bodyText);

      let body;
      try {
        body = JSON.parse(bodyText);
      } catch (e) {
        console.error("Bad JSON body, skipping:", bodyText, e);
        continue; // no bloquees el lote
      }

      const { userId, type = "INFO", message = "Notification" } = body || {};
      if (!userId) {
        console.warn("Skipping: missing userId");
        continue;
      }

      const item = {
        userId,
        notifId: crypto.randomUUID?.() || uuidv4(),
        type,
        message,
        createdAt: new Date().toISOString(),
      };

      await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
      console.log("Stored notification:", item);
    } catch (e) {
      console.error("consumer error", e);
    }
  }
  return { statusCode: 200, body: "OK" };
};

export const list = async (evt) => {
  try {
    const userId = evt?.pathParameters?.user_id;
    if (!userId) return bad(400, "Missing user_id");

    const res = await ddb.send(new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "userId = :u",
      ExpressionAttributeValues: { ":u": userId }, // DocumentClient: valores “normales”
      ScanIndexForward: false,
    }));

    return ok(200, { ok: true, items: res.Items || [] });
  } catch (e) {
    console.error("list error", e);
    return bad(500, "Error listing notifications");
  }
};
