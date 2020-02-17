require('dotenv').config()


module.exports = {
  development: {
    // username: process.env.RDS_USERNAME,
    // password: process.env.RDS_PASSWORD,
    // database: process.env.RDS_DB_NAME,
    // host: process.env.RDS_HOSTNAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: console.log
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  production: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,s
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true,
    dialectOptions: {
      ssl: true
    }
  }
}
