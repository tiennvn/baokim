import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import callApi from "../api";
import { createRoot } from "react-dom/client";
import {GetCombination, UpdateVariantValueCart, UpdateVariantValueCartstorage} from "../actions"
import PopupUpdateVariant from "./PopupUpdateVariant"
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

function VariantValuesShow({productItem, variantItem, cartInfo, GetCombination, UpdateVariantValueCart, UpdateVariantValueCartstorage}) {
    let productDetail = { ...productItem };

    // có show popup hay không
    const [isShowPopup, setIsShowPopup] = useState(false);
    // có popup đang mở hay không
    const [isPopupOpened, setIsPopupOpened] = useState(false);
    // có show thông báo không 
    const [isShowNotify, setIsShowNotify] = useState(false);
    
    // đóng mở popup update variant
    const togglePopup = (e) => {
        const popupVariantLst = document.querySelectorAll(".react-popup-variant");
        const btnCartVariantLst = document.querySelectorAll(".react-btn-cart-variant");

        if(e.target.classList.contains("react-btn-cart-variant")){
            if(popupVariantLst.length == 0){
                setIsPopupOpened(!isPopupOpened)
                setIsShowPopup(!isShowPopup);
                if(e.target.classList.contains("twi-17-arrow-down-fill")){
                    e.target.classList.replace('twi-17-arrow-down-fill', 'twi-17-arrow-up-fill');
                }
                else{
                    e.target.classList.replace('twi-17-arrow-up-fill', 'twi-17-arrow-down-fill');
                }
            }
            else{
                setIsPopupOpened(false);
                setIsShowPopup(false);
                if(e.target.classList.contains("twi-17-arrow-up-fill")) 
                    e.target.classList.replace('twi-17-arrow-up-fill', 'twi-17-arrow-down-fill');
            }
        }
        else{
            setIsPopupOpened(false);
            setIsShowPopup(false);

            btnCartVariantLst.forEach(btnCartVariant => {
                if(btnCartVariant.getAttribute("data-id") == e.target.getAttribute("data-id")){
                    btnCartVariant.classList.replace('twi-17-arrow-up-fill', 'twi-17-arrow-down-fill');
                }
            })
        }
    }
    
    // update biến thể trong giỏ hàng
    const updateCart = async (e, variantItemId) => {
        UpdateVariantValueCartstorage(e.target, variantItemId);

        // api post thông tin giỏ hàng
        let res = await callApi(
            `/odata_products/PVariationCombinations/GetCombination`,
            "POST", 
            { data: cartInfo.CartStorage }
        )
        .then((res) => {
            GetCombination(res.data);
            UpdateVariantValueCart(e.target, variantItemId);
            setIsShowNotify(true);
            // đóng popup khi update thành công
            togglePopup(e);
            setTimeout(() => {
                setIsShowNotify(false)
            }, 2000);
        })
        .catch((err) => {
            console.log(err);
            setIsShowNotify(false)
        });
    }

    useEffect(() => {
        ShowNotify(isShowNotify, "Cập nhật giỏ hàng thành công");
    }, [isShowNotify]);

    // hiển thị tên thuộc tính biến thể
    let nameVariantValue = "";
    if(variantItem.variantValues){
        var nameValueLst = Object.values(variantItem.variantValues).map(value => value.name)
        if(nameValueLst.length > 0){
            nameValueLst.map(name => {
                if(nameValueLst.indexOf(name) == 0) nameVariantValue += name;
                else nameVariantValue += ` / ${name}`;
            })
        }
    }
    return(
        <p className="flex gap-2 relative items-center">
            <span className="text-neutral-1-800 text-caption-2 md:text-body-2">{nameVariantValue}</span>
            <span onClick={togglePopup} data-id={productDetail.id} className="twi-17-arrow-down-fill text-xl leading-5 text-neutral-1-500 cursor-pointer react-btn-cart-variant"></span>
            {isShowPopup && isPopupOpened && <PopupUpdateVariant productItem={productItem} variantItem={variantItem} togglePopup={togglePopup} updateCart={updateCart}/> }
        </p>
    )
}
const mapStateToProps = (state) => {
    return {
      cartInfo: state._todoProduct,
    };
  };
export default connect(mapStateToProps, {GetCombination,  UpdateVariantValueCart, UpdateVariantValueCartstorage})(VariantValuesShow);