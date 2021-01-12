require("dotenv").config();
module.exports = {

  "development": {
    "username": "root",
    "password": process.env.MYSQL_PASSWORD,
    "database": "image_repoDB",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "image_repoDB_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
