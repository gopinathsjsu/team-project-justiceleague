var db = require("../dbConnection");
var pool = require("../queryBuilder");

let apiModel = {};

apiModel.testModel = (dataJson) => {
  return new Promise((resolve, reject) => {
    // Query goes here
  });
};

module.exports = apiModel;
