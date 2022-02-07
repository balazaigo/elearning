var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');
function dragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};
 
function dragEnter(e) {
  this.classList.add('over');
}
 
function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}
 
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
 
function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
 
function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}
 
function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});
function toinput(e){
    if(e.innerHTML != "Add Module Name"){
        e.previousSibling.value = e.innerHTML; 
    }else{
        e.previousSibling.value = ''; 
    } 
    e.setAttribute("style","display:none");
    e.previousSibling.setAttribute("style","display:block");
    e.previousSibling.focus();
}
function totext(e){
    if(e.value == ''){
        e.value = "Add Module Name";
    }
    if(e.value != "" && e.value != "Add Module Name"){
      var class_module_level = e.parentElement.parentElement.parentElement.classList[1];
      var first_five_char_class = class_module_level.substring(0,5);
      var get_submodule_level_values = '';
      if(e.dataset.module_id !== undefined){
        var url = API_CONTENT_URL + '/course_module/'+e.dataset.module_id+'/';
        var method = "PUT";
      }else{
        var url = API_CONTENT_URL + '/course_module/';
        var method = "POST";
      }
      if(first_five_char_class === "modul"){
        var level_number = class_module_level.split('_')[1];
        var get_submodule_level_values = {
          module_name: String(e.value),
          level: parseInt(level_number), 
          course_id:String(document.getElementById("course_id").value),
          parent_id:null
        }
      }else if(first_five_char_class === "sub_m"){
        var class_module_main_level = e.parentElement.parentElement.parentElement.classList[3];
        var class_module_sub_level = e.parentElement.parentElement.parentElement.classList[2];
        var parent_id = e.parentElement.parentElement.parentElement.parentElement.childNodes[1].firstChild.getAttribute("data-module_id");
        get_submodule_level_values = get_submodule_level_val(class_module_main_level, class_module_sub_level, e.value, parent_id);
      }
      if(get_submodule_level_values != ''){
        post_json_dat(url, get_submodule_level_values, method, e);
      }
    }
    e.nextSibling.innerHTML = e.value; 
    e.setAttribute("style","display:none");
    e.nextSibling.setAttribute("style","display:block");
    e.nextSibling.focus();
}
function get_submodule_level_val(class_module_main_level, class_module_sub_level, ele_val, parent_id_val){
  var data_course_module = "";
  if(class_module_sub_level.indexOf('.') !== -1){
     //console.log("Found . in str")
      /*var module_name_list = document.getElementById("module_"+class_module_main_level).innerHTML;
      var count = (class_module_sub_level.split(".").length - 1);
      var str_array = class_module_sub_level.split('.');
      var sting_concat = '';
      for (let i = 0; i < str_array.length-1; i++) {
        if(i == 0){
            sting_concat += str_array[i];
        }else{
          sting_concat += "."+str_array[i];
        }
        module_name_list += "/"+document.getElementById(sting_concat+"_"+class_module_main_level).innerHTML;
      }
      module_name_list += "/"+ele_val;*/
      var level_number = (class_module_sub_level.split("_module")[0]).split(".")[class_module_sub_level.split(".").length-1];
      data_course_module = {
        module_name: String(ele_val),
        level: parseInt(level_number), 
        course_id:String(document.getElementById("course_id").value),
        parent_id: parent_id_val
      }

  }else{
      //console.log("Not Found . in str")
      //var module_name_list = document.getElementById("module_"+class_module_main_level).innerHTML+"/"+ele_val;
      var level_number = class_module_sub_level.split('_')[1];
      data_course_module = {
        module_name: String(ele_val),
        level: parseInt(level_number), 
        course_id:String(document.getElementById("course_id").value),
        parent_id: parent_id_val
      }
  }
  return data_course_module;
}

