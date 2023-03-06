export class Config {
    public nodeEnv = process.env.NODE_ENV || "DEVELOPMENT"
    public port = process.env.PORT || 3000
    public jwtAccessToken = process.env.JWT_ACCESS_TOKEN
    public jwtRefreshToken = process.env.JWT_REFRESH_TOKEN
    public uriMongoDb = process.env.URI_MONGO_DB || "mongodb://localhost:27017/jostech"

    public accountSidTwilio = process.env.SID_TWILIO;
    public authTokenTwilio = process.env.TOKEN_TWILIO;
    public fromMobileNo = process.env.FROM_MOBILE_NO;

    public xenditApiKey = process.env.XENDIT_API_KEY
    public xenditApiUrl = process.env.XENDIT_API_URL
}