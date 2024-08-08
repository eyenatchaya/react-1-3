"use client";

import axios from "axios";
import { useState } from "react";
import { cleanUser } from "@/libs/cleanUser";
import UserCard from "@/components/UserCard";
import { UserCardProps } from "@/libs/types";
import { useEffect } from "react";

export default function RandomUserPage() {
  // annotate type for users state variable
  const [users, setUsers] = useState<UserCardProps[]>([]); // สร้าง state users ที่เป็น array ของ UserCardProps และฟังก์ชัน setUsers เพื่ออัพเดตค่า
  const [isLoading, setIsLoading] = useState(false); //สร้าง state isLoading ที่เป็น boolean เพื่อบอกสถานะการโหลดข้อมูล และฟังก์ชัน setIsLoading เพื่ออัพเดตค่า
  const [genAmount, setGenAmount] = useState(1); // จำนวนผู้ใช้ที่ดึงจาก API
  const [isFirstLoad, setIsFirstLoad] = useState(true); //เป็น boolean เพื่อบอกว่านี่เป็นการโหลดครั้งแรกหรือไม่

// useEffect เพื่อจัดการกับการโหลดและการจัดเก็บข้อมูลใน localStorage
// ใช้ useEffect ที่จะรันเมื่อ genAmount เปลี่ยนค่า
// ถ้า isFirstLoad เป็น true, ตั้งค่า isFirstLoad เป็น false และหยุดการทำงาน (return)
// ถ้า isFirstLoad เป็น false, แปลงค่า genAmount เป็น JSON string และเก็บลงใน localStorage
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    const jsonStr = JSON.stringify(genAmount);
    localStorage.setItem("genAmount", jsonStr);
  },[genAmount]);

  useEffect(() => {
    const jsonStr = localStorage.getItem("genAmount");
    if (jsonStr !== null){
      const newGenAmount = JSON.parse(jsonStr);
      setGenAmount(newGenAmount);
    }
  },[]);
  
// ประกาศฟังก์ชัน generateBtnOnClick ที่จะถูกเรียกเมื่อปุ่ม "Generate" ถูกคลิก
// ตั้งค่า isLoading เป็น true เพื่อแสดงสถานะการโหลด
// ส่งคำขอ GET ไปยัง API https://randomuser.me/api/ พร้อมจำนวนผลลัพธ์ที่ต้องการ (genAmount)
// หลังจากได้รับผลลัพธ์ ตั้งค่า isLoading เป็น false
// ดึงข้อมูลผู้ใช้จากการตอบกลับ (resp.data.results)
// ทำความสะอาดข้อมูลผู้ใช้โดยใช้ฟังก์ชัน cleanUser
// อัพเดต state users ด้วยข้อมูลผู้ใช้ที่ทำความสะอาดแล้ว
  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    const cleanedUser = users.map(cleanUser);
    setUsers(cleanedUser);
    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/cleanUser
    //Then update state with function : setUsers(...)
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(Number(e.target.value))}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((user:UserCardProps) => (
        <UserCard key={user.email}{...user} />  //  ถ้า users มีค่าและ isLoading เป็น false แสดงว่าข้อมูลถูกโหลดเรียบร้อยแล้ว
        ))}
    </div>
  );
}
 // แสดงข้อมูลผู้ใช้ใน UserCard component
