import React, { useEffect,useState } from "react";
import style from "./login.module.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import LoginB from "./LoginB";


export default class login extends React.Component {

    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            check:true,
            message:""
        }
    }

    emailChange=(event)=>{
        this.setState({email:event.target.value})
    }

    passwordChange=(event)=>{
        this.setState({password:event.target.value})
    }

    wrongCheck=()=>{
        this.setState({check:false})
    }

    handleMessage=()=>{
        this.setState({message:'Wrong password or email'})
    }

    handleLogin=async ()=>{
        if(this.state.email=="" || this.state.password==""){
            this.setState({message:'Fill both boxes first'},()=>this.wrongCheck())
        }else{
            if(this.state.email.includes('students.oamk.fi')){
                await axios.post('http://localhost:5000/login/',null,{auth:{username:this.state.email,password:this.state.password}})
                .then(Response=>{
                    sessionStorage.setItem('Token',Response.data.token)
                    sessionStorage.setItem('Role','student')
                    this.props.logged()
                })
                .catch(err=>{
                    console.log(err)
                    this.setState({message:'Wrong password or email'},()=>this.wrongCheck())
                })
            }else{
                await axios.post('http://localhost:5000/login/',null,{auth:{username:this.state.email,password:this.state.password}})
                .then(Response=>{
                    sessionStorage.setItem('Token',Response.data.token)
                    sessionStorage.setItem('Role','teacher')
                    this.props.logged()
                })
                .catch(err=>{
                    console.log(err)
                    this.setState({message:'Wrong password or email'},()=>this.wrongCheck())
                })
            }
        }
    }

  render() {
      if(this.state.check){
    return (
        <div className={style.box}>
            <div className={style.loginText}>Login</div>
            <div className={style.Text}>email</div>
            <input
            className={style.emailInput}
            type='text'
            value={this.setState.email}
            onChange={this.emailChange}
            />
            <div className={style.Text}>password</div>
            <input
            className={style.passwordInput}
            type='text'
            value={this.setState.password}
            onChange={this.passwordChange}
            />
            <div>
                <button className={style.loginBut} onClick={()=>this.handleLogin()}>login</button>
            </div>
        </div>
    )
      }else{
        return (
            <div className={style.box}>
                <div className={style.loginText}>Login</div>
                <div className={style.message}>{this.state.message}</div>
                <div className={style.Text}>email</div>
                <input
                className={style.emailInput}
                type='text'
                value={this.setState.email}
                onChange={this.emailChange}
                />
                <div className={style.Text}>password</div>
                <input
                className={style.passwordInput}
                type='text'
                value={this.setState.password}
                onChange={this.passwordChange}
                />
                <div>
                    <button className={style.loginBut} onClick={()=>this.handleLogin()}>login</button>
                </div>
            </div>
        )
      }
}}