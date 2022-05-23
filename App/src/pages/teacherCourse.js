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
      status:[]
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
        let arr=[...this.state.calendar]
          for(let i=0;i<array.length;i++){
            if(arr.length>0){
              for(let ii=0;ii<arr.length;ii++){
              console.log(arr)
            if(arr[ii].date==(array[0].date)){
              
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
          }
            arr.sort()
        this.setState({calendar:arr})
      })
      .catch(err=>{
        console.log(err)
      })
    })
  }

  render() {
    return (
      <div>
        <div style={{display:'flex',marginTop:'2%'}}>
        <Link to='/Thome' className={style.backBut}>back to courses</Link>
        <div className={style.courseText}>{this.state.name}</div>
        </div>
        <div style={{backgroundColor:'black',width:'10%',height:'3%'}}>
        </div>
        <div className={style.grid}>
          {this.state.calendar.map((e,i)=>(<button className={style.box}>
            <div className={style.text}>{e.date}</div>
            <Status array={e.Array}/>
          </button>))}
        </div>
      </div>
    )
  }
}
