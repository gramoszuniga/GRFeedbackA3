/*
 GRdatabase.js
 Assignment 3

 Revision History
 Gonzalo Ramos Zúñiga, 2017.03.26: Updated
 Gonzalo Ramos Zúñiga, 2017.02.20: Created
 */

var db;
var DB_SIZE = 2 * 1024 * 1024;

var DB = {
    GRCreateDatabase: function () {
        db = openDatabase("GRFeedbackA3 DB", "1.0", "DB for GR Feedback A3", DB_SIZE, createDatabaseSuccess);
        function createDatabaseSuccess() {
            console.info("Database created successfully.");
        }
    },
    GRCreateTables: function () {
        db.transaction(txFunction, databaseError, createTablesSuccess);
        function txFunction(tx) {
            var sql = "DROP TABLE type;";
            tx.executeSql(sql, [], dropTypeSuccess, databaseError);
            sql = "CREATE TABLE IF NOT EXISTS type(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql, [], createTypeSuccess, databaseError);
            sql = ["INSERT INTO type (name) VALUES ('Canadian');", "INSERT INTO type (name) VALUES ('Asian')",
                "INSERT INTO type (name) VALUES ('Other')"];
            for (var i = 0; i < sql.length; i++) {
                tx.executeSql(sql[i], [], insertTypeSuccess, databaseError);
            }
            sql = "CREATE TABLE IF NOT EXISTS review(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "businessName VARCHAR(30) NOT NULL, typeId INTEGER NOT NULL, reviewerEmail VARCHAR(30), " +
                "reviewerComments TEXT, reviewDate DATE, hasRating VARCHAR(1), rating1 INTEGER, rating2 INTEGER, " +
                "rating3 INTEGER, FOREIGN KEY(typeId) REFERENCES type(id));";
            tx.executeSql(sql, [], createReviewSuccess, databaseError);
            function dropTypeSuccess() {
                console.info("Table type dropped successfully.");
            }

            function createTypeSuccess() {
                console.info("Table type created successfully.");
            }

            function insertTypeSuccess() {
                console.info("Record in table type created successfully.");
            }

            function createReviewSuccess() {
                console.info("Table review created successfully.");
            }
        }

        function createTablesSuccess() {
            console.info("Tables created successfully.");
        }
    },
    GRDropTables: function () {
        db.transaction(txFunction, databaseError, dropTablesSuccess);
        function txFunction(tx) {
            var sql = "DROP TABLE type;";
            tx.executeSql(sql, [], dropTableSuccess, databaseError);
            var sql = "DROP TABLE review;";
            tx.executeSql(sql, [], dropTableSuccess, databaseError);
            function dropTableSuccess() {
                console.info("Table in database successfully dropped.");
            }
        }

        function dropTablesSuccess() {
            console.info("Tables dropped successfully.");
        }
    }
};

function databaseError(tx, error) {
    console.error("Database Error: " + tx + " " + error.code + " " + error.message);
}