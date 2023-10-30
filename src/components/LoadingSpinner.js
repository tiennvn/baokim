import React from 'react'; // nạp thư viện react
function LoadingSpinner({bgDot}) {
    let styleDot = "loading-dots--dot " + bgDot
    return(
        <div className='flex justify-center gap-2'>
            <div className={styleDot} />
            <div className={styleDot} />
            <div className={styleDot} />
        </div>
        
    )
}
export default LoadingSpinner
