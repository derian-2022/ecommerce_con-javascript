const body = document.body;
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".navbar__menu--index");
const shoppingcart = document.querySelector(".main__shoppingCart");
const cart__count = document.querySelector(".cart__count");
const container = document.querySelector(".main__products");
const add__container = document.querySelector(".added__elements");
const iconDarkMode = document.querySelector(".bx-moon");
const shoppingcartIcon = document.querySelector(".bx-shopping-bag");
const iconMenu = document.querySelector(".bx-grid-alt");
const closeButton = document.querySelector(".bx-x");
const main__filter = document.querySelector(".main__filter");
const btn__check = document.querySelector(".check");

const products = [
  {
    id: 1,
    name: "Hoodies",
    price: 14.0,
    image: "./img/featured1.png",
    category: "hoodies",
    stock: 10,
  },
  {
    id: 2,
    name: "Shirts",
    price: 24.0,
    image: "./img/featured2.png",
    category: "shirts",
    stock: 15,
  },
  {
    id: 3,
    name: "Sweatshirts",
    price: 24.0,
    image: "./img/featured3.png",
    category: "sweatshirts",
    stock: 20,
  },
];

let cartShopping = [];

const loadingAcademlo = () => {
  window.addEventListener("load", () => {
    const containerLoading = document.querySelector(".loading");
    setTimeout(() => {
      containerLoading.style.display = "none";
    }, 3000);
  });
};

const refreshPage = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("cart") !== null) {
      const carLocalStorage = JSON.parse(localStorage.getItem("cart"));
      cartShopping.push(...carLocalStorage);
      addingProductsCartDom();
      countItemsCartDom();
      totalSum();
    }
    if (localStorage.getItem("darkmode") === "true") {
      body.classList.add("darkmode");
      iconDarkMode.classList.remove("bx-moon");
      iconDarkMode.classList.add(`${localStorage.getItem("icon")}`);
    }
    addingProductsCartDom();
  });
};

const darkMode = () => {
  iconDarkMode.addEventListener("click", (e) => {
    e.preventDefault();

    const active = body.classList.toggle("darkmode");
    swtichIcons(body, "darkmode", iconDarkMode, "bx-moon", "bx-sun");
    localStorage.setItem("icon", `${iconDarkMode.classList[1]}`);
    localStorage.setItem("darkmode", `${active}`);
  });
};

const stickyMenu = () => {
  window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    console.log(scrollY);
    scrollY !== 0
      ? navbar.classList.add("stickyMenu")
      : navbar.classList.remove("stickyMenu");
  });
};

const dropdownMenu = () => {
  iconMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("active");
    iconMenu.style.position = "relative";
    shoppingcartIcon.style.position = "relative";
    swtichIcons(menu, "active", iconMenu, "bx-grid-alt", "bx-x");
  });
};

const dropdownCart = () => {
  shoppingcartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingcart.classList.toggle("active");
  });
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingcart.classList.toggle("active");
  });
  cart__count.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingcart.classList.toggle("active");
  });
};

const addingProductsDom = () => {
  addingProducts(products);

  main__filter.addEventListener("click", ({ target }) => {
    if (
      target.className.includes("filter__showAll") ||
      target.parentElement.className.includes("filter__showAll")
    )
      addingProducts(products);
    if (
      target.className.includes("filter__hoodie") ||
      target.parentElement.className.includes("filter__hoodie")
    )
      addingProducts(products.filter((item) => item.name === "Hoodies"));
    if (
      target.className.includes("filter__shirt") ||
      target.parentElement.className.includes("filter__shirt")
    )
      addingProducts(products.filter((item) => item.name === "Shirts"));
    if (
      target.className.includes("filter__sweatshirts") ||
      target.parentElement.className.includes("filter__sweatshirts")
    )
      addingProducts(products.filter((item) => item.name === "Sweatshirts"));
  });
};

const addingProductsToCartShopping = () => {
  const buttons = document.querySelectorAll(".icon__product");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      addToCartAlgorithm(e);
      addingProductsCartDom();
      countItemsCartDom();
      totalSum();
    });
  });
};

// *****Aca tuvieramos un localStorage si hubiera dado :V*****

// container.addEventListener("click", function (e) {
//   if (e.target.classList.contains("btn-plus")) {
//     const id = e.target.parentElement.id;

//     let findProduct = seacrProduct(id);

//     if (findProduct.stock === 0) return alert("stock no disponible");
//     if (objCart[id]) {
//       verifyAddToCart(findProduct, id);
//     } else {
//       objCart[id] = {
//         ...findProduct,
//         addCount: 1,
//       };
//     }

