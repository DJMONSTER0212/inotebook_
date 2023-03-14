import React from 'react'

function Alert(props) {
  return (
    // jab bhi aap yeah double and use karte hai pehle yeah props.alert evaluate hoga aur agar yeah hi false ho jaati hai ya null ho jaati hai toh aage ki cheej evaluate hi nhi hogi aur agar yeah ture hui to aage waali cheej aapki return ho jaayegi
    <div style={{height:"50px"}}>
    {props.alert && <div>  
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        {props.alert.type}::{props.alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>}
    </div>
  )
}

export default Alert
