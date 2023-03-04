import {useState,useEffect,useRef} from 'react'

interface PropsInterface{
    title:string,    
    handleP(e:React.KeyboardEvent<HTMLParagraphElement>):void
    checked:boolean
}
const PComponent:React.FC<PropsInterface> = (props) =>{
    const {title,handleP,checked} = props
    const [newValue] = useState(title)    
    const pRef = useRef<HTMLParagraphElement>(null)

    useEffect(()=>{
        if(pRef.current?.innerHTML === ''){
            pRef.current?.focus()
        }
    },[])

       
    return (
        <div  className='p-component truncate w-screen ml-2'  >
            <p
            ref={pRef}                    
            spellCheck={false}     
            onKeyUp={(e)=>handleP(e)}            
            contentEditable={!checked} 
            suppressContentEditableWarning={true}
            className={`truncate p-1 my-4 break-all bg-white tracking-wide transition-all duration-300 ${checked?'text-gray-400 strike':''}`}
            >
             {newValue}             
            </p>
        </div>
    )
}

export default PComponent