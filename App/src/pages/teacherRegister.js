import React, { Component } from 'react'
import style from './teacherRegister.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class teacherRegister extends Component {
  constructor(props){
    super(props)
    this.state={
      fname:"",
      lname:"",
      email:"",
      password:"",
      confirmPassword:"",
      message:"",
      messageState:true,
      passShow:false,
      passShow2:false
    }
}

handleSubmit=()=>{
  if(this.state.fname==="" || this.state.lname==="" || this.state.class==="" || this.state.email===""
     || this.state.password==="" || this.state.confirmPassword===""){
      this.setState({messageState:false,message:'Fill all boxes first and then submit',passShow:false,passShow2:false})
  }else{
    if(this.state.password===this.state.confirmPassword){
        axios.post('http://localhost:5000/teacher/',{fname:this.state.fname,lname:this.state.lname,
      class:this.state.class,email:this.state.email,password:this.state.password})
      .then(Response=>{
        if(Response.data==="email already used"){
          this.setState({messageState:false,email:"",message:'email already used',passShow:false,passShow2:false})
        }else{
          this.setState({messageState:false,email:"",message:'Sign up was successful',passShow:false,passShow2:false})
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }else{
      this.setState({messageState:false,password:"",confirmPassword:"",message:'Confirm password is different from password',passShow:false,passShow2:false})
    }
  }
}


handle=(event)=>{
  let name=event.target.name
  let value=event.target.value
  this.setState({[name]:value})
}

handleShow=()=>{
  let check=this.state.passShow
  this.setState({passShow:!check})
}
handleShow2=()=>{
  let check=this.state.passShow2
  this.setState({passShow2:!check})
}

render() {
  if(this.state.messageState){
  return (
    <div>
      <div style={{margin:'1%'}}>
        <Link className={style.loginBut} to='/'>Back to login</Link>
      </div>
    <div className={style.box}>
      <div style={{margin:'10%',marginLeft:'15%'}}>
        <div className={style.title}>Sign up</div>
        <div className={style.text}>First name</div>
        <input className={style.input} name={'fname'} value={this.state.fname} onChange={this.handle}></input>
        <div className={style.text}>Last name</div>
        <input className={style.input} name={'lname'} value={this.state.lname} onChange={this.handle}></input>
        <div className={style.text}>Email</div>
        <input className={style.input} name={'email'} value={this.state.email} onChange={this.handle}></input>
        <div className={style.text}>Password</div>
        <input className={style.input} name={'password'} type={this.state.passShow ? 'text':'password'} value={this.state.password} onChange={this.handle}></input>
        <input onClick={this.handleShow} type='checkbox'></input>
        <div className={style.text}>Confirm password</div>
        <input className={style.input} name={'confirmPassword'} type={this.state.passShow2 ? 'text':'password'} value={this.state.confirmPassword} onChange={this.handle}></input>
        <input onClick={this.handleShow2} type='checkbox'></input>
        <button className={style.button} onClick={()=>this.handleSubmit()}>Submit</button>
      </div>
    </div>
    </div>
  )
}else if(this.state.message==='Confirm password is different from password'){
  return (
    <div>
      <div style={{margin:'1%'}}>
        <Link className={style.loginBut} to='/'>Back to login</Link>
      </div>
    <div>
      <div className={style.messageBox}>
      <div className={style.messagePassword}>{this.state.message}</div>
      </div>
      <div className={style.Box}>
        <div style={{margin:'10%',marginLeft:'15%'}}>
          <div className={style.title}>Sign up</div>
          <div className={style.text}>First name</div>
            <input className={style.input} name={'fname'} value={this.state.fname} onChange={this.handle}></input>
            <div className={style.text}>Last name</div>
            <input className={style.input} name={'lname'} value={this.state.lname} onChange={this.handle}></input>
            <div className={style.text}>Email</div>
            <input className={style.input} name={'email'} value={this.state.email} onChange={this.handle}></input>
            <div className={style.text}>Password</div>
            <input className={style.input} name={'password'} type={this.state.passShow ? 'text':'password'} value={this.state.password} onChange={this.handle}></input>
            <input onClick={this.handleShow} type='checkbox'></input>
            <div className={style.text}>Confirm password</div>
            <input className={style.input} name={'confirmPassword'} type={this.state.passShow2 ? 'text':'password'} value={this.state.confirmPassword} onChange={this.handle}></input>
            <input onClick={this.handleShow2} type='checkbox'></input>
          <button className={style.button} onClick={()=>this.handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
    </div>
  )
}else{
  return (
    <div>
      <div style={{margin:'1%'}}>
        <Link className={style.loginBut} to='/'>Back to login</Link>
      </div>
    <div>
      <div className={style.messageBoxFill}>
      <div className={style.messageFill}>{this.state.message}</div>
      </div>
      <div className={style.Box}>
        <div style={{margin:'10%',marginLeft:'15%'}}>
          <div className={style.title}>Sign up</div>
          <div className={style.text}>First name</div>
            <input className={style.input} name={'fname'} value={this.state.fname} onChange={this.handle}></input>
            <div className={style.text}>Last name</div>
            <input className={style.input} name={'lname'} value={this.state.lname} onChange={this.handle}></input>
            <div className={style.text}>Email</div>
            <input className={style.input} name={'email'} value={this.state.email} onChange={this.handle}></input>
            <div className={style.text}>Password</div>
            <input className={style.input} name={'password'} type={this.state.passShow ? 'text':'password'} value={this.state.password} onChange={this.handle}></input>
            <input onClick={this.handleShow} type='checkbox'></input>
            <div className={style.text}>Confirm password</div>
            <input className={style.input} name={'confirmPassword'} type={this.state.passShow2 ? 'text':'password'} value={this.state.confirmPassword} onChange={this.handle}></input>
            <input onClick={this.handleShow2} type='checkbox'></input>
          <button className={style.button} onClick={()=>this.handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
    </div>
  )
}
}
}
