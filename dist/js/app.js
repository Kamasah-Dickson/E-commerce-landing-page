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

const cart = JSON.parse(sessionStorage.getItem("cart")) || [0]; //checkout cart
const trackData = JSON.parse(sessionStorage.getItem("data")) || [];

window.addEventListener("DOMContentLoaded", () => {
	shoeReview();
	createCart();
	updateCounter();
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
	let ImgID = parseInt(e.target.id);
	img = e.target.getAttribute("src");
	let shoeIndex = main_review.setAttribute(
		"data-index",
		e.target.dataset.index
	);
	main_review.src = img;

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
	sessionStorage.setItem("data", JSON.stringify(trackData));
});

let index = JSON.parse(sessionStorage.getItem("active"));
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
function shoeReview() {
	const data = JSON.parse(sessionStorage.getItem("active")) || [0];
	main_review.setAttribute("data-index", data);
	sneakers[data].classList.add("active");
	main_review.src = sneakers[data].querySelector(".sneaker").src;
	sessionStorage.setItem("active", data);
}

sneakers.forEach((sneaker) => {
	sneaker.addEventListener("click", () => {
		data = sneaker.dataset.index;

		sneakers.forEach((sneaker) => {
			sneaker.classList.remove("active");
		});
		sneakers[data].classList.add("active");
		sessionStorage.setItem("active", data);
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

document.querySelector("main").addEventListener("click", () => {
	checkOut.classList.remove("show");
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

function updateCounter() {
	if (cart.length > 0) {
		cartIcon.parentElement.classList.add("before");
		cartIcon.parentElement.dataset.count = cart.length;
	} else {
		cartIcon.parentElement.classList.remove("before");
	}
}

// =============================

const items = document.createElement("div");
items.className = "items";
checkOut.appendChild(items);
function createCart() {
	if (cart.length !== 0) {
		checkOut.classList.add("scroll");
		checkOut.querySelector("h2").style.display = "none";
		items.innerHTML = cart
			.map((cartData, index) => {
				let search =
					cart.find((data) => data.sneaker === cartData.sneaker) || [];

				let img = search.sneaker;
				let { items } = search;
				let price = 120.0;
				let total = items * price;
				return `
				<div class="wrapper" data-index="${index}">
				
					<div class="sneaker-checkout">
				<div class="sneaker-img" data-index ="${index}">
				<img src="${img}" />
				</div>
				<div class="details">
				<p>Fall Limited Edition Sneakers...</p>
				<p>
					$${price} X ${items} <span>$${total}</span>
				</p>
				</div>
				<img src="./images/icon-delete.svg" alt="delete" class="delete" data-index="${index}" />
				</div>
				<button>checkout</button>
				</div>

	`;
			})
			.join("");
	} else {
		checkOut.querySelector("h2").style.display = "flex";
	}
}
document.querySelector(".checkout").addEventListener("click", (e) => {
	if (e.target.classList.value == "delete") {
		e.target.parentElement.parentElement.remove();
		deleteFromStorage(e.target.dataset.index);
		cartIcon.parentElement.dataset.count = cart.length;
		if (cartIcon.parentElement.dataset.count == 0) {
			cartIcon.parentElement.classList.remove("before");
		}
	}
});

checkoutBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (counter.textContent == 0) {
		return;
	} else {
		updateCartInStorage();
		createCart();
		if (cart.length >= 0) {
			cartIcon.parentElement.dataset.count = cart.length;
			cartIcon.parentElement.classList.add("before");
		} else {
			cartIcon.parentElement.classList.remove("before");
		}
	}
});

// =======================================

function deleteFromStorage(btn) {
	let search = cart.find((data) => data.index === btn) || [];
	if (search === undefined) {
		return;
	} else {
		cart.splice(search, 1);
		if (cart.length == 0) {
			checkOut.querySelector("h2").style.display = "flex";
		}
		sessionStorage.setItem("cart", JSON.stringify(cart));
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

	sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ================Desktop-lightbox====================

const showSneakers = document.querySelector(".sneak-peak");
const showShoes = document.querySelector(".desktop-showcase");
const lightbox = document.querySelector(".desktop-lightbox");
const prev = document.querySelector(".desktop-arrows .prev");
const next = document.querySelector(".desktop-arrows .next");
const slider = document.querySelector(".desktop-showcase");
const closeBtn = document.querySelector(".close-box");
const showcaseContainer = document.querySelector(".showcase");

showcaseContainer.addEventListener("click", () => {
	lightbox.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
	lightbox.classList.add("hide");
});

showSneakers.innerHTML = showcase
	.map((data, index) => {
		let { img } = data;
		return `
	<div class="the-sneaker">
	<img src="${img}" alt="" data-index="${index}">
	</div>`;
	})
	.join("");

showShoes.innerHTML = showcase
	.map((shoes, index) => {
		let { img } = shoes;
		return `
		<div class ="slider" data-index="${index}">
		<img src="${img}" alt="sneakers"class="sneaker">
		</div>
		`;
	})
	.join("");

const setActiveSlider = document.querySelectorAll(".the-sneaker");

// sgdgsadfsdfsdfsdf/

setActiveSlider.forEach((slide, index) => {
	slide.addEventListener("click", () => {
		setActiveSlider.forEach((slide) => {
			slide.classList.remove("active");
		});
		setActiveSlider[index].classList.add("active");
		let hasActive = setActiveSlider[index].querySelector("img");
		const setLightboxImg = document.querySelector(
			".desktop-showcase .slider img"
		);
		setLightboxImg.src = `${hasActive.src}`;
	});
});

let sliderWidth = slider.clientWidth; //450

let sliderIndex = 0;

next.addEventListener("click", () => {
	if (sliderIndex === 3) {
		sliderIndex = 0;
		sliderWidth = 0;
	} else {
		sliderWidth = 450;
		sliderIndex += 1;
	}
	slider.style.transform = `translateX(-${sliderWidth * sliderIndex}px)`;
	showShoes.setAttribute("data-index", sliderIndex);
	let boxIndex = showShoes.dataset.index;

	setActiveSlider.forEach((slide) => {
		slide.classList.remove("active");
		setActiveSlider[boxIndex].classList.add("active");
	});
});

prev.addEventListener("click", () => {
	if (sliderIndex === 0) {
		sliderIndex = 3;
		sliderWidth = -450;
	} else {
		sliderWidth = -450;
		sliderIndex -= 1;
	}
	slider.style.transform = `translateX(${sliderWidth * sliderIndex}px)`;
	showShoes.setAttribute("data-index", sliderIndex);
	let boxIndex = showShoes.dataset.index;

	setActiveSlider.forEach((slide) => {
		slide.classList.remove("active");
		setActiveSlider[boxIndex].classList.add("active");
	});
});

// ===================mobile-lilghtbox===========================
const mobileSlides = [
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

// const getSliderImg = document.querySelector(".showcase img");
const mobileBox = document.querySelector(".mobile-slider");
mobileBox.innerHTML = mobileSlides
	.map((slider, index) => {
		let { img } = slider;
		return `

		<img
			src="${img}"
			id=""
			alt="sneakers"
			class="sneaker"
			data-index="${index}"
		/>
		`;
	})
	.join("");

const mobilePrev = document.querySelector(".mobile-prev");
const mobileNext = document.querySelector(".mobile-next");
const scroll = document.querySelector(".scroll");

let mobileSliderWidth = scroll.clientWidth; //440px
let mediaScreen = window.matchMedia("(max-width:465px)");
let mediaScreen2 = window.matchMedia("(max-width:435px)");
let mediaScreen3 = window.matchMedia("(max-width:415px)");

let mobileSliderIndex = 0;

mobileNext.addEventListener("click", () => {
	if (mobileSliderIndex === 3) {
		mobileSliderIndex = 0;
		mobileSliderWidth = 0;
	} else {
		mobileSliderWidth = 440;
		mobileSliderIndex += 1;
		if (mediaScreen3.matches) {
			let widthSlides = scroll.clientWidth;
			mobileSliderWidth = widthSlides + 4;
		}
		//
		if (mediaScreen.matches) {
			let widthSlides = scroll.clientWidth;
			mobileSliderWidth = widthSlides + 4;
		}
	}
	scroll.style.transform = `translateX(-${
		(mobileSliderWidth - 1) * mobileSliderIndex
	}px)`;
	if (mediaScreen2.matches) {
		scroll.style.transform = `translateX(-${
			(mobileSliderWidth - 4) * mobileSliderIndex
		}px)`;
	}
	switch (mobileSliderIndex) {
		case 0:
			main_review.src = "./images/image-product-1.jpg";
			break;
		case 1:
			main_review.src = "./images/image-product-2.jpg";
			break;
		case 2:
			main_review.src = "./images/image-product-3.jpg";
			break;
		case 3:
			main_review.src = "./images/image-product-4.jpg";
			break;
	}
});
mobilePrev.addEventListener("click", () => {
	if (mobileSliderIndex === 0) {
		mobileSliderIndex = 3;
		mobileSliderWidth = -445;
		if (mediaScreen2.matches) {
			mobileSliderIndex = 3;
			let widthSlides = scroll.clientWidth;
			mobileSliderWidth = -widthSlides + 1;
		}
	} else {
		mobileSliderWidth = -445;
		mobileSliderIndex -= 1;
		if (mediaScreen3.matches) {
			let widthSlides = scroll.clientWidth;
			mobileSliderWidth = -widthSlides - 4;
		}
	}
	scroll.style.transform = `translateX(${
		mobileSliderWidth * mobileSliderIndex
	}px)`;

	switch (mobileSliderIndex) {
		case 0:
			main_review.src = "./images/image-product-1.jpg";
			break;
		case 1:
			main_review.src = "./images/image-product-2.jpg";
			break;
		case 2:
			main_review.src = "./images/image-product-3.jpg";
			break;
		case 3:
			main_review.src = "./images/image-product-4.jpg";
			break;
	}
});
