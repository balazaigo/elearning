//  Get Roles - For Role List Page
function getRoles() {
  $("#role-loader").css("display", "block");
  $("#rolebox").css("display", "none");
  axios
    .get(`${API_BASE_URL}/roles/`,{
      headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
    })
    .then((res) => {
      renderRoleList(res.data);
    })
    .catch((error) => {
      var res = error.response;
      if(res.status == 403) {
        toastr.error(res.data.detail);
        get403Page();
      } else {
        console.error("There was an error!", error.response);
      }
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
    //<span>Member:<span class="icon_counts"> ${role.member_count}</span></span>
    //<button class="btn dropdown-toggle dbtn" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3"><li><a class="dropdown-item green" href="#" data-role_id="${role.id}" id="trigger-role-edit-form">Edit</a></li></ul>
    html += `<div class="col-md-4">`;
    html += `<div class="role-content mb-4">`;
    if(role.member_count > 0){
      html_member = `<span><a id="role_member_count" data-flinkto="userroles" data-target="${role.id}"><span data-flinkto="userroles" data-target="${role.id}">Members :</span>${role.member_count}</a></span>`;
    }else{
      html_member = `<span><a id="role_member_count"><span>Members :</span> ${role.member_count}</a></span>`;
    }
    html += `<div class="row">
                <div class="col-8 cleft tbtn" > <h4 data-role_id="${role.id}" id="trigger-role-edit-form" class="clr-orng">${role.name}</h4></div>
                <div class="col-4 cright">
                  <div class="dropdown ahide">
                    ${html_member}
                  </div>
                </div>
              </div>`;
    html += `<p>${role.description.substring(0, 75)+dots}</p>`;
    /*
    // ******************************************** /
    // Commnet out for later use
    // ******************************************** /
    */
    if(role.rights.length > 0){
      html += `<div class="member_rights"><span class="clr-orng">Rights</span><ul class="list-unstyled italic-style">`;
      $.each(role.rights, function (index_rights, role_rights) {
        html += `<li class="d-inline"><i class="fas fa-check"></i> <em>${role_rights.name}</em></li>`;
      });
      html += `</ul></div>`;
    }
    
    html += `<div class="members">`;
    if(role.m_images.length > 0){
        $.each(role.m_images, function (index_images, role_images) {
          if(index_images < 5){
            html += `<span><img src="${API_BASE_URL}${role_images}"></span>`;
          }
        });
    }else{
            html += `<span><img src=""></span>`;
    }
    if(role.m_images.length > 5){

      html += `<span class="mlast">+${role.m_images.length - 5}</span>`;
    }
    /*html += `<div class="members">;
      html += `<span><img src="../assets/images/member1.png"></span>
      <span><img src="../assets/images/member2.png"></span>
      <span><img src="../assets/images/member3.png"></span>
      <span><img src="../assets/images/member4.png"></span>
      <span><img src="../assets/images/member5.png"></span>
      <span class="mlast">+6</span>`;
     html += `</div>`;*/
    html += `</div>`;
    html += `</div>`;
    html += `</div>`;
  });

  $("#rolebox").html(html);
}

//  Get Role Rights - For Role Create
function getRoleRights() {
  axios
    .get(`${API_BASE_URL}/rights/`,{
      headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
    })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        renderRoleRights(res.data);
      }
    })
    .catch((error) => {
      var res = error.response;
      if(res.status == 403) {
        toastr.error(res.data.detail);
      } else {
        console.error("There was an error!", error.response);
      }
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
function saveRole(data, role_id) {
  if(role_id != ""){
    axios
    .put(`${API_BASE_URL}/roles/`+role_id+`/`, data,{
      headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
    })
    .then((response) => {
      getRolesPage();
    })
    .catch((error) => {
      var res = error.response;
      if(res.status == 403) {
        toastr.error(res.data.detail);
      } else {
        console.error("There was an error!", error.response);
      }
      // console.error("There was an error!", error.response);
      const fieldValidationErrors = error?.response?.data;
      if (fieldValidationErrors?.name?.[0]) {
        const nameError = fieldValidationErrors.name[0];
        $("#role-name").after(`<span class='field-error'>${nameError}</span>`);
      }
    });
  }else{
  axios
    .post(`${API_BASE_URL}/roles/`, data,{
      headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
    })
    .then((response) => {
      getRolesPage();
    })
    .catch((error) => {
      var res = error.response;
      if(res.status == 403) {
        toastr.error(res.data.detail);
      } else {
        console.error("There was an error!", error.response);
      }
      // console.error("There was an error!", error.response);
      const fieldValidationErrors = error?.response?.data;
      if (fieldValidationErrors?.name?.[0]) {
        const nameError = fieldValidationErrors.name[0];
        $("#role-name").after(`<span class='field-error'>${nameError}</span>`);
      }
    });
  }
}
