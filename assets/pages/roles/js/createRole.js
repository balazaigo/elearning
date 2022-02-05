//Open Role Create Form
$(document).on("click", "#trigger-role-create-form", function () {
  if(processRights("Add/Edit Role") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  getRoleRights();
  $("#role-create-form-container").css({ visibility: "visible", opacity: 1 });
});

//Cancel(Hide) Role Create Form
$(document).on("click", ".cancel-role-create-form", function () {
  resetFormValues("#role-create-form");
  resetFormErrors("#role-create-form");

  $("#role-create-form-container").css({ visibility: "hidden", opacity: 0 });
});

//Create Form - Save Role
$(document).on("submit", "#role-create-form", function (e) {
  e.preventDefault();

  resetFormErrors("#role-create-form");

  const form = $(this);
  const formInputs = form.serializeArray();

  let formHasError = false;

  let formData = {
    name: "",
    description: "",
    level: "",
    status: 0,
    mc_status: 0,
    rights_id: [],
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
    const { rights_id, ...rest } = formData;
    saveRole(formData);
  }

  //   const newRole = `<div class="col-md-4"><div class="role-content mb-4"><h4>${roleName}</h4><p>${roleDescription}</p><div class="members"> <span><img src="images/member1.png" ></span><span><img src="images/member2.png" ></span><span><img src="images/member3.png" ></span><span><img src="images/member4.png" ></span> <span><img src="images/member5.png" ></span><span class="mlast">+6</span></div></div></div>`;
  //   $("#rolebox").append(newRole);
  //   //$("#role-create-form").css({ visibility: "hidden", opacity: 0 });
});

//Create Form - Validate Fields On Form Submit
function validateFields(fieldName, fieldValue) {
  let validationStatus = false;

  switch (fieldName) {
    case "name":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateRoleName(el, fieldValue);
      break;
    case "description":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateRoleDescription(el, fieldValue);
      break;
    case "level":
      var el = $(`[name='${fieldName}']`);
      validationStatus = _validateRoleLevel(el, fieldValue);
      break;
    case "rights_id":
      var el = $(`.role-rights`);
      validationStatus = _validateRoleRights(el, fieldValue);
      break;
  }

  return validationStatus;
}

//Create Form - Validate Fields On Input Change
$(document).on("input", "#role-name", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateRoleName(_this, fieldValue);
});

$(document).on("input", "#role-description", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateRoleDescription(_this, fieldValue);
});

$(document).on("change", "#role-level", function (e) {
  const _this = $(this);
  const fieldValue = _this.val();

  _validateRoleLevel(_this, fieldValue);
});

$(document).on("change", "[name='rights_id[]']", function (e) {
  if ($(this).is(":checked")) {
    const el = $(`.role-rights`);
    resetFieldError(el);
  }
});

//Validation Helpers
function _validateRoleName(el, fieldValue) {
  let errorMsg;
  let hasError = false;
  const maxLength = 64;

  resetFieldError(el);

  const regex = /^\s*$/;
  if (fieldValue && regex.test(fieldValue)) {
    errorMsg = `Blank space not allowed`;
    hasError = true;
  } else if (!fieldValue) {
    errorMsg = `Role Name is required`;
    hasError = true;
  } else if (fieldValue.length > maxLength) {
    errorMsg = `Role Name should not exceed ${maxLength} characters`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  if (hasError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateRoleDescription(el, fieldValue) {
  let errorMsg;
  let hasError = false;
  const maxLength = 256;

  resetFieldError(el);

  const regex = /^\s*$/;
  if (fieldValue && regex.test(fieldValue)) {
    errorMsg = `Blank space not allowed`;
    hasError = true;
  } else if (!fieldValue) {
    errorMsg = `Role Description is required`;
    hasError = true;
  } else if (fieldValue.length > maxLength) {
    errorMsg = `Role Description should not exceed ${maxLength} characters`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  if (hasError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateRoleLevel(el, fieldValue) {
  let errorMsg;
  let hasError = false;

  resetFieldError(el);

  if (!fieldValue) {
    errorMsg = `Role Level is required`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  if (hasError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}

function _validateRoleRights(el, fieldValue) {
  let errorMsg;
  let hasError = false;

  resetFieldError(el);

  if (fieldValue.length === 0) {
    errorMsg = `Minimum one right should be assigned to a role`;
    hasError = true;
  } else {
    errorMsg = "";
    hasError = false;
  }

  if (hasError) {
    el.after(`<span class='field-error'>${errorMsg}</span>`);
  }

  return hasError;
}
