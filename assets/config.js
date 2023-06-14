//API_BASE_URL - Base URL for API
let API_BASE_URL = "https://elearningadmin.zaigoinfotech.com";
let API_CONTENT_URL = "https://elearningcontent.zaigoinfotech.com";
let SITE_URL_PROTOCOL = window.location.protocol + "//" + window.location.hostname;
console.log(SITE_URL_PROTOCOL);
let USER_ENGINE_API_URL = "https://elearningadmin.zaigoinfotech.com/api/v1/ue/";
let CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";
if (SITE_URL_PROTOCOL === "http://127.0.0.1"){
	SITE_URL_PROTOCOL = "http://127.0.0.1:5500/";
  API_BASE_URL = "https://qaadmin.exper.com";
  API_CONTENT_URL = "https://qacontent.exper.com";
  USER_ENGINE_API_URL = "https://qaadmin.exper.com/api/v1/ue/";
  CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";
} else if(SITE_URL_PROTOCOL === "http://94.177.203.98"){
	SITE_URL_PROTOCOL = "http://94.177.203.98/exper-js-new/";
  USER_ENGINE_API_URL = "https://elearningadmin.zaigoinfotech.com/api/v1/ue/";
  CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";
} else if(SITE_URL_PROTOCOL === "http://localhost"){
	SITE_URL_PROTOCOL = "http://localhost/elearning/";
  // API_BASE_URL = "https://elearningadmin.zaigoinfotech.com";
  // API_CONTENT_URL = "https://elearningcontent.zaigoinfotech.com";
  // USER_ENGINE_API_URL = "https://elearningadmin.zaigoinfotech.com/api/v1/ue/";

  API_BASE_URL = "https://uatadmin.exper.com";
  API_CONTENT_URL = "https://uatcontent.exper.com";
  USER_ENGINE_API_URL = "https://uatadmin.exper.com/api/v1/ue/";
  CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";
}else if(SITE_URL_PROTOCOL === "https://localhost"){
	SITE_URL_PROTOCOL = "https://localhost/elearning/";
  // API_BASE_URL = "https://elearningadmin.zaigoinfotech.com";
  // API_CONTENT_URL = "https://elearningcontent.zaigoinfotech.com";
  // USER_ENGINE_API_URL = "https://elearningadmin.zaigoinfotech.com/api/v1/ue/";

  API_BASE_URL = "https://uatadmin.exper.com";
  API_CONTENT_URL = "https://uatcontent.exper.com";
  USER_ENGINE_API_URL = "https://uatadmin.exper.com/api/v1/ue/";
  CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";
} else if(SITE_URL_PROTOCOL === "https://elearning.zaigoinfotech.com"){
	SITE_URL_PROTOCOL = "https://elearning.zaigoinfotech.com/";
  API_BASE_URL = "https://elearningadmin.zaigoinfotech.com";
  API_CONTENT_URL = "https://elearningcontent.zaigoinfotech.com";
  USER_ENGINE_API_URL = "https://elearningadmin.zaigoinfotech.com/api/v1/ue/";
  CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";
} else if(SITE_URL_PROTOCOL === "https://qacas.exper.com"){
	SITE_URL_PROTOCOL = "https://qacas.exper.com/";
  API_BASE_URL = "https://qaadmin.exper.com";
  API_CONTENT_URL = "https://qacontent.exper.com";
  USER_ENGINE_API_URL = "https://qaadmin.exper.com/api/v1/ue/";
  CHAT_BOT_API = "https://experapi.buildchatbot.ai/api/v1/";

}else if(SITE_URL_PROTOCOL === "https://cas.exper.com"){
	SITE_URL_PROTOCOL = "https://cas.exper.com/";
  API_BASE_URL = "https://admin.exper.com";
  API_CONTENT_URL = "https://content.exper.com";
  USER_ENGINE_API_URL = "https://admin.exper.com/api/v1/ue/";

}else if(SITE_URL_PROTOCOL === "https://uatcas.exper.com"){
  SITE_URL_PROTOCOL = "https://uatcas.exper.com/";
  API_BASE_URL = "https://uatadmin.exper.com";
  API_CONTENT_URL = "https://uatcontent.exper.com";
  USER_ENGINE_API_URL = "https://uatadmin.exper.com/api/v1/ue/";

}else if(SITE_URL_PROTOCOL === "https://precas.exper.com"){
  SITE_URL_PROTOCOL = "https://precas.exper.com/";
  API_BASE_URL = "https://preadmin.exper.com";
  API_CONTENT_URL = "https://precontent.exper.com";
  USER_ENGINE_API_URL = "https://preadmin.exper.com/api/v1/ue/";

}

console.log(SITE_URL_PROTOCOL);
/* Firebase */
// var firebaseConfig = {
//   apiKey: "AIzaSyAdLTHIe9poMMrgL46G-NtUfSGRqkGvYN8",
//   authDomain: "feroz-shaik-8613.firebaseapp.com",
//   databaseURL: "https://feroz-shaik-8613.firebaseio.com",
//   projectId: "feroz-shaik-8613",
//   storageBucket: "feroz-shaik-8613.appspot.com",
//   messagingSenderId: "651394549638",
//   appId: "1:651394549638:web:b23db54c5290e7b3808e07",
//   measurementId: "G-KESL97HP8Q"
// };


const firebaseConfig = {
  apiKey: "AIzaSyDN823YYTyKnOqF_n9nP29wDjCm1QCdxeY",
  authDomain: "medvarsity-tech.firebaseapp.com",
  projectId: "medvarsity-tech",
  storageBucket: "medvarsity-tech.appspot.com",
  messagingSenderId: "410925001844",
  appId: "1:410925001844:web:3ffd7ec159e8c2e79ef521",
  measurementId: "G-MLES59N18V"
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
