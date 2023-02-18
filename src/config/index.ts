export class Config {
    public port = process.env.PORT || 3000
    public accessTokenKey = process.env.ACCESS_TOKEN_KEY
    public refreshTokenKey = process.env.REFRESH_TOKEN_KEY
}