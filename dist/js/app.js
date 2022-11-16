const menu = document.querySelector(".hamburger");
const close_menu = document.querySelector(".close");
const nav_lightbox = document.querySelector(".lightbox");
const mobile_navigation = document.querySelector(".mobile-navigation");
const nav = document.querySelector(".nav-links");
const nav_links = nav.querySelectorAll("li");
const header = document.querySelector("header");
const sneaker_container = document.querySelector(".review-sneakers");
const main_review = document.querySelector(".showcase img");
const range = document.querySelector(".range");
const cartIcon = document.querySelector(".cart img");
const checkOut = document.querySelector(".checkout");
const checkoutBtn = document.querySelector(".button");

const cart = JSON.parse(localStorage.getItem("cart")) || []; //checkout cart
const trackData = JSON.parse(localStorage.getItem("data")) || [];

window.addEventListener("DOMContentLoaded", () => {
	shoeReview();
	createCart();
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
	let shoeIndex = main_review.setAttribute(
		"data-index",
		e.target.dataset.index
	);
	main_review.src = img;
	img = img.slice(21);

	let results = trackData.find((data) => {
		return data.id === ImgID;
	});
	if (results === undefined) {
		trackData.push({
			id: ImgID,
			img: img,
			index: shoeIndex,
		});
	} else {
		results.id = ImgID;
		results.img = img;
	}
	localStorage.setItem("data", JSON.stringify(trackData));
});

function shoeReview() {
	const data = JSON.parse(localStorage.getItem("active")) || [0];
	main_review.setAttribute("data-index", data);
	sneakers[data].classList.add("active");
	main_review.src = sneakers[data].querySelector(".sneaker").src;
	localStorage.setItem("active", data);
}

let index = JSON.parse(localStorage.getItem("active"));
main_review.setAttribute("data-index", index);

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
document.querySelectorAll(".thumb img").forEach((img, index) => {
	img.setAttribute("data-index", index);
});

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

// ==============checkout==============
cartIcon.addEventListener("click", () => {
	if (checkOut.classList.contains("show")) {
		checkOut.classList.remove("show");
	} else {
		checkOut.classList.add("show");
	}
});

let counter = document.querySelector(".count");
let count = 0;
range.addEventListener("click", (e) => {
	if (e.target.classList.contains("plus")) {
		increment(counter);
	} else if (e.target.classList.contains("minus")) {
		decrement(counter);
	}
});

// =============================

checkoutBtn.addEventListener("click", () => {
	if (counter.textContent == 0) {
		return;
	} else {
		updateCartInStorage();
		if (cart.length >= 0) {
			cartIcon.parentElement.dataset.count = cart.length;
			cartIcon.parentElement.classList.add("before");
		} else {
			cartIcon.parentElement.classList.remove("before");
		}
	}
});

function createCart() {
	const items = document.createElement("div");
	items.className = "items";
	checkOut.appendChild(items);
	if (cart.length !== 0) {
		checkOut.classList.add("scroll");
		checkOut.querySelector("h2").style.display = "none";
		items.innerHTML = cart
			.map((cartData) => {
				let search = cart.find((data) => data.index === cartData.index) || [];
				let img = search.sneaker.slice(21);
				let { index, items } = search;
				return `
				<div class="wrapper" data-index="${index}">
				
					<div class="sneaker-checkout">
				<div class="sneaker-img" data-index ="${index}">
				<img src=".${img}" />
				</div>
				<div class="details">
				<p>Fall Limited Edition Sneakers...</p>
				<p>
					$120.00 X ${items} <span>$375.00</span>
				</p>
				</div>
				<img src="./images/icon-delete.svg" alt="delete" class="delete" data-index="${index}" />
				</div>
				<button>checkout</button>
				</div>

	`;
			})
			.join("");

		document.querySelectorAll(".items").forEach((items) => {
			items.addEventListener("click", (e) => {
				e.stopImmediatePropagation();
				if (e.target.classList.value == "delete") {
					e.target.closest(".items").remove();
					deleteFromStorage(e.target);
					cartIcon.parentElement.dataset.count = cart.length;
					if (cartIcon.parentElement.dataset.count == 0) {
						cartIcon.parentElement.classList.remove("before");
					}
				}
			});
		});
	} else {
		checkOut.querySelector("h2").style.display = "flex";
		items.style.display = "none";
	}
}
// =======================================

function deleteFromStorage(btn) {
	let search = cart.find((data) => data.index === btn.dataset.index) || [];
	if (search === undefined) {
		return;
	} else {
		cart.splice(search, 1);
		if (cart.length == 0) {
			checkOut.querySelector("h2").style.display = "flex";
		}
		localStorage.setItem("cart", JSON.stringify(cart));
	}
}

function increment(counter) {
	count += 1;
	counter.innerHTML = count;
}
function decrement(counter) {
	if (counter.innerHTML <= 0) {
		return;
	} else {
		count -= 1;
		counter.innerHTML = count;
	}
}

function updateCartInStorage() {
	let addTocart = cart.find((data) => {
		return data.sneaker === main_review.src;
	});
	if (addTocart === undefined) {
		cart.push({
			sneaker: main_review.src,
			items: counter.textContent,
			index: main_review.dataset.index,
		});
		createCart();
	} else {
		addTocart.sneaker = main_review.src;
		addTocart.items = counter.textContent;
		addTocart.index = main_review.dataset.index;
	}

	localStorage.setItem("cart", JSON.stringify(cart));
}
