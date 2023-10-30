import {connect} from 'react-redux';
import React, { useEffect } from 'react'; // nạp thư viện react
import store from "../stores";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import ModalProductVariant from './ModalProductVariant';
import AddToCartButton from './AddToCartButton'
import { useState } from "react";
var modalProductRoot = null;
if(document.getElementById("react-modal-product")) {
    modalProductRoot= createRoot(document.getElementById("react-modal-product"));
}

function ShowModal(productDetail, isShow, handleClick){
    modalProductRoot.render(
        <Provider store={store}>
            {isShow &&
                 <ModalProductVariant productDetail={productDetail} handleClick={handleClick}/>
            }
         </Provider>
    )
} 

function ShowModalButton({ productId, cartInfo }) {
    const [isShow, setIsShow] = useState(false);
    const allProductLst = cartInfo.allProductLst;
    let productDetail = allProductLst.find(product => product.id === Number(productId));
    const handleClick = (e) => {
        setIsShow(!isShow)
    }

    useEffect(() => {
        ShowModal(productDetail, isShow, handleClick)
    }, [isShow]);

    if(productDetail){
        if(productDetail.totalCombinations === 1){
            return(
                <AddToCartButton item={productDetail.variantCombinations[0].id} />
            )
        }
        else{
            return(
                <>
                    <button onClick={handleClick} className="flex items-center justify-center bg-primary-1 border border-primary-1 rounded-tl-[40px] py-6 px-7 rounded-br-[39px] btn-full">
                        <i className="twi-17-shopping-cart-fill text-xl leading-none text-white"></i>
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
export default connect(mapStateToProps)(ShowModalButton);
