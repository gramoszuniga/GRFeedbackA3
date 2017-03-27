/*
 GRfeedbackDAL.js
 Assignment 3

 Revision History
 Gonzalo Ramos Zúñiga, 2017.03.26: Updated
 Gonzalo Ramos Zúñiga, 2017.02.20: Created
 */

var Type = {
    GRSelectAll: function (setGRAddType) {
        db.transaction(txFunction, databaseError, selectAllTypesSuccess);
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, [], setGRAddType, databaseError);
        }

        function selectAllTypesSuccess() {
            console.info("Records in table type successfully selected.");
        }
    }
};

var Review = {
    GRInsert: function (options) {
        db.transaction(txFunction, databaseError, insertReviewSuccess);
        function txFunction(tx) {
            var sql = "INSERT INTO review (businessName, typeId, reviewerEmail, reviewerComments, reviewDate, " +
                "hasRating, rating1, rating2, rating3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
            tx.executeSql(sql, options, null, databaseError);
        }

        function insertReviewSuccess() {
            console.info("Record in table review inserted successfully.")
        }
    },
    GRSelect: function (options, setGREditForm) {
        db.transaction(txFunction, databaseError, SelectReviewSuccess);
        function txFunction(tx) {
            var sql = "SELECT * FROM review where id = ?;";
            tx.executeSql(sql, options, setGREditForm, databaseError);
        }

        function SelectReviewSuccess() {
            console.info("Record in table review successfully selected.");
        }
    },
    GRSelectAll: function (setGRFeedbackList) {
        db.transaction(txFunction, databaseError, selectAllReviewsSuccess);
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, [], setGRFeedbackList, databaseError);
        }

        function selectAllReviewsSuccess() {
            console.info("Records in table review successfully selected.")
        }
    },
    GRUpdate: function (options) {
        db.transaction(txFunction, databaseError, updateReviewSuccess);
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName = ?, typeId = ?, reviewerEmail = ?, reviewerComments = ?, " +
                "reviewDate = ?, hasRating = ?, rating1 = ?, rating2 = ?, rating3 = ? WHERE id = ?;";
            tx.executeSql(sql, options, null, databaseError);
        }

        function updateReviewSuccess() {
            console.info("Record in table review successfully updated.");
        }
    },
    GRDelete: function (options) {
        db.transaction(txFunction, databaseError, deleteReviewSuccess);
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id = ?;";
            tx.executeSql(sql, options, null, databaseError);
        }

        function deleteReviewSuccess() {
            console.info("Record in table review successfully deleted.");
        }
    }
};