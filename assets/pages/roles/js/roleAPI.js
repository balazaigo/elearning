//  Get Roles - For Role List Page
function getRoles() {
  $("#role-loader").css("display", "block");
  $("#rolebox").css("display", "none");
  axios
    .get(`${API_BASE_URL}/roles/`)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        renderRoleList(res.data);
      }
    })
    .catch((error) => {
      console.error("There was an error!", error.response);
    })
    .finally(() => {
      $("#role-loader").css("display", "none");
      $("#rolebox").css("display", "flex");
    });
}

function renderRoleList(roles) {
  let html = "";
  $.each(roles, function (index, role) {
    var dots = "";
    if(role.description.length > 75){
      dots = "...";
    }
    html += `<div class="col-md-4">`;
    html += `<div class="role-content mb-4">`;
    html += `<h4 data-flinkto="userroles">${role.name}</h4>`;
    html += `<p>${role.description.substring(0, 75)+dots}</p>`;
    if(role.rights.length > 0){
      html += `<div class="member_rights"><span>Rights</span><ul class="list-unstyled">`;
      $.each(role.rights, function (index_rights, role_rights) {
        html += `<li class="d-inline"><i class="far fa-check-square"></i> ${role_rights.name}</li>`;
      });
      html += `</ul></div>`;
    }
    /*html += `<div class="members">
      <span><img src="../assets/images/member1.png"></span>
      <span><img src="../assets/images/member2.png"></span>
      <span><img src="../assets/images/member3.png"></span>
      <span><img src="../assets/images/member4.png"></span>
      <span><img src="../assets/images/member5.png"></span>
      <span class="mlast">+6</span>
      </div>`;*/
    html += `</div>`;
    html += `</div>`;
  });

  $("#rolebox").html(html);
}

//  Get Role Rights - For Role Create
function getRoleRights() {
  axios
    .get(`${API_BASE_URL}/rights/`)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        renderRoleRights(res.data);
      }
    })
    .catch((error) => {
      console.error("There was an error!", error.response);
    });
}

function renderRoleRights(roleRights) {
  let html = "";

  $.each(roleRights, function (index, right) {
    html += `<div class="role-add">
      <span>
        <label class="switch">
          <input
            type="checkbox"
            name="rights_id[]"
            value="${right.id}"
            id="switchon"
          />
          <div class="switch--toggle"></div>
        </label>
      </span>
      <span> ${right.name} </span>
    </div>`;
  });

  $(".role-rights").html(html);
}

//Save Role
function saveRole(data) {
  axios
    .post(`${API_BASE_URL}/roles/`, data)
    .then((response) => {
      getRolesPage();
    })
    .catch((error) => {
      // console.error("There was an error!", error.response);
      const fieldValidationErrors = error?.response?.data;
      if (fieldValidationErrors?.name?.[0]) {
        const nameError = fieldValidationErrors.name[0];
        $("#role-name").after(`<span class='field-error'>${nameError}</span>`);
      }
    });
}
