function searchParam(){
    var search_param = "";
    var search_inp_val = document.getElementById("search_data").value;
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
    url: API_CONTENT_URL + '/course_list/',
    type: 'get',
    dataType: 'json',
    headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token},
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
  if($( "#pagination-container-to" ).length > 0) {
    $('#pagination-container-to').pagination({
      dataSource: API_CONTENT_URL + '/course/'+parameter,
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
        if(pagination.totalNumber < 7){
          $("#pagination-container-to").hide();
        }else{
          $("#pagination-container-to").show();
        }
        if(data.length === 0){
          $("#nodataFound_course").attr("style", "display:block");
        }else{
          $("#nodataFound_course").attr("style", "display:none");
        }
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
                td +="<li><a class='dropdown-item green' href='#' data-course_id='"+id+"' data-cname='"+course_name+"' onClick='editCourse(this);'>Edit</a></li><li><a class='dropdown-item green' href='#' data-course_id='"+id+"' data-cname='"+course_name+"' onClick='assignCourse(this);'>Assign</a></li>";
                /*
                  EXCEL: 8. Course Card - Edit, Disable, Delete menu should be hidden as for now. 
                */
                //td +="<li><a class='dropdown-item red' href='#'>Disable</a></li>";
                //td +="<li><a class='dropdown-item red' href='#'>Delete</a></li>";
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

               /* td += `<div class="members">`;
                if(element.m_images.length > 0){
                    $.each(element.m_images, function (index_images, role_images) {
                      if(index_images < 5){
                        td += `<span><img src="${API_BASE_URL}${role_images}"></span>`;
                      }
                    });
                }else{
                        td += `<span><img src=""></span>`;
                }
                if(element.m_images.length > 5){

                  td += `<span class="mlast">+${element.m_images.length - 5}</span>`;
                }
                td +="</div>";*/
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
