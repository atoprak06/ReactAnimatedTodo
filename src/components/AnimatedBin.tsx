import {useState,useRef} from 'react'
import Draggable from "react-draggable";

interface PropsInterface{    
    handleRemove():void    
}

const AnimatedBin:React.FC<PropsInterface> = (props) =>{
    const {handleRemove} = props
    const [active,setActive] = useState(false)
    const dragRef = useRef<HTMLDivElement>(null)
    const [position,setPosition] = useState({x:0,y:0})
    const backPosAnimation:string = 'transition-all duration-300 ease-in-out'
    const [isRemoved,setIsRemoved] = useState(false)

    const handleStart=()=>{ 
        setIsRemoved(true)
        setActive(prev=>!prev)        
    }

    const handleStop =()=>{
        setActive(prev=>!prev)
        const offSetLeft:any = dragRef.current?.offsetLeft
        const {x}:any = dragRef.current?.getBoundingClientRect()
        if(offSetLeft-x!==120){
            setIsRemoved(false)
            setPosition(prev=>prev)
        }
        if(Math.ceil(offSetLeft-x)>=120){
            console.log('deleting..')
            handleRemove()
        }
    }

    const binPath = "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"

    return(
        <Draggable position={position}  onStart={handleStart} onStop={handleStop}  bounds={{left: -120,right:0,bottom:0,top:0}}>
            <div ref={dragRef}  className={`animated-bin items-center flex mr-2 relative cursor-pointer ${isRemoved?'':backPosAnimation}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 z-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d={binPath} />
                </svg> 
                <div  className={`bg-red-500 w-screen px-4 py-2 transition-all duration-200 ease-in-out absolute left-5 ${active?'opacity-1':'opacity-0'}`}>
                    <h1 className='text-white bg-transparent font-bold  tracking-widest'>REMOVE</h1>
                </div>          
            </div>            
        </Draggable>        
    )
}

export default AnimatedBin