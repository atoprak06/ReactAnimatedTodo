import {animated,useSpring} from '@react-spring/web'
import React from 'react'

interface PropsInterface{        
    handleChecked():void
    checked:boolean
}

const AnimatedCheckBox:React.FC<PropsInterface> = (props)=>{
    const {handleChecked,checked} = props
    const checkMarkPath = "M4.5 12.75l6 6 9-13.5"
    const checkMarkSpring = useSpring({
        otherStroke: checked ? "100,100" : "0,100",
        opacity:checked?1:0,
        config:{
            duration:300
        }
    });

    return(
        <div className='animated-check-box ml-2'>
            <svg onClick={handleChecked} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <rect x={0} y={0} width={24} height={24}
                    className={`${checked?'fill-blue-400':'fill-white'} transition-all ease-in-out duration-500 stroke-gray-300 cursor-pointer`}                    
                    path='100'
                    strokeWidth={2}
                    rx='8'                              
                />                             
                <animated.path
                    d={checkMarkPath}
                    pathLength={100}
                    strokeDasharray={checkMarkSpring.otherStroke}
                    className='stroke-white'
                    strokeLinecap={'round'}
                    opacity={checkMarkSpring.opacity}
                    strokeWidth={2}    
                    strokeDashoffset={0}      
                /> 
            </svg> 
        </div>
    )
}


export default AnimatedCheckBox