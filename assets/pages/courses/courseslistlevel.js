$(document).ready(function(){
    let cid = document.getElementById("course_module_id").getAttribute("data-cid");
    let module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
    var dropzone = new Dropzone('#demo-upload', {
        previewTemplate: document.querySelector('#preview-template').innerHTML,
        parallelUploads: 2,
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 3,
        filesizeBase: 1000,
        thumbnail: function(file, dataUrl) {
            if (file.previewElement) {
              file.previewElement.classList.remove("dz-file-preview");
              var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
              for (var i = 0; i < images.length; i++) {
                  var thumbnailElement = images[i];
                  thumbnailElement.alt = file.name;
                  thumbnailElement.src = dataUrl;
              }
              //setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1000);
              file.previewElement.classList.add("dz-image-preview");
            }
        }

    });
    get_breadcrumbs();
    setTimeout(get_content_details(), 1000);
    get_module_details();
    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 100000;

    dropzone.uploadFiles = function(files) {
        var self = this;
        var cid = document.getElementById("course_module_id").getAttribute("data-cid");
        var module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
        var formData = new FormData();
        var todayDate = new Date().toISOString().slice(0, 10);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            formData.append("attachment", file);
            formData.append("attachment_type", file.type);
            formData.append("attachment_name", file.name);
            formData.append("created_date", todayDate);
            formData.append("status", 0);
            formData.append("module_id", module_id);
            formData.append("course_id", cid);
            $.ajax({
              url: "https://elearningcontent.zaigoinfotech.com/module_attachment/",
              method: "POST",
              type: 'POST', // For jQuery < 1.9
              cache: false,
              contentType: false,
              processData: false,
              data: formData,
              headers: {
                "Authorization" : "Bearer " + getUserInfo().access_token
              },
              success: function(response){
                $('#addCourses').modal('hide');
                toastr.success("New course information was successfully saved.");
                console.log(response);
              },
              error: function(error) {
                toastr.error("Response Error: " + error.message);
                console.log(error);
              }
            });
            totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

            for (var step = 0; step < totalSteps; step++) {
                var duration = timeBetweenSteps * (step + 1);
                setTimeout(function(file, totalSteps, step) {
                    return function() {
                        file.upload = {
                            progress: 100 * (step + 1) / totalSteps,
                            total: file.size,
                            bytesSent: (step + 1) * file.size / totalSteps
                        };
                        self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                        if (file.upload.progress == 100) {
                            file.status = Dropzone.SUCCESS;
                            self.emit("success", file, 'success', null);
                            self.emit("complete", file);
                            self.processQueue();
                          //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
                        }
                    };
                }(file, totalSteps, step), duration);
            }
        }
    }

    /*$.ajax({
      url: 'https://elearningcontent.zaigoinfotech.com/course_tags/?course_id='+cid+'&module_id='+module_id,
      type: 'get',
      dataType: 'json',
      success:function(response){
        console.log(response);
        var course_tags = response;
        var tag_list ="";
        var tag_list_str = "";
            for(var i = 0; i < course_tags.length; i++){
              tag_list += '<li>'+course_tags[i].tag_name+'<span class="tag__removes tag__removes2" data-tag="'+course_tags[i].tag_name+'" data-tagid="'+course_tags[i].id+'">×</span></li>';
              tag_list_str += course_tags[i].tag_name+",";
            }
            document.getElementById("tag__List_append").innerHTML = tag_list;
            document.getElementById("tag__values").value = tag_list_str;
      }
    });*/
});
function get_breadcrumbs(){
    var cid = document.getElementById("course_module_id").getAttribute("data-cid");
    var module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
    $.ajax({
      url: 'https://elearningcontent.zaigoinfotech.com/breadcrumbs/'+cid+'/'+module_id,
      type: 'GET',
      dataType: 'json',
      success:function(data){
        var breadcrumbs_data = data.breadcrumbs_order;
        document.getElementById("course_id_prefix").innerHTML = data.course_id_prefix;
        var brd_crumbs = `<li class="breadcrumb-item" data-flinkto="course" data-cid="${data.course_id}"><a href="#" data-flinkto="course" data-cid="${data.course_id}">${data.course_name}</a></li>`;
        if(breadcrumbs_data.length > 0){
            breadcrumbs_data.forEach(function (elements, index) {
              brd_crumbs += `<li class="breadcrumb-item" data-flinkto="courseslistlevel" data-cid="${elements.course_id}" data-module_id="${elements.module_id}"><a href="#" data-flinkto="courseslistlevel" data-cid="${elements.course_id}" data-module_id="${elements.module_id}">${elements.module_name}</a></li>`;
              if(index == breadcrumbs_data.length - 1){
                  document.getElementById("course_header_module").innerHTML = elements.module_name;
              }
            });
        }
        document.getElementById("module_breadcrumbs").innerHTML = brd_crumbs;
      }
    });
}
function get_content_details(){
    var cid = document.getElementById("course_module_id").getAttribute("data-cid");
    var module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
    $.ajax({
      url: 'https://elearningcontent.zaigoinfotech.com/module/'+module_id,
      type: 'get',
      dataType: 'json',
      success:function(response){
        var module_content = '';
        console.log(response.module_content);
        if(response.module_content.length > 0){
          module_content = response.module_content[0].content;
          module_content_id = response.module_content[0].id;
          document.getElementById("saveCourses").setAttribute("data-module_content_id", module_content_id);
        }
        tinymce.activeEditor.setContent(module_content);
      }
    });
}
function get_module_details(){
    var cid = document.getElementById("course_module_id").getAttribute("data-cid");
    var module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
    $.ajax({
      url: 'https://elearningcontent.zaigoinfotech.com/module/'+module_id,
      type: 'get',
      dataType: 'json',
      success:function(response){
        var module_content = response.module_content;
        var module_attachments = response.module_attachments;
        var module_tags = response.module_tags;
        var module_content_html = "";
        var module_attachments_html = "";
        var module_tags_html = "";
        if(module_content.length > 0){
            console.log(module_content[0].content);
            module_content_html +=`<li class="has-children is-open"><ul class="acnav__list acnav__list--level2 wbg br-10"><li class="has-children mb-3">
                                <div class="acnav__label acnav__label--level2">
                                  <div class="accordionlist">
                                    <div class="row">
                                      <div class="col-md-12 acc-text">
                                        ${module_content[0].content}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li></ul>`;
          /*module_content.forEach(function (element, index) {
            console.log(element);
            module_content_html +=`<li class="has-children is-open"><ul class="acnav__list acnav__list--level2 wbg br-10"><li class="has-children mb-3">
                                <div class="acnav__label acnav__label--level2">
                                  <div class="accordionlist">
                                    <div class="row">
                                      <div class="col-md-12 acc-text">
                                        ${element.content}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li></ul>`;
          });*/
        }
        if(module_attachments.length > 0){
            module_attachments.forEach(function (element, index) {
                var file_type = element.attachment_type.split('/')[0];
                if(file_type === 'image' || file_type === 'video' || file_type === 'audio'){
                    module_attachments_html += `<li class="has-children is-open">
                                    <div class="acnav__label">
                                      <div class="accordionlist">
                                        <div class="row">
                                          <div class="col-md-12 acc-head">
                                            <h6>${element.attachment_name}</h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <ul class="acnav__list acnav__list--level2 wbg br-10">
                                      <li class="has-children">
                                        <div class="acnav__label acnav__label--level2">
                                          <div class="accordionlist">
                                            <div class="row">
                                              <div class="col-md-12 acc-text">`;
                    if(element.attachment_type.split('/')[0] === 'image'){
                          module_attachments_html +=`<img class="w-100"src="https://elearningcontent.zaigoinfotech.com${element.attachment}" alt="${element.attachment_name}">`;
                    }else if(element.attachment_type.split('/')[0] === 'video'){
                        module_attachments_html +=`<video id='video' controls preload='none' width="600" poster=""><source id='mp4' src="https://elearningcontent.zaigoinfotech.com${element.attachment}" type='video/mp4' /><p>Your user agent does not support the HTML5 Video element.</p></video>`;
                    }else if(element.attachment_type.split('/')[0] === 'audio'){
                        module_attachments_html +=`<audio controls><source src="https://elearningcontent.zaigoinfotech.com${element.attachment}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
                    }else if(element.attachment_type.split('/')[0] === 'pdf'){
                        module_attachments_html +=`<object data="../assets/images/sample.pdf" type="application/pdf" class="course_module_pdf" width="100%" height="100%"><p>Alternative text - include a link <a href="../assets/images/sample.pdf">to the PDF!</a></p></object>`;
                    }
                    /*else if(element.attachment_type.split('/')[0] === 'text'){
                        module_attachments_html +=``;
                    }*/
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
        if(module_tags.length > 0){
            module_tags_html +=`<ul class="acnav__list acnav__list--level2 wbg br-10">
                              <li class="has-children">
                                <div class="acnav__label acnav__label--level2">
                                  <div class="accordionlist">
                                    <div class="row">
                                      <div class="col-md-12 acc-text">
                                      </div>
                                      <div class="col-md-12 p-3 mtag">
                                        <div class="tag__container">
                                          <input type="text" class="tag__input" placeholder="+ Add Tag">
                                          <ul class="tag__List">`;
                                          module_tags.forEach(function (element, index) {
                                            module_tags_html +=`<li>${element.tag_name}</li>`;
                                          });
                module_tags_html +=`</ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>`;
        }
        document.getElementById("course_module_content").innerHTML = module_content_html+module_attachments_html;

      },
      error: function(error) {
        toastr.error("Response Error: " + error.message);
        console.log(error);
      }
    });
}

$(".show-more").on("click", function() {
  var $this = $(this); 
  var $content = $this.prev("ul.content");
  var linkText = $this.text().toUpperCase();   
  if(linkText === "MORE >>"){
      linkText = "<< Less";
      $content.switchClass("hideContent", "showContent", 400);
      $this.switchClass("showmore", "showless", 1);
  } else {
      linkText = "More >>";
      $content.switchClass("showContent", "hideContent", 400);
      $this.switchClass("showless", "showmore", 1);
  };

  $this.text(linkText);
});  
$('ul.tab-s li').click(function(){
    var $this = $(this);
    var $theTab = $(this).attr('id');
    if($this.hasClass('active')){
      // do nothing
    } else{
      $this.closest('.tabs_wrapper').find('ul.tab-s li, .tabs_container .tab_content').removeClass('active');
      $('.tabs_container .tab_content[data-tab="'+$theTab+'"], ul.tab-s li[id="'+$theTab+'"]').addClass('active');
    }
    
  });
  
/*******************multiple tag list************************/
document.addEventListener("keyup", function(e){
    if (e.keyCode === 13 && e.target.classList.contains("tag__inputs2")) {
    const currentTag = e.target.value;
    if(currentTag){
      const hiddenInput = e.target.nextElementSibling.nextElementSibling.nextElementSibling;
      const hiddenInputOldValue = hiddenInput.value;
      
      const existingTags = getExistingTagAsArray(hiddenInputOldValue);
      const isTagExistAlready = checkIfTagExistAlready(existingTags, currentTag);
      
      if(isTagExistAlready){ return; }
      
      if(hiddenInputOldValue){
        hiddenInput.value = hiddenInputOldValue + "," + currentTag;
      }else{
        hiddenInput.value = currentTag;       
      }
      
     let cid = document.getElementById("course_module_id").getAttribute("data-cid");
     let module_id_val = document.getElementById("course_module_id").getAttribute("data-module_id");
      var tag_data = {
          "tag_name": currentTag,
          "module_id": module_id_val,
          "course_id": cid
      }
      $.ajax({
        url: 'https://elearningcontent.zaigoinfotech.com/course_tags/?course_id='+cid+'&module_id='+module_id_val,
        type: 'POST',
        data: JSON.stringify(tag_data),
        contentType: "application/json; charset=utf-8",
        success:function(response){
          const newTag = ` <li>${currentTag}<span class="tag__removes tag__removes2" data-tag="${currentTag}" data-tagid="${response.id}">×</span></li>`;
          e.target.nextElementSibling.insertAdjacentHTML("beforeend", newTag);
          e.target.value = "";
        }
      });
    }
    }
});

document.addEventListener("click", function(e){
    if (e.target.classList.contains("tag__removes2")) {
    const currentTag = e.target.dataset.tag;
    const hiddenInput = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling;  
    const hiddenInputOldValue = hiddenInput.value;
    
    const existingTags = getExistingTagAsArray(hiddenInputOldValue);
    const isTagExistAlready = checkIfTagExistAlready(existingTags, currentTag);
    
    if(isTagExistAlready){
      const updatedInputValueAsArray = existingTags.filter((tag) => {
        return tag != currentTag 
      });
      const updatedInputValue = updatedInputValueAsArray.join(",");
      
      hiddenInput.value = updatedInputValue;
      var tag_id = e.target.dataset.tagid;
      if(tag_id !== ''){
        $.ajax({
          url: 'https://elearningcontent.zaigoinfotech.com/course_tags/'+tag_id+'/',
          type: 'DELETE',
          contentType: "application/json; charset=utf-8",
          success:function(response){
            e.target.parentElement.remove();
          }
        });
      }
    }
  }
});

const getExistingTagAsArray = (allTags) => {
  let existingTagsAsArray = [];
  
  if(allTags.includes(",")){
    existingTagsAsArray = allTags.split(",");
  }
  
  return existingTagsAsArray;
}

const checkIfTagExistAlready = (allTags, currentTag) => {
  if(allTags.includes(currentTag)){ 
    return true;
  }else{
    return false;
  }
}

  /*$("#saveCourses").on("click", function() {
       let cid = document.getElementById("course_module_id").getAttribute("data-cid");
       let module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
      var formData = new FormData();
      var todayDate = new Date().toISOString().slice(0, 10);
      $.each($('input[name^="courseFile_module"]')[0].files, function(i, file) {
        formData.append("attachment", file);
        formData.append("attachment_type", file.type);
        formData.append("attachment_name", file.name);
        formData.append("created_date", todayDate);
        formData.append("status", 0);
        formData.append("module_id", module_id);
        formData.append("course_id", cid);
        $.ajax({
          url: "https://elearningcontent.zaigoinfotech.com/module_attachment/",
          method: "POST",
          type: 'POST', // For jQuery < 1.9
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          headers: {
            "Authorization" : "Bearer " + getUserInfo().access_token
          },
          success: function(response){
            $('#addCourses').modal('hide');
            toastr.success("New course information was successfully saved.");
            console.log(response);
          },
          error: function(error) {
            toastr.error("Response Error: " + error.message);
            console.log(error);
          }
        });
      });
      //for (var pair of formData.entries()) {
       //   console.log(pair[0]+ ', ' + pair[1]); 
     // }
    });*/

    var trackPath = false;
      var tinyContentData;
      tinymce.remove("#tiny");
      tinyMCE.init({
        selector: "#tiny",
        height: 600,
        width: "100%",
        menubar: false,
        branding: false,
        deprecation_warnings: false,
        image_advtab: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount imagetools'
        ],
        toolbar: 'undo redo | link image media | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent charmap | removeformat | code | trackpath',
        imagetools_cors_hosts: ['localhost', 'eicit.sa'],
        imagetools_proxy: 'proxy.php',
        extended_valid_elements : "video[controls|preload|width|height|data-setup],source[src|type]",
        image_list: [
          {title: 'Zaigo', value: 'https://www.zaigoinfotech.com/wp-content/uploads/2020/11/logo.png'},
          {title: 'Exper', value: 'https://elearning.zaigoinfotech.com/assets/images/logo.png'}
        ],
        audio_template_callback: function(data) {
          return '<audio controls>' + '\n<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + 
            ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</audio>';
        },        
        setup:function(ed) {
          ed.on('init', function (e) {
            //loadextData(ed);
          });
          ed.ui.registry.addButton('trackpath', {
            icon: 'insert-time',
            tooltip: 'Toggle Track',
            onAction: function (_) {
              // ed.insertContent(toTimeHtml(new Date()));
              console.log("Before Button : " + window.trackPath);
              if(window.trackPath) {
                window.trackPath = false;
                $(".trackBGColor").hide().prev("div").removeClass("col-8").addClass("col-12");
              } else{
                window.trackPath = true;
                $(".trackBGColor").show().prev("div").removeClass("col-12").addClass("col-8");
              }
              console.log("After Button : " + window.trackPath);
            },
            onSetup: function (buttonApi) {
              var editorEventCallback = function (eventApi) {
                // buttonApi.setDisabled(window.trackPath === false);
              };
              ed.on('NodeChange', editorEventCallback);
              /* onSetup should always return the unbind handlers */
              return function (buttonApi) {
                ed.off('NodeChange', editorEventCallback);
              };
            },
          });
        }
      });

      function loadextData(ed){
        $(".trackSidebar").html("");
        var content = '';
        $.getJSON("../assets/pages/courses/data.js?t=" + Math.floor(Date.now() / 1000), function(result){
          tinyContentData = result;
          $.each(result, function(i, field){
            $(".trackSidebar").append(field.nav);
            content = field.content;
          });
          //load saved content 
          ed.setContent(content);
          //trackItems
          var selContent;
          $(".trackItems").on("click", function() {
            $(".trackItems").find("div").removeClass("active");
            var id = $(this).data("id");
            let obj = tinyContentData.find((o, i) => {
              if(o.id == id) {
                selContent = o.content;
                return true;
              }
            });
            if(selContent) {
              ed.setContent(selContent);
              $(this).find("div").addClass("active");
            }
          });
        });
      }
      
      $( document ).ready(function() {
        /*$("#save-content").on("click", function() {
          var newData = tinymce.activeEditor.getContent();
          $.post('../assets/pages/courses/savejson.php', {
            newData: newData
          }, function(response){
            // response could contain the url of the newly saved file
            loadextData(tinymce.activeEditor);
          })          
        });*/
        $("#saveCourses").on("click", function() {
        let cid = document.getElementById("course_module_id").getAttribute("data-cid");
        let module_id = document.getElementById("course_module_id").getAttribute("data-module_id");
          var newData = tinymce.activeEditor.getContent();

          var module_content_id = document.getElementById("saveCourses").getAttribute("data-module_content_id");
          console.log(module_content_id);
          var method_type = "POST";
          var URL  = 'https://elearningcontent.zaigoinfotech.com/course_content/';
          if(module_content_id && module_content_id !== null){
            method_type = "PUT";
            URL  = 'https://elearningcontent.zaigoinfotech.com/course_content/'+module_content_id+'/';
          }
          if(newData !== ''){
            var content_data = {
              "course_id": cid,
              "module_id": module_id,
              "content": newData,
              "revision_label":""
            }
            $.ajax({
              url: URL,
              type: method_type,
              data: JSON.stringify(content_data),
              contentType: "application/json; charset=utf-8",
              success:function(response){
                toastr.success("Content has been saved.");
                console.log(response);
              }
            });
          }else{
            toastr.error("Please Write a Content.");
          }
          //loadextData(tinymce.activeEditor);
        });
      });
      