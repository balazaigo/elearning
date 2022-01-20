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
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/members/members.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getUserRolesProfilePage() {
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

//async function getCoursesPage() {
//  $("#app-admin").load(
//    `${SITE_URL_PROTOCOL}/assets/pages/courses/courses.html`,
//    function (resp, status, xhr) {
//      if (status == "success" && xhr.status == 200) {
//      } else {
//        console.log("Something error happend");
//      }
//    }
//  );
//}

async function getCoursesEmptyPage() {
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
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistlevel.html`,
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

async function getCoursesEditorPage() {
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseseditor.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getTaskPage() {
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
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/members/members.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
        getMembers();
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getMembersTabPage() {
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
  var cname = e.target.dataset.cname.length > 30 ? e.target.dataset.cname.substring(0,30)+"..." : e.target.dataset.cname;
  var course_head = "<div class='container-fluid course_details'>";
  course_head += "<div class='wrapper'>";
  course_head += "<div class='left_icon' data-flinkto='courses'><img src='../assets/images/left_arrow.png' class='arrow_icon' data-flinkto='courses'></div>";
  course_head += "<div class='course_head'>";
  course_head += "<h4 class='header_content' data-flinkto='courseslistinner' data-cname='"+e.target.dataset.cname+"' data-cid='"+e.target.dataset.cid+"'>"+cname+"<dfn data-info='Lorem ipsum dolor sit amet, perspiciatis consectetur dolor.'><i class='fas fa-info-circle'></i></dfn></h4>";
  course_head += "<h4 class='header_breadcrumbs'>Breadcumbs1 / Breadcumbs2</h4>";
  course_head += "</div>";
  course_head += "<div class='save_drft_btn'>";
  course_head += "<span class='orange-btn nbtn'><a href='#add-course'>";
  course_head += "<button id='add-courses'>Save Draft</button>";
  course_head += "</a></span>";
  course_head += "</div>";
  course_head += "</div>";
  course_head += "<input type='hidden' value='"+e.target.dataset.cid+"' name='course_id' id='course_id'>";
  course_head += "</div>";
  var newDIV = $("<div class='course' id='course_box'></div>");
  var outerHtml = '';
  var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/nested2.json`;
  fetch(url, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then((response) => response.json())
  .then((data) => {
    get_list( data.children, newDIV, 1);
    newDiv2 = $("<div class='module module_"+(data.children.length+Number(1))+" main_mod_empty'></div>");
    newUl2 = $("<ul class='main_module module_opacity'>");
    newUl2.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
    newUl2.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='' onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);'  id='module_module_"+(data.children.length+Number(1))+"'>Add Module Name</p></li>");
    newUl2.append("<li class='delete_img_icon disp_in_block flt_right'><i class='far fa-trash-alt' onclick='delete_module(this);'></i></li>");
    newUl2.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>");
    newUl2.append("<li class='progress_btn disp_in_block flt_right'><p>In progress</p></li>");
    newUl2.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>");
    newUl2.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>");
    newUl2.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li>");
    newUl2.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub(this);'></li>");
    newUl2.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon'></li>");
    newDiv2.append(newUl2);
    newDIV.append(newDiv2);
    var outerHtml = newDIV.prop('outerHTML');
    if(outerHtml !== ''){
      //getcoursesPageHtml(course_head, outerHtml);
      document.getElementById("app-admin").innerHTML = course_head+outerHtml;
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
          if(level_count == 0){
            newDIV = $("<div class='module module_"+level_count_inc+" main_mod draggable' id='"+a[i].level+"' draggable='true' style='opacity:1'></div>");
            newUl = $("<ul class='main_module module_opacity' style='opacity:1'></ul>");
            newUl.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
              newUl.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value=''onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);' id='module_module_"+level_count_inc+"'>"+a[i].module_name+"</p></li>");
              newUl.append("<li class='delete_img_icon disp_in_block flt_right'><i class='far fa-trash-alt' onclick='delete_module(this);'></i></li>");
              newUl.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>");
              newUl.append("<li class='progress_btn disp_in_block flt_right'><p>In progress</p></li>");
              newUl.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>");
              newUl.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>");
              newUl.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li></li>");
              newUl.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub(this);'></li>");
              newUl.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon'></li>");
          }else{
                var class_name = $parent.parent().prop('className').split(" ");
                var first_five_char_class = class_name[1].substring(0,5);
                if(first_five_char_class === "modul"){
                  var levels = a[i].level;
                }else{
                  var levels = $parent.parent().attr('id')+"."+a[i].level;
                }
              var n = a[i].module_name.lastIndexOf('/');
              var input_value = a[i].module_name.substring(n + 1);
              newDIV = $("<div class='module sub_module_"+levels+" sub_"+levels+" module_"+(level_count_inc - 1)+" disp_none' id='"+levels+"' style='width:95%;margin-right: -2px;'>");
              newUl = $("<ul class='sub_module'></ul>");
              newUl.append("<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>");
              newUl.append("<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='"+input_value+"'onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);' id='sub_"+levels+"_module_"+(level_count_inc - 1)+"'>"+input_value+"</p></li>");
              newUl.append("<li class='delete_img_icon disp_in_block flt_right'><i class='far fa-trash-alt' onclick='delete_sub_module(this);'></i></li>");
              newUl.append("<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>");
              newUl.append("<li class='progress_btn disp_in_block flt_right'><p>In progress</p></li>");
              newUl.append("<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>");
              newUl.append("<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>");
              newUl.append("<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li>");
              newUl.append("<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub_sub(this);'></li>");
              newUl.append("<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon'></li>");
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
  }
$parent.append(newDIV);
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
      getCoursesEditorPage();
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
