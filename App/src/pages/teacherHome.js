import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from './teacherH.module.css'


export default class teacherHome extends React.Component {
  constructor(props){
    super(props)
    this.state={
      courses:[],
      state:false,
      name:""
    }
  }
  componentDidMount=()=>{
    this.getTeacherCourses()
  }
  getTeacherCourses=()=>{
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.get('http://localhost:5000/course/t',{headers:header})
    .then(Response=>{
      let newArray=Response.data
      newArray.forEach(element => {
        element.min= new Date(element.min).toLocaleDateString('fi-FI',{
          day:"numeric",
          month:"numeric",
          year:"numeric"
        })
        element.max= new Date(element.max).toLocaleDateString('fi-FI',{
          day:"numeric",
          month:"numeric",
          year:"numeric"
        })
      });
      this.setState({courses:newArray})
    })
  }

  deleteCourse=(name)=>{
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.delete('http://localhost:5000/course/'+name,{headers:header})
    .then(Response=>{
      this.getTeacherCourses()
      this.confirmationHandle("")
    }
    )
    .catch(err=>{
      console.log(err)
    })
  }

  setCourseName=(name)=>{
    sessionStorage.setItem('name',name)
  }

  logoutHandle=()=>{
    sessionStorage.removeItem('Token')
    this.props.logged()
  }

  confirmationHandle=(name)=>{
    let state=!this.state.state
    this.setState({state:state,name:name})
  }

  render() {
    if(this.state.state){
      return (
        <div>
          <div>
            <Link to='/' className={style.logout} onClick={()=>this.logoutHandle()}>logout</Link>
            <Link to='/NCourse' className={style.newCourse}>New course</Link>
          </div>
          <div className={style.topText}>
            Courses
          </div>
          <div className={style.confirmationBox}>
              <div style={{margin:'3%'}}>Are you sure delete course {this.state.name}</div>
              <div style={{marginLeft:'35%'}}>
                <button style={{marginRight:'10%'}} onClick={()=>this.deleteCourse(this.state.name)}>Yes</button>
                <button onClick={()=>this.confirmationHandle("")}>No</button>
              </div>
          </div>
            <div className={style.grid}>
            {this.state.courses.map(e=>(<div className={style.box}>
              <Link to='/Tcourse' style={{textDecoration:'none'}} onClick={()=>this.setCourseName(e.name)}>
              <div className={style.textBox}>
                <div className={style.text}>{e.name}</div>
                <div className={style.text}>Starting date {e.min}</div>
                <div className={style.text}>Ending date {e.max}</div>
              </div>
            </Link>
            <div>
              <button className={style.delBut} onClick={()=>this.confirmationHandle(e.name)}>x</button>
            </div>
            </div>))}
          </div>
        </div>
      )
    }else{
    return (
      <div>
        <div style={{marginTop:'1%'}}>
          <Link to='/' className={style.logout} onClick={()=>this.logoutHandle()}>logout</Link>
          <Link to='/NCourse' className={style.newCourse}>New course</Link>
        </div>
        <div className={style.topText}>
          Courses
        </div>
        <div style={{height:'2px',width:'100%',backgroundColor:'black'}}></div>
          <div className={style.grid}>
          {this.state.courses.map(e=>(<div className={style.box}>
            <Link to='/Tcourse' style={{textDecoration:'none'}} onClick={()=>this.setCourseName(e.name)}>
            <div className={style.textBox}>
              <div className={style.text}>{e.name}</div>
              <div className={style.text}>Starting date {e.min}</div>
              <div className={style.text}>Ending date {e.max}</div>
            </div>
          </Link>
          <div>
            <button className={style.delBut} onClick={()=>this.confirmationHandle(e.name)}>x</button>
          </div>
          </div>))}
        </div>
      </div>
    )
    }
  }
}
