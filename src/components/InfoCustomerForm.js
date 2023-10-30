import { useState, useEffect } from "react";
import React from 'react'; // nạp thư viện react
import  {connect} from  'react-redux';
import callApi from "../api";
import ModalOrderSuccess from './ModalOrderSuccess'
import ModalOrderFail from './ModalOrderFail'
import ModalOrderWarning from './ModalOrderWarning'
import LoadingSpinner from "./LoadingSpinner";
import TotalPriceOrder from "./TotalPriceOrder"

function InfoCustomerForm({cartInfo}) {
    let ListOrder = [];
    Object.values(cartInfo.Orders).forEach(order => {
        ListOrder.push(order);
    });

    var quantityProduct;
    var quantityOrder;
    var listSoldOut = [];

    cartInfo.allProductLst.forEach(product => {
        if(product.isAblePreorder === false){
            product.variantCombinations.map(variant => {
                cartInfo.Orders.map(cart =>{
                    if(variant.id === cart.id) {
                        quantityProduct = variant.quantity
                        quantityOrder = cart.quantity
                        if (quantityProduct < quantityOrder){
                            listSoldOut.push(product)
                        } 
                    }
                })
            })
        }
    })

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /^\d{10}$/;
    //danh sach tinh thanh
    const [cities, setCities] = useState([]); 
    //tinh thanh da chon
    const [selectedCity, setSelectedCity] = useState(undefined);
    //danh sach quan huyen
    const [districts, setDistricts] = useState([]);
    //quan huyen da chon
    const [selectedDistrict, setSelectedDistrict] = useState(undefined);
    //danh sach phuong
    const [wards, setWards] = useState([]);
    //phuong da chon
    const [selectedWard, setSelectedWard] = useState(undefined);
  
    const initialValues = { fullname: "", email: "", phonenumber: "", address: "", note:"", city: "", district: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [validations, setValidations] = useState(initialValues);
  
    const [isSubmit, setIsSubmit] = useState(false);
    // show modal status order
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalFail, setShowModalFail] = useState(false);
    const [showModalWarning, setShowModalWarning] = useState(false);
    // loading submit
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        let message = ''
        setIsSubmit(true);

        if(!value.trim()) message = "Không được bỏ trống"
        else  if (name === 'phonenumber' && !regexPhone.test(value)) {
            message = "Số điện thoại không đúng định dạng. Xin vui lòng nhập lại!";
        }
        else  if (name === 'email' && !regexEmail.test(value)) {
            message = "Email không đúng định dạng. Xin vui lòng nhập lại!";
        }
        setValidations({...validations, [name]: message })
    }

    // truyền dữ liệu và gửi thông tin đơn hàng
    const handleSubmit = async (e) => {
        let btnOrder = document.getElementById("react-btn-order");
        setIsLoading(!isLoading);
        handleCheckbox(!isLoading);
        if(btnOrder.classList.contains("bg-primary-1")){
            btnOrder.classList.replace("bg-primary-1", "bg-primary-1/80")
        }
        e.preventDefault();
        if(selectedCity && selectedDistrict && ListOrder.length > 0)
        {
            let orderItems = ListOrder.map(item =>  
            {
                return {
                    "productCompinationId": item.id,
                    "quantity": item.quantity,
                }
            }
            )

            let cityItem = cities.find(item => item.code === selectedCity);
            let districtItem = districts.find(item => item.code === selectedDistrict);
            let wardItem = wards.find(item => item.code === selectedWard);

            // api post thông tin đơn hàng
            let res = await callApi(`/odata_products/OrdersV2`,"POST",
            {
                "address": formValues.address,// require
                "fullName": formValues.fullname, // require
                "phoneNumber": formValues.phonenumber, // require
                "email": formValues.email, // require
                "note": formValues.note,
                "orderItems": orderItems, // require
                "city": cityItem,  // require
                "district": districtItem,  // require
                "ward": wardItem || {name: "null", code: "null"} 
            })
            .then((res) => {
                if(res.status == 201){
                    setShowModalWarning(!showModalWarning)
                }
                else{
                    setShowModalSuccess(!showModalSuccess)
                }
                handleCheckbox(isLoading);
                setIsLoading(isLoading);
                if(btnOrder.classList.contains("bg-primary-1/80")){
                    btnOrder.classList.replace("bg-primary-1/80", "bg-primary-1")
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(isLoading);
                handleCheckbox(isLoading);
                if(btnOrder.classList.contains("bg-primary-1/80")){
                    btnOrder.classList.replace("bg-primary-1/80", "bg-primary-1")
                }
                setShowModalFail(!showModalFail)
                setValidations(validate(formValues));
                setIsSubmit(true);
            });
        } else {
            setIsLoading(isLoading);
            handleCheckbox(isLoading);
            if(btnOrder.classList.contains("bg-primary-1/80")){
                btnOrder.classList.replace("bg-primary-1/80", "bg-primary-1")
            }
            setShowModalFail(!showModalFail)
            setValidations(validate(formValues));
            setIsSubmit(true);
        }
    };

     // api ds thanh pho
    const fetchApiCtites = async () => {
        let cityList = await callApi('/api/Address/getCities');
        setCities(cityList.data);
    };

    // lấy và truyền code city để lấy ds quận/huyện
    const fetchCities = (code) => {
        setSelectedCity(code);
        fetchApiDistricts(code)
        setFormValues({ ...formValues, city: code });
    };

    //lay ds quan/huyen theo ma thanh pho
    const fetchApiDistricts = async (codeCity) => {
        let districtList = await callApi(`/api/Address/getDistricts/${codeCity}`);    
        setDistricts(districtList.data);
    };

    const fetchApiWards = async (codeDistrict) => {
        let wardList = await callApi(`/api/Address/getWards/${codeDistrict}`);  
        setWards(wardList.data);
        setSelectedWard(undefined)
        setFormValues({ ...formValues, district: codeDistrict });
    };
  
    useEffect(() => {
        fetchApiCtites();
        fetchApiWards(selectedDistrict);
    }, [validations] && [selectedDistrict]);


    const validate = (values) => {
        let errorMessage = "Không được bỏ trống"
        if (!values.fullname) {
            validations.fullname = errorMessage;
        }

        if (!values.address) {
            validations.address = errorMessage;
        }
        if (!values.city) {
            validations.city = errorMessage;
        } else if(values.city !== "") {
            validations.city = ""
        }
        if (!values.district) {
            validations.district = errorMessage;
        } else if(values.district !== "") {
            validations.district = ""
        }

        if (!values.email) {
            validations.email = errorMessage;
        } else if (!regexEmail.test(values.email)) {
            validations.email = "Email không đúng định dạng. Xin vui lòng nhập lại!";
        } 
        if (!values.phonenumber) {
            validations.phonenumber = errorMessage;
        } else if (!regexPhone.test(values.phonenumber)) {
            validations.phonenumber = "Số điện thoại không đúng định dạng. Xin vui lòng nhập lại!";
        }
        return validations
    };

    const handleCheckbox = (isLoading) => {
        let checkBoxAllLst = Array.from(document.querySelectorAll("#shopping-cart input[type=checkbox]"));
        checkBoxAllLst.forEach(checkbox => checkbox.disabled = isLoading)
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col bg-white py-4 rounded-xl text-neutral-1-900 text-body-2 gap-4 h-fit xl:w-1/3 xl:sticky top-24">
            <div className="w-full px-4">
                <h4 className="font-semibold text-secondary-1 py-3.5">Thông tin khách hàng</h4>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <input
                            className="w-full border-b border-neutral-2-200 p-4 focus:outline-0 placeholder:text-neutral-1-600"
                            type="text"
                            placeholder="Họ tên"
                            name="fullname"
                            value={formValues.fullname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={63}
                        />
                        { isSubmit && validations.fullname && 
                            <p className="flex items-center gap-1 text-caption-2 text-error-400"> 
                                <span className="twi-17-infor-fill text-sm leading-[14px]"></span> 
                                <span>{validations.fullname}</span>
                            </p> 
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            className="w-full border-b border-neutral-2-200 p-4 focus:outline-0 placeholder:text-neutral-1-600"
                            type="tel"
                            placeholder="Số điện thoại"
                            name="phonenumber"
                            value={formValues.phonenumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        { isSubmit && validations.phonenumber && 
                            <p className="flex items-center gap-1 text-caption-2 text-error-400"> 
                                <span className="twi-17-infor-fill text-sm leading-[14px]"></span> 
                                <span>{validations.phonenumber}</span>
                            </p>  
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            className="w-full border-b border-neutral-2-200 p-4 focus:outline-0 placeholder:text-neutral-1-600"
                            type="text"
                            placeholder="Email (vui lòng điền email để nhận hóa đơn VAT)"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={128}
                        />
                        { isSubmit && validations.email && 
                            <p className="flex items-center gap-1 text-caption-2 text-error-400"> 
                                <span className="twi-17-infor-fill text-sm leading-[14px]"></span> 
                                <span>{validations.email}</span>
                            </p> 
                        }
                    </div>
                </div>
            </div>
            <div className="w-full px-4">
                <h4 className="font-semibold text-secondary-1 py-3.5">Thông tin giao hàng</h4>
                <div className="w-full flex flex-col gap-4 scrollbar">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <div className="list-address">
                                {cities && (
                                    <select className="w-full" value={selectedCity} name="city" onBlur={handleBlur} onChange={(e) => fetchCities(e.target.value)} >
                                        <option defaultValue value="">
                                            Tỉnh/ Thành phố
                                        </option>
                                        {cities.map((city) => (
                                            <option key={city.code} value={city.code} name={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            { isSubmit && validations.city && 
                                <p className="flex items-center gap-1 text-caption-2 text-error-400"> 
                                    <span className="twi-17-infor-fill text-sm leading-[14px]"></span> 
                                    <span>{validations.city}</span>
                                </p> 
                            }
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="list-address">
                                {districts && (
                                    <select className="w-full" value={selectedDistrict} name="district" onBlur={handleBlur} onChange={(e) => setSelectedDistrict(e.target.value)} >
                                        <option defaultValue value="">
                                            Quận/Huyện
                                        </option>
                                        {districts.map((district) => (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            { isSubmit && validations.district && 
                                <p className="flex items-center gap-1 text-caption-2 text-error-400"> 
                                    <span className="twi-17-infor-fill text-sm leading-[14px]"></span> 
                                    <span>{validations.district}</span>
                                </p> 
                            }
                        </div>
                        <div className="list-address w-full">
                            {wards && (
                                <select className="w-full" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                                    <option defaultValue value="">
                                        Phường
                                    </option>
                                    {wards.map((ward) => (
                                        <option key={ward.code} value={ward.code}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            className="w-full border-b border-neutral-2-200 p-4 focus:outline-0 placeholder:text-neutral-1-600"
                            type="text"
                            placeholder="Địa chỉ"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={200}
                        />
                        { isSubmit && validations.address && 
                            <p className="flex items-center gap-1 text-caption-2 text-error-400"> 
                                <span className="twi-17-infor-fill text-sm leading-[14px]"></span> 
                                <span>{validations.address}</span>
                            </p> 
                        }
                    </div>
                    <textarea 
                        className="w-full p-4 border border-neutral-2-200 rounded-xl bg-white placeholder:text-neutral-1-600 text-body-2 focus:outline-0"
                        name="note"
                        placeholder="Ghi chú giao hàng"
                        rows="5"
                        value={formValues.note}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={500}
                    />   
                </div>
            </div>
            <div className="w-full border-t border-neutral-2-200 px-4">
                <h4 className="font-semibold text-secondary-1 py-3.5">Thông tin thanh toán</h4>
                <div className="flex justify-between items-center py-3">
                    <p className="flex flex-col gap-1 text-body-2">
                        <span className=" font-medium">Tổng tiền hàng</span>
                        <span className="italic">(Giá chưa bao gồm phí vận chuyển)</span>
                    </p>
                    <TotalPriceOrder />
                </div>
                <p className="w-full flex py-3.5 items-center justify-between">
                    <span className="text-body-2 font-medium">Tổng thanh toán</span>
                    <span className="text-heading-6 font-semibold text-secondary-1">
                        <TotalPriceOrder />
                    </span>
                </p>
                { ListOrder.length > 0 && listSoldOut.length == 0
                    ?
                        <button id="react-btn-order" disabled={isLoading} type="submit" className="flex justify-center items-center gap-5 w-full text-body-1 text-white font-medium bg-primary-1 py-2 rounded-full border border-primary-1">
                            <span>Đặt hàng</span> 
                            {isLoading && <LoadingSpinner bgDot="bg-white" />}  
                        </button>
                    :
                        <button id="react-btn-order" disabled className="flex justify-center items-center w-full text-body-1 text-white font-medium bg-primary-1 py-2 rounded-full border border-primary-1 ">
                            <span>Đặt hàng</span>
                        </button>
                }
            </div>
            {showModalSuccess && <ModalOrderSuccess />}
            {showModalFail && <ModalOrderFail /> }
            {showModalWarning && <ModalOrderWarning /> }
        </form>
    )
}


const mapStateToProps = state => {
    return {
        cartInfo: state._todoProduct,
    };
}
export default connect(mapStateToProps)(InfoCustomerForm);