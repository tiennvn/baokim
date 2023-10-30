import React from 'react'; // nạp thư viện react

export default function Notification({message=""}) {
    return (
        <div className='fixed justify-center inset-x-0 top-[120px] w-full h-fit flex z-50'>
            <div className="bg-white flex items-center py-3 px-4 gap-4 rounded-lg shadow-popup w-fit">
                <span className="flex p-2 bg-success-400 twi-17-check-fill text-2xl leading-6 text-white rounded-full text-center"></span>
                <span className="text-body-2 text-neutral-1-900">{message}</span>
            </div>
        </div>
    )
}