function post_json_dat(url, data, call_method, e){
  fetch(url, {
    method: call_method,
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token},
  })
  .then((response) => response.json())
  .then((json) => {
    el_1 = e.parentElement.nextSibling.childNodes[1].childNodes[0].firstChild;//edit
    el_2 = e.parentElement.nextSibling.childNodes[1].childNodes[1].firstChild;//delete
    el_3 = e.parentElement.parentElement.childNodes[8].firstChild;//tags
    el_4 = e.parentElement.parentElement.childNodes[3].firstChild;//progress
    el_5 = e.parentElement.parentElement.childNodes[4].firstChild;//attachment
    el_6 = e.parentElement.parentElement.childNodes[5].firstChild;//comment
    el_7 = e.parentElement.parentElement.childNodes[6].firstChild;//assign
    el_1.setAttribute("data-flinkto", "courseslistlevel");
    if(json.module_id != undefined || json.module_id != null){
      e.setAttribute("data-module_id", json.module_id);
      el_1.setAttribute("data-module_id", json.module_id);
      el_2.setAttribute("data-module_id", json.module_id);
      el_3.setAttribute("data-module_id", json.module_id);
      el_4.setAttribute("data-module_id", json.module_id);
      el_5.setAttribute("data-module_id", json.module_id);
      el_6.setAttribute("data-module_id", json.module_id);
      el_7.setAttribute("data-module_id", json.module_id);
    }
    if(json.course_id != undefined || json.course_id != null){
      e.setAttribute("data-cid", json.course_id);
      el_1.setAttribute("data-cid", json.course_id);
      el_2.setAttribute("data-cid", json.course_id);
      el_3.setAttribute("data-cid", json.course_id);
      el_4.setAttribute("data-cid", json.course_id);
      el_5.setAttribute("data-cid", json.course_id);
      el_6.setAttribute("data-cid", json.course_id);
      el_7.setAttribute("data-cid", json.course_id);
    }
  })
  .catch(function (error) {
    console.log("Requestfailed", error);
  });
}
function check_value(e){
    var x = e.parentElement.parentElement.parentElement.lastElementChild.childNodes;
    if(e.value != ''){
        e.parentElement.parentElement.setAttribute("style","opacity:1");
        var classList = e.parentElement.parentElement.parentElement.className.split(/\s+/);
        var index = classList[1].lastIndexOf("_");
        if(classList[2] == 'main_mod_empty'){
            e.parentElement.parentElement.parentElement.classList.remove('main_mod_empty');
            e.parentElement.parentElement.parentElement.classList.add('main_mod');
            e.parentElement.parentElement.parentElement.classList.add('draggable');
            e.parentElement.parentElement.parentElement.setAttribute("style","opacity:1");
            if(e.parentElement.previousSibling.nodeName == "#text"){
                e.parentElement.parentElement.childNodes[1].firstChild.setAttribute('draggable','true');
            }else{
                e.parentElement.previousSibling.firstChild.setAttribute("draggable","true");
            }
        }
        var result = Number(classList[1].substr(index+1)) + Number(1);
    }else{
        e.parentElement.parentElement.parentElement.classList.remove('main_mod');
        e.parentElement.parentElement.parentElement.classList.add('main_mod_empty');
        e.parentElement.parentElement.parentElement.classList.remove('draggable');
        e.parentElement.parentElement.setAttribute("style","opacity:0.5");
        if(e.parentElement.previousSibling.firstChild !== null){
          e.parentElement.previousSibling.firstChild.setAttribute("draggable","true");
        }
    }
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      addEventsDragAndDrop(item);
    });

}
function add_sub(e){
    var x =e.parentElement.parentElement.childNodes;
    if(x[0].nodeName == "#text"){
        var inp_val = x[3].childNodes[1].innerHTML;
    }else{
        var inp_val = x[1].childNodes[1].innerHTML;
    }
    if(inp_val != ''){
        var classList = e.parentElement.parentElement.parentElement.className.split(/\s+/);
        if(classList[2] == 'main_mod'){
            if(e.parentElement.parentElement.parentElement.parentElement.childNodes[e.parentElement.parentElement.parentElement.parentElement.childNodes.length-1].classList !== undefined && e.parentElement.parentElement.parentElement.parentElement.childNodes[e.parentElement.parentElement.parentElement.parentElement.childNodes.length-1].classList[2] == 'main_mod_empty'){
              var main_mod_level = e.parentElement.parentElement.parentElement.classList[1];
                var index = classList[1].lastIndexOf("_");
                var result = Number(classList[1].substr(index+1));
                if(e.parentElement.parentElement.childNodes[0].nodeName == '#text'){
                    var result = Number(e.parentElement.parentElement.childNodes.length)- Number(18);
                }else{
                    var result = Number(e.parentElement.parentElement.childNodes.length)- Number(8);
                }
                newHTML = "<div class='module sub_module_"+result+" sub_"+result+" "+main_mod_level+"' style='width:95%;margin-right: -2px;'>";
                newHTML += "<ul class='sub_module'>";
                newHTML += "<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>";
                newHTML += "<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='Level "+result+"'onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);' id='sub_"+result+"_"+main_mod_level+"'>"+result+". Chapter</p></li>";
                newHTML += "<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_sub_module(this);'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>";
                newHTML += "<li class='progress_btn disp_in_block flt_right'><p class='status_new'>New</p></li>";
                newHTML += "<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>";
                newHTML += "<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>";
                newHTML += "<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li>";
                newHTML += "<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub_sub(this);'></li>";
                newHTML += "<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag'></li>";
                newHTML += "</ul>";
                newHTML += "</div>";
                e.parentElement.parentElement.insertAdjacentHTML('beforeend', newHTML);

                var class_module_main_level = main_mod_level;
                var class_module_sub_level = "sub_"+result;
                var input_val = "Level "+result;
                //var get_submodule_level_values = get_submodule_level_val(class_module_main_level, class_module_sub_level, input_val);
                //var url = API_CONTENT_URL + '/course_module/';
                //if(get_submodule_level_values != ''){
                  //post_json_dat(url, get_submodule_level_values);
                //}
                return;
            }
            if((e.parentElement.parentElement.parentElement.childNodes[0].nodeName == '#text' && e.parentElement.parentElement.parentElement.childNodes.length == 3) ||  (e.parentElement.parentElement.parentElement.childNodes[0].nodeName != '#text' && e.parentElement.parentElement.parentElement.childNodes.length == 1)){
                var index = classList[1].lastIndexOf("_");
                var result = Number(classList[1].substr(index+1));
                var result = Number(e.parentElement.parentElement.parentElement.parentElement.childNodes.length) + Number(1);
                newHTML = "<div class='module module_"+result+" main_mod_empty' style='opacity:0.5;'>";
                newHTML += "<ul class='main_module module_opacity'>";
                newHTML += "<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>";
                newHTML += "<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value=''onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);' id='module_module_"+result+"'>Add Module Name</p></li>";
                newHTML += "<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_module(this);'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>";
                newHTML += "<li class='progress_btn disp_in_block flt_right'><p class='status_new'>New</p></li>";
                newHTML += "<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>";
                newHTML += "<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>";
                newHTML += "<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li></li>";
                newHTML += "<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub(this);'></li>";
                newHTML += "<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag'></li>";
                newHTML += "</ul>";
                newHTML += "</div>";
                e.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML('beforeend', newHTML);
            }
            /*else{
                var index = classList[1].lastIndexOf("_");
                var result = Number(classList[1].substr(index+1));
                if(e.parentElement.parentElement.childNodes[0].nodeName == '#text'){
                    var result = Number(e.parentElement.parentElement.childNodes.length)- Number(18);
                }else{
                    var result = Number(e.parentElement.parentElement.childNodes.length);
                }
                newHTML = "<div class='module sub_module_"+result+" sub_"+result+"' style='width:95%;margin-right: -2px;'>";
                newHTML += "<ul class='sub_module'>";
                newHTML += "<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>";
                newHTML += "<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='Level "+result+"'onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);'>Level "+result+"</p></li>";
                newHTML += "<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_sub_module(this);'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>";
                newHTML += "<li class='progress_btn disp_in_block flt_right'><p class='status_new'>New</p></li>";
                newHTML += "<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>";
                newHTML += "<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>";
                newHTML += "<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li>";
                newHTML += "<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub_sub(this);'></li>";
                newHTML += "<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag'></li>";
                newHTML += "</ul>";
                newHTML += "</div>";
                e.parentElement.parentElement.insertAdjacentHTML('beforeend', newHTML);
            }*/
        }
    }
}

