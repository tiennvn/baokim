import { connect } from "react-redux";
import React, {useEffect}  from "react";
import {SelectVariantValue, HandleVariantDefault} from '../actions'
import AddToCartButton from './AddToCartButton';

function ModalProductVariant ({ productDetail, SelectVariantValue, handleClick, HandleVariantDefault }) {
    let variantDefault;
    if(productDetail.totalQuantity > 0){
        variantDefault = productDetail.variantCombinations.find(variant => variant.isDefault == true);
    }
    else{
        variantDefault = productDetail.variantCombinations[0]
    }

    let variantValuesIdDefault = variantDefault.variantValues.map(value => value.id);
    let variantIdDefault = variantDefault.id;
    let displayPriceDefault = variantDefault.displayPrice;
    let originalPriceDefault = variantDefault.originalPrice;
    
    useEffect(() => {
        HandleVariantDefault(productDetail)
    }, []);
    return( 
        <div className="bg-modal scrollbar">
            <div className="w-full bg-white rounded-xl mx-auto xl:max-w-7xl">
                <div className="flex justify-between px-4 bg-white rounded-t-xl">
                    <div className="py-[18px] text-header-1 font-semibold text-secondary-1">Thêm vào giỏ hàng</div>
                    <button onClick={handleClick} className="py-3 flex items-center"><i className="twi-17-close-fill text-heading-5 leading-6 text-neutral-1-500 p-2"></i></button>
                </div>
            
                <div className="w-full md:flex overflow-y-scroll max-h-[calc(100vh-170px)] lg:max-h-[calc(100vh-194px)] xl:max-h-[calc(100vh-225px)] 2xl:max-h-[calc(100vh-378px)] h-fit md:pb-6 xl:pb-10">
                    <div className="flex flex-col p-4 w-full md:w-2/5 md:justify-start md:sticky top-0">
                        <div id="variant-list-image" className="w-full overflow-hidden border border-primary-1 border-solid p-4 rounded-tl-[40px] rounded-br-[40px]">
                            <div id="image-default" className="image-variant hidden w-full justify-center items-center">
                                <div className="relative pt-[100%] w-full">
                                    <img src={productDetail.avatarFullUrl} className="image-custom object-contain"/>
                                </div>
                            </div>
                            {productDetail.variantCombinations.map((variant, key) => {
                                return (
                                    <>
                                    {variant.id == variantDefault.id
                                    ?
                                    <div key={key} data-id={variantDefault.id} className="image-variant flex w-full justify-center items-center">
                                        <div className="relative pt-[100%] w-full">
                                            {variantDefault.fullUrlImage == ""
                                             ?
                                             <img src={productDetail.avatarFullUrl} className="image-custom object-contain"/>
                                             :
                                             <img src={variantDefault.fullUrlImage} className="image-custom object-contain"/>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div key={key} data-id={variant.id} className="image-variant hidden w-full justify-center items-center">
                                        <div className="relative pt-[100%] w-full">
                                            <img src={variant.fullUrlImage} className="image-custom object-contain"/>
                                        </div>
                                    </div>
                                    }
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full md:w-3/5">
                        <div className="pt-2 px-4">
                            <h2 className="text-header-1 md:text-heading-4 text-secondary-1 font-semibold">{ productDetail.name }</h2>
                            <p className="pt-2 text-body-1 line-clamp-2 font-normal">{ productDetail.shortDescription }</p>
                            <div className="pt-2 w-full">
                                { displayPriceDefault == originalPriceDefault
                                    ?
                                    <p id="react-show-price" className="bg-primary-4 w-full py-3 px-4 text-error-400 font-semibold text-heading-4">
                                        {Number(displayPriceDefault).toLocaleString("vi-VN")}đ
                                    </p>
                                    : 
                                    <div id="react-show-price" className="bg-primary-4 w-full py-3 px-4 text-error-400 font-semibold text-heading-4">
                                        <div className="flex gap-2 items-center">
                                                <p className="text-xl text-neutral-1-600 line-through font-semibold">
                                                    {Number(originalPriceDefault).toLocaleString("vi-VN")}đ
                                                </p>
                                                <p className="text-error-400 font-semibold text-heading-4">
                                                    {Number(displayPriceDefault).toLocaleString("vi-VN")}đ
                                                </p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div id="variant-list" className="flex flex-col gap-3 pb-4 pt-4">
                            { productDetail.options != undefined &&
                                productDetail.options.map((variant, key) => {
                                    return(
                                        <div key={key} role="group" aria-labelledby={variant.name} className="group-radio flex flex-col gap-y-1 xl:grid grid-cols-5 gap-2.5 ">
                                            <p id={variant.name} className="text-header-2 font-semibold text-neutral-1-700 px-4 py-2 xl:text-body-2 xl:font-normal">{variant.name}:</p>   
                                            <div className="flex flex-wrap gap-3 text-body-1 text-neutral-1-900 px-4 col-span-4">
                                                {variant.values.map(value =>{
                                                    let isChecked = false;
                                                    if(variantValuesIdDefault.includes(value.id)){
                                                        isChecked = true
                                                    }
                                                    else{
                                                        isChecked = false
                                                    }
                                                    return (
                                                        <>
                                                            <input defaultChecked={isChecked}
                                                            type="checkbox" 
                                                            name={variant.name} 
                                                            id={value.id}  
                                                            value={value.name} 
                                                            className="radio-hidden"
                                                            onClick={(e) => SelectVariantValue(e.target, productDetail)}/>
                                                            <label htmlFor={ value.id }>{ value.name }</label>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div> 
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-x-4 border-t border-neutral-2-200 border-solid p-4 bg-white rounded-b-xl">
                    <button onClick={handleClick} className="py-2 px-6 border border-primary-1 border-solid rounded-[100px] text-primary-1 btn-line">Hủy bỏ</button>
                    <AddToCartButton handleClick={handleClick} variantIdDefault={variantIdDefault} />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
  return {
    cartInfo: state._todoProduct,
  };
};

export default connect(mapStateToProps, {SelectVariantValue, HandleVariantDefault})(ModalProductVariant);
