//Open Member Create Form
$(document).on("click", "#trigger-member-create-form", function () {
  getRolesOptions("#member-role");
  $("#member-create-form-container").css({ visibility: "visible", opacity: 1 });
});

//Cancel(Hide) Member Create Form
$(document).on("click", ".cancel-member-create-form", function () {
  resetFormValues("#member-create-form");
  resetFormErrors("#member-create-form");

  $("#member-create-form-container").css({ visibility: "hidden", opacity: 0 });
});

$(document).on("input", "#member-email", function () {
  resetFormErrors("#member-create-form");

  $("#member-fName").val("");
  $("#member-lName").val("");
  $("#member-phoneNo").val("");
  $("#member-role").val("");

  $("#member-fName").prop("disabled", true);
  $("#member-lName").prop("disabled", true);
  $("#member-phoneNo").prop("disabled", true);
  $("#member-role").prop("disabled", true);
});

$(document).on("change", "#member-email", function () {
  const el = $(`[name='email_id']`);
  const value = el.val();

  const hasEmailError = _validateMemberEmail(el, value, true);

  if (!hasEmailError) {
    $("#member-fName").val("");
    $("#member-lName").val("");
    $("#member-phoneNo").val("");
    $("#member-role").val("");

    $("#member-fName").prop("disabled", false);
    $("#member-lName").prop("disabled", false);
    $("#member-phoneNo").prop("disabled", false);
    $("#member-role").prop("disabled", false);
  }
});

//Create Form - Save Member
$(document).on("submit", "#member-create-form", function (e) {
  e.preventDefault();

  resetFormErrors("#member-create-form");

  const form = $(this);
  const formInputs = form.serializeArray();

  let formHasError = false;

  let formData = {
    email_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    roles_name: "",
    status: 0,
    mc_status: 0,
    image: "",
  };

  $.each(formInputs, function (index, fieldData) {
    if (fieldData.name.endsWith("[]")) {
      let name = fieldData.name.substring(0, fieldData.name.length - 2);
      if (!(name in formData)) {
        formData[name] = [];
      }
      formData[name].push(fieldData.value);
    } else {
      formData[fieldData.name] = fieldData.value;
    }
  });

  //Validate field on submit
  for (const [fieldName, fieldValue] of Object.entries(formData)) {
    const fieldValidationStatus = validateFields(fieldName, fieldValue);
    formHasError = formHasError || fieldValidationStatus;
  }

  //If no field error - proceed submit
  if (!formHasError) {
    console.log(formData);
  }
});

//Create Form - Validate Fields On Form Submit
function validateFields(fieldName, fieldValue) {
  let validationStatus = false;

  switch (fieldName) {
    case "email_id":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateMemberEmail(el, fieldValue, true);
      break;
    case "first_name":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateMemberFName(el, fieldValue);
      break;
    case "last_name":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateMemberLName(el, fieldValue);
      break;
    case "phone_number":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateMemberPhoneNo(el, fieldValue);
      break;
    case "roles_name":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateMemberRole(el, fieldValue);
      break;
  }

  return validationStatus;
}

//Create Form - Validate Fields On Input Change
$(document).on("input", "#member-email", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateMemberEmail(_this, fieldValue, true);
});

$(document).on("input", "#member-fName", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateMemberFName(_this, fieldValue);
});

$(document).on("input", "#member-lName", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateMemberLName(_this, fieldValue);
});

$(document).on("input", "#member-phoneNo", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateMemberPhoneNo(_this, fieldValue);
});

$(document).on("change", "#member-role", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateMemberRole(_this, fieldValue);
});

//Validation Helpers
function _validateMemberEmail(el, fieldValue, displayMsg = true) {
  let errorMsg;
  let hasError = false;

  if (displayMsg) {
    resetFieldError(el);
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!fieldValue) {
    errorMsg = `Email is required`;
    hasError = true;
  } else if (fieldValue && !regex.test(fieldValue)) {
    errorMsg = `Please enter valid email`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  if (hasError && displayMsg) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateMemberFName(el, fieldValue) {
  let errorMsg;
  let hasError = false;
  const maxLength = 64;

  resetFieldError(el);

  const regex = /^\s*$/;
  if (fieldValue && regex.test(fieldValue)) {
    errorMsg = `Blank space not allowed`;
    hasError = true;
  } else if (!fieldValue) {
    errorMsg = `First Name is required`;
    hasError = true;
  } else if (fieldValue.length > maxLength) {
    errorMsg = `First Name should not exceed ${maxLength} characters`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  const emailEl = $(`[name='email_id']`);
  const emailValue = emailEl.val();
  const hasEmailError = _validateMemberEmail(emailEl, emailValue, false);

  if (hasError && !hasEmailError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateMemberLName(el, fieldValue) {
  let errorMsg;
  let hasError = false;
  const maxLength = 64;

  resetFieldError(el);

  const regex = /^\s*$/;
  if (fieldValue && regex.test(fieldValue)) {
    errorMsg = `Blank space not allowed`;
    hasError = true;
  } else if (!fieldValue) {
    errorMsg = `Last Name is required`;
    hasError = true;
  } else if (fieldValue.length > maxLength) {
    errorMsg = `Last Name should not exceed ${maxLength} characters`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  const emailEl = $(`[name='email_id']`);
  const emailValue = emailEl.val();
  const hasEmailError = _validateMemberEmail(emailEl, emailValue, false);

  if (hasError && !hasEmailError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateMemberPhoneNo(el, fieldValue) {
  let errorMsg;
  let hasError = false;
  const minValue = 0;
  const maxValue = 9999999999;

  resetFieldError(el);

  const regex = /^\s*$/;
  if (fieldValue && regex.test(fieldValue)) {
    errorMsg = `Blank space not allowed`;
    hasError = true;
  } else if (!fieldValue) {
    errorMsg = `Phone No is required`;
    hasError = true;
  } else if (fieldValue && fieldValue < minValue) {
    errorMsg = `Phone No should not be less than ${minValue}`;
    hasError = true;
  } else if (fieldValue && fieldValue > maxValue) {
    errorMsg = `Phone No should not be greater than ${maxValue}`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  const emailEl = $(`[name='email_id']`);
  const emailValue = emailEl.val();
  const hasEmailError = _validateMemberEmail(emailEl, emailValue, false);

  if (hasError && !hasEmailError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateMemberRole(el, fieldValue) {
  let errorMsg;
  let hasError = false;

  resetFieldError(el);

  if (!fieldValue) {
    errorMsg = `Role is required`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  const emailEl = $(`[name='email_id']`);
  const emailValue = emailEl.val();
  const hasEmailError = _validateMemberEmail(emailEl, emailValue, false);

  if (hasError && !hasEmailError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}