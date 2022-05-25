import axios from 'axios'
import React from 'react'
import style from './studentC.module.css'
import {Link} from 'react-router-dom'

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
      
      array.sort(function(a,b){
        a.Date = a.Date.split('/').join('');
        b.Date = b.Date.split('/').join('');
        return a.Date > b.Date ? 1 : a.Date < b.Date ? -1 : 0;
      })
      console.group(array)
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
      if(e.id===index){
        e.state=!e.state
      }
    })
    this.setState({clicked:array})
  }

  changeStatus=(date,status)=>{
    var newDate = date.slice(-4)
    newDate+=date.slice(2,5)
    newDate+=date.slice(0,2)
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    let data={'status':status,'date':newDate,'name':this.state.name}
    axios.put('http://localhost:5000/course/',data,{headers:header})
    .then(Response=>{
        this.getCourseCalendar()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <div style={{margin:'2%'}}>
        <Link to='/' className={style.backBut}>back to courses</Link>
        <div className={style.courseText}>{this.state.name}</div>
        </div>
        <div style={{backgroundColor:'black',width:'10%',height:'3%'}}>
        </div>
        <div className={style.grid}>
          {this.state.calendar.map((e,i)=>(<button className={style.box} style={{backgroundColor:e.Status}} onClick={()=>this.handleClick(e.CourseID)}>
            <div className={style.text}>{e.Date}</div>
            <div className={style.text}>Status {e.Status}</div>
            {this.state.clicked[i].state && <div>{this.state.statusValues.map(s=><option className={style.optionsBox} style={{backgroundColor:s.status}} value={e.CourseID} onClick={()=>this.changeStatus(e.Date,s.status)}>{s.status}</option>)}</div>}
          </button>))}
        </div>
      </div>
    )
  }
}
