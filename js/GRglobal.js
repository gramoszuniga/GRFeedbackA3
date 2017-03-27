/*
 GRglobal.js
 Assignment 3

 Revision History
 Gonzalo Ramos Zúñiga, 2017.03.26: Updated
 Gonzalo Ramos Zúñiga, 2017.02.20: Created
 */

function toggleGRAddRatings() {
    if ($("#GRAddWantRatings").prop("checked")) {
        $("#GRAddRatings").show();
    }
    else {
        $("#GRAddRatings").hide();
    }
}

function updateGRAddOverallRating() {
    $("#GRAddOverallRating").val(calculateOverallRating($("#GRAddFoodQuality").val(), $("#GRAddService").val(),
            $("#GRAddValue").val()) + " %");
}

function toggleGREditRatings() {
    if ($("#GREditWantRatings").prop("checked")) {
        $("#GREditRatings").show();
    }
    else {
        $("#GREditRatings").hide();
    }
}

function updateGREditOverallRating() {
    $("#GREditOverallRating").val(calculateOverallRating($("#GREditFoodQuality").val(), $("#GREditService").val(),
            $("#GREditValue").val()) + " %");
}

function saveDefaultReviewerEmail() {
    localStorage.setItem("DefaultEmail", $("#GRDefaultEmail").val());
    alert("Default Reviewer Email saved.");
}

function getDefaultEmail() {
    $("#GRAddEmail").val(localStorage.getItem("DefaultEmail"));
    GRupdateTypesDropdown();
}

function saveFeedback() {
    GRaddFeedback();
}

function getFeedbackList() {
    GRgetReviews();
}

function getFeedback() {
    GRshowCurrentReview();
}

function updateFeedback() {
    GRupdateFeedback();
}

function cancelFeedback() {
    $(location).prop("href", "#GRViewFeedbackPage");
}

function deleteFeedback() {
    GRdeleteFeedback();
}

function clearDB() {
    GRclearDatabase();
}

$(document).ready(function () {
    $("#GRAddRatings").hide();
    $("#GRAddWantRatings").on("click", toggleGRAddRatings);
    $("#GRAddFoodQuality").val(0);
    $("#GRAddService").val(0);
    $("#GRAddValue").val(0);
    $("#GRAddFoodQuality").on("change", updateGRAddOverallRating);
    $("#GRAddService").on("change", updateGRAddOverallRating);
    $("#GRAddValue").on("change", updateGRAddOverallRating);
    $("#GREditRatings").hide();
    $("#GREditWantRatings").on("click", toggleGREditRatings);
    $("#GREditFoodQuality").val(0);
    $("#GREditService").val(0);
    $("#GREditValue").val(0);
    $("#GREditFoodQuality").on("change", updateGREditOverallRating);
    $("#GREditService").on("change", updateGREditOverallRating);
    $("#GREditValue").on("change", updateGREditOverallRating);
    $("#GRSaveDefaults").on("click", saveDefaultReviewerEmail)
    try {
        DB.GRCreateDatabase();
        if (db) {
            DB.GRCreateTables();
        }
    }
    catch (error) {
        console.error("Error creating database.");
    }
    $("#GRAddFeedbackPage").on("pageshow", getDefaultEmail);
    $("#GRSaveFeedback").on("click", saveFeedback);
    $("#GRViewFeedbackPage").on("pageshow", getFeedbackList);
    $("#GREditFeedbackPage").on("pageshow", getFeedback);
    $("#GRCancelFeedback").on("click", cancelFeedback);
    $("#GRUpdateFeedback").on("click", updateFeedback);
    $("#GRDeleteFeedback").on("click", deleteFeedback);
    $("#GRClearDB").on("click", clearDB);
});

function calculateOverallRating(rating1, rating2, rating3) {
    var MAX_PERCENTAGE = 100;
    var MAX_OVERALL_RATING = 15;
    return ((parseInt(rating1) + parseInt(rating2) + parseInt(rating3)) * MAX_PERCENTAGE) / MAX_OVERALL_RATING;
}