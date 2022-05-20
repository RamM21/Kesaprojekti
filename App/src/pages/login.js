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
            check:true
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

    handleLogin=()=>{
        if(this.state.email.includes('students.oamk.fi')){
            axios.post('http://localhost:5000/login/',null,{auth:{username:this.state.email,password:this.state.password}})
            .then(Response=>{
                sessionStorage.setItem('Token',Response.data.token)
                sessionStorage.setItem('Role','student')
                return true
            })
            .catch(err=>{
                console.log(err)
                this.wrongCheck()
                return false
            })
        }else{
            console.log(this.state.email+" "+this.state.password)
            axios.post('http://localhost:5000/login/',null,{auth:{username:this.state.email,password:this.state.password}})
            .then(Response=>{
                sessionStorage.setItem('Token',Response.data.token)
                sessionStorage.setItem('Role','teacher')
                return true
            })
            .catch(err=>{
                console.log(err)
                this.wrongCheck()
                return false
            })
        }
        
    }

  render() {
      if(this.state.check==true){
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
                    <LoginB handle={this.handleLogin}/>
            </div>
        </div>
    )
      }else{
        return (
            <div className={style.box}>
                <div>Login</div>
                <div>wrong password or email</div>
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
                    <LoginB handle={this.handleLogin} logged={this.props.logged}/>
                </div>
            </div>
        )
      }
}}