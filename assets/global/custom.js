/**************sidenav and header include*************/
function withJquery() {
  console.time("time1");
  var temp = $("<input>");
  $("body").append(temp);
  temp.val($("#copyText1").text()).select();
  document.execCommand("copy");
  temp.remove();
  console.timeEnd("time1");
}
/**************sidenav and header include*************/

/**************side nav click*************/
var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
if(menu_btn !== null) {
  menu_btn.addEventListener("click", function () {
    sidebar.classList.toggle("active-nav");
    container.classList.toggle("active-cont");
  });
}
/**************side nav click*************/

/**************sub nav click*************/
$(".sub-menu ul").hide();
$(".sub-menu a").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
});
/**************sub nav click*************/

/**************semi progress bar*************/
$(".progress").each(function () {
  var $bar = $(this).find(".bar");
  var $val = $(this).find("span");
  var perc = parseInt($val.text(), 10);

  $({ p: 0 }).animate(
    { p: perc },
    {
      duration: 3000,
      easing: "swing",
      step: function (p) {
        $bar.css({
          transform: "rotate(" + (45 + p * 1.8) + "deg)", // 100%=180° so: ° = % * 1.8
          // 45 is to add the needed rotation to have the green borders at the bottom
        });
        $val.text(p | 0);
      },
    }
  );
});
/**************semi progress bar*************/

/**************multiple accordion*************/
$(".acnav__label").click(function () {
  var label = $(this);
  var parent = label.parent(".has-children");
  var list = label.siblings(".acnav__list");

  if (parent.hasClass("is-open")) {
    list.slideUp("fast");
    parent.removeClass("is-open");
  } else {
    list.slideDown("fast");
    parent.addClass("is-open");
  }
});
/**************multiple accordion*************/

/**************tooltip*************/
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
/**************tooltip*************/

/**************notification start*************/
function reveal() {
  if (document.getElementById("hidden-div").style.display == "block") {
    document.getElementById("hidden-div").style.display = "none";
  } else {
    document.getElementById("hidden-div").style.display = "block";
  }
}
/**************notification end*************/

/*******************multiple tag list************************/
document.addEventListener("keyup", function(e){
    if (e.keyCode === 13 && e.target.classList.contains("tag__input")) {
		const currentTag = e.target.value;
		if(currentTag){
			const hiddenInput = e.target.nextElementSibling.nextElementSibling;
			const hiddenInputOldValue = hiddenInput.value;
			
			const existingTags = getExistingTagAsArray(hiddenInputOldValue);
			const isTagExistAlready = checkIfTagExistAlready(existingTags, currentTag);
			
			if(isTagExistAlready){ return; }
			
			if(hiddenInputOldValue){
				hiddenInput.value = hiddenInputOldValue + "," + currentTag;
			}else{
				hiddenInput.value = currentTag;				
			}
			
			const newTag = ` <li>${currentTag}<span class="tag__remove" data-tag=${currentTag}>×</span></li>`;
			e.target.nextElementSibling.insertAdjacentHTML("beforeend", newTag);
			e.target.value = "";
		}
    }
});

document.addEventListener("click", function(e){
    if (e.target.classList.contains("tag__remove")) {
		const currentTag = e.target.dataset.tag;
		const hiddenInput = e.target.parentElement.parentElement.nextElementSibling;	
		const hiddenInputOldValue = hiddenInput.value;
		
		const existingTags = getExistingTagAsArray(hiddenInputOldValue);
		const isTagExistAlready = checkIfTagExistAlready(existingTags, currentTag);
		
		if(isTagExistAlready){
			const updatedInputValueAsArray = existingTags.filter((tag) => {
				return tag != currentTag 
			});
			const updatedInputValue = updatedInputValueAsArray.join(",");
			
			hiddenInput.value = updatedInputValue;
		}
			
		e.target.parentElement.remove();
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
/*******************multiple tag list************************/

/**************Drag and Drop*************/
$(init);

function init() {
  $('a[href="#"]').click( function(e) { e.preventDefault(); });
  if($( ".droppable-area1" ).length > 0) {
    $(".droppable-area1")
      .sortable({
        connectWith: ".connected-sortable",
        stack: ".connected-sortable ul",
      })
      .disableSelection();
  }

  if($( ".droppable-area2" ).length > 0) {
    $(".droppable-area2")
      .sortable({
        connectWith: ".connected-sortable",
        stack: ".connected-sortable div",
      })
      .disableSelection();
  }
}
/**************Drag and Drop*************/

/**************select and deselect checkbox*************/
function selects() {
  console.log("hello");

  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true) {
    console.log("hai");

    var ele = document.getElementsByName("chk");
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == "checkbox") {
        ele[i].checked = true;
      }
    }
  } else {
    var ele = document.getElementsByName("chk");
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == "checkbox") {
        ele[i].checked = false;
      }
    }
  }
}

/**************select and deselect checkbox*************/

document.addEventListener('DOMContentLoaded', getLanguage);

function getLanguage(){
  const l = document.getElementsByTagName("*");
  for(i = 0;  i<l.length; i++) {
    //Label / Text
    if( typeof(l[i].dataset.lang) !== "undefined" ) {
      if(typeof(window.language[l[i].dataset.lang]) !== "undefined") {
        l[i].innerHTML = window.language[l[i].dataset.lang];
      }
    }
    //placeholder
    if( typeof(l[i].dataset.placeholder) !== "undefined" ) {
      if(typeof(window.language[l[i].dataset.placeholder]) !== "undefined") {
        l[i].placeholder = window.language[l[i].dataset.placeholder];
      }
    }
  }
}