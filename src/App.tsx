import React,{useEffect, useState} from 'react';
import Task from './components/Task'
import todos from './data.json'
import {animated,useTransition} from '@react-spring/web'


function App() {

  interface TaskInterface{
    id:number
    title:string
    isChecked:boolean    
  }

  const [allTasks,setAllTasks] = useState<TaskInterface[]>(todos.todos)   
 
  const transitions = useTransition(allTasks,{
    key:(task:TaskInterface)=>task.id,      
    from: {opacity: 0,maxHeight:0,x:-400 },
    enter: { opacity: 1,maxHeight:50,x:0,},
    leave: { opacity: 0,maxHeight:0,x:-400,},       
    config:{duration:300}        
  })

  const Tasks = transitions((style,task)=>(
    <animated.div  style={style}>
      <Task        
      handleP={(e:React.KeyboardEvent<HTMLParagraphElement>)=>handleP(e,task.id)}      
      title={task.title}
      handleChecked={()=>handleChecked(task.id)} 
      checked={task.isChecked}      
      handleRemove={()=>handleRemove(task.id)}
      key={task.id}
      />     
    </animated.div>
  ))

  const handleP = (e:React.KeyboardEvent<HTMLParagraphElement>,id:number)=>{
    console.log('handleP')
    allTasks.forEach((task,index)=>{
      if(task.id===id){
        const newTasks = [...allTasks]
        newTasks[index].title = e.currentTarget.innerHTML
        setAllTasks(newTasks) 
      }
    })
  }
  
  const handleChecked = (id:number) =>{    
    allTasks.forEach((task,index)=>{
      if(task.id===id){
        const newTasks = [...allTasks]
        newTasks[index].isChecked = !newTasks[index].isChecked
        setAllTasks(newTasks) 
        console.log('checked..')  
      }
    })
  }

  const addTask = () => {
    const newTask={
      id:Math.floor(Math.random()*10000),
      title:'',
      isChecked:false
    }    
    setAllTasks(prev=>[newTask,...prev])   
    console.log('new task added..')
    
  }

  const handleRemove = (id:number) => {
    const newTasks= allTasks.filter(task=>task.id!==id)
    setAllTasks(newTasks)    
    console.log('task removed..')
  }    

  return (
    <div className="App pt-4 min-h-screen flex items-center justfiy-center bg-white flex-col w-screen">
      <h1 className='text-2xl italic bg-blue-100 text-black p-3 w-screen text-center mb-4'>React Animated Todo</h1>            
      
      {Tasks}
      
      <div className='w-screen sticky bottom-0 p-20 '>
        <small onClick={addTask} className='bg-blue-400 p-2 float-right rounded-full text-white text-2xl text-center cursor-pointer px-4 shadow hover:shadow-2xl  '>+</small>
      </div>
    </div>
  );
}

export default App;
