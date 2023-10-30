import {baseURL} from '../api'
import {UpdateCart} from "../actions"
import  {connect} from  'react-redux';
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import React from 'react'; // nạp thư viện react

function ModalOrderSuccess ({cartInfo, UpdateCart}) {
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
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.9119 8.86332C35.3569 6.83372 30.2678 6.33092 25.4037 7.4299C20.5396 8.52889 16.161 11.1708 12.921 14.9616C9.68104 18.7523 7.75324 23.4889 7.42513 28.4648C7.09702 33.4407 8.38618 38.3894 11.1003 42.5728C13.8145 46.7562 17.8083 49.9501 22.486 51.6783C27.1637 53.4065 32.2747 53.5763 37.0568 52.1623C41.8389 50.7484 46.0358 47.8266 49.0216 43.8326C52.0074 39.8385 53.6222 34.9863 53.625 29.9996V27.7006C53.625 26.6651 54.4645 25.8256 55.5 25.8256C56.5356 25.8256 57.375 26.6651 57.375 27.7006V30.0006C57.3717 35.796 55.4951 41.4362 52.0251 46.0779C48.5551 50.7196 43.6776 54.1153 38.12 55.7585C32.5625 57.4016 26.6226 57.2043 21.1864 55.1959C15.7501 53.1875 11.1088 49.4756 7.95446 44.6138C4.80015 39.7521 3.30194 34.0009 3.68326 28.2181C4.06457 22.4352 6.30499 16.9306 10.0704 12.5251C13.8358 8.1196 18.9244 5.0493 24.5773 3.7721C30.2302 2.49491 36.1445 3.07924 41.4381 5.43796C42.384 5.85942 42.8092 6.96788 42.3877 7.91377C41.9662 8.85965 40.8578 9.28478 39.9119 8.86332Z" fill="#72B626"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M56.8252 8.67351C57.5578 9.40538 57.5584 10.5926 56.8265 11.3252L31.8265 36.3502C31.4749 36.7021 30.9979 36.8999 30.5005 36.9C30.003 36.9001 29.5259 36.7026 29.1742 36.3508L21.6742 28.8508C20.9419 28.1186 20.9419 26.9314 21.6742 26.1992C22.4064 25.4669 23.5936 25.4669 24.3258 26.1992L30.4993 32.3727L54.1735 8.67484C54.9054 7.94224 56.0926 7.94165 56.8252 8.67351Z" fill="#72B626"/>
                        </svg>
                    </div>
                    <div className="flex flex-col text-body-2 gap-2 text-center text-neutral-1-700">
                        <p className="text-header-1 font-semibold text-primary-1">
                            Thành Công
                        </p>
                        <p>
                            Đơn hàng đã được gửi!
                        </p>
                        <p>
                            Chúng tôi sẽ liên hệ Quý khách trong thời gian sớm nhất!
                        </p>
                    </div>
                    <button type='button' onClick={handleSubmit} className='flex gap-2 w-full border border-primary-1 rounded-full text-primary-1 text-body-1 font-medium justify-center items-center'>
                        <a href={baseURL} className="py-2">
                            Tiếp tục mua hàng
                        </a>
                        {isLoading && <LoadingSpinner bgDot="bg-primary-1" />}
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
 export default connect(mapStateToProps, {UpdateCart})(ModalOrderSuccess);
  
