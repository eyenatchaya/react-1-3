"use client"; // ควรใส่ตลอด
import React from "react";

// define TaskItem interface to use as props type ประกาศตัวแปร
interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  deleteTaskFunc: (taskId: string) => void; // callback function
  toggleDoneTaskFunc: (taskId: string) => void; // callback function
}

export default function Task({ //ส่งออก
  id,
  title,
  deleteTaskFunc,
  toggleDoneTaskFunc,
  completed,
}: TaskItemProps) {
  // callback function when delete button is clicked
  const deleteBtnOnClick = () => {
    deleteTaskFunc(id);
  };
  const doneBtnOnClick = () => {
    toggleDoneTaskFunc(id);
};

  return (
    <div className="d-flex p-3 gap-2 align-items-center border-bottom">
      {/*
      HINTS: if task is completed, below "span" will show like this 
        <span className="text-decoration-line-through">{title}</span>
        But if task is not completed : 
        <span>{title}</span>
      */}
      {completed ? (<span className="text-decoration-line-through">{title}</span>)
      // ถ้าค่า completed เป็น true จะใช้โค้ดในบล็อกแรก
      // จะแสดง title พร้อมการขีดเส้นกลาง (text-decoration-line-through)
      //ถ้าค่า completed เป็น false จะใช้โค้ดในบล็อกที่สอง
      //จะแสดง title โดยไม่มีการขีดเส้นกลาง
      
      :(<span >{title}</span>)}
      
  
      <button className="btn btn-success" onClick={doneBtnOnClick}>Done</button> 
      <button className="btn btn-danger" onClick={deleteBtnOnClick}>Delete</button>
    </div>
    //แสดงปุ่มที่มีข้อความ "Done" ซึ่งจะเรียกใช้ฟังก์ชัน doneBtnOnClick เมื่อถูกคลิก
    //แสดงปุ่มที่มีข้อความ "Delete" ซึ่งจะเรียกใช้ฟังก์ชัน deleteBtnOnClick เมื่อถูกคลิก
  );
}
// โดยรวมแล้ว โค้ดนี้เป็นการแสดงรายการพร้อมกับปุ่มสองปุ่มสำหรับการทำเครื่องหมายว่างานเสร็จสมบูรณ์ (Done) 
// หรือการลบงาน (Delete) ตามสถานะของ completed 
// การแสดงรายการจะมีการเปลี่ยนแปลงรูปแบบการแสดงผลขึ้นอยู่กับสถานะของงานนั้น ๆ