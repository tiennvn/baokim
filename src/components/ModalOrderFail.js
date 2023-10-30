import { useState } from "react";
import React from 'react'; // nạp thư viện react

function ModalOrderFail () {
  const [closeModalFail, setCloseModalFail] = useState(false);
  
    return (
        <div className="fixed bg-black/10 inset-0 mx-auto w-full h-full z-50">
            <div className="pt-[40%] px-4 flex justify-center xl:pt-[5%]">
                <div className="flex flex-col items-center gap-5 w-fit bg-secondary-6 rounded-xl px-4 pt-10 pb-12 md:px-12 max-w-[435px]">
                    <div className="w-[60px] h-[60px]">
                        <svg width="100%" height="100%" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.902 29.9973L48.3265 16.6021C48.9144 16.0142 49.2447 15.2167 49.2447 14.3852C49.2447 13.5537 48.9144 12.7562 48.3265 12.1683C47.7386 11.5803 46.9413 11.25 46.1099 11.25C45.2785 11.25 44.4812 11.5803 43.8933 12.1683L30.5 25.5947L17.1067 12.1683C16.5188 11.5803 15.7215 11.25 14.8901 11.25C14.0587 11.25 13.2614 11.5803 12.6735 12.1683C12.0856 12.7562 11.7553 13.5537 11.7553 14.3852C11.7553 15.2167 12.0856 16.0142 12.6735 16.6021L26.098 29.9973L12.6735 43.3925C12.3809 43.6828 12.1486 44.0282 11.9901 44.4087C11.8316 44.7892 11.75 45.1973 11.75 45.6095C11.75 46.0217 11.8316 46.4298 11.9901 46.8103C12.1486 47.1908 12.3809 47.5361 12.6735 47.8264C12.9637 48.119 13.309 48.3513 13.6894 48.5099C14.0699 48.6684 14.4779 48.75 14.8901 48.75C15.3022 48.75 15.7103 48.6684 16.0907 48.5099C16.4712 48.3513 16.8165 48.119 17.1067 47.8264L30.5 34.4L43.8933 47.8264C44.1835 48.119 44.5288 48.3513 44.9093 48.5099C45.2897 48.6684 45.6978 48.75 46.1099 48.75C46.5221 48.75 46.9301 48.6684 47.3106 48.5099C47.691 48.3513 48.0363 48.119 48.3265 47.8264C48.6191 47.5361 48.8514 47.1908 49.0099 46.8103C49.1684 46.4298 49.25 46.0217 49.25 45.6095C49.25 45.1973 49.1684 44.7892 49.0099 44.4087C48.8514 44.0282 48.6191 43.6828 48.3265 43.3925L34.902 29.9973Z" fill="#EB3B5B"/>
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2 text-center text-neutral-1-700 text-body-2">
                        <p className="text-header-1 font-semibold text-error-400">
                            Thất bại
                        </p>
                        <p>
                            Đơn hàng chưa được gửi!
                        </p>
                        <p>
                            Chúng tôi xin lỗi vì sự bất tiện này, xin quý khách vui lòng thử lại!
                        </p>
                    </div>
                    <button onClick={() => setCloseModalFail(!closeModalFail)} className="py-2 flex w-full border border-error-400 rounded-full text-error-400 text-body-1 justify-center">
                        <p>Thử lại</p>
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ModalOrderFail