let clicked = false;
window.addEventListener("DOMContentLoaded", function () {
    let navbarMobileMenu = document.getElementsByClassName("mobile_nav_menu")[0];
    navbarMobileMenu.addEventListener("click", function () {
        if (clicked == false) {
            document.getElementsByClassName("mobile_nav_items")[0].style.display = "flex";
            clicked = true;
        }
        else {
            document.getElementsByClassName("mobile_nav_items")[0].style.display = "none";
            clicked = false;
        }
    })
});

function CloseMenu() {
    document.getElementsByClassName("mobile_nav_items")[0].style.display = "none";
    clicked = false;
}