function add_sub_sub(e){
  var x =e.parentElement.parentElement.childNodes;
  if(x.length == 15){
    var inp_val = x[3].childNodes[0].value;
  }
  if(x.length == 9){
    var inp_val = x[1].childNodes[0].value;
  }
  if(inp_val != ''){
    var main_mod_level = e.parentElement.parentElement.parentElement.classList[3];
    var classList = e.parentElement.parentElement.parentElement.className.split(/\s+/);
    var index = classList[1].lastIndexOf("_");
    var res_1 = Number(classList[1].substr(index+1));
    var result = classList[1].substr(index+1)+"."+ Number(e.parentElement.parentElement.childNodes.length - 8);
    var num = String(result).match(/\./g).length;
    if(num === 1){
      var result_text = Number(e.parentElement.parentElement.childNodes.length - 8)+". Lesson";
    }else if(num === 2){
      var result_text = Number(e.parentElement.parentElement.childNodes.length - 8)+". Topic";
    }else if(num === 3){
      var result_text = Number(e.parentElement.parentElement.childNodes.length - 8)+". Sub Topic";
    }else{
      var result_text = "Level "+result;
    }
    newHTML = "<div class='module sub_module_"+result+" sub_"+result+" "+main_mod_level+"' style='width:95%;margin-right: -2px;'>";
    newHTML += "<ul class='sub_module'>";
    newHTML += "<li class='course_img_icon disp_in_block flt_left'><img src='../assets/images/course-icon.png' class='course_icon'></li>";
    newHTML += "<li class='module_input disp_in_block flt_left'><input type='text' class='input_module_fld' id='module_inp' placeholder='Add Module Name' onChange='check_value(this);' value='Level "+result+"'onblur='totext(this);' style='display: none;' maxlength='256'><p onclick='toinput(this);' id='sub_"+result+"_"+main_mod_level+"'>"+result_text+"</p></li>";
    newHTML += "<li class='dots_img_icon disp_in_block flt_right'><button class='btn dropdown-toggle dbtn' type='button' id='dropdownMenuButton3' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-ellipsis-v'></i></button><ul class='dropdown-menu' aria-labelledby='dropdownMenuButton3'><li><a class='dropdown-item green'>Edit</a></li><li><a class='dropdown-item green' onclick='delete_sub_module(this);'>Delete</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Expand</a></li><li><a class='dropdown-item green' onclick='toggle_collapse_expand(this);'>Collapse</a></li></ul></li>";
    newHTML += "<li class='progress_btn disp_in_block flt_right'><p class='status_new'>New</p></li>";
    newHTML += "<li class='attach_img_icon disp_in_block flt_right'><img src='../assets/images/attach-icon.png' class='attach_icon'></li>";
    newHTML += "<li class='message_img_icon disp_in_block flt_right'><img src='../assets/images/message-icon.png' class='message_icon'></li>";
    newHTML += "<li class='user_img_icon disp_in_block flt_right'><img src='../assets/images/user-icon.png' class='user_icon'></li>";
    newHTML += "<li class='plus_img_icon disp_in_block flt_right'><img src='../assets/images/plus-icon.png' class='plus_icon' onClick='add_sub_sub(this);'></li>";
    newHTML += "<li class='frame_img_icon disp_in_block flt_right'><img src='../assets/images/frame-icon.png' class='frame_icon' onclick='show_tag_popup(this)' data-getresult='tag'></li>";
    newHTML += "</ul>";
    newHTML += "</div>";
    e.parentElement.parentElement.insertAdjacentHTML('beforeend', newHTML);
    var class_module_main_level = main_mod_level;
    var class_module_sub_level = "sub_"+result;
    var input_val = "Level "+result;
    //var get_submodule_level_values = get_submodule_level_val(class_module_main_level, class_module_sub_level, input_val);
    //var url = API_CONTENT_URL + '/course_module/';
    //if(get_submodule_level_values != ''){
      //post_json_dat(url, get_submodule_level_values);
    //}
   }
}

