export class Config {
    public port = process.env.PORT || 3000
    public jwtAccessToken = process.env.JWT_ACCESS_TOKEN
    public jwtRefreshToken = process.env.JWT_REFRESH_TOKEN
    public uriMongoDb = process.env.URI_MONGO_DB || "mongodb://localhost:27017/my-database-name"

    public accountSidTwilio = process.env.SID_TWILIO;
    public authTokenTwilio = process.env.TOKEN_TWILIO;
    public fromMobileNo = process.env.FROM_MOBILE_NO;
}