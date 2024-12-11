document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    const menuButton = document.querySelector("i.fa-solid.fa-bars");
    const mobileMenu = document.querySelector("nav ul.minimized-menu");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((a) => {
        a.classList.remove("active");
      });

      item.classList.add("active");
      mobileMenu.classList.remove("active");
    });
  });


  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

});
