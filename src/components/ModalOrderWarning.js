import {baseURL} from '../api'
import {UpdateCart} from "../actions"
import  {connect} from  'react-redux';
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import React from 'react'; // nạp thư viện react

function ModalOrderWarning ({cartInfo, UpdateCart}) {
    let phoneNumber = "";
    if(document.getElementById("phone-number-contact")){
        phoneNumber = document.getElementById("phone-number-contact").getAttribute("data-phone-number");
    }
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {
        UpdateCart(cartInfo)
        setIsLoading(!isLoading);
    }
    return (
        <div className="fixed bg-black/10 inset-0 mx-auto w-full h-full z-50">
            <div className="pt-[40%] px-4 flex justify-center xl:pt-[5%]">
                <div className="flex flex-col items-center gap-5 w-fit bg-secondary-6 rounded-xl px-4 pt-10 pb-12 md:px-12 max-w-[435px]">
                    <div className="w-[60px] h-[60px]">
                    <svg width="100%" height="100%" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4852_17213)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M30.5003 19.2852C31.6837 19.2852 32.6431 20.2445 32.6431 21.428V34.2852C32.6431 35.4686 31.6837 36.428 30.5003 36.428C29.3168 36.428 28.3574 35.4686 28.3574 34.2852V21.428C28.3574 20.2445 29.3168 19.2852 30.5003 19.2852Z" fill="#FFC107"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2144 47.1431C26.2144 44.7762 28.1331 42.8574 30.5001 42.8574C32.867 42.8574 34.7858 44.7762 34.7858 47.1431C34.7858 49.5101 32.867 51.4289 30.5001 51.4289C28.1331 51.4289 26.2144 49.5101 26.2144 47.1431Z" fill="#FFC107"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.1474 0.968992C28.1569 0.351911 29.3171 0.0253906 30.5002 0.0253906C31.6834 0.0253906 32.8436 0.351911 33.8531 0.968992C34.8626 1.58607 35.6822 2.46978 36.2216 3.52279L36.2312 3.54148L59.7996 50.6784C59.8003 50.6798 59.8009 50.6812 59.8016 50.6825C60.2934 51.6601 60.5274 52.747 60.4816 53.8403C60.4357 54.9352 60.1108 56.0002 59.5375 56.9342C58.9643 57.8681 58.1618 58.64 57.2063 59.1766C56.2508 59.7131 55.174 59.9965 54.0781 59.9998L54.0716 59.9998H6.92879L6.9223 59.9998C5.82646 59.9965 4.74966 59.7131 3.79416 59.1766C2.83866 58.64 2.03617 57.8681 1.46292 56.9342C0.88967 56.0002 0.564681 54.9352 0.518817 53.8403C0.473008 52.7468 0.707182 51.6596 1.19912 50.6819C1.1997 50.6807 1.20029 50.6796 1.20087 50.6784L24.7787 3.52274C25.3182 2.46973 26.1379 1.58607 27.1474 0.968992ZM30.5002 4.31111C30.1058 4.31111 29.7191 4.41994 29.3826 4.62564C29.0486 4.82981 28.777 5.12154 28.5971 5.4691L5.03113 52.601L5.02813 52.607C4.86375 52.9332 4.78549 53.296 4.80078 53.661C4.81606 54.0259 4.92439 54.3809 5.11548 54.6923C5.30656 55.0036 5.57405 55.2609 5.89256 55.4397C6.21022 55.6181 6.56809 55.7125 6.93237 55.7141H54.0681C54.4323 55.7125 54.7902 55.6181 55.1079 55.4397C55.4264 55.2609 55.6939 55.0036 55.885 54.6923C56.076 54.3809 56.1844 54.0259 56.1997 53.661C56.2149 53.296 56.1367 52.9332 55.9723 52.607L55.9693 52.601L32.4033 5.4691C32.2235 5.12154 31.9518 4.82981 31.6178 4.62564C31.2813 4.41994 30.8946 4.31111 30.5002 4.31111Z" fill="#FFC107"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_4852_17213">
                        <rect width="60" height="60" fill="white" transform="translate(0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>

                    </div>
                    <div className="flex flex-col text-body-2 gap-2 text-center text-neutral-1-700">
                        <p className="text-header-1 font-semibold text-warning-400">
                            Cảnh báo
                        </p>
                        <p>
                            Đơn hàng đã được gửi!
                        </p>
                        <p>
                            Email xác nhận đơn hàng thất bại, vui lòng liên hệ " <span className='font-medium'>{ phoneNumber }</span>" để được xác nhận
                        </p>
                    </div>
                    <button type='button' onClick={handleSubmit} className='flex gap-2 w-full border border-warning-400 bg-warning-400 rounded-full text-white text-body-1 font-medium justify-center items-center'>
                        <a href={baseURL} className="py-2">
                            Tiếp tục mua hàng
                        </a>
                        {isLoading && <LoadingSpinner />}
                    </button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        cartInfo: state._todoProduct,
       };
  }
 export default connect(mapStateToProps, {UpdateCart})(ModalOrderWarning);
  
