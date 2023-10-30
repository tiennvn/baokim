// import "./js/index"

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./stores";
import CartHeader from "./components/CartHeader"
import ShowModalButton from "./components/ShowModalButton"
import AddToCartButton from "./components/AddToCartButton"

import "./index.scss";
// render icon giỏ hàng trên header
if (document.getElementById("cart-header")) {
  const cartHeader = createRoot(document.getElementById("cart-header"));
  cartHeader.render(
      <Provider store={store}>
        <BrowserRouter>
          <CartHeader />
        </BrowserRouter>
      </Provider>
  );
}

// render giỏ hàng
if (document.getElementById("shopping-cart")) {
    const cart = createRoot(document.getElementById("shopping-cart"));
    cart.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

// render button show modal || button add to cart 
var listProVariant = document.getElementsByClassName("react-modal-btn");

if (listProVariant) {
  for (let i = 0; i < listProVariant.length; i++) {
    const proVariant = listProVariant[i];
    const productId = proVariant.getAttribute('data-item');
    const productVariant = createRoot(proVariant);
    productVariant.render(
      <Provider store={store}>
          <BrowserRouter>
              <ShowModalButton productId={productId}/>
          </BrowserRouter>
      </Provider>
    );
  }
}

// render button lst trong chi tiết sản phẩm
var lstBtnProductDetail = document.getElementsByClassName("react-btn-product-detail");

if (lstBtnProductDetail.length > 0) {
  for (var i = 0; i < lstBtnProductDetail.length; i++) {
    const href = lstBtnProductDetail[i].getAttribute("data-href");
    const productDetailButton = lstBtnProductDetail[i];
    const productDetailButtonRoot = createRoot(productDetailButton);
    productDetailButtonRoot.render(
        <Provider store={store}>
          <AddToCartButton isProductDetail={true} href={href} />
        </Provider>
    );
  }
}



