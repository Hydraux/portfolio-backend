import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./libs/sesClient.js";
import { fromAddress, toAddress } from "../emails.js";

const createSendEmailCommand = (toAddress, fromAddress, note, sender) => {
  const body =
    "<html>" +
    "<head></head>" +
    "<body>" +
    "<h1> Someone would like to hire you! </h1>" +
    "<p> Their email address is: " +
    sender +
    "</p>" +
    "<br></br>" +
    "<h2> Here's what they have to say: </h2>" +
    "<p> " +
    note +
    "</p>";
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Someone would like to hire you!",
      },
    },
    Source: fromAddress,
  });
};

const run = async (sender, note) => {
  const sendEmailCommand = createSendEmailCommand(
    toAddress,
    fromAddress,
    note,
    sender
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error("Failed to send email.");
    console.error(e);
    return e;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
export { run };