/******* Expand and collapse main and sub module Levels Starts **************/
function toggle_collapse_expand(e){
    var childrendivs = [],
    children = e.parentElement.parentElement.parentElement.parentElement.children;
    var action = e.innerHTML;
    for(var i = 0; i < children.length; i++){
        if (children[i].tagName == "DIV") {
          if(action == "Expand"){
              children[i].classList.add('disp_block');
              children[i].classList.remove('disp_none');
              childrendivs.push(children[i]);
          }else{
              children[i].classList.add('disp_none');
              children[i].classList.remove('disp_block');
              childrendivs.push(children[i]);
          }
        }
    }
}
/******* Expand and collapse main and sub module Levels Ends **************/
function delete_module(e){
  var x =e.parentElement.parentElement.parentElement.parentElement.childNodes;
  if(x[0].nodeName == "#text"){
      var inp_val = x[3].childNodes[1].innerHTML;
  }else{
      var inp_val = x[1].childNodes[0].value;
  }
  if(inp_val != '' && inp_val != "Add Module Name"){

      var url = API_CONTENT_URL + '/course_module/'+e.dataset.module_id+'/';
      var method = "DELETE";
    var result = [],
    node = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild;
    while ( node ) {
        if (node.nodeType === Node.ELEMENT_NODE ) 
          result.push( node );
        node = node.nextElementSibling || node.nextSibling;
    }
    if(result.length > 1){
      e.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
      post_json_dat(url, null, method);
      var result2 = [],
      node2 = document.getElementById('course_box').firstChild;
      while ( node2 ) {
          if (node2.nodeType === Node.ELEMENT_NODE ) 
            result2.push( node2 );
          node2 = node2.nextElementSibling || node2.nextSibling;
      }
      var key = 1;
      result2.forEach(function(item){
        item.classList.replace(item.classList[1], "module_"+key);
        key++;
      });
    }
  }
}
function show_tag_popup(e){
  var offsets = e.getBoundingClientRect();
  var offset_box = document.getElementById("course_box").getBoundingClientRect();
  var top = offsets.top + Math.max( $("html").scrollTop(), $("body").scrollTop() ) - 70;
  //var right = offset_box.left;
  const container = document.getElementById("popup_course_icon");
  const modal = new bootstrap.Modal(container, { backdrop: true, keyboard: true });
  document.getElementById("content-courseModule").style.transform = "translate(0px, "+top+"px)";
  var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/course_tag.html?t=` + Math.floor(Date.now() / 1000);
  $('.modal-content').load(url,function(result){
    document.getElementById("course_param").setAttribute("data-module_id", e.dataset.module_id);
    document.getElementById("course_param").setAttribute("data-cid", e.dataset.cid);
    modal.toggle();
  });
}

function show_attachment_popup(e){
  //var right = offset_box.left;
  const container = document.getElementById("popup_course_icon");
  const modal = new bootstrap.Modal(container, { backdrop: true, keyboard: true });
  var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/attachment_popup.html?t=` + Math.floor(Date.now() / 1000);
  $('.modal-content').load(url,function(result){
    document.getElementById("course_param").setAttribute("data-module_id", e.dataset.module_id);
    document.getElementById("course_param").setAttribute("data-cid", e.dataset.cid);
    modal.toggle();
  });
}
function show_message_popup(e){
  //var right = offset_box.left;
  const container = document.getElementById("popup_course_icon");
  const modal = new bootstrap.Modal(container, { backdrop: true, keyboard: true });
  var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/message_popup.html?t=` + Math.floor(Date.now() / 1000);
  $('.modal-content').load(url,function(result){
    document.getElementById("course_param").setAttribute("data-module_id", e.dataset.module_id);
    document.getElementById("course_param").setAttribute("data-cid", e.dataset.cid);
    modal.toggle();
  });
}
function show_assignee_popup(e){
  //var right = offset_box.left;
  const container = document.getElementById("popup_course_icon");
  const modal = new bootstrap.Modal(container, { backdrop: true, keyboard: true });
  var url = `${SITE_URL_PROTOCOL}/assets/pages/courses/assignee_popup.html?t=` + Math.floor(Date.now() / 1000);
  $('.modal-content').load(url,function(result){
    document.getElementById("course_param").setAttribute("data-module_id", e.dataset.module_id);
    document.getElementById("course_param").setAttribute("data-cid", e.dataset.cid);
    modal.toggle();
  });
}
function delete_sub_module(e){

      var url = API_CONTENT_URL + '/course_module/'+e.dataset.module_id+'/';
      var method = "DELETE";
    var result = [],
    node = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild;
    while ( node ) {
        if (node.nodeType === Node.ELEMENT_NODE ) 
          result.push( node );
        node = node.nextElementSibling || node.nextSibling;
    }
    if(result.length > 1){
      e.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
      post_json_dat(url, null, method);
    }
}
$(document).ready(function(){
  $('#popup_course_icon').on('hidden.bs.modal', function () {
      $('#course_id').trigger('click');
  });
});
function moduleMobilePreview(cid){

  $("#mobile_preview").addClass("overlay_target");
  var course_id = $("#dp_course_id").val();
  console.log(course_id);
    var url = API_CONTENT_URL + `/course_module_detail/?course_id=`+cid;
    fetch(url, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
    })
    .then((response) => response.json())
    .then((data) => {
      var course_data_html = `<div class="course_data">
                                <div class="row">
                                  <div class="col-12 title-head">
                                  <h4 class="p-3" style="margin-bottom: -20px;">${data.course_name}</h4>
                                  </div>
                                  <div class="col-12 title-head">
                                  <p class="p-3" style="margin-bottom: 0rem !important;">${data.description}</p>
                                  </div>
                                </div>
                                <div class="row">
                                </div>
                              </div>`;
      var newDIVs = $("<div class='course' id='course_box' style='background-color: rgb(249,249,251);'></div>");
      get_list_preview( data.module_detail, newDIVs, 1);
      var outerHtml = newDIVs.prop('outerHTML');
      document.getElementById("mp_courseData").innerHTML = course_data_html+outerHtml;
    });
}
function moduleDesktopPreview(cid){
  $("#desktop_preview").addClass("overlay_target");
  var course_id = $("#dp_course_id").val();
  console.log(course_id);
    var url = API_CONTENT_URL + `/course_module_detail/?course_id=`+cid;
    fetch(url, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + getUserInfo().access_token}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var course_data_html = `<div class="course_data">
                                <div class="row">
                                  <div class="col-12 title-head">
                                  <h4 class="p-3" style="margin-bottom: -20px;">${data.course_name}</h4>
                                  </div>
                                  <div class="col-12 title-head">
                                  <p class="p-3" style="margin-bottom: 0rem !important;">${data.description}</p>
                                  </div>
                                </div>
                                <div class="row">
                                </div>
                              </div>`;
      var newDIVs = $("<div class='course' id='course_box' style='background-color: rgb(249,249,251);'></div>");
      get_list_preview( data.module_detail, newDIVs, 1);
      var outerHtml = newDIVs.prop('outerHTML');
      document.getElementById("dp_courseData").innerHTML = course_data_html+outerHtml;
    });
}
/***************Course Modules Get Json and assign Tree structured format and Design Starts Here*************/
function get_list_preview( a, $parent , level_count_inc) {
  var levels = '';
  var newDIV = $("<div></div>");
  for (var i = 0; i < a.length; i++) {
      if (a[i]) {
          var level_count = a[i].module_name.split("/").length - 1;
          if(a[i].parent_id == null){
            var n = a[i].module_name.lastIndexOf('/');
            var input_value = a[i].module_name.substring(n + 1);
            newDIV = $("<div class='module module_"+level_count_inc+" main_mod draggable' id='"+a[i].level+"' draggable='true' style='opacity:1'></div>");
            newUl = $("<ul class='main_module module_opacity' style='opacity:1;padding-bottom: 0px;border-style: none;'></ul>");
            newUl.append("<li style='background-color: white;padding7px;'><p class='mb-0' style='padding:15px;'><b>"+input_value+" :</b></p></li>");
            var module_data_html  = get_module_details_preview(a[i]);
            newUl.append(module_data_html);
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
            newDIV = $("<div class='module sub_module_"+levels+" sub_"+levels+" module_"+(level_count_inc - 1)+" disp_block' id='"+levels+"' style='width:95%;'>");
            newUl = $("<ul class='sub_module' style='padding-bottom: 0px;border-style: none;'></ul>");
            const [module_content, module_attachments] = get_module_details_preview(a[i]);
            newUl.append("<li style='background-color: white;padding7px;'><p class='mb-0' style='padding:15px;'><b>"+input_value+" :</b></p>"+module_content+"</li>");
            newUl.append(module_attachments);
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
              get_list_preview( a[i].children, newUl, level_count_inc);
          }
      }
    $parent.append(newDIV);
  }
}
/***************Course Modules Get Json and assign Tree structured format and Design Ends Here*************/

function get_module_details_preview(module_data){
        var module_content = module_data.content;
        var module_attachments = module_data.attachments;
        var module_content_html = "";
        var module_attachments_html = "";
        if(module_content){
            module_content_html +=`<li class="has-children is-open"><ul class="acnav__list acnav__list--level2 wbg br-10" style="border-left: none;padding-left: 0px;"><li class="has-children">
                                <div class="acnav__label acnav__label--level2" style="border:none;">
                                  <div class="accordionlist">
                                    <div class="row">
                                      <div class="col-md-12 acc-text">

                                        ${module_content.content}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li></ul>`;
        }
        if(module_attachments.length > 0){
            module_attachments.forEach(function (element, index) {
                var file_type = element.attachment_type.split('/')[0];
                if(file_type === 'image' || file_type === 'video' || file_type === 'audio' || file_type === 'application'){
                    module_attachments_html += `<li class="has-children is-open" style="margin-top: 10px;">
                                    <ul class="acnav__list acnav__list--level2 wbg br-10" style="border-left: none;">
                                      <li class="has-children">
                                        <div class="acnav__label acnav__label--level2" style="border:none;">
                                          <div class="accordionlist">
                                            <div class="row">
                                              <div class="col-md-12 acc-text">`;
                    if(element.attachment_type.split('/')[0] === 'image'){
                          module_attachments_html +=`<img class="w-100"src=API_CONTENT_URL + "${element.attachment}" alt="${element.attachment_name}">`;
                    }else if(element.attachment_type.split('/')[0] === 'video'){
                        module_attachments_html +=`<video id='video' controls preload='none' width="600" poster=""><source id='mp4' src=API_CONTENT_URL + "${element.attachment}" type='video/mp4' /><p>Your user agent does not support the HTML5 Video element.</p></video>`;
                    }else if(element.attachment_type.split('/')[0] === 'audio'){
                        module_attachments_html +=`<audio controls><source src=API_CONTENT_URL + "${element.attachment}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
                    }else if(element.attachment_type.split('/')[0] === 'application'){
                      var mathcount = Math.floor(Math.random() * 1000);
                       module_attachments_html +=`<iframe id="${element.id}" src='https://docs.google.com/gview?url='+API_CONTENT_URL+'${element.attachment}&embedded=true&ignore=${mathcount}' width='100%' height='500px' frameborder='1'></iframe><p>If this browser does not support file. Please download the File to view it: <a href=API_CONTENT_URL + "${element.attachment}" target="_blank">Download File</a>.</p>`;
                    }
                    module_attachments_html +=`</div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </li>`;
                }
          });
        }
        return [module_content_html, module_attachments_html];

}
$(document).ready(function(){
  $("#desktop-preview-close").on("click", function() {
    $("#desktop_preview").removeClass("overlay_target");
  });
  $("#mobile-preview-close").on("click", function() {
    $("#mobile_preview").removeClass("overlay_target");
  });
});