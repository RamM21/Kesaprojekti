import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function LoginB(props) {
    let Nav=useNavigate()

    const [bool, setBool]=useState(false)

        useEffect(()=>{
            if(bool){
                console.log('effect if')
                if(sessionStorage.getItem('Role')==='teacher'){
                    Nav('/Thome')
                    props.logged()
                }else{
                    console.log('Here nav')
                    Nav('/Shome')
                    props.logged()
                } 
            }
        }) 
         
    return(
        <button onClick={()=>setBool(()=>props.handle())}>login</button>
    )
}
