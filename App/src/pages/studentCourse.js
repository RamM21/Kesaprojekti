import axios from 'axios'
import React from 'react'
import style from './studentC.module.css'

export default class studentCourse extends React.Component {
  constructor(props){
    super(props)
    this.state={
      calendar:[],
      name:"",
      statusValues:[{status:'red'},{status:'yellow'},{status:'green'}],
      clicked:[]
    }
  }

  componentDidMount=()=>{
    this.getCourseCalendar()
  }
  getCourseCalendar=()=>{
    let name=sessionStorage.getItem('name')
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.get('http://localhost:5000/course/SDS/'+name,{headers:header})
    .then(Response=>{
      let state=[]
      let array=Response.data
      array.forEach(element => {
        element.Date= new Date(element.Date).toLocaleDateString('fi-FI',{
          day:"numeric",
          month:"numeric",
          year:"numeric"
        })
        if(element.Status==null){
          element.Status='empty'
        }
      });
      this.setState({calendar:array})
      this.setState({name:Response.data[0].Name})
      array.forEach(element=>{
        state.push({'id':element.CourseID,'state':false})
      })
      this.setState({clicked:state})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  handleClick=(index)=>{
    let array=this.state.clicked
    array.forEach(e=>{
      if(e.id==index){
        e.state=!e.state
      }
    })
    this.setState({clicked:array})
  }

  changeStatus=(date,status)=>{
    console.log(date)
    date = new Date().toISOString(date).split('T')
    console.log(date)
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    let data={'status':status,'date':date,'name':this.state.name}
    axios.put('http://localhost:5000/course/',data,{headers:header})
    .then(Response=>{
        console.log(Response.data)
        this.getCourseCalendar()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <div className={style.courseText}>{this.state.name}</div>
        <div className={style.grid}>
          {this.state.calendar.map((e,i)=>(<button className={style.box} onClick={()=>this.handleClick(e.CourseID)}>
            <div className={style.text}>{e.Date}</div>
            <div className={style.text}>Status {e.Status}</div>
            {this.state.clicked[i].state && <div>{this.state.statusValues.map(s=><option value={e.CourseID} onClick={()=>this.changeStatus(e.Date,s.status)}>{s.status}</option>)}</div>}
          </button>))}
        </div>
      </div>
    )
  }
}
