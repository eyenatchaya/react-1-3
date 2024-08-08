// ส่วนท้ายของ app แสดงข้อความ Copyright
// รับ props 3 ตัว ได้แก่ year,fullName,student id
import React from "react"
export default function Footer(props) {
    return(
<div className="mt-3">
        <p className="text-secondary text-center">
          copyright © {props.year} {props.fullName} {props.studentId} 
        </p>
      </div>
    )
}
 