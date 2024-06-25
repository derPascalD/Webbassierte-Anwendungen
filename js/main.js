document.addEventListener('DOMContentLoaded', function () {

    var loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const loginBereich = document.getElementById('login_bereich');
            loginBereich.style.display = 'none';
            const logoutDiv = document.getElementById("logOut");
            logoutDiv.style.display = "block";
        });
    } else {
        console.error('Das Element mit der ID "loginForm" wurde nicht gefunden.');
    }
});




function doLogout() {

    const logoutDiv = document.getElementById("logOut");
    logoutDiv.style.display = "none";
    const loginBereich = document.getElementById('login_bereich');
    loginBereich.style.display = 'block';

}
