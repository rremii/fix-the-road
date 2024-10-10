import * as process from "process"

export default () => ({
  port: process.env.PORT || 5000,
  server_origin: process.env.SERVER_ORIGIN,

  client_origin: process.env.CLIENT_ORIGIN,
  client_domain: process.env.CLIENT_DOMAIN,

  db_host: process.env.DB_HOST,
  db_user_name: process.env.DB_USER_NAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT,

  access_secret_jwt: process.env.JWT_ACCESS_SECRET,
  refresh_secret_jwt: process.env.JWT_REFRESH_SECRET,

  access_expire_jwt: +process.env.JWT_ACCESS_EXPIRE || 600, //seconds
  refresh_expire_jwt: +process.env.JWT_REFRESH_EXPIRE || 6000, //seconds

  smtp_email: process.env.SMTP_EMAIL,
  smtp_password: process.env.SMTP_PASSWORD,

  auth_code_expire: +process.env.AUTH_CODE_EXPIRE || 60, //seconds
})
