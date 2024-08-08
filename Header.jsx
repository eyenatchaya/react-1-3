// component ส่วนหัวที่แสดงคำว่า "Todo List Mock Up" 
//และ "This lab teach you how to split react component(s)"
// ไม่มีการรับ props เข้ามา
import React from "react"
export default function Header() {
    return(
<div>
<h4 className="display-4 fst-italic text-center">Todo List Mock Up</h4>
        <p className="text-secondary text-center">
          This lab teach you how to split react component(s)
        </p> 
</div>
    );
}
 