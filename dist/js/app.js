const menu = document.querySelector(".hamburger");
const close_menu = document.querySelector(".close");
const nav_lightbox = document.querySelector(".lightbox");
const mobile_navigation = document.querySelector(".mobile-navigation");
const nav = document.querySelector(".nav-links");
const nav_links = nav.querySelectorAll("li");
const header = document.querySelector("header");
const sneakers = document.querySelectorAll(".thumb");

window.addEventListener("scroll", scrolling);

function scrolling() {
	if (
		document.body.scrollTop >= 70 ||
		document.documentElement.scrollTop >= 70
	) {
		header.classList.add("active-scroll");
	} else {
		header.classList.remove("active-scroll");
	}
}

menu.addEventListener("click", () => {
	mobile_navigation.classList.add("show-nav");
	nav_lightbox.classList.add("show-lightbox");
});

close_menu.addEventListener("click", () => {
	mobile_navigation.classList.remove("show-nav");
	nav_lightbox.classList.remove("show-lightbox");
});
nav_lightbox.addEventListener("click", (e) => {
	if (e.target.classList.contains("lightbox")) {
		mobile_navigation.classList.remove("show-nav");
		nav_lightbox.classList.remove("show-lightbox");
	}
});

nav_links.forEach((nav, index) => {
	nav.addEventListener("click", () => {
		nav_links.forEach((nav) => {
			nav.classList.remove("active");
		});
		nav_links[index].classList.add("active");
	});
});

sneakers.forEach((sneaker, index) => {
	sneaker.addEventListener("click", () => {
		sneakers.forEach((sneaker) => {
			sneaker.classList.remove("active");
		});
		sneakers[index].classList.add("active");
	});
});
