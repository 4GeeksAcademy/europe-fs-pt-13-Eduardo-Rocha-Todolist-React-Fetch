import React, {useState, useEffect} from "react";

const TodoList = () => {
  const [items, setItems] = useState([]);
    

    // useEffect to GET user data
  useEffect(()=>{
    fetch('https://playground.4geeks.com/apis/fake/todos/user/eduardo')
    .then(response => {
        console.log(response.ok); // will be true if the response is successfull
        console.log(response.status); // the status code = 200 or code = 400 etc.
        if(response.ok){
          return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        }
        throw response;    
    })

    .then(data => {
        setItems(data.map(item => item.task));
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        console.error("Error fetching date: ", error);
        if (error.message.includes("404")) {
          fetch('https://playground.4geeks.com/apis/fake/todos/user/eduardo', { // this creates the user eduardo if not detected in the server
            method: 'POST',
            body: JSON.stringify([]),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              setItems([])
            })
        }    
    });
  }, [])

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
            <div className="footer d-flex justify-content-between"> 
              <div className="counter align-baseline">
                {items.length == null ? 0: items.length} items left
              </div>
              <button type="button" className="delete-all btn btn-primary" onClick={() => setItems([])}>Delete All</button> 
            </div>
        </div>
        <div className="subcontainerone"></div>
        <div className="subcontainertwo"></div>
        </div>
      </div>
  )
}

export default TodoList;

  
  const ListItem = (props) => (
    <li className="todoitem d-flex justify-content-between">{props.name}
      <button className="deletebtn" onClick={() => props.handleClick(props.name)}>X</button>
    </li>
  )
  
  const ListDisplay = (props) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/eduardo', { // this creates the user eduardo if not detected in the server
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props.items),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setItems(data)
    })
    
    const items = props.items.map((item, i) => (
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
  
    