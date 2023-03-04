import React from 'react'
import AnimatedCheckBox from './AnimatedCheckBox'
import PComponent from './PComponent'
import AnimatedBin from './AnimatedBin'


interface PropsInterface{      
    title:string    
    handleP(e:React.KeyboardEvent<HTMLParagraphElement>):void
    handleChecked():void
    checked:boolean    
    handleRemove():void
}

const Task:React.FC<PropsInterface>=(props)=>{    
    

    const {title,handleP,handleChecked,checked,handleRemove} = props 

    return (
        <div className="task flex items-center justify-between w-screen">
            <AnimatedCheckBox checked={checked} handleChecked={handleChecked} />      

            <PComponent checked={checked} handleP={handleP} title={title} />
                      
            <AnimatedBin handleRemove={handleRemove}
            />           
            
        </div>
    )
}

export default Task