//     localStorage.setItem("objCart", JSON.stringify(objCart));
//   }
//   printProductsInCart();
//   printTotalCart();
//   printAmountCart();
// });
// *******Esta seccion es la que suma en el carrito*****
const cartActionsButton = () => {
  shoppingcart.addEventListener("click", (e) => {
    const buttonClicked = e.target.getAttribute("data-id");
    // const validar = cartShopping.filter((item) => item.id == buttonClicked);

    const producto = products.find(
      (item) => item.id === parseInt(e.target.getAttribute("data-id"))
    );

    //**** Esta suma****
    if (e.target.classList[1] === "bx-plus") {
      if (producto.stock === cartShopping[buttonClicked].addCount) {
        return alert("We do not have enough in stock");
      }
      cartShopping[buttonClicked].addCount++;
    }
    //****Este resta******
    if (e.target.classList[1] === "bx-minus")
      cartShopping[buttonClicked].addCount--;
    //****Este borra****
    if (e.target.classList[1] === "bx-trash")
      delete cartShopping[buttonClicked];

    // if (e.target.classList[1] === "comprar") delete cartShopping[buttonClicked];

    addingProductsCartDom();
    countItemsCartDom();
    totalSum();
    localStorage.setItem("cart", JSON.stringify(cartShopping));
  });
};
// **** Boton comprar****
btn__check.addEventListener("click", function (e) {
  if (e.target.classList.contains("check")) {
    cartShopping = [];
    addingProductsCartDom();
    alert("Muchas gracias por tu compra :D ");
    console.log(cartShopping);
  }
});
// ***** Hasta aca es la seccion de sumar del carrito******
const addingProductsCartDom = (e) => {
  let cant = getCountItems();

  let arrayCartShopping = Object.values(cartShopping);

  if (arrayCartShopping.length === 0 || cant === 0) {
    localStorage.removeItem("cart");
    add__container.innerHTML = `<div class="added__elements--empty">
                                        <img src="./img/empty-cart.png" alt="empty cart">
                                        <h2>Your cart is empty</h2>
                                        <p>You can add items to your cart by clicking on the + button on the product page.</p>
                                    </div> `;
  } else {
    add__container.innerHTML = "";
    arrayCartShopping.forEach((item) => {
      if (item.addCount !== 0) {
        let html = `<div class="added__element">
                            <div class="cart__image">
                                <img src="${item.image}" alt="">
                            </div>
                            <div class="cart__content">
                                <h4>${item.name}</h4>
                                <p>Stock: ${item.addCount} | <span>${
          item.price
        }$</span></p>
                                <h5><span>Subtotal: ${
                                  item.addCount * item.price
                                }$</span></h5>
                                <div class="cart__buttons">
                                    <div class="cart__button--add">
                                        <div><i data-id=${
                                          item.id
                                        }  class='bx bx-minus'></i></div>
                                        <div><p class="text__color">${
                                          item.addCount
                                        } units</p></div>
                                        <div><i data-id=${
                                          item.id
                                        } class='bx bx-plus'></i></div>
                                    </div>
                                    <div class="cart__button--delete">
                                        <span><i data-id=${
                                          item.id
                                        } class='bx bx-trash' ></i></span>
                                    </div>

                                </div>
                            </div>
                        </div>`;
        add__container.innerHTML += html;
      }
    });
  }
};

const countItemsCartDom = () => {
  cart__count.innerHTML = getCountItems();
};

const addingProducts = (products) => {
  container.innerHTML = "";
  products.forEach((element) => {
    let html = `<div class="main__product">
                        <img src="${element.image}" alt="">
                        <div class="product__description">
                            <h3>$${element.price}</h3>
                            <span>Stock: ${element.stock}</span>
                            <p class="text__color">${element.name}</p>
                            <div class="icon__product"><i data-id=${element.id} class='bx bx-plus'></i></div>
                        </div>
                    </div> `;
    container.innerHTML += html;
  });
};

const totalSum = () => {
  const totalItems = document.querySelector(".total__sum--items");
  const totalSum = document.querySelector(".total__sum--price");

  let cont = 0;
  let arrayCartShopping = Object.values(cartShopping);

  arrayCartShopping.forEach((item) => {
    cont += item.addCount * item.price;
  });

  totalSum.innerHTML = `$${cont}.00`;
  totalItems.innerHTML = `items: ${getCountItems()}`;
};

const getCountItems = () => {
  let arrayCartShopping = Object.values(cartShopping);

  let totalItems = 0;

  arrayCartShopping.forEach((item) => {
    totalItems += item.addCount;
  });

  return totalItems;
};
const addToCartAlgorithm = (e) => {
  const producto = products.find(
    (item) => item.id === parseInt(e.target.getAttribute("data-id"))
  );

  if (cartShopping[producto.id]) {
    if (producto.stock === cartShopping[producto.id].addCount) {
      alert("No hay mas");
    } else {
      cartShopping[producto.id].addCount++;
    }
  } else {
    cartShopping[producto.id] = {
      ...producto,
      addCount: 1,
    };
  }
};

const swtichIcons = (
  element,
  classToEvaluate,
  icon,
  iconClassOne,
  iconClassTwo
) => {
  if (element.classList.contains(`${classToEvaluate}`)) {
    icon.classList.remove(`${iconClassOne}`);
    icon.classList.add(`${iconClassTwo}`);
  } else {
    icon.classList.remove(`${iconClassTwo}`);
    icon.classList.add(`${iconClassOne}`);
  }
};

const navPosition = () => {
  const entries = document.querySelectorAll(".observer");
  const home = document.querySelector(".nav__home");
  const products = document.querySelector(".nav__products");

  const ob = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0.5) {
      home.classList.toggle("focus");
    } else {
      home.classList.toggle("focus");
      products.classList.toggle("focus");
    }
  });
  entries.forEach((item) => ob.observe(item));
};

loadingAcademlo();
refreshPage();
stickyMenu();
darkMode();
dropdownMenu();
dropdownCart();
navPosition();
addingProductsDom();
addingProductsToCartShopping();
cartActionsButton();
addingProductsCartDom();
