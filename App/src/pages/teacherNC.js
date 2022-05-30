import React from 'react'
import style from './teacherNC.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Select, {OnChangeValue} from 'react-select'
import Calendar from './Calendar'

export default class teacherNC extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      students:[],
      days:[],
      studentData:[],
      courseName:"",
      useMessage:"",
      message:false
    }
  }
  

  componentDidMount=()=>{
    this.getStudents()
  }

  submitCourse=async()=>{
    let students=this.state.students
    let days=this.state.days
    if(students.length==0 || days.length==0 || this.state.courseName==""){
      this.setState({useMessage:'Fill all boxes and then try again',message:true})
    }else{
      days.forEach(element => {
        students.forEach(e=>{
          this.makeNewCourse(element.date,e.value)
        })
      });
    }
  }

  handleMessage=(check)=>{
    if(check){
      this.setState({useMessage:'Course made succesfully',message:true})
    }else{
      this.setState({useMessage:'There was an error try again',message:true})
    }
  }
  

  makeNewCourse=async(date,id)=>{
    let name=this.state.courseName
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.post('http://localhost:5000/course/',{date:date,StudentID:id,name:name},{headers:header})
    .then(Response=>{
      if(this.state.message==false || this.state.useMessage.includes('Fill')){
        this.handleMessage(true)
      }
      console.log(Response)
    })
    .catch(err=>{
      if(this.state.message==false){
        this.handleMessage(false)
      }
      console.log(err)
    })
  }

  getStudents=()=>{
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.get('http://localhost:5000/student/',{headers:header})
    .then(Response=>{
        let array=[]
        Response.data.forEach(e=>{
            array.push({value:e.StudentID,
              label:e.Fname+" "+e.lname+" : "+e.email+" : "+e.class,
            })
        })
        this.setState({studentData:array})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  handleSelectStudent=(OnChangeValue)=>{
    this.setState({students:OnChangeValue})
  }

  handleCalendar=(event)=>{
    let array=[]
    event.forEach(e=>{
      let day= new Date(e).toLocaleDateString('fi-FI',{
        day:"numeric",
        month:"numeric",
        year:"numeric"
      })
      var newDate = day.slice(-4)
      newDate+=day.slice(2,5)
      newDate+=day.slice(0,2)
      array.push({date:newDate})
    })
    this.setState({days:array})
  }

  handleCourseNameChange=(event)=>{
    this.setState({courseName:event.target.value})
  }

  render() {
    if(this.state.message){
      return (
        <div>
          <div style={{display:'flex',marginTop:'2%'}}>
            <Link to='/' className={style.backBut}>back to home</Link>
          </div>
          <div className={style.messageBox}>
            <div className={style.message}>{this.state.useMessage}</div>
          </div>
          <div className={style.box}>
            <div className={style.formTitle}>new course</div>
              <div style={{marginLeft:'10%'}}>
                <div className={style.text}>Course Name</div>
                <input className={style.nameInput} onChange={this.handleCourseNameChange}></input>
                <div className={style.text}>Students</div>
                <Select className={style.select}  isMulti options={this.state.studentData} onChange={this.handleSelectStudent}/>
                <div className={style.text}>Days</div>
                <Calendar handleCal={this.handleCalendar}/>
              </div>
            <button className={style.submitBut} onClick={()=>this.submitCourse()}>submit</button>
          </div>
        </div>
      )
    }else{
      return (
        <div>
          <div style={{display:'flex',marginTop:'2%'}}>
            <Link to='/' className={style.backBut}>back to home</Link>
          </div>
          <div className={style.box}>
            <div className={style.formTitle}>new course</div>
              <div style={{marginLeft:'10%'}}>
                <div className={style.text}>Course Name</div>
                <input className={style.nameInput} onChange={this.handleCourseNameChange}></input>
                <div className={style.text}>Students</div>
                <Select className={style.select}  isMulti options={this.state.studentData} onChange={this.handleSelectStudent}/>
                <div className={style.text}>Days</div>
                <Calendar handleCal={this.handleCalendar}/>
              </div>
            <button className={style.submitBut} onClick={()=>this.submitCourse()}>submit</button>
          </div>
        </div>
      )
    }
  }
}

