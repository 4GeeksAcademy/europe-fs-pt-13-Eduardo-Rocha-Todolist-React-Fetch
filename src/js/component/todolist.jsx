import React, {useState, useEffect} from "react";


const TodoList = () => {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState ([]);
    
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
        setItems(data);
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
  

  const updateList = (newItems) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/eduardo', { // this updates the user eduardo if not detected in the server
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItems),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setItems(newItems);
    })
  }

  const handleDelete = id => {
    const newItems = [...items,];
    newItems.splice(id, 1);
    console.log(newItems)
    updateList(newItems);    
  }

  return (
      <div className="wrapper">
        <h1>todos</h1>
        <div className="row">
        <div className="container col-sm-8">
              <InputText className="input-item" items={items} handleSubmit={(label) => {
                updateList(items.concat({label: label, done: false}))
              }}/>
              <ul>
              {items.map((items, index) => 
              <div className="todoitem d-flex justify-content-between" key={index}>{items.label}
                <button className="deletebtn" onClick={() => {handleDelete(index)}}>X</button>
              </div>
              )}
              </ul>
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
  
const InputText = (props) => {
  const [value, setValue] = useState('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      {value === "" ? "" : props.handleSubmit(value.trim())};
      setValue('');
    }}>
    <input type="text" value={value} placeholder={props.items.length == 0 ? "No tasks, add a task" : "What needs to be done?"} onChange={e => setValue(e.target.value)}/>
    </form>
  ) 
}
  
    