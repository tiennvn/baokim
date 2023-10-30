import React, { Component } from "react";
import { connect } from "react-redux";
import { baseURL } from "../api";

import {
    DeleteCart,
    AddOrder
} from "../actions";
import InfoCustomerForm from "./InfoCustomerForm"
import PriceItemShow from "./PriceItemShow"
import TotalPriceItemShow from "./TotalPriceItemShow"
import QuantityButton from "./QuantityButton"
import ImageEmpty from "./ImageEmpty";
import VariantValuesShow from "./VariantValuesShow"
import AddToOrderCheckBox from "./AddToOrderCheckBox"
import MessageErrorProduct from "./MessageErrorProduct"
export class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Carts = this.props.cartInfo.Carts;
        const allProductLst = this.props.cartInfo.allProductLst;

        let ListCart = [];
        let TotalProduct = 0;

        Object.keys(Carts).forEach(function (item) {
            ListCart.push(Carts[item]);
            TotalProduct += Carts[item].quantity;
        });

        function TotalPriceProduct(price, quantity) {
            return Number(price * quantity).toLocaleString("vi-VN");
        }

        // click vào ô chọn tất cả
        const handleCheckAllProduct = (e) => {
            let checkBoxAllLst =  Array.from(document.querySelectorAll("#cart-product-lst .react-check-product"));
            let checkBoxLst = checkBoxAllLst.filter(checkbox => checkbox.disabled == false);
            
            if(e.target.checked == true){
                checkBoxLst.map(checkbox => checkbox.checked = true)
            }
            else {
                checkBoxLst.map(checkbox => checkbox.checked = false)
            }
            this.props.AddOrder(e, 0);
        }


        return(
            <div className="bg-[#F9FBF8] w-full h-full">
                <div className="w-full mx-auto h-full xl:max-w-7xl">
                    {this.props.cartInfo.Carts.length > 0 ? (
                        <div className="flex flex-col h-full gap-5 w-full py-20 px-2 md:px-6 lg:px-2 xl:flex-row 2xl:px-0">
                            <div className="w-full flex flex-col h-auto bg-white p-4 rounded-xl pb-0 md:pb-4 xl:w-2/3">
                                <div className="flex gap-4 w-full pb-4 border-b border-neutral-2-200 text-header-1 md:text-heading-4">
                                    <p className="font-semibold text-neutral-1-800">Giỏ hàng</p>
                                    <p className="text-neutral-1-700">( <span>{TotalProduct}</span> ) sản phẩm</p>
                                </div>
                                <div className="flex flex-col flex-auto">
                                    <div className="flex w-full text-body-1 font-medium text-neutral-1-800 py-2.5 md:py-4 md:!grid-cols-11 md:grid">
                                        <div className="flex w-full items-center gap-2 md:col-span-5">
                                            <input id="checked-all" onClick={handleCheckAllProduct} type="checkbox" className="w-[18px] h-[18px] rounded border border-neutral-2-200 bg-white"/>
                                            <p className="text-body-2 md:text-body-1">Sản phẩm</p>
                                        </div>
                                        <p className="col-span-2 px-3 hidden md:block">Giá</p>
                                        <p className="col-span-2 px-3 text-center hidden md:block">Số lượng</p>
                                        <div className="col-span-2 px-3 text-right hidden md:block">Tổng tiền</div>
                                    </div>
                                    <div id="cart-product-lst" className="flex flex-col flex-auto ">
                                    {ListCart.map((item, key) => {
                                        var productItem = {};
                                        var variantItem = {};
                                        let isVariantValue = false;
                                        
                                        allProductLst.forEach(product => {
                                            let variantFilter = product.variantCombinations.find((variant) => {
                                                return variant.tryParseId === item.id;
                                            });
                                            if (variantFilter) {
                                                productItem = product;
                                                variantItem = variantFilter;
                                            }
                                        });

                                        if(productItem.options){
                                            if(Object.keys(productItem.options).length > 0) isVariantValue = true;
                                        }

                                        let itemClassInit = "grid grid-cols-1 md:!grid-cols-11";
                                        let itemClass = "";
                                        if(key === 0){
                                            itemClass = itemClassInit + " pb-3";
                                        }
                                        else{
                                            itemClass = itemClassInit + " border-t border-neutral-2-100 py-3";
                                        }

                                        let linkProductItem = baseURL + "/" + productItem.niceUrl;

                                        return(
                                            <div key={key} className= {itemClass}> 
                                                <div className="flex flex-col gap-1.5 pb-1.5 md:pb-0 md:col-span-5">
                                                    <div className="flex w-full items-center gap-2">
                                                        <AddToOrderCheckBox itemKey={key} item={item} productItem={productItem} variantQuantity={variantItem.quantity} />
                                                        <div className="w-full flex flex-auto h-full gap-3">
                                                            <div className="w-1/4 md:w-[38%] lg:w-[26%] xl:w-[36%] max-h-[90px] md:max-h-[120px] p-3.5 bg-neutral-3-50 rounded-[10px] flex justify-center items-center">
                                                                <div className="relative w-full pt-[150%]">
                                                                    <img src={item.avatar} className="image-custom object-contain" alt={item.name}/>
                                                                </div>
                                                            </div>
                                                            <div className="w-full flex flex-col flex-auto h-full gap-3 py-2 md:justify-between">
                                                                <div className="flex justify-between w-full gap-3">
                                                                    <p className="text-neutral-1-900 font-medium text-caption-1 line-clamp-1 h-fit md:text-body-1 md:line-clamp-3">
                                                                        <a href={linkProductItem}>{item.name}</a>
                                                                    </p>
                                                                    <button onClick={() => this.props.DeleteCart(key)} className="flex w-fit h-fit md:hidden">
                                                                        <span className="twi-17-trash-line text-xl leading-5 text-neutral-1-500"></span>
                                                                    </button>
                                                                </div>
                                                                <div className="w-full flex flex-col gap-1">
                                                                    <div className="md:hidden">
                                                                        <QuantityButton productItem={productItem} variantQuantity={variantItem.quantity} item={item} itemKey={key} />
                                                                    </div>
                                                                    { isVariantValue && <VariantValuesShow productItem={productItem} item={item} variantItem={variantItem} /> }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <MessageErrorProduct productItem={productItem} variantItem={variantItem} item={item} />
                                                </div>
                                                <div className="flex justify-between text-neutral-1-900 text-caption-1 px-3 py-1 md:text-title-1 md:col-span-2 md:py-2">
                                                    <p className="text-neutral-1-800 md:text-neutral-1-900 md:hidden">Giá</p>
                                                    <PriceItemShow productItem={productItem} variantQuantity={variantItem.quantity} priceItem={item.price} />
                                                </div>
                                                <div className="hidden md:flex md:col-span-2">
                                                    <QuantityButton productItem={productItem} variantQuantity={variantItem.quantity} item={item} itemKey={key} />
                                                </div>
                                                <div className="flex text-neutral-1-900 text-caption-1 px-3 py-1 md:text-title-1 md:py-2 justify-between md:items-end md:flex-col md:col-span-2 xl:text-header-2">
                                                    <p className="text-neutral-1-800 md:text-neutral-1-900 md:hidden">Tổng tiền</p>
                                                    <TotalPriceItemShow productItem={productItem} variantQuantity={variantItem.quantity} totalPriceItem={TotalPriceProduct(item.price, item.quantity)} />
                                                    <button onClick={() => this.props.DeleteCart(key)} className="md:flex w-fit h-fit hidden">
                                                        <span className="twi-17-trash-line text-2xl leading-6 text-neutral-1-500"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </div>
                            </div>
                            <InfoCustomerForm />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full w-full px-2 py-12 md:px-6 md:flex-row md:py-20">
                            <div className="flex flex-col w-full bg-white rounded-xl p-4">
                                <p className="text-header-1 font-semibold text-neutral-1-800 pb-4 border-b border-neutral-2-200 md:text-heading-4">Giỏ hàng</p>
                                <div className="flex flex-col gap-6 p-4 justify-center items-center">
                                    <div className="w-1/2 md:w-1/3 xl:w-2/5">
                                        <div className="relative pt-[100%] w-full">
                                            <ImageEmpty />
                                        </div>
                                    </div>
                                    <p className="text-title-1 text-center text-neutral-1-400 font-semibold">
                                        Bạn chưa có sản phẩm nào trong giỏ hàng
                                    </p>
                                    <button className="h-fit w-fit rounded-full py-2 px-6 border border-primary-1 bg-primary-1">
                                        <a
                                            href={baseURL}
                                            className="flex text-white text-center text-body-1 font-medium rounded-full whitespace-nowrap"
                                        >
                                            Quay lại trang chủ
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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
  
function mapDispatchToProps(dispatch) {
    return {
        DeleteCart: (index) => dispatch(DeleteCart(index)),
        AddOrder: (e, quantity) => dispatch(AddOrder(e, quantity))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);