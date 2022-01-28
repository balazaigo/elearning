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
    /*$.ajax({
      url: 'https://elearningcontent.zaigoinfotech.com/module/'+module_id+'/',
      type: 'get',
      dataType: 'json',
      success:function(response){
        console.log(response);
      }
    });*/
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