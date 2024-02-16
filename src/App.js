import './App.css';
import { useState } from 'react';


// Create varying state.
// 1. with the array below - hard code out a piece of state called todos. Figure out a way to loop through the todos and render then to the page.  
// function Todos(props) {
//   return (
//     <div>
//       <h4>{props.todos}</h4>
//     </div>
//   )
// }
function App() {
  //const todos = ['wash car', 'call mom', 'make money'];
  const [todos, setTodos] = useState(['wash car', 'call mom', 'make money']);
  //let [data, inputData] = useState('');
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        {todos.map((todo) => {
          // put a template string for each element inside a new div 
          return (<div>{todo}</div>)
        })}
      </div>

      <div>
        <button onClick={() => {
          if (count >= 10) {
              setCount(0);
          } else {
            setCount(count + 1);
          }
        }}>+</button>

        <div>{count}</div>

        <button onClick={() => {
          if (count <= -10) {
              setCount(0);
          } else {
            setCount(count - 1);
          }
        }}>-</button>
      </div>
    </div>
  );
  // 2. Create a piece of state called count.
  // Create buttons that will increase and decrease the count based off which is clicked.
  // If the count gets below -10 or above 10, it resets to 0

  //const map1 = array1.map((x) => x * 2);

  // return (
  //   <div>
  //     {
  //       todos.map((todo) => {
  //         return <div>{todo}</div>
  //       })
  //     }
  //     <input onChange={(e) => {
  //       inputData(e.target.value)
  //     }}></input><button onClick={() => {
  //       let copy = [...todos]
  //       copy.push(data)
  //       setTodos(copy)
  //     }}>Add</button>
  //   </div>
  // );

  // return (
  //   <>
  //     <div>
  //       {
  //         todos.map((todo) => {
  //           return <div>{todo}</div>
  //         })
  //       }
  //     </div>
  //   </>
  // );
}

// Pass a function to map



// wash carcall mommake money



export default App;
