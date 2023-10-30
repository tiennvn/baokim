const checkedAll = document.querySelector("#shopping-cart #checked-all");
const checkBoxLst = document.querySelectorAll("#cart-product-lst .react-check-product");
let isCheckAll = true;
if(checkedAll){
    checkedAll.addEventListener('click', (e) => {
        if(e.target.checked == true){
            for(let i = 0; i < checkBoxLst.length; i++){
                checkBoxLst[i].checked = true
            }
        }
        else {
            for(let i = 0; i < checkBoxLst.length; i++){
                checkBoxLst[i].checked = false
            }
        }
    })
}

// for (let i = 0; i < Object.keys(checkBoxLst).length; i++) {
//     checkBoxLst[i].addEventListener('click', (e) => {
//         console.log(e.target.checked);
//         if(e.target.checked != checkedAll.checked) checkedAll.checked = false;
//     })
// }