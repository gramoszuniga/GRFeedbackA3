/*
 GRutil.js
 Assignment 3

 Revision History
 Gonzalo Ramos Zúñiga, 2017.02.20: Created
 */

function doValidateGRAddForm() {
    $("#GRAddForm").validate({
        rules: {
            GRAddBusinessName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            GRAddEmail: {
                required: true,
                valemail: true
            },
            GRAddDate: {
                required: true
            },
            GRAddFoodQuality: {
                valrating: true
            },
            GRAddService: {
                valrating: true
            },
            GRAddValue: {
                valrating: true
            }
        },
        messages: {
            GRAddBusinessName: {
                required: "Business Name is required.",
                minlength: "Length must be 2-20 characters long.",
                maxlength: "Length must be 2-20 characters long."
            },
            GRAddEmail: {
                required: "Reviewer Email is required.",
                valemail: "Please enter a valid e-mail address."
            },
            GRAddDate: {
                required: "Review Date is required."
            },
            GRAddFoodQuality: {
                valrating: "Value must be 0-5."
            },
            GRAddService: {
                valrating: "Value must be 0-5."
            },
            GRAddValue: {
                valrating: "Value must be 0-5."
            }
        }
    });
    return $("#GRAddForm").valid();
}

function doValidateGREditForm() {
    $("#GREditForm").validate({
        rules: {
            GREditBusinessName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            GREditEmail: {
                required: true,
                valemail: true
            },
            GREditDate: {
                required: true
            },
            GREditFoodQuality: {
                valrating: true
            },
            GREditService: {
                valrating: true
            },
            GREditValue: {
                valrating: true
            }
        },
        messages: {
            GREditBusinessName: {
                required: "Business Name is required.",
                minlength: "Length must be 2-20 characters long.",
                maxlength: "Length must be 2-20 characters long."
            },
            GREditEmail: {
                required: "Reviewer Email is required.",
                valemail: "Please enter a valid e-mail address."
            },
            GREditDate: {
                required: "Review Date is required."
            },
            GREditFoodQuality: {
                valrating: "Value must be 0-5."
            },
            GREditService: {
                valrating: "Value must be 0-5."
            },
            GREditValue: {
                valrating: "Value must be 0-5."
            }
        }
    });
    return $("#GREditForm").valid();
}

jQuery.validator.addMethod("valemail", function (value, element) {
    if (/^[a-z0-9._%+-]+\@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
        return true;
    }
    return false;
}, "Please enter a valid e-mail address.");

jQuery.validator.addMethod("valrating", function (value, element) {
    if (value > -1 && value < 6) {
        return true;
    }
    return false;
}, "Value must be 0-5.");