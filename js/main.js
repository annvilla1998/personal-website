const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", function () {
        navItems.forEach(a => {
            a.classList.remove("active");
        })

        item.classList.add("active");
    })
})