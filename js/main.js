const imageSources = {
  "crown-clothing": [
    "./assets/images/projects/crown-clothing/home.png",
    "./assets/images/projects/crown-clothing/login.png",
    "./assets/images/projects/crown-clothing/cart.png",
    "./assets/images/projects/crown-clothing/checkout.png",
    "./assets/images/projects/crown-clothing/checkout-2.png",
  ],
  theturn: ["./assets/images/projects/theturn/theturn.png"],
};
const currentIndexes = {
  camplife: 0,
  "crown-clothing": 0,
  wedding: 0,
};

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

  document.querySelectorAll(".project").forEach((projectElement) => {
    const projectClass =
      projectElement.querySelector(".project-container").classList[1];

    const leftArrow = projectElement.querySelector(".fa-chevron-left");
    const rightArrow = projectElement.querySelector(".fa-chevron-right");

    if (!rightArrow || !leftArrow) {
      return;
    }

    rightArrow.addEventListener("click", () => {
      updateImage(projectClass, "right");
    });
    leftArrow.addEventListener("click", () => {
      updateImage(projectClass, "left");
    });
  });
});

function updateImage(projectClass, direction) {
  const projectImages = imageSources[projectClass];
  let currentIndex = currentIndexes[projectClass];

  if (projectImages.length <= 1) {
    return;
  }

  if (direction === "left") {
    currentIndex =
      (currentIndex - 1 + projectImages.length) % projectImages.length;
  } else if (direction === "right") {
    currentIndex = (currentIndex + 1) % projectImages.length;
  }

  const projectContainer = document.querySelector(
    `.project-container.${projectClass}`
  );
  const imgElement = projectContainer.querySelector("img");
  imgElement.src = projectImages[currentIndex];

  currentIndexes[projectClass] = currentIndex;
}
