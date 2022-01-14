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

async function getCoursesListInnerPage() {
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistinner.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
      } else {
        console.log("Something error happend");
      }
    }
  );
}

async function getCoursesListLevelPage() {
  $("#app-admin").load(
    `${SITE_URL_PROTOCOL}/assets/pages/courses/courseslistlevel.html`,
    function (resp, status, xhr) {
      if (status == "success" && xhr.status == 200) {
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
  fetch(`${SITE_URL_PROTOCOL}/assets/pages/courses/courses.html`)
    .then((data) => data.text())
    .then((html) => (document.getElementById("app-admin").innerHTML = html))
    .catch(function (error) {
      console.log("Requestfailed", error);
    });
    $.getScript(`${SITE_URL_PROTOCOL}/assets/pages/courses/courses.js`, function() {
    });
}

async function getCoursePage(e) {
  console.log(e);
  if( e.target !== undefined){
  var cname = e.target.dataset.cname.length > 30 ? e.target.dataset.cname.substring(0,30)+"..." : e.target.dataset.cname;
  }
  var course_head = "<div class='container-fluid course_details'>";
    course_head += "<div class='wrapper'>";
    course_head += "<div class='left_icon'><img src='../assets/images/left_arrow.png' class='arrow_icon'></div>";
    course_head += "<div class='course_head'>";
    course_head += "<h4 data-flinkto='courseslistinner' class='header_content'>"+cname+"<dfn data-info='Lorem ipsum dolor sit amet, perspiciatis consectetur dolor.'><i class='fas fa-info-circle'></i></dfn></h4>";
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

    //var url = 'https://elearningcontent.zaigoinfotech.com/course/'+e.target.dataset.cid+'/course_module/';
    /*var url = `${SITE_URL}/assets/pages/courses/course_module.json`;
    fetch(url, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => response.json())
    .then((data) => {
      var new_data = [];
      for (let i = 0; i < data.length; i++) {
        if(data[i].module_name.indexOf('/') === -1){
          new_data.push(data[i]);
        }
      }
      console.log(new_data);
      var new_data_2 = new Array();
      for (let j = 0; j < new_data.length; j++) {
        for (let k = 0; k < data.length; k++) {
          if(data[k].module_name.indexOf('/') !== -1){
          console.log(data[k].module_name);
            var sub_module_name = (data[k].module_name).substring(0, new_data[j].module_name.length+1);
            if(new_data[j].module_name+'/' == sub_module_name){
              var str_array = data[k].module_name.split('/');
                console.log(str_array.length);
              var sting_concat = '';
              for (let l = 0; l < str_array.length; l++) {
                new_data_2[str_array[l]] = data[k];
                console.log(str_array[l]);
              }
            }
          }
        }
      }
      console.log(new_data_2);
    })
    .catch(function (error) {
      console.log("Requestfailed", error);
    });*/
    var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/nested.json`;
    fetch(url, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      /*var size = Object.keys(data).length;
      for(let i = 0; i < size; i++) {
         for(let j = 0; j < Object.keys(data[i]).length; j++) {
         }
      }
      html = "<table border=1>";
      data.forEach(row => {
          html += "<tr>";
          row.forEach(cell => {
              html += "<td colspan=" + cell.span + ">" + cell.label + "</td>"
          });
          html += "</tr>"
      })
      html + "</table>";
      document.write(html)*/
    })
    .catch(function(error){
      console.log("Requestfailed", error);
    });


    fetch(`${SITE_URL_PROTOCOL}/assets/pages/course/course.html`)
      .then((data) => data.text())
      .then((html) => (document.getElementById("app-admin").innerHTML = course_head+html))
      .catch(function (error) {
        console.log("Requestfailed", error);
      });

}

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
      getCoursesListInnerPage();
      break;

    case "courseslistlevel":
      getCoursesListLevelPage();
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
