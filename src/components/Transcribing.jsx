import React from 'react'

export default function Transcribing(props) {
    const {downloading} =props
  return (
    <div className="flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 text-center pb-24 p-4">
         <div className= "flex items-center flex-col  gap-2  sm:gap-4 ">
            
         <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
            <span className="text-green-400 bold font-semibold">
                Transcribing
                </span>

         </h1>
         <p>{!downloading ? 'Warming up cylinders':
         'core cylinders engaged'} 
         </p>
         </div>
         <div className="flex flex-col gap-2 sm:gap-4 max-w-[400px] mx-auto w-full">
            {[0,1,2].map(val=>{
                return(
                    <div key={val} className={" loading rounded-full h-2 sm:h-3 bg-slate-400 "
                        +`loading${val}`}></div>
                )
            })}

            </div>
        
        </div>
  )
}