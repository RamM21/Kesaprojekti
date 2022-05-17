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
    //sessionStorage.setItem('Token',null)
  }

  componentDidMount=()=>{
  }



render(){
  var token=sessionStorage.getItem("Token")
  let view;
  if(token==null){
  view=(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login history={this.props.history}/>}/>
  </Routes>
  </BrowserRouter>
  )
  }else{
    view=(
    <BrowserRouter>
      <Routes>
        <Route path='/Thome'element={<TeacherH/>}/>
        <Route path='/Tcourse' element={<TeacherC/>}/>
        <Route path='/Ncourse' element={<TeacherNC/>}/>
      </Routes>
  </BrowserRouter>
  )}
  return(<div>{view}</div>)
}
}

export default App;
