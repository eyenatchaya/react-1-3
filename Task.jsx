// ส่วนของรายการ Task ปุ่ม Done และ ปุ่ม Delete 
// รับ props เป็น object ข้อมูล เช่น { id:1, title: "Read a book", isDone: true} จาก \src\app\page.js

import React from 'react'

const status = (isDone) => { // ถ้า status เป็นจริง (true) ให้ขีดเส้นผ่านข้อความ สำหรับรายการที่เสร็จสิ้นแล้ว (done) 
    if(isDone) return "line-through";
    else return "";
}; 

export default function Task(props) {
  return (
        <div className="d-flex p-3 gap-2 align-items-center border-bottom">
          <span style={{textDecoration: status(props.isDone)}}>{props.title}</span>
          <button className="btn btn-success">Done</button>
          <button className="btn btn-danger">Delete</button>
        </div>
  )
}