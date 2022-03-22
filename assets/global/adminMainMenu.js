var selectedRoleID = '';
async function getTestPage() {
  fetch(`${SITE_URL_PROTOCOL}/assets/pages/testPage/index.html`)
    .then((data) => data.text())
    .then((html) => (document.getElementById("app-admin").innerHTML = html))
    .then(() => {
      //for API
      // getTestPageData();
    })
    .catch(function (error) {
      console.log("Requestfailed", error);
    });
}

async function getDashboardPage() {
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/dashboard/dashboard.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getRolesPage() {
  //check for rights
  if(processRights("View Role") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/roles/roles.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        getRoles();
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getRolesEmptyPage() {
  if(processRights("View Role") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/roles/rolesempty.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getUserRolesPage(roleID) {
  if(typeof(roleID) !== "undefined") {
    window.selectedRoleID = roleID;
  }
  if(processRights("View Member") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/members/members.html?t=` + Math.floor(Date.now() / 1000),
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getUserRolesProfilePage() {
  if(processRights("profile") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/roles/userrolesprofile.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesEmptyPage() {
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/coursesempty.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesListPage() {
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslist.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesListInnerPage(e) {
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistinner.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        $.getScript(`${SITE_URL_PROTOCOL}/assets/global/custom.js`, function() {});
        var course_flinkto_elem = document.querySelectorAll("[data-flinkto='course'], [data-flinkto='courseslistlevel'], [data-flinkto='courseslistinner']");
        course_flinkto_elem.forEach(el=>{
          el.setAttribute("data-cid", e.target.dataset.cid);
          el.setAttribute("data-cname", e.target.dataset.cname);
        });
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesListLevelPage(e) {
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistlevel.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var course_flinkto_elem = document.querySelectorAll("[data-flinkto='course'], [data-flinkto='courseslistlevel'], [data-flinkto='courseslistinner'], [data-flinkto='courseseditor']");
        course_flinkto_elem.forEach(el=>{
          el.setAttribute("data-cid", e.target.dataset.cid);
          el.setAttribute("data-module_id", e.target.dataset.module_id);
          el.setAttribute("data-mod_type", e.target.dataset.mod_type);
          el.setAttribute("data-can_edit", e.target.dataset.can_edit);
          el.setAttribute("data-case_id", e.target.dataset.case_id);
          el.setAttribute("data-case_module_id", e.target.dataset.case_module_id);
          el.setAttribute("data-chapter_id", e.target.dataset.chapter_id);
          el.setAttribute("data-chapter_topic_id", e.target.dataset.chapter_topic_id);
        });
        $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistlevel.js`, function() {}); 
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesEditorPage(e) {
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseseditor.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var course_flinkto_elem = document.querySelectorAll("[data-flinkto='course'], [data-flinkto='courseslistlevel'], [data-flinkto='courseslistinner'], [data-flinkto='courseseditor']");
        course_flinkto_elem.forEach(el=>{
          el.setAttribute("data-cid", e.target.dataset.cid);
          el.setAttribute("data-module_id", e.target.dataset.module_id);
        });
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getTaskPage() {
  if(processRights("task") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/task/task.html?t=` + Math.floor(Date.now() / 1000),
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getTaskCalendarPage() {
  if(processRights("task") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/task/taskcalendar.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getMembersPage() {
  if(processRights("View Member") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/members/members.html?t=` + Math.floor(Date.now() / 1000),
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        // getMembers();
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getMembersTabPage() {
  if(processRights("View Member") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/members/memberstab.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getUserMemberProfilePage() {
  if(processRights("View Member") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/members/usermemberprofile.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}



/***************new course card and list starts*****************/
async function getCoursesPage() {
  /*
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
  */
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courses.html?t=` + Math.floor(Date.now() / 1000),
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/courses/courses.js`, function() {});        
      } else {
        console.log("Something error happend");
      }
    }
  );
}

/*************** Get Cource Page Starts Here********************/
async function getCoursePage(e) {
  document.getElementById("app-admin").innerHTML = '<div class="row loader" id="role-loader"><span>Loading Course Module</span></div>';
  //var cname = e.target.dataset.cname.length > 30 ? e.target.dataset.cname.substring(0,30)+"..." : e.target.dataset.cname;
  var course_popup = '<div class="modal fade" id="popup_course_icon" data-bs-backdrop="static">';
  course_popup += '<div class="modal-dialog modal-lg">';
  course_popup += '<div class="modal-content" id="content-courseModule"></div>';
  course_popup += '</div>';
  course_popup += `</div>
                  <div id="desktop_preview" class="overlay">
                    <div class="popup extra-popup p-0" style="width:88% !important;"> <a class="close" href="#" id="desktop-preview-close">&times;</a>
                      <input type="hidden" id="dp_course_id" value="${e.target.dataset.cid}">
                      <div id="dp_courseData"></div>
                    </div>
                  </div>
                  <div id="mobile_preview" class="overlay">
                    <div class="popup extra-popup p-0" style="width:25% !important;"> <a class="close" href="#" id="mobile-preview-close">&times;</a>
                      <input type="hidden" id="dp_course_id" value="${e.target.dataset.cid}">
                      <div id="mp_courseData"></div>
                    </div>
                  </div>`;
  var parent_div = $("<div class='row'></div>");
  var newDIV = $("<div class='col-lg-12 col-md-12 course' id='course_box'></div>");
  var outerHtml = '';
  //var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/nested2.json`;
  var url = API_CONTENT_URL + `/course_module/?course_id=`+e.target.dataset.cid;
  fetch(url, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
  })
  .then((response) => response.json())
  .then((data) => {
    get_list( data.children, newDIV, 1);
    //newDiv2 = $("<div class='module module_"+(data.children.length+Number(1))+" main_mod_empty no_child ui-droppable' style='margin-bottom:0px;'></div>");
    /*newUl2 = $("<ul class='main_module module_opacity'>");
    newUl2.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
    newUl2.append("<li class='expand_img_icon  disp_in_block flt_left'><img src='../assets/images/arrow_up_icon.png' class='expand_icon' onclick='toggle_collapse_expand(this);'></li>");
    newUl2.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='' onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);'  id='module_module_"+(data.children.length+Number(1))+"' data-prev_val='Add Module Name'>Add Module Name</p></li>");
    newUl2.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green'>Edit</a></li><li><a data-bs-toggle='modal' data-bs-target='#mAlert' class='dropdown-item red' onClick='delete_module_confirm(this)'>Delete</a></li></ul></li>");
    newUl2.append("<li class='progress_btn disp_in_block flt_right'><p class='status_new'>New</p></li>");
    newUl2.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)'></li>");
    newUl2.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)'></li>");
    newUl2.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)'></li>");
    newUl2.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub(this);'></li>");
    newUl2.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag'></li>");*/
    //newUl2 = $("<ul class='level-top drag_drop_show_hide' style='margin-bottom:0px;'></ul>");
    //newUl2.append(`<li class="dashed qa_dashed qa_droppable"><div class="ac drag_drop_qa"><span class="drag"><a href="#"><img src="../assets/images/course-icon.png" class="course_icon"></a></span><span class="para"><p class="drag_drop_qa_text">Drag and Drop Section</p></span></div></li>`);
    //newDiv2.append(newUl2);
    //newDIV.append(newDiv2);
    parent_div.append(newDIV);

    var disp_prop_mod = "display:block;";
    if(data.children.length == 0){
      disp_prop_mod = "display:none;";
    }
      var module_menu = (`<input type="hidden" id="clicked_event" value=""/>
                            <div class="col-lg-4 col-md-4" id="right_module_menu" style="display:none;">
                            <div class="recent-text white-bg br-5 p-3">
                              <h4 class="modules-head mb-4">Modules</h4>
                              <div class="row">
                                  <div class="col-md-6 mod-section">
                                      <div class="module-sec module-section">
                                          <img class="" src="../assets/images/section-icon.jpg" alt="" />
                                          <p>Section</p>
                                      </div>
                                  </div>
                                  <div class="col-md-6 mod-sub_section" style="${disp_prop_mod}">
                                      <div class="module-sec module-sub_section">
                                          <img class="" src="../assets/images/section-icon.jpg" alt="" />
                                          <p>Sub Section</p>
                                      </div>
                                  </div>
                                  <div class="col-md-6 mod-case_study" style="${disp_prop_mod}">
                                      <div class="module-sec module-case_study">
                                          <img class="" src="../assets/images/section-icon.jpg" alt="" />
                                          <p>Case Study</p>
                                      </div>
                                  </div>
                                  <div class="col-md-6 mod-module" style="${disp_prop_mod}">
                                      <div class="module-sec module-module">
                                          <img class="" src="../assets/images/section-icon.jpg" alt="" />
                                          <p>Module</p>
                                      </div>
                                  </div>
                              </div>
                             
                            </div>
                          </div>`);
    /* <div class="col-md-6">
          <div class="module-sec">
              <img class="" src="../assets/images/section-icon.jpg" alt="" />
              <p>Readings</p>
          </div>
      </div>
      <div class="col-md-6">
          <div class="module-sec">
              <img class="" src="../assets/images/section-icon.jpg" alt="" />
              <p>Authors</p>
          </div>
      </div>
      <div class="col-md-6">
          <div class="module-sec">
              <img class="" src="../assets/images/section-icon.jpg" alt="" />
              <p>Resources</p>
          </div>
      </div>*/
    parent_div.append(module_menu);                          
    var outerHtml = parent_div.prop('outerHTML');
    if(outerHtml !== ''){
      var course_head = "<div class='container-fluid course_details'>";
      course_head += "<div class='wrapper'>";
      course_head += "<div class='left_icon' data-flinkto='courses'><img src='../assets/images/left_arrow.png' class='arrow_icon' data-flinkto='courses'></div>";
      course_head += "<div class='course_head'>";
      course_head += "<h4 class='header_content' id='course_header'>"+data.course_name+"<span class='header_cid'>&nbsp;&nbsp;<small>("+data.course_id_prefix+")</small></span><dfn data-info='Lorem ipsum dolor sit amet, perspiciatis consectetur dolor.'><i class='fas fa-info-circle'></i></dfn></h4>";
      course_head += "<h4 class='header_breadcrumbs'>"+data.description+"</h4>";
      course_head += "</div>";
      course_head += "<div class='course_head_right'>";
      course_head += `<h4 class='header_breadcrumbs'><div class='col-6 cleft tbtn course_header_box'><img src='../assets/images/desktop_preview.png' onclick="moduleDesktopPreview('${e.target.dataset.cid}');"/> <img src='../assets/images/mobile_preview.png' onClick="moduleMobilePreview('${e.target.dataset.cid}');"/></div></h4>`;
      course_head += "<div class='header_breadcrumbs' style='margin-top:-3px;display: inline-block;width:100%;'><div class='start_date_chead'><span class='percent-label'>Start Date:</span><span class='course_head_date'> "+data.start_date+"</span></div>&nbsp;&nbsp;<div class='end_date_chead'><span class='percent-label'>End Date:</span><span class='course_head_date'> "+data.end_date+"</span></div></div>";
      course_head += "</div>";
      course_head += "<input type='hidden' value='"+e.target.dataset.cid+"' name='course_id' id='course_id' data-flinkto='course' data-cid='"+e.target.dataset.cid+"' data-cname='"+data.course_name+"'>";
      course_head += "</div></div>";
      course_head += "</div>";
      course_footer = `<div id="mAlert" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mAlertCenterTitle" aria-hidden="true">
                              <div class="modal-dialog modal-confirm">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h6 class="modal-title"><span id="mAlertName"></span></h6>
                                    <a class="close" data-bs-dismiss="modal">×</a>
                                  </div>
                                  <div class="modal-body text-center">
                                    <div class="col-md-12 text-center mb-2"> <img src="../assets/images/delete.png" alt="Delete"> </div>
                                    <input type="hidden" id="mAlertURL" value="" />
                                    <p>Are you sure you want to delete it?</p>
                                  </div>
                                  <div class="modal-footer justify-content-center">
                                    <span class="dborder-btn nbtn">
                                      <button type="button" id="mAlertCancel" class="btn btn-default" data-bs-dismiss="modal">Cancel</button>
                                    </span>
                                    <span class="danger-btn nbtn">
                                      <button type="button" id="mAlertDelete" class="btn btn-danger" data-cid="" data-module_id="">Yes Delete</button>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>`;
      //getcoursesPageHtml(course_head, outerHtml);
      document.getElementById("app-admin").innerHTML = course_head+outerHtml+course_popup+course_footer;
      //var cname = data.course_name.length > 30 ? data.course_name.substring(0,30)+"..." : data.course_name;
      //var cname = data.course_name;
      //document.getElementById("course_header").innerHTML = cname+"<dfn data-info='Lorem ipsum dolor sit amet, perspiciatis consectetur dolor.'><i class='fas fa-info-circle'></i></dfn>";
      $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/course/course.js`, function() {});
    }
  })
  .catch(function(error){
    console.log("Requestfailed", error);
  });
}
/**********Get Cource Page Ends Here**************/

// async function getcoursesPageHtml(course_head, outerHtml){
//   fetch(`${SITE_URL_PROTOCOL}/assets/pages/course/course.html`)
//     .then((data) => data.text())
//     .then((html) => (document.getElementById("app-admin").innerHTML = course_head+html + outerHtml))
//     .catch(function (error) {
//       console.log("Requestfailed", error);
//     });
// }

/***************Course Modules Get Json and assign Tree structured format and Design Starts Here*************/
function get_list( a, $parent , level_count_inc) {
  var levels = '';
  var newDIV = $("<div></div>");
  for (var i = 0; i < a.length; i++) {
      if (a[i]) {
          var level_count = 0;
          if(a[i].parent_id == null){
            var status_class = "";
            var status_text = "";
            if(a[i].status == 0){
              status_class = "status_new";
              status_text = "New";
            }else if(a[i].status == 1){
              status_class = "status_inprogress";
              status_text = "In Progress";
            }else if(a[i].status == 2){
              status_class = "status_onhold";
              status_text = "On Hold";
            }else if(a[i].status == 3){
              status_class = "status_completed";
              status_text = "Completed";
            }
            var n = a[i].module_name;

            var dots = "";
            if(a[i].module_name.length > 75){
                dots = "...";
            }
            var input_value_substr = a[i].module_name.substring(0, 75)+dots;
            var input_value = a[i].module_name;
            var prevent_click = "";
            if(a[i].can_access == false){
              prevent_click = "pointer-events:none;";
            }
            var style_none = "display:none;";
            var style_block = "display:block;";
            var has_child = "no_child";
            var delete_style = "display:block;";
            if (a[i].children.length > 0){
              has_child = "has_child";
            }
            var edit_icon_img = ``;
            if(!a[i].case_id && !a[i].chapter_id){
              edit_icon_img = `<img src='../assets/images/pen-edit.jpg' onclick='toinput(this);'>`;
            }
            //var three
            if(a[i].chapter_id && a[i].is_case_delete == false && a[i].is_module_delete == false){

            }
            var delete_prevent_click = "";
            if(a[i].case_id && a[i].is_case_delete == false){
              delete_prevent_click = "pointer-events:none;";
            }
            if(a[i].chapter_id && a[i].is_module_delete == false){
              delete_prevent_click = "pointer-events:none;";
              delete_style = "display:none;";
            }
            if(a[i].case_id && a[i].is_case_delete == false && a[i].is_module_delete == false){
              delete_prevent_click = "pointer-events:none;";
              delete_style = "display:none;";
            }
            if(a[i].is_module_delete == true){
              delete_prevent_click = "pointer-events:unset;";
            }
            if(a[i].case_id && a[i].is_case_delete == true){
                var delete_case = "<li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm_cases(this)'>Delete Case Study</a></li><li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm(this)'>Delete</a></li>";
            }else{
              if(a[i].is_module_delete == true){
                var delete_case = "<li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].case_module_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm_chapters(this)'>Delete Chapters</a></li>";
              }else{
                var delete_case = "<li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm(this)'>Delete</a></li>";
              }
            }
            /*var chapter_id = chapter_topic_id = "";
            if(a[i].chapter_id){
              chapter_id = a[i].chapter_id;
              chapter_topic_id = a[i].chapter_topic_id;
            }*/
            var cid = a[i].course_id;
            var module_id = a[i].module_id;
            var mod_type = "course";
            var can_edit = "true"; 
            if(a[i].case_id && a[i].is_case_delete == false){
              cid = a[i].case_id;
              module_id = a[i].case_module_id;
              mod_type = "case";
              can_edit = "false"; 
            }
            if(a[i].chapter_id && a[i].is_chapter_delete == false){
              cid = a[i].chapter_id;
              module_id = a[i].chapter_topic_id; 
              mod_type = "chapter";
              can_edit = "false"; 
            }
            newDIV = $("<div class='module module_"+level_count_inc+" main_mod "+has_child+" draggable' id='"+a[i].level+"' data-unique_id='module_"+level_count_inc+a[i].module_id+"' data-unique_case_id='"+a[i].case_id+"' draggable='true' data-module_id='"+a[i].module_id+"' data-is_case_delete='"+a[i].is_case_delete+"' data-is_module_delete='"+a[i].is_module_delete+"' data-unique_chapter_id='"+a[i].chapter_id+"'  data-unique_chapter_topic_id='"+a[i].chapter_topic_id+"'></div>");
            newUl = $("<ul class='main_module module_opacity draggable ui-droppable' style='opacity:1'></ul>");
            newUl.append("<li class='course_img_icon disp_in_block flt_left' style='"+prevent_click+"'><img src='../assets/images/course-icon.png' class='course_icon'></li>");

            if(a[i].is_qa == true){
              newUl.append("<li class='course_img_icon disp_in_block flt_left' style='"+prevent_click+"'><img src='../assets/images/pad.jpg' class='expand_icon' data-flinkto='course_knowledgecheck' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' data-case_name='"+a[i].modue_name+"' data-case_module_name='"+input_value+"'></li>");
              newUl.append("<li class='module_input disp_in_block flt_left' style='"+prevent_click+"'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256'  data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><p data-flinkto='course_knowledgecheck' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' data-chapter_id='"+a[i].chapter_id+"' data-chapter_topic_id='"+a[i].chapter_topic_id+"' id='module_module_"+level_count_inc+"' data-prev_val='"+input_value+"' data-mod_type='"+mod_type+"' data-can_edit='"+can_edit+"' data-case_name='"+a[i].modue_name+"' data-case_module_name='"+input_value+"'>"+input_value_substr+edit_icon_img+"</p></li>");
            }else{
              newUl.append("<li class='module_input disp_in_block flt_left' style='"+prevent_click+"'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256'  data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><p data-flinkto='courseslistlevel' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].case_module_id+"' data-case_id='"+a[i].case_id+"' data-chapter_id='"+a[i].chapter_id+"' data-chapter_topic_id='"+a[i].chapter_topic_id+"' id='module_module_"+level_count_inc+"' data-prev_val='"+input_value+"' data-mod_type='"+mod_type+"' data-can_edit='"+can_edit+"'>"+input_value_substr+edit_icon_img+"</p></li>");
            }
            if(!a[i].is_qa){
              newUl.append("<li class='expand_img_icon disp_in_block flt_right'><img src='../assets/images/arrow_up_icon.png' class='expand_icon' onclick='toggle_collapse_expand(this);'></li>");
              newUl.append("<li class='elipsis_img_icon disp_in_block flt_right' style='"+prevent_click+style_none+"'><img src='../assets/images/elipsis.png' class='elipsis_icon' onclick='hide_show_container(this);'></li>");
              newUl.append(`<li class='dots_img_icon disp_in_block flt_right' style='${prevent_click}${delete_style}'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false' style='${delete_prevent_click}'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'>${delete_case}</ul></li>`);
              //newUl.append("<li class='progress_btn disp_in_block flt_right' style='"+prevent_click+"'><p class='"+status_class+"'>"+status_text+"</p></li>");
              if(a[i].attachment_count > 0){
                newUl.append("<li class='attach_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].attachment_count+"</span></li>");
              }else{
                newUl.append("<li class='attach_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              }
              if(a[i].comment_count > 0){
                newUl.append("<li class='message_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].comment_count+"</span></li>");
              }else{
                newUl.append("<li class='message_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              }
              if(a[i].assign_count > 0){
                newUl.append("<li class='user_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].assign_count+"</span></li></li>");
              }else{
                newUl.append("<li class='user_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li></li>");
              }
              newUl.append("<li class='frame_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              if(a[i].chapter_id && a[i].can_access == true){
                prevent_click = "pointer-events:unset;";
              }
              newUl.append(`<li class='plus_img_icon disp_in_block flt_right' style='${prevent_click}${style_block}'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick="add_module(this, 'module_${level_count_inc}${a[i].module_id}', 'sub');"></li>`);
            }
          }else{
                var class_name = $parent.parent().prop('className').split(" ");
                var first_five_char_class = class_name[1].substring(0,5);
                if(first_five_char_class === "modul"){
                  var levels = a[i].level;
                }else{
                  var levels = $parent.parent().attr('id')+"."+a[i].level;
                }
                var status_class = "";
                var status_text = "";
                if(a[i].status == 0){
                  status_class = "status_new";
                  status_text = "New";
                }else if(a[i].status == 1){
                  status_class = "status_inprogress";
                  status_text = "In Progress";
                }else if(a[i].status == 2){
                  status_class = "status_onhold";
                  status_text = "On Hold";
                }else if(a[i].status == 3){
                  status_class = "status_completed";
                  status_text = "Completed";
                }
              var n = a[i].module_name;
              var dots = "";
              if(a[i].module_name.length > 75){
                  dots = "...";
              }
              var input_value_substr = a[i].module_name.substring(0, 75)+dots;
              var input_value = a[i].module_name
              var prevent_click = "";
              if(a[i].can_access == false){
                prevent_click = "pointer-events:none;";
              }
              var style_none = "display:none;";
              var style_block = "display:block;";
              var delete_style = "display:block;";
              var has_child = "no_child";
              if (a[i].children.length > 0){
                has_child = "has_child";
              }
              var edit_icon_img = ``;
              if(!a[i].case_id && !a[i].chapter_id){
                edit_icon_img = `<img src='../assets/images/pen-edit.jpg' onclick='toinput(this);'>`;
              }
              var delete_prevent_click = "";
              if(a[i].case_id && a[i].is_case_delete == false){
                delete_prevent_click = "pointer-events:none;";
              }
              if(a[i].chapter_id && a[i].is_module_delete == false){
                delete_prevent_click = "pointer-events:none;";
                delete_style = "display:none;";
              }
              if(a[i].case_id && a[i].is_case_delete == false && a[i].is_module_delete == false){
                delete_prevent_click = "pointer-events:none;";
                delete_style = "display:none;";
              }
              if(a[i].is_module_delete == true){
                delete_prevent_click = "pointer-events:unset;";
              }
              if(a[i].case_id && a[i].is_case_delete == true){
                  var delete_case = "<li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm_cases(this)'>Delete Case Study</a></li><li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm(this)'>Delete</a></li>";
              }else{
                if(a[i].is_module_delete == true){
                  var delete_case = "<li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].case_module_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm_chapters(this)'>Delete Chapters</a></li>";
                }else{
                  var delete_case = "<li><a data-bs-toggle='modal' data-bs-target='#mAlert' data-name='"+input_value+"' data-cid='"+a[i].course_id+"'  data-module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' class='dropdown-item red' onClick='delete_module_confirm(this)'>Delete</a></li>";
                }
              }
              /*var chapter_id = chapter_topic_id = "";
              if(a[i].chapter_id){
                chapter_id = a[i].chapter_id;
                chapter_topic_id = a[i].chapter_topic_id;
              }*/
              var cid = a[i].course_id;
              var module_id = a[i].module_id;
              var mod_type = "course";
              var can_edit = "true"; 
              if(a[i].case_id && a[i].is_case_delete == false){
                cid = a[i].case_id;
                //module_id = a[i].case_module_id;
                mod_type = "case";
                can_edit = "false"; 
              }
              if(a[i].chapter_id && a[i].is_module_delete == false){
                cid = a[i].chapter_id;
                module_id = a[i].chapter_topic_id; 
                mod_type = "chapter";
                can_edit = "false"; 
              }
              newDIV = $("<div class='module sub_module_"+levels+" sub_"+levels+" module_"+(level_count_inc - 1)+" "+has_child+" disp_block sub_mods' id='"+levels+"' data-unique_id='sub_module_"+levels+a[i].module_id+"' data-module_id='"+a[i].module_id+"' data-unique_case_id='"+a[i].case_id+"' data-is_case_delete='"+a[i].is_case_delete+"' data-is_module_delete='"+a[i].is_module_delete+"' data-unique_chapter_id='"+a[i].chapter_id+"'  data-unique_chapter_topic_id='"+a[i].chapter_topic_id+"'>");
              newUl = $("<ul class='sub_module draggable ui-droppable'></ul>");

              newUl.append("<li class='course_img_icon disp_in_block flt_left' style='"+prevent_click+"'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
              if(a[i].is_qa == true){
                newUl.append("<li class='course_img_icon disp_in_block flt_left' style='"+prevent_click+"'><img src='../assets/images/pad.jpg' class='expand_icon' data-flinkto='course_knowledgecheck' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' data-case_name='"+a[i].modue_name+"' data-case_module_name='"+input_value+"'></li>");
                newUl.append("<li class='module_input disp_in_block flt_left' style='"+prevent_click+"'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256'  data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><p data-flinkto='course_knowledgecheck' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"' data-case_module_id='"+a[i].module_id+"' data-case_id='"+a[i].case_id+"' data-chapter_id='"+a[i].chapter_id+"' data-chapter_topic_id='"+a[i].chapter_topic_id+"' id='module_module_"+level_count_inc+"' data-prev_val='"+input_value+"' data-mod_type='"+mod_type+"' data-can_edit='"+can_edit+"' data-case_name='"+a[i].modue_name+"' data-case_module_name='"+input_value+"'>"+input_value_substr+edit_icon_img+"</p></li>");
              }else{
              newUl.append("<li class='module_input disp_in_block flt_left' style='"+prevent_click+"'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><p data-flinkto='courseslistlevel' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'  data-case_module_id='"+a[i].case_module_id+"' data-case_id='"+a[i].case_id+"' data-chapter_id='"+a[i].chapter_id+"' data-chapter_topic_id='"+a[i].chapter_topic_id+"'id='sub_"+levels+"_module_"+(level_count_inc - 1)+"' data-prev_val='"+input_value+"' data-mod_type='"+mod_type+"' data-can_edit='"+can_edit+"'>"+input_value_substr+edit_icon_img+"</p></li>");
              }
              if(!a[i].is_qa){
                newUl.append("<li class='expand_img_icon disp_in_block flt_right'><img src='../assets/images/arrow_up_icon.png' class='expand_icon' onclick='toggle_collapse_expand(this);'></li>");
                newUl.append("<li class='elipsis_img_icon disp_in_block flt_right' style='"+prevent_click+style_none+"'><img src='../assets/images/elipsis.png' class='elipsis_icon' onclick='hide_show_container(this);'></li>");
                newUl.append(`<li class='dots_img_icon disp_in_block flt_right' style='${prevent_click}${delete_style}'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false' style='${delete_prevent_click}'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'>${delete_case}</ul></li>`);
                //newUl.append("<li class='progress_btn disp_in_block flt_right' style='"+prevent_click+"'><p class='"+status_class+"'>"+status_text+"</p></li>");
                if(a[i].attachment_count > 0){
                  newUl.append("<li class='attach_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].attachment_count+"</span></li>");
                }else{
                  newUl.append("<li class='attach_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
                }
                if(a[i].comment_count > 0){
                  newUl.append("<li class='message_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].comment_count+"</span></li>");
                }else{
                  newUl.append("<li class='message_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
                }
                if(a[i].assign_count > 0){
                  newUl.append("<li class='user_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].assign_count+"</span></li></li>");
                }else{
                  newUl.append("<li class='user_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li></li>");
                }
                newUl.append("<li class='frame_img_icon disp_in_block flt_right' style='"+prevent_click+style_block+"'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              
                if(a[i].case_id && a[i].can_access == true){
                  prevent_click = "pointer-events:unset;";
                }
                if(a[i].chapter_id && a[i].group_name){
                  var dots = "";
                  if(a[i].group_name.length > 75){
                    dots = "...";
                  }
                  //newUl.append(`<li class='progress_btn disp_in_block flt_right w-auto' style='${prevent_click}'><p class="status_inprogress">${a[i].group_name.substring(0, 75)+dots}</></li>`);
                }
                if(!a[i].chapter_id){
                  newUl.append(`<li class='plus_img_icon disp_in_block flt_right' style='${prevent_click}${style_block}'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick="add_module(this, 'sub_module_${levels}${a[i].module_id}', 'sub_sub');"></li>`);
                }
              }
          }
          if(level_count === 0){  
            newDIV.append(newUl);
            $parent.append(newDIV);

            level_count_inc++;
          }else{
            newDIV.append(newUl);
            $parent.append(newDIV);
          }
          if (a[i].children){
              get_list( a[i].children, newUl, level_count_inc);
          }
      }
    $parent.append(newDIV);
  }
}
/***************Course Modules Get Json and assign Tree structured format and Design Ends Here*************/

/***************new course card and list end*****************/

/********** Top Menu On Click Event Start **********/
//NOTE: Add "data-flinkto" to the element which we need to load page/screen
document.addEventListener("click", function (e) {
  if (e.target && e.target.dataset.flinkto) {
    if(e.target.dataset.flinkto == "course"){
      document.getElementById("app-admin").classList.add("admin_course");
    }else{
      document.getElementById("app-admin").classList.remove("admin_course");
    }
    if(e.target.dataset.flinkto == "roles" || e.target.dataset.flinkto == "courses" ){
      document.getElementById("app-admin").classList.add("set_back_color");
    }else{
      document.getElementById("app-admin").classList.remove("set_back_color");
    }
    e.preventDefault();
    handleTopMenuClick(e);
  }
});

async function get403Page() {
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/errors/error_403.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}



/**************case module start***************/
async function getCasesPage() {
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/cases/case.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCasesListPage(e) {
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/cases/caselist.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var case_flinkto_elem = document.querySelectorAll("[data-flinkto='cases'], [data-flinkto='caseslist']");
        case_flinkto_elem.forEach(el=>{
          el.setAttribute("data-case_id", e.target.dataset.case_id);
          el.setAttribute("data-case_name", e.target.dataset.case_name);
        });
      } else {
        console.log("Something error happend");
      }
    }
  );
}
async function getCasesListLevelPage(e){
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/cases/caselistlevel.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var case_flinkto_elem = document.querySelectorAll("[data-flinkto='cases'], [data-flinkto='caseslist'], [data-flinkto='caseslist']");
        case_flinkto_elem.forEach(el=>{
          el.setAttribute("data-case_id", e.target.dataset.case_id);
          el.setAttribute("data-case_module_id", e.target.dataset.case_module_id);
        });
        $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/cases/caselistlevel.js`, function() {}); 
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getChaptersPage(e) {
  /*if(processRights("chapters") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/chapters/chapters.html?t=` + Math.floor(Date.now() / 1000),
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        //console.log(e.target.dataset);
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getModulePage() {
  /*if(processRights("modules") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/modules/modules.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getModulesListPage() {
  /*if(processRights("modules") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/modules/moduleslist.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesListNewPage() {
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistnew.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getKnowledgeCheckPage(e) {
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/cases/knowledgecheck.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var case_flinkto_elem = document.querySelectorAll("[data-flinkto='caseslist']");
        case_flinkto_elem.forEach(el=>{
          el.setAttribute("data-case_id", e.target.dataset.case_id);
          el.setAttribute("data-case_name", e.target.dataset.case_name);
          el.setAttribute("data-case_module_id", e.target.dataset.case_module_id);
          el.setAttribute("data-case_module_name", e.target.dataset.case_module_name);
        });
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getChapterListPage(e) {
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/chapters/chapterslist.html?t=` + Math.floor(Date.now() / 1000),
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var case_flinkto_elem = document.querySelectorAll("[data-flinkto='chapters'], [data-flinkto='chapterslist']");
        case_flinkto_elem.forEach(el=>{
          el.setAttribute("data-chapter_id", e.target.dataset.chapter_id);
          el.setAttribute("data-chapter_name", e.target.dataset.chapter_name);
        });
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getChapterListLevelPage(e){
  /*if(processRights("case") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }*/
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/chapters/chapterlistlevel.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var case_flinkto_elem = document.querySelectorAll("[data-flinkto='chapters'], [data-flinkto='chapterslist'], [data-flinkto='chapterlistlevel']");
        case_flinkto_elem.forEach(el=>{
          el.setAttribute("data-chapter_id", e.target.dataset.chapter_id);
          el.setAttribute("data-chapter_topic_id", e.target.dataset.chapter_topic_id);
        });
        $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/chapters/chapterlistlevel.js`, function() {}); 
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCourseKnowledgecheck(e){
  
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/course_knowledge_check.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        var case_flinkto_elem = document.querySelectorAll("[data-flinkto='courseslistlevel'],[data-flinkto='course']");
        case_flinkto_elem.forEach(el=>{
          el.setAttribute("data-case_id", e.target.dataset.case_id);
          //el.setAttribute("data-case_name", e.target.dataset.case_name);
          el.setAttribute("data-cid", e.target.dataset.cid);
          el.setAttribute("data-case_module_id", e.target.dataset.case_module_id);
          el.setAttribute("data-case_module_name", e.target.dataset.case_module_name);
        });
      } else {
        console.log("Something error happend");
      }
    }
  );
}
function handleTopMenuClick(e) {
  console.log(e.target.dataset.flinkto);
  switch (e.target.dataset.flinkto) {
    case "dashboard":
      getDashboardPage();
      break;

    case "roles":
      getRolesPage();
      break;

    case "rolesempty":
      getRolesEmptyPage();
      break;

    case "userroles":
      getUserRolesPage(e.target.dataset.target);
      break;

    case "userrolesprofile":
      getUserRolesProfilePage();
      break;

    case "course":
      if(processRights("course") === false) {
        toastr.error(window.language.error_no_access);
        return false;
      }
      getCoursePage(e);
      break;

    case "courses":
      getCoursesPage();
      break;

    case "coursesempty":
      getCoursesEmptyPage();
      break;

    case "courseslist":
      getCoursesListPage();
      break;
      
     
    case "courseslistinner":
      getCoursesListInnerPage(e);
      break;

    case "courseslistlevel":
      getCoursesListLevelPage(e);
      break;
    
    case "course_knowledgecheck":
      getCourseKnowledgecheck(e);
      break;

    case "courseseditor":
      getCoursesEditorPage(e);
      break;
      
    case "courseslistnew":
        getCoursesListNewPage();
        break;
    
    case "task":
      getTaskPage();
      break;

    case "taskcalendar":
      getTaskCalendarPage();
      break;

    case "members":
      getMembersPage();
      break;

    case "usermemberprofile":
      getUserMemberProfilePage();
      break;

    case "memberstab":
      getMembersTabPage();
      break;

    case "cases":
      getCasesPage();
      break;

    case "caseslist":
      getCasesListPage(e);
      break;

    case "caselistlevel":
      getCasesListLevelPage(e);
      break;
            
    case "knowledgecheck":
        getKnowledgeCheckPage(e);
        break;  

    case "modules":
        getModulePage();
        break;  
      
    case "moduleslist":
        getModulesListPage();
        break;

    case "chapters":
        getChaptersPage(e);
        break;  

    case "chapterslist":
        getChapterListPage(e);
        break;  

    case "chapterlistlevel":
        getChapterListLevelPage(e);
        break;  

    case "settings":
        getTestPage();
        break;
    default:
  }
}
/********** Top Menu On Click Event End **********/
