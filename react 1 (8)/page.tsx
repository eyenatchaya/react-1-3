import Image from "next/image";

export default function Home() {
  const a = 10;
  const b = 20;
  const fruits:string[] = ['apple', 'orange', 'banana'];
  
  const createText= () =>{
    return 'simple text';
  }
  const createElenment= () =>{
    return '<H3>element</H3>';
  }
  const persons =[
    {name: 'John',age:55},
    {name: 'David',age:45},
    {name: 'Sarah',age:35},
  ];
  

  return (
    <div>
      {persons.map((person,index) => (
        <div>
          <p style={{color:'red'}}>{person.name.toUpperCase()} is {person.age}year old.</p>
          <p>This person is {person.age>40 ? "too old":"quite young"}</p>
        </div>
      ))}
      <button className="btn btn-primary" type = "button">Click me</button>

      <h1>Eye</h1>
      <p>{a} {a+b}</p>
      <p>{a>10 ?'a>10':'a<=10'}</p>
      <ul>
        {fruits.map((fruit,index)=><li key={index}>{fruits}</li>)}
      </ul>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

    </div>
  );
}
