import React, {useState, useEffect} from "react";

const TodoList = () => {
    const [items, setItems] = useState([]);

    useEffect(()=>{

    fetch('https://playground.4geeks.com/apis/fake/todos/user/eduardo', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is where your code should start after the fetch finishes
        setItems(data);
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
});

/*useEffect(()=>{

  fetch('https://playground.4geeks.com/apis/fake/todos/user/erwin')
  .then(response => response.json())
  .then(data => {	
    setTasks(data)
  })
  .catch(error => {

    fetch('https://playground.4geeks.com/apis/fake/todos/user/erwin', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setTasks([]))
    
  });

}, [])*/

    return (
        <div className="wrapper">
          <h1>todos</h1>
          <div className="row">
          <div className="container col-sm-8">
                <InputText className="input-item" items={items} handleSubmit={(item) => {
                  setItems(items.concat(item));
                }}/>
                <ListDisplay className="list-item" items={items} handleClick={(item) => {
                  setItems(items.filter((i) => i !== item));
                }}/>
              <div className="counter">
                {items.length == null ? 0: items.length} items left
              </div>
          </div>
          <div className="subcontainerone"></div>
          <div className="subcontainertwo"></div>
          </div>
        </div>
      )
    }
    
    const ListItem = (props) => (
      <li className="todoitem d-flex justify-content-between">{props.name}
      <button className="deletebtn" onClick={() => props.handleClick(props.name)}>X</button>
      </li>
    )
    
    const ListDisplay = (props) => {
      const items = props.items.label.map((item, i) => (
        <ListItem
          key={i}
          name={item}
          handleClick={props.handleClick}
        />
      ))
      return (
        <ul>
          {items}
        </ul>
      )
    }
    
    const InputText = (props) => {
      const [value, setValue] = useState('');
      return (
        <form onSubmit={(e) => {
          e.preventDefault();
          {value === "" ? "" : props.handleSubmit(value.trim())};
          setValue('');
        }}>
        <input type="text" value={value} placeHolder={props.items.length == 0 ? "No tasks, add a task" : "What needs to be done?"} onChange={e => setValue(e.target.value)}/>
        </form>
      )
    }
    
    export default TodoList;