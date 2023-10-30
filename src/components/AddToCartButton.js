import React, { useState, useEffect} from 'react'; // nạp thư viện react
import {connect} from 'react-redux';
import callApi from "../api";
import { AddCart, GetCombination } from '../actions';
import { createRoot } from "react-dom/client";
import Notification from "./Notification"

var notificationRoot = null;
if(document.getElementById("react-notification")){
    notificationRoot = createRoot(document.getElementById("react-notification"));
} 

function ShowNotify(isShowNotify, message){
    // render notification
    notificationRoot.render(
        <>
            {isShowNotify 
                && <Notification message={message}/>
            }
        </>
        
    );
}


function AddToCartButton({ variantIdDefault = "", item, isProductDetail = false, href, cartInfo, handleClick = function(){}, AddCart, GetCombination }) {
    // có show thông báo không 
    const [isShowNotify, setIsShowNotify] = useState(false);
    const addToCart = async (e) => {
        // get data id của biến thể 
        let itemId;
        if(e.target.id === 'react-btn-add-cart') {
            itemId = e.target.getAttribute("data-item");
        }
        else if(e.target.id === 'btn-buy-product-detail' || e.target.id === 'btn-add-product-detail'){
            itemId = e.target.getAttribute("data-id");
        }
        else itemId = item;
        
        let quantityPro;
        if(isProductDetail) {
            var inputQtyProDetail = document.querySelector("#product-detail .input-qty");
            var valueInput = inputQtyProDetail.getAttribute("value");
            quantityPro = Number(valueInput);
        } else {
            quantityPro = 1;
        }
        // thêm vào giỏ hàng
        AddCart(itemId, quantityPro);

        // api post thông tin đặt hàng
        let res = await callApi(
            `/odata_products/PVariationCombinations/GetCombination`,
            "POST", 
            { data: cartInfo.CartStorage }
        )
        .then((res) => {
            GetCombination(res.data);
            setIsShowNotify(true)
            setTimeout(() => {
                setIsShowNotify(false);
                handleClick();
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
            setIsShowNotify(false);
        });
    }

    useEffect(() => {
        ShowNotify(isShowNotify, "Thêm vào giỏ hàng thành công");
    }, [isShowNotify]);

    if(isProductDetail){
        if(href){
            return(
                <button id='btn-buy-product-detail' 
                        onClick={addToCart} 
                        type="button"
                        className="py-2.5 px-6 flex border border-primary-1 bg-primary-1 text-white rounded-full btn-full">
                    Mua ngay
                </button>
            )
        }
        else{
            return(
                <>
                    <button type="button"
                            id='btn-add-product-detail' 
                            onClick={addToCart} 
                            className="py-2.5 px-6 flex items-center justify-center border border-primary-1 rounded-full text-primary-1 bg-white btn-line">
                            Thêm vào giỏ hàng
                    </button>
                    
                </>
                
            )
        }
    }
    else{
        if(item){
            return(
                <>
                    <button onClick={addToCart} 
                            type="button"
                            className="flex items-center justify-center bg-primary-1 border border-primary-1 rounded-tl-[40px] py-6 px-7 rounded-br-[39px] btn-full">
                        <i className="twi-17-shopping-cart-fill text-xl leading-none text-white"></i>
                    </button>
                </>
                
            )
        }
        else{
            return(
                <>
                    <button id='react-btn-add-cart' 
                            data-item={variantIdDefault} 
                            className="py-2 px-6 border border-primary-1 border-solid bg-primary-1 rounded-[100px] text-white text-body-1 font-medium flex items-center btn-full" 
                            type="button" 
                            onClick= {addToCart}>
                        Xác nhận
                    </button>
                    
                </>
                
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        cartInfo: state._todoProduct,
       };
}
export default connect(mapStateToProps, { AddCart, GetCombination })(AddToCartButton);
