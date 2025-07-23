const imageSources = {
  camplife: [
    "./assets/images/projects/camplife/home.png",
    "./assets/images/projects/camplife/login.png",
    "./assets/images/projects/camplife/book.png",
    "./assets/images/projects/camplife/reviews.png",
  ],
  theturn: [
    "./assets/images/projects/theturn/theturn.png",
  ]
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

    projectElement
      .querySelector(".fa-chevron-left")
      .addEventListener("click", () => {
        updateImage(projectClass, "left");
      });

    projectElement
      .querySelector(".fa-chevron-right")
      .addEventListener("click", () => {
        updateImage(projectClass, "right");
      });
  });
});

function updateImage(projectClass, direction) {
  const projectImages = imageSources[projectClass];
  let currentIndex = currentIndexes[projectClass];

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
