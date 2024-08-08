// มีการรับ props
import React, { useState } from "react";

// กำหนดประเภทข้อมูลสำหรับ props ของ TaskInput
interface TaskInputProps {
  addTaskFunc: (task: string) => void; // ฟังก์ชันที่รับ task เป็น string และไม่คืนค่า
}

// ประกาศฟังก์ชันที่เป็น React functional component
export default function TaskInput({ addTaskFunc }: TaskInputProps) {
  // ใช้ useState hook เพื่อจัดการ state ของ taskInput ซึ่งเป็น string
  const [taskInput, setTaskInput] = useState("");

  // ฟังก์ชันที่ถูกเรียกเมื่อปุ่ม Add ถูกคลิก
  const addTaskBtnOnClick = () => {
    addTaskFunc(taskInput); // เรียกใช้ฟังก์ชัน addTaskFunc พร้อมกับ taskInput
    setTaskInput(""); // รีเซ็ต taskInput ให้เป็นค่าว่าง
  };

  // ฟังก์ชันที่ถูกเรียกเมื่อมีการเปลี่ยนแปลงใน input field
  const taskInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value); // อัพเดต state ของ taskInput ด้วยค่าที่ผู้ใช้พิมพ์
  };

  // ฟังก์ชันที่ถูกเรียกเมื่อมีการกดคีย์บน input field และปล่อยคีย์นั้น
  const taskInputOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // ถ้าคีย์ที่ปล่อยคือ "Enter" และ taskInput ไม่เป็นค่าว่าง
    if (event.key === "Enter" && taskInput !== "") addTaskBtnOnClick();
  };

  // JSX ที่ component นี้จะ render
  return (
    <div className="d-flex gap-1">
      <input
        className="form-control"
        placeholder="Insert a task here.."
        onChange={taskInputOnChange} // ตั้งค่าให้เรียก taskInputOnChange เมื่อมีการเปลี่ยนแปลงใน input
        onKeyUp={taskInputOnKeyUp} // ตั้งค่าให้เรียก taskInputOnKeyUp เมื่อมีการกดคีย์และปล่อยคีย์ใน input
        value={taskInput} // ค่าปัจจุบันของ input จะมาจาก state taskInput
      />
      <button className="btn btn-primary" onClick={addTaskBtnOnClick}>Add</button>
    </div>
  );
}
