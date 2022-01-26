/*var course_details = "";
var course_details_url = `${SITE_URL_PROTOCOL}/assets/pages/courses/course_details.json`;
var course_assignee = "";
var course_assignee_url = `${SITE_URL_PROTOCOL}/assets/pages/courses/course_assignee.json`;
var course_due = "";
var course_due_url = `${SITE_URL_PROTOCOL}/assets/pages/courses/course_due.json`;

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

async function main() {
    course_details = await getJson(course_details_url);
    course_assignee = await getJson(course_assignee_url);
    course_due = await getJson(course_due_url);
	var mergeById = (course_details, course_assignee) =>
	    course_details.map(itm => ({
	        ...course_assignee.find((item) => (item.course_name === itm.name) && item),
	        ...itm
	    }));

	var course_detail_prev = mergeById(course_details, course_assignee);

	var mergeByName = (course_detail_prev, course_due) =>
	    course_detail_prev.map(itms => ({
	        ...course_due.find((items) => (items.course_id === itms.id) && items),
	        ...itms
	    }));

	var courses = mergeByName(course_detail_prev, course_due);

        var data = { "req_per_page": 6, "page_no": 1 };
        //calling pagination function
		pagination(data, courses);
}
main();

// on page load collect data to load pagination as well as table
var data = { "req_per_page": 6, "page_no": 1 };

// At a time maximum allowed pages to be shown in pagination div
var pagination_visible_pages = 8;


// hide pages from pagination from beginning if more than pagination_visible_pages
function hide_from_beginning(element) {
    if (element.style.display === "" || element.style.display === "block") {
        element.style.display = "none";
    } else {
        hide_from_beginning(element.nextSibling);
    }
}

// hide pages from pagination ending if more than pagination_visible_pages
function hide_from_end(element) {
    if (element.style.display === "" || element.style.display === "block") {
        element.style.display = "none";
    } else {
        hide_from_beginning(element.previousSibling);
    }
}


// Render the table's row in table request-table
function render_table_rows(rows, req_per_page, page_no) {
    var response = JSON.parse(window.atob(rows));
    //console.log(response);
    var resp = response.slice(req_per_page * (page_no - 1), req_per_page * page_no)
    $('#course-box').empty();
    resp.forEach(function (element, index) {
        if (Object.keys(element).length > 0) {
            var course_name = element.course_name;
            var id = element.id;
            var due_date = element.due_date !== undefined ? element.due_date : "0";
            var progress = element.progress !== undefined ? element.progress : "0";
            var status_class = "";
            var status_text = "";
            if(element.status == 0){
              status_class = "status_new";
              status_text = "New";
            }else if(element.status == 1){
              status_class = "status_onhold";
              status_text = "On Hold";
            }else if(element.status == 2){
              status_class = "status_completed";
              status_text = "Completed";
            }else if(element.status == 3){
              status_class = "status_inprogress";
              status_text = "In Progress";
            }
            var course_id_prefix = element.course_id_prefix !== undefined ? element.course_id_prefix : "No-ID";
            var td = "<div class='col-md-4'><div class='role-content mb-4' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'><div class='row'>";
                td +="<div class='col-6 cleft tbtn' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'> <a href='#' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>"+course_id_prefix+"</a> </div>";
                td +="<div class='col-6 cright'>";
				td +="<div class='dropdown ahide'>";
				td +="<button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button>";
				td +="<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'>";
				td +="<li><a class='dropdown-item green' href='#'>Edit</a></li>";
				td +="<li><a class='dropdown-item red' href='#'>Disable</a></li>";
				td +="<li><a class='dropdown-item red' href='#'>Delete</a></li>";
				td +="</ul>";
				td +="</div>";
				td +="</div>";
				td +="</div>";
				td +="<div class='row' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>";
				td +="<div class='col-12'>";
				td +="<h6 data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>"+course_name+"</h6>";
				td +="<p data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'> <span class='c-comment'><i class='far fa-comment'></i> 01</span> <span class='c-comment'><i class='fas fa-paperclip'></i> 08</span> </p>";
				td +="</div>";
				td +="</div>";
				td +="<div class='row' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>";
				td +="<div class='col-6 cleft cc'>";
				td +="<div>";
				td +="<div class='progress'>";
				td +="<div class='bar' style='width:"+due_date+"%'>";
				td +="<p class='percent'></p>";
				td +="</div>";
				td +="</div>";
				td +="<span class='percent-label'>Due in "+due_date+" days</span> </div>";
				td +="</div>";
				td +="<div class='col-6 cright cc'>";
				td +="<div>";
				td +="<div class='half-arc' style='--percentage:"+progress+"%;'> <span class='label'></span> </div>";
				td +="<span class='percent-label'>Progress "+progress+"%</span> </div>";
				td +="</div>";
				td +="</div>";
				td +="<div class='row mt-2'>";
				td +="<div class='col-6 cleft'>";
				//td +="<div class='members'> <span><img src='../assets/images/member1.png' ></span> <span><img src='../assets/images/member2.png' ></span> <span><img src='../assets/images/member3.png' ></span> <span><img src='../assets/images/member4.png' ></span> <span><img src='../assets/images/member5.png' ></span> <span class='mlast'>+6</span> </div>";
				td +="</div>";
				td +="<div class='col-6 cright' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>";
				td +="<div class='new-btn'><p class='"+status_class+"'>"+status_text+"</p></div>";
				td +="</div>";
				td +="</div>";
				td +="</div>";
				td +="</div>";
             $('#course-box').append(td);
        }
    });
}

// Pagination logic implementation
function pagination(data, courses) {
    var all_data = window.btoa(JSON.stringify(courses));
    $(".pagination").empty();
    if (data.req_per_page !== 'ALL') {
        let pager = `<a href="#" id="prev_link" onclick=active_page('prev',\"${all_data}\",${data.req_per_page})>&laquo;</a>` +
            `<a href="#" class="active" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>1</a>`;
        const total_page = Math.ceil(parseInt(courses.length) / parseInt(data.req_per_page));
        if (total_page < pagination_visible_pages) {
            render_table_rows(all_data, data.req_per_page, data.page_no);
            for (let num = 2; num <= total_page; num++) {
                pager += `<a href="#" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
            }
        } else {
            render_table_rows(all_data, data.req_per_page, data.page_no);
            for (let num = 2; num <= pagination_visible_pages; num++) {
                pager += `<a href="#" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
            }
            for (let num = pagination_visible_pages + 1; num <= total_page; num++) {
                pager += `<a href="#" style="display:none;" onclick=active_page(this,\"${all_data}\",${data.req_per_page})>${num}</a>`;
            }
        }
        pager += `<a href="#" id="next_link" onclick=active_page('next',\"${all_data}\",${data.req_per_page})>&raquo;</a>`;
        $(".pagination").append(pager);
    } else {
        render_table_rows(all_data, courses.length, 1);
    }
}


//below is for pagination button function
// load data and style for active page
function active_page(element, rows, req_per_page) {
    var current_page = document.getElementsByClassName('active');
    var next_link = document.getElementById('next_link');
    var prev_link = document.getElementById('prev_link');
    var next_tab = current_page[0].nextSibling; 
    var prev_tab = current_page[0].previousSibling;
    current_page[0].className = current_page[0].className.replace("active", "");
    if (element === "next") {
        if (parseInt(next_tab.text).toString() === 'NaN') {
            next_tab.previousSibling.className += " active";
            next_tab.setAttribute("onclick", "return false");
        } else {
            next_tab.className += " active"
            render_table_rows(rows, parseInt(req_per_page), parseInt(next_tab.text));
            if (prev_link.getAttribute("onclick") === "return false") {
                prev_link.setAttribute("onclick", `active_page('prev',\"${rows}\",${req_per_page})`);
            }
            if (next_tab.style.display === "none") {
                next_tab.style.display = "block";
                hide_from_beginning(prev_link.nextSibling)
            }
        }
    } else if (element === "prev") {
        if (parseInt(prev_tab.text).toString() === 'NaN') {
            prev_tab.nextSibling.className += " active";
            prev_tab.setAttribute("onclick", "return false");
        } else {
            prev_tab.className += " active";
            render_table_rows(rows, parseInt(req_per_page), parseInt(prev_tab.text));
            if (next_link.getAttribute("onclick") === "return false") {
                next_link.setAttribute("onclick", `active_page('next',\"${rows}\",${req_per_page})`);
            }
            if (prev_tab.style.display === "none") {
                prev_tab.style.display = "block";
                hide_from_end(next_link.previousSibling)
            }
        }
    } else {
        element.className += "active";
        render_table_rows(rows, parseInt(req_per_page), parseInt(element.text));
        if (prev_link.getAttribute("onclick") === "return false") {
            prev_link.setAttribute("onclick", `active_page('prev',\"${rows}\",${req_per_page})`);
        }
        if (next_link.getAttribute("onclick") === "return false") {
            next_link.setAttribute("onclick", `active_page('next',\"${rows}\",${req_per_page})`);
        }
    }
}*/

