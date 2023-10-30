import { combineReducers } from "redux";
import {
    GET_ALL_PRODUCT,
    GET_COMBINATION,
    ADD_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    CHANGE_VALUE_INPUT,
    DELETE_CART,
    ADD_ORDER,
    SELECT_VARIANT_VALUE,
    UPDATE_VARIANT_VALUE_CART,
    UPDATE_VARIANT_VALUE_CARTSTORAGE,
    UPDATE_CART,
    HANDLE_VARIANT_DEFAULT
} from "./actions";
import { handleVariantValue , activeImage, handleVariantDefault } from "./handleSelectVariant"
const shellName = getShellName();

function getInitProduct() {
    // Lưu cache
    const localStorageCart = localStorage.getItem(`cart_${shellName}`);
    if (localStorageCart) {
        const itemCart = JSON.parse(localStorageCart);
        return {
            numberCart: itemCart.numberCart,
            CartStorage: itemCart.CartStorage,
            allProductLst: [],
            Carts: itemCart.Carts,
            Orders: [],
            numberOrder: 0,
        };
    }
    return {
        numberCart: 0,
        CartStorage: [],
        allProductLst: [],
        Carts: [],
        Orders: [],
        numberOrder: 0,
    };
}
const initProduct = getInitProduct();
  
function updateLocalStorage(state) {
    localStorage.setItem(`cart_${shellName}`, JSON.stringify(state));
}
  
function getShellName(){
    return document.getElementsByTagName('server')[0].getAttribute('data-shell-name');
}

