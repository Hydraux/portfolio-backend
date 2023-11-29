import { SESClient } from "@aws-sdk/client-ses";
import { fromEnv, fromIni, fromSSO } from "@aws-sdk/credential-providers"; // ES6 import

// Set the AWS Region.
const REGION = "us-east-2";
// Create SES service object.
const sesClient = new SESClient({ 
    region: REGION,
    credentials: fromSSO({
        profile: 'my-dev-profile'
    }),
 });
export { sesClient };