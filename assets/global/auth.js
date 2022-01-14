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
      }
  }
  // will remove the localStorage item and redirect to login  screen
  logOut() {
    localStorage.removeItem("auth");
    localStorage.removeItem("auth_type");
    localStorage.removeItem("auth_user");
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