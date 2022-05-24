import React from "react";
import axios from "axios";
import style from './teacherC.module.css'
import { Link } from "react-router-dom";
import Status from './status'


export default class teacherCourse extends React.Component {
  constructor(props){
    super(props)
    this.state={
      calendar:[],
      onTimeNames:[],
      lateNames:[],
      name:sessionStorage.getItem('name')
    }
  }

  componentDidMount=()=>{
    this.getTeacherCourseCalendar()
  }

  getTeacherCourseCalendar= async()=>{
    let name=sessionStorage.getItem('name')
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.get('http://localhost:5000/course/DTC/'+name,{headers:header})
    .then(Response=>{
      let array=Response.data
      array.forEach(element => {
        element.date= new Date(element.date).toLocaleDateString('fi-FI',{
          day:"numeric",
          month:"numeric",
          year:"numeric"
        })
        if(element.status==null){
          element.status='empty'
        }
      });
      this.getDayStatus(array)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  getDayStatus=async (array)=>{
    let name=sessionStorage.getItem('name')
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    let arr=[]
    await array.forEach(e=>{
      var newDate = e.date.slice(-4)
      newDate+=e.date.slice(2,5)
      newDate+=e.date.slice(0,2)
      axios.get('http://localhost:5000/course/DSC/'+name+"/"+newDate,{headers:header})
      .then(Response=>{
        let array = Response.data
        array.forEach(element => {
          element.date= new Date(element.date).toLocaleDateString('fi-FI',{
            day:"numeric",
            month:"numeric",
            year:"numeric"
          })
          if(element.status==null){
            element.status='empty'
          }
        });
        
          
            if(arr.length>0){
              for(let ii=0;ii<arr.length;ii++){
            if(arr[ii].date==array[0].date){
              
            }else{
                arr.push({date:array[0].date,
                Array:array
            })
            }}
            }else{
              arr.push({date:array[0].date,
                Array:array
            })
            }
            arr.sort()
            this.setState({calendar:arr})
      })
      .catch(err=>{
        console.log(err)
      })
    })
  }

  getUnanwser=(date)=>{
    var newDate = date.slice(-4)
      newDate+=date.slice(2,5)
      newDate+=date.slice(0,2)
    let name=sessionStorage.getItem('name')
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.post('http://localhost:5000/course/LS/',{name:name,date:newDate},{headers:header})
    .then(Response=>{
      this.setState({lateNames:Response.data})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  getAnwsered=(date)=>{
    var newDate = date.slice(-4)
      newDate+=date.slice(2,5)
      newDate+=date.slice(0,2)
    let name=sessionStorage.getItem('name')
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.post('http://localhost:5000/course/OS/',{name:name,date:newDate},{headers:header})
    .then(Response=>{
      this.setState({onTimeNames:Response.data},()=>this.getUnanwser(date))
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div style={{display:"flex"}}>
        <div style={{width:'70%',height:'100%'}}>
          <div style={{display:'flex',marginTop:'2%'}}>
          <Link to='/Thome' className={style.backBut}>back to home</Link>
          </div>
          <div className={style.courseText}>{this.state.name}</div>
          <div style={{backgroundColor:'black',width:'10%',height:'3%'}}>
          </div>
          <div className={style.grid}>
            {this.state.calendar.map((e,i)=>(<button className={style.box} onClick={()=>this.getAnwsered(e.date)}>
              <div className={style.text}>{e.date}</div>
              <Status array={e.Array}/>
            </button>))}
          </div>
        </div>
        <div>
          <div className={style.statusBox}>
            <div className={style.statusTitle}>Students who have not marked status</div>
            {this.state.lateNames.map(e=>(<div className={style.statusNameText}>{e.fname} {e.lname}</div>))}
          </div>
          <div className={style.statusBox}>
            <div className={style.statusTitle}>Students who have marked status</div>
            {this.state.onTimeNames.map(e=>(<div className={style.statusNameText}>{e.fname} {e.lname}</div>))}
          </div>
        </div>
      </div>
    )
  }
}
