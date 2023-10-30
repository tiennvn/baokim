import React, {useEffect} from "react";
import { connect } from "react-redux";
import { SelectVariantValue, HandleVariantDefault} from "../actions"


function PopupUpdateVariant({productItem, variantItem, togglePopup, updateCart, SelectVariantValue, HandleVariantDefault}) {
    let productDetail = { ...productItem };
    let variantSelectedValues = variantItem.variantValues.map(variantValue => variantValue.id)
    
    useEffect(() => {
        HandleVariantDefault(productDetail);
    });
  

    if(window.innerWidth < 1280){
        return(
            <div id="variant-list" data-id={productDetail.id} data-item={variantItem} className="fixed flex w-screen h-screen bg-black/30 z-50 inset-0 react-popup-variant">
                <div className="w-full h-fit absolute bottom-0 inset-x-0 bg-white">
                    <div className="flex flex-col w-full gap-3 px-4 pb-4 border-b border-neutral-2-200">
                        {productDetail.options.map(option => {
                            return(
                                <div key = {option.id} role="group" aria-labelledby={option.name} className="flex flex-col gap-1 group-radio">
                                    <p id={option.name} className="font-medium text-body-1 py-2">
                                        {option.name}
                                    </p>
                                    <div className="w-full flex flex-wrap gap-3">
                                        {option.values.map(value => {
                                            let isChecked = false;
                                            if(variantSelectedValues.includes(value.id)){
                                                isChecked = true
                                            }
                                            else{
                                                isChecked = false
                                            }
                                            return( 
                                                <>
                                                    <input  type="checkbox" 
                                                            name={option.name} 
                                                            id={value.id}  
                                                            value={value.name} 
                                                            className="radio-hidden"
                                                            onClick={(e) => SelectVariantValue(e.target, productDetail)}
                                                            defaultChecked={isChecked}
                                                    />
                                                    <label  htmlFor={value.id}>{value.name}</label> 
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full flex justify-end p-4 gap-4">
                        <button data-id={productDetail.id} onClick={togglePopup} className="w-fit h-hit flex py-2 px-6 border border-primary-1 bg-white rounded-[100px] text-body-1 text-primary-1 font-medium whitespace-nowrap">
                            Hủy bỏ
                        </button>
                        <button id="react-update-variant" data-id={productDetail.id} data-item={variantItem.id} onClick={(e) => updateCart(e, variantItem.id)} className="w-fit h-hit flex py-2 px-6 border border-primary-1 bg-primary-1 rounded-[100px] text-body-1 text-white font-medium whitespace-nowrap">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div id="variant-list" data-id={productDetail.id} data-item={variantItem} className="absolute flex-col flex min-w-[400px] max-w-[400px] bg-white w-full top-7 left-0 z-10 rounded-lg shadow-popup react-popup-variant">
                <div className="flex flex-col w-full gap-3 px-4 pb-4 border-b border-neutral-2-200">
                    {productDetail.options.map(option => {
                        return(
                            <div key={option.id} role="group" aria-labelledby={option.name} className="flex flex-col gap-1 group-radio">
                                <p id={option.name} className="font-medium text-body-1 py-2">
                                    {option.name}
                                </p>
                                <div className="w-full flex flex-wrap gap-3">
                                    {option.values.map(value => {
                                        let isChecked = false;
                                        if(variantSelectedValues.includes(value.id)){
                                            isChecked = true
                                        }
                                        else{
                                            isChecked = false
                                        }
                                        return( 
                                            <div key={value.id} className="flex">
                                                <input  type="checkbox" 
                                                        name={option.name} 
                                                        id={value.id}  
                                                        value={value.name} 
                                                        className="radio-hidden"
                                                        onClick={(e) => SelectVariantValue(e.target, productDetail)}
                                                        defaultChecked={isChecked}
                                                    />
                                                <label htmlFor={value.id}>{value.name}</label> 
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full flex justify-end p-4 gap-4">
                    <button data-id={productDetail.id} onClick={togglePopup} className="w-fit h-hit flex py-2 px-6 border border-primary-1 bg-white rounded-[100px] text-body-1 text-primary-1 font-medium whitespace-nowrap">
                        Hủy bỏ
                    </button>
                    <button id="react-update-variant" data-id={productDetail.id} data-item={variantItem.id} onClick={(e) => updateCart(e, variantItem.id)} className="w-fit h-hit flex py-2 px-6 border border-primary-1 bg-primary-1 rounded-[100px] text-body-1 text-white font-medium whitespace-nowrap">
                        Xác nhận
                    </button>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
      cartInfo: state._todoProduct,
    };
};
export default connect(mapStateToProps, {SelectVariantValue, HandleVariantDefault})(PopupUpdateVariant);