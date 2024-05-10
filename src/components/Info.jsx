import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Info(props) {
    const { output, finished } = props   
    const [tab, setTab] =useState('transcription')
    const [translation, setTranslation] = useState(null)
    const[toLanguage, setToLanguage] = useState('Select language')
    const [translating, setTranslating] =useState(null)
    console.log(output)

    const worker = useRef()

    useEffect(()=> {
        if (!worker.current){
            worker.current = new Worker(new URL('../utils/translate.worker.js',import.meta.url),{
              type:'module'
            })
          }
          const onMessageReceived = async (e)=> {
            switch (e.data.status){
              case 'initiate':
                
                console.log('DOWNLOADING')
                break;
                case 'progress':
                
                console.log('LOADING')
                break;
                case 'update':
                setTranslation(e.data.output)
                console.log(e.data.output)
                break;
                case 'complete':
                setTranslating(false)
                console.log("DONE")
                break;
            }
          }
          worker.current.addEventListener('message', onMessageReceived)
      
          return () => worker.current.removeEventListener('message',onMessageReceived)
    })

    function handleCopy(){
        navigator.clipboard.writeText(textElement)
    }
    function handleDownload(){
        const element = document.createElement('a')
        const file = new Blob([textElement], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download =`Freescribe_${(new Date()).toDateString()}.txt`
        document.body.appendChild(element)
        element.click()
    }
    function generateTranslation(){
        if(translating || toLanguage === "Select language"){
            return
        }

        setTranslating(true)

        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage

        })
    }
    
    const textElement =  tab === 'transcription' ? output.map(val => val.text) : translation || 'No translation'

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 
    justify-center text-center pb-20
    max-w-prose w-full  mx-auto">
        <h1 className="font-semibold text-4xl 
        sm:text-5xl md:text-6xl whitespace-nowrap">
           Your <span className="text-green-400 bold font-semibold">Transcription</span>
        </h1>
        <div className=" grid grid-cols-2 mx-auto bg-white border-green-300 shadow rounded-full overflow-hidden items-center ">
            <button onClick={()=> setTab('transcription')} className=
            {" px-4 duration-200 py-1  " + 
            (tab ==='transcription' ? " bg-green-400 text-white" : " text-green-400  hover:text-green-600" )}>
                Transcription</button>
            <button onClick={()=> setTab('translation') } className={"px-4 duration-200 py-1"  + 
            (tab ==='translation' ? " bg-green-400  text-white" : " text-green-400 hover:text-green-600" )}>Translation</button>

        </div>
        <div className="my-8 flex flex-col">
        {tab === 'transcription'?(
            <Transcription {...props} textElement ={textElement} />
        ): (
            <Translation {...props} toLanguage ={toLanguage} translating = {translating} textElement ={textElement}
            setTranslation={setTranslation} setTranslating ={setTranslating} setToLanguage ={setToLanguage}
            generateTranslation = {generateTranslation} />
        )}

        </div>
        <div className="flex items-center gap-4 mx-auto ">
            <button onClick={handleCopy} title='Copy' className=" bg-white hover:text-green-600 duration-200 text-green-400 px-2 aspect-square grid place-items-center rounded ">
            <i className="fa-solid fa-copy"></i>
            </button>
            <button onClick={handleDownload} title='Download' className=" bg-white hover:text-green-600 duration-200 text-green-400 px-2 aspect-square grid place-items-center rounded ">
            <i className="fa-solid fa-circle-down"></i>
            </button>
        </div>
        </main>
  )
}