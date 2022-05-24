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
      courseName:""
    }
  }
  

  componentDidMount=()=>{
    this.getStudents()
  }

  submitCourse=async()=>{
    let students=this.state.students
    let days=this.state.days
    days.forEach(element => {
      students.forEach(e=>{
        this.makeNewCourse(element.date,e.value)
      })
    });
  }

  

  makeNewCourse=async(date,id)=>{
    let name=this.state.courseName
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.post('http://localhost:5000/course/',{date:date,StudentID:id,name:name},{headers:header})
    .then(Response=>{
      console.log(Response.data)
    })
    .catch(err=>{
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
              label:e.Fname+" "+e.lname+" : "+e.email,
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
    return (
      <div>
        <div style={{display:'flex',marginTop:'2%'}}>
          <Link to='/Thome' className={style.backBut}>back to home</Link>
        </div>
        <div className={style.box}>
          <div className={style.formTitle}>new course</div>
            <div style={{marginLeft:'10%'}}>
              <div>Course Name</div>
              <input onChange={this.handleCourseNameChange}></input>
              <div>Students</div>
              <Select className={style.select}  isMulti options={this.state.studentData} onChange={this.handleSelectStudent}/>
              <div>Days</div>
              <Calendar handleCal={this.handleCalendar}/>
            </div>
          <button className={style.submitBut} onClick={()=>this.submitCourse()}>submit</button>
        </div>
      </div>
    )
  }
}

