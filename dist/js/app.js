const menu = document.querySelector(".hamburger");
const close_menu = document.querySelector(".close");
const nav_lightbox = document.querySelector(".lightbox");
const mobile_navigation = document.querySelector(".mobile-navigation");

menu.addEventListener("click", () => {
	mobile_navigation.classList.add("show-nav");
	nav_lightbox.classList.add("show-lightbox");
});

close_menu.addEventListener("click", () => {
	mobile_navigation.classList.remove("show-nav");
	nav_lightbox.classList.remove("show-lightbox");
});
nav_lightbox.addEventListener("click", () => {
	mobile_navigation.classList.remove("show-nav");
	nav_lightbox.classList.remove("show-lightbox");
});
