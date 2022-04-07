var db = require("../dbConnection");
var pool = require("../queryBuilder");

let apiModel = {};

apiModel.loginUser = (table, personaType, email, password) => {
  return new Promise((resolve, reject) => {
    // SQL query to fetch user details
    let query =
      "select t.id, t.email, '" +
      personaType +
      "' as personaType from " +
      table +
      " t where t.email = '" +
      email +
      "' and t.password = '" +
      password +
      "'";
    db.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = apiModel;
