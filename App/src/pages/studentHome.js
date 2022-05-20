import React from "react";
import axios from "axios";
import style from './studentH.module.css'
import { Link} from "react-router-dom";

export default class studentHome extends React.Component {
  constructor(props){
    super(props)
    this.state={
      courses:[]
    }
  }

  componentDidMount=()=>{
    this.getStudentCourses()
  }

  getStudentCourses=()=>{
    let header={Authorization:'Bearer '+sessionStorage.getItem('Token')}
    axios.get('http://localhost:5000/course/s',{headers:header})
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

  render() {
    return (
      <div>
        <div style={{marginTop:'1%'}}>
          <Link to='/' className={style.logout} onClick={()=>this.logoutHandle()}>logout</Link>
        </div>
        <div className={style.topText}>
          Courses
        </div>
          <div className={style.grid}>
          {this.state.courses.map(e=>(<Link to='/Scourse' className={style.box} onClick={()=>this.setCourseName(e.name)}>
            <div>
              <div className={style.text}>{e.name}</div>
              <div className={style.text}>Starting date {e.min}</div>
              <div className={style.text}>Ending date {e.max}</div>
            </div>
          </Link>))}
        </div>
      </div>
    )
  }
}
