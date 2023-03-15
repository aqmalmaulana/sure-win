export class Config {
    public nodeEnv = process.env.NODE_ENV || "DEVELOPMENT"
    public port = process.env.PORT || 3000
    public maxBonusUser = process.env.MAX_BONUS_USER || 100
    public bonusNewRegistration = process.env.BONUS_REGISTRATION || ""
    public jwtAccessToken = process.env.JWT_ACCESS_TOKEN
    public jwtRefreshToken = process.env.JWT_REFRESH_TOKEN
    public uriMongoDb = process.env.URI_MONGO_DB || "mongodb://localhost:27017/jostech"

    public redisHost = process.env.REDIS_HOST || "127.0.0.1"
    public redisPassword = process.env.REDIS_PASSWORD || "redis"
    public redisPort = process.env.REDIS_PORT || "6379"

    public nowPaymentsEmail = process.env.NOW_PAYMENTS_EMAIL
    public nowPaymentsPassword = process.env.NOW_PAYMENTS_PASSWORD
    public nowPaymentsBaseUrl = process.env.NOW_PAYMENTS_BASE_URL
    public nowPaymentsApiKey = process.env.NOW_PAYMENTS_API_KEY
    public nowPaymentsSecretKey = process.env.NOW_PAYMENTS_SECRET_KEY

    public minDeposit = process.env.MIN_DEPOSIT || 50
    public minWithdrawal = process.env.MIN_WITHDRAWAL || 50

    public callbackUrl = process.env.CALLBACK_URL
    public backUrl = process.env.BACK_URL

    public secretKeySpeakEasy = process.env.SECRET_KEY_SPEAKEASY

    public minSpent = process.env.MIN_SPENT || 2
    public maxSpent = process.env.MAX_SPENT || 100
}