function searchParam(){
    var search_param = "";
    var search_inp_val = document.getElementById("search_data").value;
    console.log(search_inp_val);
    if(search_inp_val !== ''){
        search_param += "?search="+search_inp_val;
    }
    var courses_list_val = document.getElementById("courses_list").value;
    if(courses_list_val !== ""){
        if(search_param == ""){
            search_param += "?id="+courses_list_val;
        }else{
            search_param += "&id="+courses_list_val;
        }
    }
    var sort_recent_val = document.getElementById("sort_recent").value;
    if(sort_recent_val !== ""){
        if(search_param == ""){
            search_param += "?status="+sort_recent_val;
        }else{
            search_param += "&status="+sort_recent_val;
        }
    }
    get_pagination(search_param);
}
$( document ).ready(function() {

  //load the courses list
  $.ajax({
    url: 'https://elearningcontent.zaigoinfotech.com/course_list/',
    type: 'get',
    dataType: 'json',
    success:function(response){
      $("#courses_list").empty();
      $("#courses_list").append("<option value=''>Select Courses</option>");
      $.each( response, function( i, val ) {
        $("#courses_list").append("<option value='"+val.id+"'>"+val.name+"</option>");
      });
    }
  });
  var parameter = "";
  get_pagination(parameter);
});
function get_pagination(parameter){
    console.log(parameter);
  if($( "#pagination-container-to" ).length > 0) {
    $('#pagination-container-to').pagination({
      dataSource: 'https://elearningcontent.zaigoinfotech.com/course/'+parameter,
      locator: 'data',
      totalNumberLocator: function(response) {
        return response.total;
      },
      alias: {
        pageNumber: 'page',
        pageSize: 'per_page',
      },  
      pageSize: 6,
      ajax: {
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", "Bearer " + getUserInfo().access_token);
        },
        complete: function(jqXHR, textStatus) {
          if (jqXHR.status === 200 || jqXHR.readyState === 0 || jqXHR.status === 0) {
            return false; // do nothing
          } else if (jqXHR && jqXHR.status === 403) {
            window.location.href = window.location.href.split('/').slice(0, 3).join('/') + '/login';
          } else {
            alert('error');
          }
        },    
      },
      callback: function(data, pagination) {
        var html = template(data);
        $('#data-assignedTo').html(html);
        $('#data-assignedBy').html(html);
      }
    });
  }
}
function template(data){
    $('#course-box').empty();
    data.forEach(function (element, index) {
        if (Object.keys(element).length > 0) {
            var course_name = element.name;
            var id = element.id;
            var due_date = element.due_in_days !== undefined ? element.due_in_days : "0";
            var progress = element.progress !== undefined ? element.progress : "0";
            var status_class = "";
            var status_text = "";
            if(element.status == 0){
              status_class = "status_new";
              status_text = "New";
            }else if(element.status == 1){
              status_class = "status_inprogress";
              status_text = "Active";
            }else if(element.status == 2){
              status_class = "status_onhold";
              status_text = "On Hold";
            }else if(element.status == 4){
              status_class = "status_completed";
              status_text = "Completed";
            }
            var course_id_prefix = element.course_id_prefix !== undefined ? element.course_id_prefix : "No-ID";
            var td = "<div class='col-md-4'><div class='role-content mb-4' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'><div class='row'>";
                td +="<div class='col-6 cleft tbtn' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'> <a href='#' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>"+course_id_prefix+"</a> </div>";
                td +="<div class='col-6 cright'>";
                td +="<div class='dropdown ahide'>";
                td +="<button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button>";
                td +="<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'>";
                td +="<li><a class='dropdown-item green' href='#'>Edit</a></li>";
                td +="<li><a class='dropdown-item red' href='#'>Disable</a></li>";
                td +="<li><a class='dropdown-item red' href='#'>Delete</a></li>";
                td +="</ul>";
                td +="</div>";
                td +="</div>";
                td +="</div>";
                td +="<div class='row' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>";
                td +="<div class='col-12'>";
                td +="<h6 data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>"+course_name+"</h6>";
                td +="<p data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'> <span class='c-comment'><i class='far fa-comment'></i> "+element.comments_count+"</span> <span class='c-comment'><i class='fas fa-paperclip'></i> "+element.attachments_count+"</span> </p>";
                td +="</div>";
                td +="</div>";
                td +="<div class='row' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>";
                td +="<div class='col-6 cleft cc'>";
                td +="<div>";
                td +="<div class='progress'>";
                td +="<div class='bar' style='width:"+due_date+"%'>";
                td +="<p class='percent'></p>";
                td +="</div>";
                td +="</div>";
                td +="<span class='percent-label'>Due in "+due_date+" days</span> </div>";
                td +="</div>";
                td +="<div class='col-6 cright cc'>";
                td +="<div>";
                td +="<div class='half-arc' style='--percentage:"+progress+"%;'> <span class='label'></span> </div>";
                td +="<span class='percent-label'>Progress "+progress+"%</span> </div>";
                td +="</div>";
                td +="</div>";
                td +="<div class='row mt-2'>";
                td +="<div class='col-6 cleft'>";
                //td +="<div class='members'> <span><img src='../assets/images/member1.png' ></span> <span><img src='../assets/images/member2.png' ></span> <span><img src='../assets/images/member3.png' ></span> <span><img src='../assets/images/member4.png' ></span> <span><img src='../assets/images/member5.png' ></span> <span class='mlast'>+6</span> </div>";
                td +="</div>";
                td +="<div class='col-6 cright' data-flinkto='course' data-cid='"+id+"' data-cname='"+course_name+"'>";
                td +="<div class='new-btn'><p class='"+status_class+"'>"+status_text+"</p></div>";
                td +="</div>";
                td +="</div>";
                td +="</div>";
                td +="</div>";
             $('#course-box').append(td);
        }
    });
}
