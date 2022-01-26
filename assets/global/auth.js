class Auth {
   // setup the class and hide the body by default
  constructor() {
    document.querySelector("body").style.display = "none";
    const auth = localStorage.getItem("auth");
    this.validateAuth(auth);
  }
  // check to see if the localStorage item passed to the function is valid and set
  validateAuth(auth) {
      if (auth != 1) {
        window.location.replace(SITE_URL_PROTOCOL);
      } else {
        document.querySelector("body").style.display = "block";
        setUserInfo ( window.getUserInfo() );
      }
  }
  // will remove the localStorage item and redirect to login  screen
  logOut() {
    localStorage.removeItem("auth");
    localStorage.removeItem("auth_type");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_data");
    window.location.replace(SITE_URL_PROTOCOL);
  }
}
const auth = new Auth();
var logoutTag = document.querySelector(".logout");
if (logoutTag !== null) {
  logoutTag.addEventListener("click", (e) => {
    auth.logOut();
  });    
}

function getUserInfo(){
  const authData = localStorage.getItem("auth_data");
  return JSON.parse(authData);
}

function setUserInfo(authData){
  if(authData !== null) {
    //console.log(authData.rights);
    $("#dropdownMenuButton1").html('<span>' + authData.name.substring(0, 15) + '</span>' + '<span class="user-role">' + authData.role + '</span>');
    $(".fullname").html(authData.name);
  }
}