import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actFetchCartsRequest,
  actFetchProductsRequest,
  DeleteCart,
} from "../actions";
import { baseURL } from "../api";
import ImageEmpty from "./ImageEmpty";
import PriceItemShowHeader from "./PriceItemShowHeader";

export class CartHeader extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.cartInfo.CartStorage.length > 0){
            this.props.actFetchCartsRequest(this.props.cartInfo.CartStorage);
        }
        this.props.actFetchProductsRequest();
    }

    componentDidUpdate(prevProps) {
        if(this.props.cartInfo.Carts && prevProps.cartInfo.Carts){
            if (Object.keys(this.props.cartInfo.Carts).length !== Object.keys(prevProps.cartInfo.Carts).length) {
              this.props.actFetchCartsRequest(this.props.cartInfo.CartStorage);
            }
        }
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

        let URL = `${baseURL}/cart`;

        return (
            <div className="relative w-fit flex gap-9 group lg:z-[60]">
                <button className="w-fit h-fit flex relative">
                    <a href={URL} className="flex">
                        <span className="twi-17-shopping-cart-fill text-white text-2xl leading-6"></span>
                    </a>
                    {TotalProduct < 100 ? (
                        <p className="px-0.5 min-w-[20px] h-5 flex justify-center items-center bg-white text-primary-1 text-caption-2 absolute left-1/2 -top-1/2 rounded-full">
                            {TotalProduct}
                        </p>
                    ) : (
                        <p className="px-0.5 min-w-[20px] h-5 flex justify-center items-center bg-white text-primary-1 text-caption-2 absolute left-1/2 -top-1/2 rounded-full">
                            99+
                        </p>
                    )}
                </button>
                <div className="absolute lg:group-hover:flex z-50 hidden right-0 top-full pt-7 flex-col lg:w-[500px]">
                    <div className="flex flex-col bg-white shadow-popup rounded-xl">
                        <p className="text-title-1 text-neutral-1-900 font-semibold p-4">
                            Giỏ hàng
                        </p>
                        <div className="flex flex-col w-full scrollbar">
                            {this.props.cartInfo.Carts.length > 0 ? (
                                <div className="flex flex-col gap-4 max-h-[568px] p-4 overflow-y-auto border-b border-neutral-2-200">
                                    {
                                        ListCart.map((item, key) => {
                                            var productItem = {};
                                            var variantItem = {};
                                            var nameVariantValue = "";

                                            allProductLst.forEach(product => {
                                                let variantFilter = product.variantCombinations.find((variant) => {
                                                    return variant.id === item.id;
                                                });
                                                if (variantFilter) {
                                                    productItem = product;
                                                    variantItem = variantFilter;
                                                }
                                            });
                                            // hiển thị tên thuộc tính biến thể
                                            if(variantItem.variantValues){
                                                var nameValueLst = Object.values(variantItem.variantValues).map(value => value.name)
                                                if(nameValueLst.length > 0){
                                                    nameValueLst.map(name => {
                                                        if(nameValueLst.indexOf(name) == 0) nameVariantValue += name;
                                                        else nameVariantValue += ` / ${name}`;
                                                    })
                                                }
                                            }

                                            let itemClassInit = "flex w-full gap-3";
                                            let itemClass = "";
                                            if(key === (ListCart.length - 1)){
                                                itemClass = itemClassInit;
                                            }
                                            else{
                                                itemClass = itemClassInit + " pb-3 border-b border-neutral-2-200";
                                            }

                                            let linkProductItem = baseURL + "/" + productItem.niceUrl;

                                            return(
                                                <div key={key} className={itemClass}>
                                                    <a href={linkProductItem} className="w-[17%] max-h-[80px] p-1.5 bg-neutral-3-50 rounded-[10px] flex justify-center items-center">
                                                        <div className="relative w-full pt-[100%]">
                                                            <img
                                                                src={item.avatar}
                                                                className="image-custom object-contain rounded-[10px]"
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                    </a>
                                                    <div className="flex flex-col gap-2 justify-between w-[83%]">
                                                        <div className="flex w-full justify-between gap-4">
                                                            <p className="font-medium text-neutral-1-900 text-body-1 line-clamp-2">
                                                                <a href={linkProductItem}>
                                                                    {item.name}
                                                                </a>
                                                            </p>
                                                            <button
                                                                onClick={() => this.props.DeleteCart(key)}
                                                                className="flex"
                                                            >
                                                                <i className="twi-17-trash-line text-2xl leading-6 text-neutral-1-500"></i>
                                                            </button>
                                                        </div>
                                                        <div className="flex w-full justify-between items-center gap-4 text-body-2">
                                                            <p className="text-neutral-1-800">
                                                                {nameVariantValue}
                                                            </p>
                                                            <PriceItemShowHeader
                                                                item={item}
                                                                productItem={productItem}
                                                                variantQuantity={variantItem.quantity}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-6 border-b border-neutral-2-200">
                                    <div className="lg:w-1/3 xl:w-2/5">
                                        <div className="relative pt-[100%] w-full">
                                            <ImageEmpty />
                                        </div>
                                    </div>
                                    <p className="text-body-1 text-center text-neutral-1-300 font-medium">
                                        Chưa có sản phẩm nào
                                    </p>
                                </div>
                            )}
                            <div className="w-full p-4 flex">
                                <a href={URL} className="w-full bg-primary-1 rounded-full py-2">
                                    <button className="w-full text-center text-white text-body-1 font-medium">
                                        Xem giỏ hàng
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartInfo: state._todoProduct,
    };
};
  
function mapDispatchToProps(dispatch) {
    return {
        actFetchProductsRequest: () => dispatch(actFetchProductsRequest()),
        actFetchCartsRequest: (itemLst) => dispatch(actFetchCartsRequest(itemLst)),
        DeleteCart: (index) => dispatch(DeleteCart(index)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartHeader);