var db = require("../dbConnection");
var pool = require("../queryBuilder");

let apiModel = {};

// Login
apiModel.login = (table, email) => {
  return new Promise((resolve, reject) => {
    // SQL query to fetch user details
    let query =
      "select t.id, t.email, t.password, t.firstName, t.lastName " +
      "from " +
      table +
      " t where t.email = '" +
      email +
      "'";
    db.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

// Register
apiModel.register = (dataJson, table) => {
  return new Promise((resolve, reject) => {
    pool.get_connection((qb) => {
      qb.insert(table, dataJson, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  });
};

module.exports = apiModel;
