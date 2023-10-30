import { connect } from "react-redux";
import { AddOrder } from "../actions";
import { useState, useEffect } from "react";
import React from 'react'; // nạp thư viện react

function AddToOrderCheckBox({ itemKey, item, productItem, variantQuantity, AddOrder}) {
    let productDetail = { ...productItem }; 

    let inputCheck = document.querySelectorAll("#cart-product-lst .react-check-product");
    let initChecked = false;

    for (let i = 0; i < inputCheck.length; i++) {
        if (inputCheck[i].name === item.id) {
            initChecked = inputCheck[i].checked;
        }
    }

    const [checked, setChecked] = useState(initChecked);

    const handleClick = (e) => {
        let checkBoxAllLst =  Array.from(document.querySelectorAll("#cart-product-lst .react-check-product"));
        let checkBoxLst = checkBoxAllLst.filter(checkbox => checkbox.disabled == false);
        let checkedAll = document.querySelector("#shopping-cart #checked-all");
        let isCheckAll = true;
        for(let i = 0; i < checkBoxLst.length; i++){
            if(checkBoxLst[i].checked != true ){
                isCheckAll = false;
            } 
        }
        if(isCheckAll) checkedAll.checked = true
        else checkedAll.checked = false
        AddOrder(e, itemKey);
        setChecked(!checked);
    }

    let flag = false;
    if (productDetail.isAblePreorder === false) {
        productDetail.variantCombinations.map(variant => {
            if(variant.id === item.id) {
                if (variant.quantity < item.quantity){
                    flag = true;
                } else {
                    flag = false;
                }
            }
        })
    }

    let isDisabled = false;
    if (flag === true) {
        isDisabled = true;
    } else {
        if (productDetail.isPriceHidden === true) {
        isDisabled = true;
        } else {
            if (variantQuantity === 0) {
                if (productDetail.isAblePreorder === true) isDisabled = false;
                else isDisabled = true;
            }
        }
    }

    function disableCheckboxCheckAll() {
        let checkAllInput = document.getElementById("checked-all");
        let checkBoxAllLst =  Array.from(document.querySelectorAll("#cart-product-lst .react-check-product"));
        let isDisabledCheckAll = checkBoxAllLst.find(checkbox => checkbox.disabled == false)
        if(!isDisabledCheckAll) checkAllInput.disabled = true;
    }

    useEffect(() => {
        disableCheckboxCheckAll()
    });

    return (
        <input  type="checkbox" 
                className="w-[18px] h-[18px] rounded border border-neutral-2-200 bg-white react-check-product"
                onClick={(e) => handleClick(e)}
                disabled={isDisabled}
                name={item.id}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        cartInfo: state._todoProduct,
    };
  };
  export default connect(mapStateToProps, { AddOrder })(AddToOrderCheckBox);