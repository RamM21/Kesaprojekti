import React,{ useEffect, useState } from 'react'
import DatePicker from "react-multi-date-picker"

export default function Calendar(props) {
    const today = new Date()
  
    const [values, setValues] = useState([today])

    useEffect(()=>{
        props.handleCal(values)
    },[values])
  
    return (
      <DatePicker 
        multiple
        value={values} 
        onChange={setValues}
      />
    )
  }
