const env = {
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/expressdb",
    DB_NAME: process.env.DB_NAME || "expressdb",
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3303,
    JWT_SECRET: "TEST_JWT",
    JWT_EXPIRE: '2h'
};

export default env;
