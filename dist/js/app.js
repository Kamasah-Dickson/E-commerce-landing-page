const menu = document.querySelector(".hamburger");
const close_menu = document.querySelector(".close");
const nav_lightbox = document.querySelector(".lightbox");
const mobile_navigation = document.querySelector(".mobile-navigation");
const nav = document.querySelector(".nav-links");
const nav_links = nav.querySelectorAll("li");
const header = document.querySelector("header");
const sneaker_container = document.querySelector(".review-sneakers");
const main_review = document.querySelector(".showcase img");
const trackData = JSON.parse(localStorage.getItem("data")) || [];

window.addEventListener("DOMContentLoaded", () => {
	shoeReview();
});

const showcase = [
	{
		id: 1,
		img: "./images/image-product-1.jpg",
	},
	{
		id: 1,
		img: "./images/image-product-2.jpg",
	},
	{
		id: 1,
		img: "./images/image-product-3.jpg",
	},
	{
		id: 1,
		img: "./images/image-product-4.jpg",
	},
];

sneaker_container.addEventListener("click", (e) => {
	let img = e.target.src;
	let ImgID = parseInt(e.target.id);
	main_review.src = img;
	img = img.slice(21);

	// console.log(img);

	let results = trackData.find((data) => {
		return data.id === ImgID;
	});
	if (results === undefined) {
		trackData.push({
			id: ImgID,
			img: img,
		});
	} else {
		results.id = ImgID;
		results.img = img;
	}
	localStorage.setItem("data", JSON.stringify(trackData));
});

function shoeReview() {
	main_review.src = `.${trackData[0].img}`;

	data = localStorage.getItem("active");
	sneakers[data].classList.add("active");
	localStorage.setItem("active", data);
}

function generateShoe() {
	return (sneaker_container.innerHTML = showcase
		.map((shoe, index) => {
			let { id, img } = shoe;
			return `
			<div class="thumb" id ="${id}" data-index ="${index}">
			<img
			class="sneaker" id ="${id}"
			src="${img}"
			alt="sneakers"/>
			</div>`;
		})
		.join(""));
}
generateShoe();

const sneakers = document.querySelectorAll(".thumb");

sneakers.forEach((sneaker) => {
	sneaker.addEventListener("click", () => {
		data = sneaker.dataset.index;

		sneakers.forEach((sneaker) => {
			sneaker.classList.remove("active");
		});
		sneakers[data].classList.add("active");
		localStorage.setItem("active", data);
	});
});

window.addEventListener("scroll", scrolling);

function scrolling() {
	if (
		document.body.scrollTop >= 80 ||
		document.documentElement.scrollTop >= 80
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
