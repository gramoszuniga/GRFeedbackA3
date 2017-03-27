/*
 GRfacade.js
 Assignment 3

 Revision History
 Gonzalo Ramos Zúñiga, 2017.03.26: Created
 */

var NULL_NUMBER = 3;

function GRupdateTypesDropdown() {
    Type.GRSelectAll(setGRAddType);
    function setGRAddType(tx, records) {
        var GRAddTypeInnerHTML = "";
        for (var i = 0; i < records.rows.length; i++) {
            if (records.rows[i]['name'] == "Other") {
                GRAddTypeInnerHTML += "<option value='" + records.rows[i]['id'] + "' selected>" +
                    records.rows[i]['name'] + "</option>";
            } else {
                GRAddTypeInnerHTML += "<option value='" + records.rows[i]['id'] + "'>" +
                    records.rows[i]['name'] + "</option>";
            }
        }
        $("#GRAddType").html(GRAddTypeInnerHTML);
        $('#GRAddType').selectmenu("refresh");
    }
}

function GRaddFeedback() {
    if (doValidateGRAddForm()) {
        var options = [$("#GRAddBusinessName").val(), $("#GRAddType").val(), $("#GRAddEmail").val(),
            $("#GRAddComment").val(), $("#GRAddDate").val(), $("#GRAddWantRatings").prop("checked")];
        if ($("#GRAddWantRatings").prop("checked")) {
            options.push($("#GRAddFoodQuality").val());
            options.push($("#GRAddService").val());
            options.push($("#GRAddValue").val());
        } else {
            for (var i = 0; i < NULL_NUMBER; i++) {
                options.push(null);
            }
        }
        Review.GRInsert(options);
        alert("New Feedback Added.");
    }
}

function GRgetReviews() {
    Review.GRSelectAll(setGRFeedbackList);
    function setGRFeedbackList(tx, records) {
        var GRFeedbackListInnerHTML = "";
        for (var i = 0; i < records.rows.length; i++) {
            if (records.rows[i]['hasRating'] == "true") {
                GRFeedbackListInnerHTML += "<li><a href='#GREditFeedbackPage' data-row-id=" + records.rows[i]['id'] +
                    "><h6>Business Name: " + records.rows[i]['businessName'] + "</h6><p>Reviewer Email: " +
                    records.rows[i]['reviewerEmail'] + "</p><p>Comments: " + records.rows[i]['reviewerComments'] +
                    "</p><p>Overall Rating: " + calculateOverallRating(records.rows[i]['rating1'],
                        records.rows[i]['rating2'], records.rows[i]['rating3']) + " %</p></a></li>";
            } else {
                GRFeedbackListInnerHTML += "<li><a href='#GREditFeedbackPage' data-row-id=" + records.rows[i]['id'] +
                    "><h6>Business Name: " + records.rows[i]['businessName'] + "</h6><p>Reviewer Email: " +
                    records.rows[i]['reviewerEmail'] + "</p><p>Comments: " + records.rows[i]['reviewerComments'] +
                    "</p><p>Overall Rating: 0 %</p></a></li>";
            }
        }
        $("#GRFeedbackList").html(GRFeedbackListInnerHTML);
        $("#GRFeedbackList").listview("refresh");
        $("#GRFeedbackList a").on("click", setListviewItemId);
        function setListviewItemId() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
        }
    }
}

function GRshowCurrentReview() {
    Type.GRSelectAll(setGRAddType);
    function setGRAddType(tx, records) {
        var GRAddTypeInnerHTML = "";
        for (var i = 0; i < records.rows.length; i++) {
            GRAddTypeInnerHTML += "<option value='" + records.rows[i]['id'] + "'>" +
                records.rows[i]['name'] + "</option>";
        }
        $("#GREditType").html(GRAddTypeInnerHTML);
        $('#GREditType').selectmenu("refresh");
    }

    Review.GRSelect([localStorage.getItem("id")], setGREditForm);
    function setGREditForm(tx, records) {
        $("#GREditBusinessName").val(records.rows[0]['businessName']);
        $("#GREditType").val(records.rows[0]['typeId']);
        $('#GREditType').selectmenu("refresh");
        $("#GREditEmail").val(records.rows[0]['reviewerEmail']);
        $("#GREditComment").val(records.rows[0]['reviewerComments']);
        $("#GREditDate").val(records.rows[0]['reviewDate']);
        if (records.rows[0]['hasRating'] == "true") {
            $("#GREditWantRatings").prop("checked", true);
            $("#GREditFoodQuality").val(records.rows[0]['rating1']);
            $("#GREditService").val(records.rows[0]['rating2']);
            $("#GREditValue").val(records.rows[0]['rating3']);
            $("#GREditOverallRating").val(calculateOverallRating(records.rows[0]['rating1'],
                    records.rows[0]['rating2'], records.rows[0]['rating3']) + " %");
            $("#GREditRatings").show();
        } else {
            $("#GREditWantRatings").prop("checked", false);
            $("#GREditFoodQuality").val(0);
            $("#GREditService").val(0);
            $("#GREditValue").val(0);
            $("#GREditOverallRating").val(null);
            $("#GREditRatings").hide();
        }
        $("#GREditForm :checkbox").checkboxradio("refresh");
    }
}

function GRupdateFeedback() {
    if (doValidateGREditForm()) {
        var options = [$("#GREditBusinessName").val(), $("#GREditType").val(), $("#GREditEmail").val(),
            $("#GREditComment").val(), $("#GREditDate").val(), $("#GREditWantRatings").prop("checked")];
        if ($("#GREditWantRatings").prop("checked")) {
            options.push($("#GREditFoodQuality").val());
            options.push($("#GREditService").val());
            options.push($("#GREditValue").val());
        } else {
            for (var i = 0; i < NULL_NUMBER; i++) {
                options.push(null);
            }
        }
        options.push(localStorage.getItem("id"));
        Review.GRUpdate(options);
        alert("Feedback Updated Successfully.");
        $(location).prop("href", "#GRViewFeedbackPage");
    }
}

function GRdeleteFeedback() {
    Review.GRDelete([localStorage.getItem("id")]);
    alert("Feedback Deleted Successfully.");
    $(location).prop("href", "#GRViewFeedbackPage");
}

function GRclearDatabase() {
    DB.GRDropTables();
    alert("Database cleared.");
}