import { getLocalStorage, setLocalStorage, cartSuperscript } from "./utils.mjs";
// updateCartCount retirado de ./utils

/*
function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}
    */

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    const product = await this.dataSource.findProductById(this.productId);
    this.product = product;
    this.renderProductDetails(product);
    this.handleBrandCrumbs();
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(product));
}

addToCart(product) {
  const productList = getLocalStorage("so-cart") || [];

  const isExist = productList.find((item) => item.Id === product.Id);

  if (isExist) {
    isExist.FinalPrice += product.FinalPrice;
    isExist.Qtd += 1;
  } else {
    product.Qtd = 1;
    productList.push(product);
  }


setLocalStorage("so-cart", productList);

  // Load cartSuperscript
  cartSuperscript();
}

handleBrandCrumbs() {
  const breadcrumbsElement = document.querySelector("#breadcrumbs");
  breadcrumbsElement.innerHTML = `<span class="path">${this.product.Category}</span>`
}

// Added suggested retail price and list price on line 36-39
renderProductDetails(product) {
  const discountPercentage = ((product.SuggestedRetailPrice - product.ListPrice) / product.SuggestedRetailPrice) * 100;
  const detailsElement = document.querySelector(".product-detail");
  detailsElement.innerHTML = `
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.Name}"
      />
  <p class="product-card__price">
    <span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
    <span class="product-card__discount-price">${product.ListPrice}</span>
    <div class="discount-flag">
      <span>Save ${discountPercentage.toFixed(0)}%</span>
    </div>
  </p>
      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
  `;
  }
}

  /*
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(product);
    //this.renderProductDetails(product);
    this.renderProductDetails("main");

    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addToCart(product));
  }
  */



  // addToCart() {
  //   const item = this.product;
  //   item["quantity"] = 1;
  //   const shoppingCart = getLocalStorage("cart");
  //   shoppingCart.push(item);

  //   setLocalStorage("cart", shoppingCart);
  //   updateCartCount();
  // }



  /*
  addToCart() {
    let cartContents = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }
    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
  }
    */


  // renderProductDetails(selector) {
  //     const element = document.querySelector(selector);
  //     element.insertAdjacentHTML(
  //       "afterBegin", productDetailsTemplate(this.product)
  //     );
  //   }


  /* 
  addToCart(product) {
    const productList = getLocalStorage("so-cart") || [];

    const isExist = productList.find((item) => item.Id === product.Id);

    if (isExist) {
      isExist.FinalPrice += product.FinalPrice;
      isExist.Qtd += 1;
    } else {
      product.Qtd = 1;
      productList.push(product);
    }

    setLocalStorage("so-cart", productList);
  }
  


  // Added suggested retail price and list price on line 36-39
  
  renderProductDetails(product) {
    const detailsElement = document.querySelector(".product-detail");
    detailsElement.innerHTML = `
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Image}"
          alt="${product.Name}"
        />
    <p class="product-card__price">
      <span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      <span class="product-card__discount-price">${product.ListPrice}</span>
    </p>
        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    `;
  }
}
*/


/*
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./ProductData.mjs";
import { qs, setContent } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    setLocalStorage("so-cart", this.product);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
  */


