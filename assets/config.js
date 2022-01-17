//API_BASE_URL - Base URL for API
const API_BASE_URL = "https://elearningadmin.zaigoinfotech.com";
let SITE_URL_PROTOCOL = window.location.protocol + "//" + window.location.hostname;

if (SITE_URL_PROTOCOL === "http://127.0.0.1"){
	SITE_URL_PROTOCOL = "http://127.0.0.1:5500/";
}else if(SITE_URL_PROTOCOL === "http://94.177.203.98"){
	SITE_URL_PROTOCOL = "http://94.177.203.98/exper-js-new/";
}else if(SITE_URL_PROTOCOL === "https://localhost"){
	SITE_URL_PROTOCOL = "https://localhost/elearning/";
}

console.log(SITE_URL_PROTOCOL);
/* Firebase */
var firebaseConfig = {
  apiKey: "AIzaSyAdLTHIe9poMMrgL46G-NtUfSGRqkGvYN8",
  authDomain: "feroz-shaik-8613.firebaseapp.com",
  databaseURL: "https://feroz-shaik-8613.firebaseio.com",
  projectId: "feroz-shaik-8613",
  storageBucket: "feroz-shaik-8613.appspot.com",
  messagingSenderId: "651394549638",
  appId: "1:651394549638:web:b23db54c5290e7b3808e07",
  measurementId: "G-KESL97HP8Q"
};

if(window.toastr !== undefined) {
  window.toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "500",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
}