// Hàm thực thi
function todoProduct(state = initProduct, action) {
    switch (action.type) {  
        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProductLst: action.payload,
            };

        case GET_COMBINATION:
            let itemLst = action.payload;
            let _numberCart = 0;
            itemLst.forEach(cart => {
                _numberCart += cart.quantity;
            })
            updateLocalStorage({
                ...state,
                numberCart: _numberCart,
                Carts: action.payload,
            });
            return {
                ...state,
                numberCart: _numberCart,
                Carts: action.payload,
            };

        case ADD_CART:
            // lấy data = id biến thể
            if (state.numberCart === 0) {
                let cart = {
                    id: action.payload1,
                    quantity: action.payload2,
                };
                state.CartStorage.push(cart);
            } else {
                let check = false;
                state.CartStorage.map((item, index) => {
                    if (item.id === action.payload1) {
                        state.CartStorage[index].quantity += action.payload2;
                        check = true;
                    }
                    return check;
                });
        
                if (!check) {
                    let _cart = {
                        id: action.payload1,
                        quantity: action.payload2,
                    };
                    state.CartStorage.push(_cart);
                }
            }
            updateLocalStorage({
                ...state,
                numberCart: state.numberCart + action.payload2,
            });
            return {
                ...state,
                numberCart: state.numberCart + action.payload2,
            };

        case INCREASE_QUANTITY:
            let indexItemIn = state.CartStorage.findIndex(cart => cart.id === state.Carts[action.payload].id)
            let indexOrderIn = state.Orders.findIndex(order => order.id === state.Carts[action.payload].id)
            if(state.Carts[action.payload].quantity < 9999){
                state.numberCart++;
                state.CartStorage[indexItemIn].quantity++;
                state.Carts[action.payload].quantity++;
                if(indexOrderIn > -1){
                    state.numberOrder++;
                }
            }
            updateLocalStorage(state);
            return {
                ...state,
            };

        case DECREASE_QUANTITY:
            let indexItemDe = state.CartStorage.findIndex(cart => cart.id === state.Carts[action.payload].id)
            let indexOrderDe = state.Orders.findIndex(order => order.id === state.Carts[action.payload].id)
            if (state.Carts[action.payload].quantity > 1) {
                state.numberCart--;
                state.CartStorage[indexItemDe].quantity--;
                state.Carts[action.payload].quantity--;
                if(indexOrderDe > -1){
                    state.numberOrder--;
                }
            }
            updateLocalStorage(state);
            return {
                ...state,
            };

        case CHANGE_VALUE_INPUT:
            state.numberCart += action.payload1;
            state.CartStorage.forEach((cart) => {
                if (cart.id === action.payload2.id) {
                    return (cart.quantity = action.payload2.quantity);
                }
            });

            state.Orders.forEach((order) => {
                if (order.id === action.payload2.id) {
                    return (state.numberOrder += action.payload1);
                }
            });

            updateLocalStorage(state);
            return {
                ...state,
            };

        case DELETE_CART:
            let quantity_ = state.Carts[action.payload].quantity;
            let listOrder_ = state.Orders;
            listOrder_.map((order) => {
                if (order.id === state.Carts[action.payload].id) {
                    state.numberOrder -= quantity_;
                    state.Orders = listOrder_.filter((item) => {
                        return item.id !== state.Carts[action.payload].id;
                    });
                }
            });
            updateLocalStorage({
                ...state,
                numberCart: state.numberCart - quantity_,
                CartStorage: state.CartStorage.filter((item) => {
                    return item.id !== state.Carts[action.payload].id;
                }),
                Carts: state.Carts.filter((item) => {
                    return item.id !== state.Carts[action.payload].id;
                }),
            });
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                CartStorage: state.CartStorage.filter((item) => {
                    return item.id !== state.Carts[action.payload].id;
                }),
                Carts: state.Carts.filter((item) => {
                    return item.id !== state.Carts[action.payload].id;
                }),
            };
        
        case ADD_ORDER:
            let _checked = action.payload1.target.checked;
            let checkBoxAllLst =  Array.from(document.querySelectorAll("#cart-product-lst .react-check-product"));
            let checkBoxLst = checkBoxAllLst.filter(checkbox => checkbox.disabled == false);
            // chọn tất cả sản phẩm trong giỏ hàng
            if(action.payload1.target.id === "checked-all"){
                if (_checked){
                    checkBoxLst.forEach(checkbox => {
                        state.CartStorage.forEach((cart) => {
                            if(checkbox.name === cart.id){
                                let isInclude = state.Orders.find(order => {
                                    if(cart.id === order.id){
                                        return true;
                                    }
                                })
                                if(!isInclude){
                                    state.Orders.push(cart);
                                }
                            }
                        });
                    })
                    
                    updateLocalStorage({
                        ...state,
                        numberOrder: state.numberCart,
                    });
                    return {
                        ...state,
                        numberOrder: state.numberCart,
                    };
                }
                else{
                    updateLocalStorage({
                        ...state,
                        Orders: [],
                        numberOrder: 0,
                    });
                    return {
                        ...state,
                        Orders: [],
                        numberOrder: 0,
                    };
                }
            }
            // chọn từng sản phẩm trong giỏ hàng
            else {
                let _order = state.Carts.find((cart) => {
                    return cart.id === state.Carts[action.payload2].id;
                });
                if (_checked) {
                    state.Orders.push(_order);
                    updateLocalStorage({
                        ...state,
                        numberOrder: state.numberOrder + state.Carts[action.payload2].quantity,
                    });
                    return {
                        ...state,
                        numberOrder: state.numberOrder + state.Carts[action.payload2].quantity,
                    };
                } 
                else {
                    updateLocalStorage({
                        ...state,
                        Orders: state.Orders.filter((order) => {
                            return order.id !== _order.id;
                        }),
                        numberOrder: state.numberOrder - state.Carts[action.payload2].quantity,
                    });
                    return {
                        ...state,
                        Orders: state.Orders.filter((order) => {
                            return order.id !== _order.id;
                        }),
                        numberOrder: state.numberOrder - state.Carts[action.payload2].quantity,
                    };
                }
            }

        case SELECT_VARIANT_VALUE:
            var productDetail = action.payload2;
            var groupInputLst = Array.from(document.querySelectorAll("#variant-list .group-radio"));

            if(groupInputLst.length > 0){
                let groupInputTarget = groupInputLst.find(groupInput => groupInput.getAttribute("aria-labelledby") == action.payload1.name )
                const inputTargetLst = groupInputTarget.querySelectorAll(".radio-hidden");

                // chỉ cho chọn 1 giá trị cho 1 thuộc tính
                if(action.payload1.checked == true){
                    inputTargetLst.forEach(item => {
                        if(item.id == action.payload1.id){
                            item.checked = true;
                        } 
                        else item.checked = false
                    })
                }
                else{
                    inputTargetLst.forEach(item => {
                        item.checked = false
                    })
                }
            }
            // danh sách input đã chọn
			const inputCheckedLst = Array.from(document.querySelectorAll("#variant-list .group-radio .radio-hidden:checked"));
            handleVariantValue(action.payload1, productDetail.variantCombinations, productDetail.options);
            if(document.querySelector("#react-update-variant")){
                var btns = document.querySelectorAll("#react-update-variant");
            }
            if(document.querySelector("#react-btn-add-cart")){
                var btns = document.querySelectorAll("#react-btn-add-cart");
            }
            
            var showPrice, defImg, defImgSrc, getDefImgSrc, imageLst;
            if(document.getElementById("react-modal-product")){
                showPrice = document.querySelector("#react-show-price"); 
                defImg = document.getElementById("image-default");
                defImgSrc = defImg.querySelector(".image-custom");
                getDefImgSrc = defImgSrc.getAttribute("src");
                imageLst = document.querySelectorAll(".image-variant");
            }
            // chọn đầy đủ thuộc tính của biến thể
            if(inputCheckedLst.length == groupInputLst.length ) {
                // active hình
                activeImage(inputCheckedLst, productDetail, productDetail.variantCombinations);
                // Button thêm vào giỏ hàng
                btns.forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = "1";
                })
                
            }
            // chưa chọn đầy đủ thuộc tính
            else{
                // hiển thị hình sản phẩm nếu chưa chọn đủ thuộc tính biến thể
                if(getDefImgSrc != "") {
                    for (let i = 0; i < imageLst.length; i++) {
                        const imageAct = imageLst[i];
                        if (defImg.classList.contains('hidden')) {
                            defImg.classList.replace('hidden', 'flex');
                        }
                        if (imageAct.classList.contains('flex')) {
                            imageAct.classList.replace('flex', 'hidden');
                        }
                    }
                }
                // điều kiện hiển thị giá min và max
                if(showPrice){
                    if(productDetail.minDisplayPrice == productDetail.maxDisplayPrice) {
                        showPrice.innerHTML = `<p class="text-heading-4 font-semibold text-error-400">
                        ${Number(productDetail.minDisplayPrice).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}
                        </p>`
                    } else {
                        showPrice.innerHTML =  `<p class="text-error-400 font-semibold text-heading-4">
                        ${ Number(productDetail.minDisplayPrice).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })
                        } - ${
                            Number(productDetail.maxDisplayPrice).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })
                        }
                        </p>`
                    }
                }
                // Button thêm vào giỏ hàng
                btns.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = "0.5";
                    btn.style.display = "flex";
                })
            }

        case UPDATE_VARIANT_VALUE_CARTSTORAGE:
            // action.payload2 là id của biến thể cũ
            // action.payload1 là biến thể mới 
            // nếu biến thể được chọn là biến thể khác biến thể cũ 
            if(action.payload1.getAttribute("data-item") != action.payload2){
                // tìm vị trí của biến thể mới trong storage
                let variantUpdateIndex = state.CartStorage.findIndex(cart => cart.id == action.payload1.getAttribute("data-item"));
                let _CartStorage = state.CartStorage;

                // khi biến thể mới đã có trong storage => update biến thể đã có sẵn và xóa biến thể được chọn update
                if(variantUpdateIndex > -1 ){
                    _CartStorage.forEach(cartStore => {
                        if(cartStore.id == action.payload2) 
                        {
                            let quantityUp = cartStore.quantity + _CartStorage[variantUpdateIndex].quantity;
                            _CartStorage[variantUpdateIndex].quantity = quantityUp;
                        }
                    })
                    updateLocalStorage({
                        ...state,
                        CartStorage: _CartStorage.filter(cartStore => cartStore.id != action.payload2),
                    });
                    return {
                        ...state,
                        CartStorage: _CartStorage.filter(cartStore => cartStore.id != action.payload2),
                    };
                }
                // khi biến thể mới không có trong storage => update biến thể cũ thành biến thể mới
                else{
                    _CartStorage.forEach(cartStore => {
                        if(cartStore.id == action.payload2) cartStore.id = action.payload1.getAttribute("data-item")
                    })
                    updateLocalStorage({
                        ...state,
                        CartStorage: _CartStorage,
                    });
                    return {
                        ...state,
                        CartStorage: _CartStorage,
                    };
                }
            }
            // nếu biến thể được chọn là biến thể cũ 
            else{
                updateLocalStorage(state);
                return {...state};
            }

        case UPDATE_VARIANT_VALUE_CART:
            // nếu biến thể được chọn là biến thể khác biến thể cũ  
            if(action.payload1.getAttribute("data-item") != action.payload2){
                // tìm vị trí của biến thể mới trong storage
                let cartOldIndex = state.Carts.findIndex(cart => cart.id == action.payload2);
                let cartUpdateIndex = state.Carts.findIndex(cart => cart.id == action.payload1.getAttribute("data-item"));
                let _Carts = state.Carts;
                let _Orders = state.Orders;
                
                if(cartOldIndex > -1){
                    if(state.Orders.length > 0){
                        let orderUpdateIndex = state.Orders.findIndex(order => order.id == action.payload1.getAttribute("data-item"));
                        if(orderUpdateIndex > -1){
                            _Orders.splice(orderUpdateIndex, 1, state.Carts[cartUpdateIndex])
                        }
                    }
                    updateLocalStorage({
                        ...state,
                        Carts: _Carts.filter(cart => cart.id != action.payload2),
                        Orders: _Orders.filter(order => order.id != action.payload2),
                    });
                    return {
                        ...state,
                        Carts: _Carts.filter(cart => cart.id != action.payload2),
                        Orders: _Orders.filter(order => order.id != action.payload2),
                    };
                }
                else{
                    if(state.Orders.length > 0){
                        let orderOldIndex = state.Orders.findIndex(order => order.id == action.payload2);
                        if(orderOldIndex > -1){
                            _Orders.splice(orderOldIndex, 1, state.Carts[cartUpdateIndex])
                        }
                    }
                    updateLocalStorage({
                        ...state,
                        Orders: _Orders,
                    });
                    return {
                        ...state,
                        Orders: _Orders,
                    };
                }
            }
            // nếu biến thể được chọn là biến thể cũ
            else{
                updateLocalStorage(state);
                return {...state};
            }
            
        case UPDATE_CART:
            let updateCart = state.CartStorage;
            let _updateCart = state.Carts;
            // action.payload lấy danh sách các sản phẩm đã order
            action.payload.Orders.forEach((item) => {
                updateCart = updateCart.filter((p) => {
                    return item.id !== p.id;
                });
                _updateCart = _updateCart.filter((p) => {
                    return item.id !== p.id;
                });
            });
            updateLocalStorage({
                ...state,
                numberCart: state.numberCart - state.numberOrder,
                CartStorage: updateCart,
                Carts: _updateCart,
                Orders: [],
                numberOrder: 0,
            });
            return {
                ...state,
                numberCart: state.numberCart - state.numberOrder,
                CartStorage: updateCart,
                Carts: _updateCart,
                Orders: [],
                numberOrder: 0,
            };
      
        case HANDLE_VARIANT_DEFAULT: 
            handleVariantDefault(action.payload)

        default:
            return state;
    }
}

const ShopApp = combineReducers({
    _todoProduct: todoProduct,
});
  
export default ShopApp;
