import React from 'react'
import Login from './pages/login'
import StudentH from './pages/studentHome'
import StudentC from './pages/studentCourse'
import TeacherH from './pages/teacherHome'
import TeacherC from './pages/teacherCourse'
import TeacherNC from './pages/teacherNC'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      logged:false
    }
  }

  componentDidMount=()=>{

  }
  componentDidUpdate=()=>{
    
  }
  changelogged=()=>{
    this.setState({logged:true})
  }


render(){
  var token=sessionStorage.getItem("Token")
  var role=sessionStorage.getItem("Role")
  if(token!=null && role=='student'){
    return(
      <BrowserRouter>
        <Routes>
          <Route path='/Shome'element={<StudentH/>}/>
          <Route path='/Scourse' element={<StudentC/>}/>
        </Routes>
    </BrowserRouter>
    )
  }else if(token!=null && role=='teacher'){
    return(
    <BrowserRouter>
        <Routes>
          <Route path='/Thome'element={<TeacherH/>}/>
          <Route path='/Tcourse' element={<TeacherC/>}/>
          <Route path='/Ncourse' element={<TeacherNC/>}/>
        </Routes>
    </BrowserRouter>
    )
  }else{
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login logged={this.changelogged}/>}/>
    </Routes>
    </BrowserRouter>
    )
  }
}
}

export default App;
