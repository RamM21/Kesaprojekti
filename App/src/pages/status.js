import React from 'react'

export default function status(props) {
    let arr=[]
   for(let i=0;i<props.array.length;i++){
        arr.push({count:props.array[i].count,status:props.array[i].status})
   }
  return (
    <div>
        {arr.map(e=>(<div style={{textAlign:'left',marginBottom:'3%',fontWeight:'bold'}}>status {e.status} amount {e.count}</div>))}
    </div>
  )
}
