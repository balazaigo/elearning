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
  if(processRights("role") === false) {
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
  if(processRights("role") === false) {
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

async function getUserRolesPage() {
  if(processRights("member") === false) {
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
        $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistlevel.js`, function() {}); 
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
    `${SITE_URL_PROTOCOL}/assets/pages/task/task.html`,
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
  if(processRights("member") === false) {
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
  if(processRights("member") === false) {
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
  if(processRights("member") === false) {
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
  if(processRights("course") === false) {
    toastr.error(window.language.error_no_access);
    return false;
  }
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
  //var cname = e.target.dataset.cname.length > 30 ? e.target.dataset.cname.substring(0,30)+"..." : e.target.dataset.cname;
  var course_popup = '<div class="modal fade" id="popup_course_icon" data-bs-backdrop="static">';
  course_popup += '<div class="modal-dialog modal-lg">';
  course_popup += '<div class="modal-content" id="content-courseModule"></div>';
  course_popup += '</div>';
  course_popup += '</div>';
  var newDIV = $("<div class='course' id='course_box'></div>");
  var outerHtml = '';
  //var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/nested2.json`;
  var url = `https://elearningcontent.zaigoinfotech.com/course_module/?course_id=`+e.target.dataset.cid;
  fetch(url, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
  })
  .then((response) => response.json())
  .then((data) => {
    get_list( data.children, newDIV, 1);
    newDiv2 = $("<div class='module module_"+(data.children.length+Number(1))+" main_mod_empty'></div>");
    newUl2 = $("<ul class='main_module module_opacity'>");
    newUl2.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
    newUl2.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='' onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);'  id='module_module_"+(data.children.length+Number(1))+"'>Add Module Name</p></li>");
    newUl2.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_module(this);'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>");
    newUl2.append("<li class='progress_btn disp_in_block flt_right'><p class='status_new'>New</p></li>");
    newUl2.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)'></li>");
    newUl2.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)'></li>");
    newUl2.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)'></li>");
    newUl2.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub(this);'></li>");
    newUl2.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag'></li>");
    newDiv2.append(newUl2);
    newDIV.append(newDiv2);
    var outerHtml = newDIV.prop('outerHTML');
    if(outerHtml !== ''){
      console.log(data);
      var course_head = "<div class='container-fluid course_details'>";
      course_head += "<div class='wrapper'>";
      course_head += "<div class='left_icon' data-flinkto='courses'><img src='../assets/images/left_arrow.png' class='arrow_icon' data-flinkto='courses'></div>";
      course_head += "<div class='course_head'>";
      course_head += "<h4 class='header_content' id='course_header'>"+data.course_name+"<dfn data-info='Lorem ipsum dolor sit amet, perspiciatis consectetur dolor.'><i class='fas fa-info-circle'></i></dfn></h4>";
      course_head += "<h4 class='header_breadcrumbs'>"+data.description+"</h4>";
      course_head += "</div>";
      course_head += "<div class='course_head_right'>";
      course_head += "<h4 class='header_breadcrumbs'><div class='col-6 cleft tbtn' data-flinkto='course' > <a href='#'' data-flinkto='course'>"+data.course_id_prefix+"</a> </div></h4>";
      course_head += "<div class='header_breadcrumbs'><p>Start Date:</p><span>"+data.start_date+"</span</div>";
      course_head += "</div>";
      course_head += "</div>";
      course_head += "<input type='hidden' value='"+e.target.dataset.cid+"' name='course_id' id='course_id' data-flinkto='course' data-cid='"+e.target.dataset.cid+"' data-cname='"+data.course_name+"'>";
      course_head += "</div></div>";
      //getcoursesPageHtml(course_head, outerHtml);
      document.getElementById("app-admin").innerHTML = course_head+outerHtml+course_popup;
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
          var level_count = a[i].module_name.split("/").length - 1;
          if(a[i].parent_id == null){
            var status_class = "";
            var status_text = "";
            if(a[i].status == 0){
              status_class = "status_new";
              status_text = "New";
            }else if(a[i].status == 1){
              status_class = "status_onhold";
              status_text = "On Hold";
            }else if(a[i].status == 2){
              status_class = "status_completed";
              status_text = "Completed";
            }else if(a[i].status == 3){
              status_class = "status_inprogress";
              status_text = "In Progress";
            }
            var n = a[i].module_name.lastIndexOf('/');
            var input_value = a[i].module_name.substring(n + 1);
            newDIV = $("<div class='module module_"+level_count_inc+" main_mod draggable' id='"+a[i].level+"' draggable='true' style='opacity:1'></div>");
            newUl = $("<ul class='main_module module_opacity' style='opacity:1'></ul>");
            newUl.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
              newUl.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256'  data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><p onclick='toinput(this);' id='module_module_"+level_count_inc+"'>"+input_value+"</p></li>");
              newUl.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green' data-flinkto='courseslistlevel' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_module(this);' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>");
              newUl.append("<li class='progress_btn disp_in_block flt_right'><p class='"+status_class+"'>"+status_text+"</p></li>");
              if(a[i].attachment_count > 0){
                newUl.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].attachment_count+"</span></li>");
              }else{
                newUl.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              }
              if(a[i].comment_count > 0){
                newUl.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].comment_count+"</span></li>");
              }else{
                newUl.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              }
              if(a[i].assign_count > 0){
                newUl.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].assign_count+"</span></li></li>");
              }else{
                newUl.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li></li>");
              }
              newUl.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub(this);'></li>");
              newUl.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
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
                  status_class = "status_onhold";
                  status_text = "On Hold";
                }else if(a[i].status == 2){
                  status_class = "status_completed";
                  status_text = "Completed";
                }else if(a[i].status == 3){
                  status_class = "status_inprogress";
                  status_text = "In Progress";
                }
              var n = a[i].module_name.lastIndexOf('/');
              var input_value = a[i].module_name.substring(n + 1);
              newDIV = $("<div class='module sub_module_"+levels+" sub_"+levels+" module_"+(level_count_inc - 1)+" disp_block' id='"+levels+"' style='width:95%;margin-right: -2px;'>");
              newUl = $("<ul class='sub_module'></ul>");
              newUl.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
              newUl.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><p onclick='toinput(this);' id='sub_"+levels+"_module_"+(level_count_inc - 1)+"'>"+input_value+"</p></li>");
              newUl.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green' data-flinkto='courseslistlevel' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_sub_module(this);' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>");
              newUl.append("<li class='progress_btn disp_in_block flt_right'><p class='"+status_class+"'>"+status_text+"</p></li>");
              if(a[i].attachment_count > 0){
                newUl.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].attachment_count+"</span></li>");
              }else{
                newUl.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon' onclick='show_attachment_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              }
              if(a[i].comment_count > 0){
                newUl.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].comment_count+"</span></li>");
              }else{
                newUl.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon' onclick='show_message_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
              }
              if(a[i].assign_count > 0){
                newUl.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'><span class='icon_counts'>"+a[i].assign_count+"</span></li></li>");
              }else{
                newUl.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon' onclick='show_assignee_popup(this)' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li></li>");
              }
              newUl.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub_sub(this);'></li>");
              newUl.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag' data-module_id='"+a[i].module_id+"' data-cid='"+a[i].course_id+"'></li>");
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
      getUserRolesPage();
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
	  
	 case "courseseditor":
      getCoursesEditorPage(e);
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

    case "settings":
      getTestPage();
      break;
    default:
  }
}
/********** Top Menu On Click Event End **********/
