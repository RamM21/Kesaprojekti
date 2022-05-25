import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function LoginB(props) {
    let Nav=useNavigate()

    const [bool, setBool]=useState(false)

        useEffect(()=>{
            if(bool){
                console.log('if')
                if(sessionStorage.getItem('Role')==='teacher'){
                    console.log('teacher')
                    Nav('/')
                    props.logged()
                }else{
                    console.log('Here nav')
                    Nav('/')
                    props.logged()
                }
            } 
        },[bool]) 
         
    return(
        <button style={{margin:'3%'}} onClick={()=>setBool(()=>props.handle())}>login</button>
    )
}
