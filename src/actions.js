import callApi from "./api";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_COMBINATION = "GET_COMBINATION";
export const ADD_ORDER = "ADD_ORDER";
export const CHANGE_VALUE_INPUT = "CHANGE_VALUE_INPUT";
export const SELECT_VARIANT_VALUE = "SELECT_VARIANT_VALUE";
export const UPDATE_VARIANT_VALUE_CART = "UPDATE_VARIANT_VALUE_CART";
export const UPDATE_VARIANT_VALUE_CARTSTORAGE = "UPDATE_VARIANT_VALUE_CARTSTORAGE";
export const BUY_PRODUCT = "BUY_PRODUCT";
export const HANDLE_VARIANT_DEFAULT = "HANDLE_VARIANT_DEFAULT";
// export const BUY_PRODUCT = "BUY_PRODUCT";

// Lấy danh sách tất cả sản phẩm 
export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return callApi(
            "/api/UIProductV2",
            "GET",
            null
        )
        .then((res) => {
            dispatch(GetAllProduct(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

// Lấy danh sách biến thể theo danh sách item trong giỏ hàng
export const actFetchCartsRequest = (itemLst) => {
    return (dispatch) => {
        return callApi(
            "/odata_products/PVariationCombinations/GetCombination",
            "POST",
            { data: itemLst }
        )
        .then((res) => {
            dispatch(GetCombination(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload) {
    return {
        type: "GET_ALL_PRODUCT",
        payload,
    };
}

/*GET_COMBINATION*/
export function GetCombination(payload) {
    return {
      type: "GET_COMBINATION",
      payload,
    };
}
  
/*GET NUMBER CART*/
export function GetNumberCart() {
    return {
        type: "GET_NUMBER_CART",
    };
}

// ADD_CART
// đều chọn biến thể rồi mới add
export function AddCart(payload1, payload2) {
    return {
        type: "ADD_CART",
        payload1,
        payload2,
    };
}

// BUY_PRODUCT
export function BuyProduct(payload) {
    return {
        type: "BUY_PRODUCT",
        payload,
    };
}

// UPDATE_CART
export function UpdateCart(payload) {
    return {
        type: "UPDATE_CART",
        payload,
    };
}

// DELETE_CART
export function DeleteCart(payload) {
    return {
        type: "DELETE_CART",
        payload,
    };
}

// INCREASE_QUANTITY
// tăng số lượng sản phẩm trong giỏ hàng
export function IncreaseQuantity(payload) {
    return {
        type: "INCREASE_QUANTITY",
        payload,
    };
}

// DECREASE_QUANTITY
// giảm số lượng sản phẩm trong giỏ hàng
export function DecreaseQuantity(payload) {
    return {
        type: "DECREASE_QUANTITY",
        payload,
    };
}

// ADD_ORDER
// thêm sản phẩm được chọn vào đơn hàng 
export function AddOrder(payload1, payload2) {
    return {
        type: "ADD_ORDER",
        payload1,
        payload2,
    };
}

// CHANGE_VALUE_INPUT
export function ChangeValueInput(payload1, payload2) {
    return {
        type: "CHANGE_VALUE_INPUT",
        payload1,
        payload2,
    };
}

// SELECT_VARIANT_VALUE
export function SelectVariantValue(payload1, payload2) {
    return {
        type: "SELECT_VARIANT_VALUE",
        payload1,
        payload2,
    };
}

// UPDATE_VARIANT_VALUE_CART
export function UpdateVariantValueCart(payload1, payload2) {
    return {
        type: "UPDATE_VARIANT_VALUE_CART",
        payload1,
        payload2,
    };
}

// UPDATE_VARIANT_VALUE_CARTSTORAGE
export function UpdateVariantValueCartstorage(payload1, payload2) {
    return {
        type: "UPDATE_VARIANT_VALUE_CARTSTORAGE",
        payload1,
        payload2,
    };
}

// HANDLE_VARIANT_DEFAULT
export function HandleVariantDefault(payload) {
    return {
        type: "HANDLE_VARIANT_DEFAULT",
        payload
    };
}