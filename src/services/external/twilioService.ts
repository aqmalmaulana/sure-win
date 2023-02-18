import { Config } from "../../config";
import { Twilio } from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export class TwilioService {
    private accountSid: string;
    private authToken: string;
    private client: import("twilio/lib/rest/Twilio");
    protected config: Config;

    constructor() {
        this.config = new Config()
        this.accountSid = this.config.accountSidTwilio,
        this.authToken = this.config.authTokenTwilio

        this.client = new Twilio(this.accountSid, this.authToken)
    }

    public async sendMessage(to: number, message: string): Promise<MessageInstance> {
        return await this.client.messages.create({
            to: "+62" + to,
            from: this.config.fromMobileNo,
            body: message
        })
      }
}