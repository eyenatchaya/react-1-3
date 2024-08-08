"use client";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Task from "@components/Task";
import TaskInput from "@components/TaskInput";

import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  // Define the interface of task-item object
  interface TaskItem {
    id: string;
    title: string;
    completed: boolean;
  }

  // useState hook for an array of task-item objects
  // สร้าง state tasks ที่เป็น array ของ TaskItem และฟังก์ชัน setTasks สำหรับอัพเดตค่าเริ่มต้นเป็น array ว่าง
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Define the function with proper type
  const addTask = (newTaskTitle:string) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };//สร้าง task ใหม่
    const newTasks = [...tasks, newTask]; // สร้าง array ใหม่ newTasks ที่รวม tasks เดิมและ newTask
    setTasks(newTasks); // อัพเดต state tasks ด้วย newTasks
  };
  // nanoid ถูกใช้เพื่อสร้าง unique ID สำหรับ task ใหม่ทุกครั้งที่มีการเพิ่ม task
  // ทำให้มั่นใจได้ว่า ID ของแต่ละ task จะไม่ซ้ำกัน ซึ่งเป็นสิ่งสำคัญสำหรับการจัดการรายการ task หรือข้อมูลใด ๆ ที่ต้องการ unique identifier
  
  // Define the function with proper type
  const deleteTask = (taskId:string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId); // เลือกเก็บเฉพาะ tasks ที่ id ไม่ตรงกับ taskId
    setTasks(newTasks);
  };

  // Define the function with proper type
  const toggleDoneTask = (taskId:string) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks); 
    // ใช้ structuredClone เพื่อสร้างสำเนา tasks ที่เป็น deep copy 
    // เพื่อหลีกเลี่ยงการแก้ไข state โดยตรง
    // search for a task based on condition
    const task:any = newTasks.find((x) => x.id === taskId); // หา task ที่มี id ตรงกับ taskId
    task.completed = !task.completed; // สลับสถานะ completed ของ task
    setTasks(newTasks); // อัพเดต state tasks ด้วย newTasks
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({tasks.length}) Done ({tasks.filter(task => task.completed).length})
        </p>
        {/* task input แสดง input สำหรับการเพิ่ม task โดยส่ง addTask เป็น prop*/}
        <TaskInput addTaskFunc={addTask} /> 
        {/* tasks mapping วนลูปผ่าน tasks และสร้าง component Task สำหรับแต่ละ task โดยส่ง props ที่เกี่ยวข้อง*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2024" fullName="Natchaya Palee" studentId="660610754" />
    </div>
  );
}

// toggleDoneTask มีหน้าที่สลับสถานะการทำเสร็จ (completed) ของ task 
// โดยอ้างอิงจาก taskId ที่รับเข้ามา
