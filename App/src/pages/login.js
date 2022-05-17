import React, { useEffect } from "react";
import style from "./login.module.css"
import axios from 'axios'
import {Redirect} from 'react-router-dom'


export default class login extends React.Component {

    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }

    

    emailChange=(event)=>{
        this.setState({email:event.target.value})
    }

    passwordChange=(event)=>{
        this.setState({password:event.target.value})
    }

    handleLogin=()=>{
        const header={Authorization:'Basic '+this.state.email+":"+this.state.password}
        if(this.state.email.includes('student.oamk.fi')){
            /*axios.post('http:localhost:5000/login',null,{headers:header})
        .then(Response=>{
            sessionStorage.setItem('Token',Response.data.token)
        })
        .catch(err=>{
            console.log(err)
        })*/
        }else{
            sessionStorage.setItem('Token','a')
            return(<Redirect to='/Thome'/>)
            /*axios.post('http:localhost:5000/login',null,{headers:header})
        .then(Response=>{
            sessionStorage.setItem('Token',Response.data.token)
        })
        .catch(err=>{
            console.log(err)
        })*/
        }
        
    }

  render() {
      let token=sessionStorage.getItem('Token')
      if(token==null){
    return (
        <div className={style.box}>
            <div>Login</div>
            <div>email</div>
            <input
            type='text'
            value={this.setState.email}
            onChange={this.emailChange}
            />
            <div>password</div>
            <input
            type='text'
            value={this.setState.password}
            onChange={this.passwordChange}
            />
            <div>
                <button onClick={()=>this.handleLogin()}>login</button>
            </div>
        </div>
    )}
}}
