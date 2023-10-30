import { useState } from "react";
import "./App.css";

function App() {
  const TODO = localStorage.getItem("todos");

  const initialValue = TODO ? JSON.parse(TODO) : [];

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [address, setaddress] = useState("");

  const [todos, setTodos] = useState(initialValue);
  const [todoId, setTodoId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (todoId) {
      const updated = todos.map((todo) => {
        return todo.id === todoId
          ? { ...todo, name: name, email: email ,number: number, address: address}
          : todo;
      });

      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
      setTodoId("");
    } else {
      const updated = [
        ...todos,
        { name: name, email: email, number: number, address: address,id: Math.random() },
      ];
      setTodos(updated);
      localStorage.setItem("todos", JSON.stringify(updated));
    }
    setName("");
    setemail("");
    setaddress("");
    setnumber("")
  };

  const handleOnClick = (todo) => {
    const update = todos.filter((t) => t.id !== todo.id);
    setTodos(update);
    localStorage.setItem("todos", JSON.stringify(update));
  };

  const handleOnEdit = (t) => {
    setTodoId(t.id);
    setName(t.name);
    setemail(t.email);
    setnumber(t.number);
    setaddress(t.address)
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1>User Account</h1>
        <form onSubmit={onSubmit}>
          <label>User Name</label>
          <input
            value={name}
            name="name"
            placeholder="User Name here"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label>User Email</label>
          <input
            value={email}
            name="email"
            placeholder="User email here"
            rows={5}
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <br />
          <label>User Phone Number</label>
          <input
            value={number}
            name="name"
            placeholder="User Name here"
            required
            onChange={(e) => {
              setnumber(e.target.value);
            }}
          />
          <br />
          <label>User Address</label>
          <input
            value={address}
            name="name"
            placeholder="User Name here"
            required
            onChange={(e) => {
              setaddress(e.target.value);
            }}
          />
          <br />
          <button className="btn btn-outline-black" type="submit">
            {todoId ? "Update" : "Create"}
          </button>
        </form>

        <div className="todo-container">
          {todos.map((t, ind) => {
            return (
              <div key={t.id} className="todo-card">
                <div className="">
                  <h3>{t.name}</h3>
                  <p>{t.email}</p>
                  <p>{t.number}</p>
                  <p>{t.address}</p>
                </div>
                <div className="todo-card-btn">
                  <button
                    className="btn btn-outline-black"
                    onClick={() => {
                      handleOnEdit(t);
                    }}
                  >
                    <img src={require("./assets/img/edit.png")} width={15} height={15} alt=""/>
                  </button>
                  <button
                    onClick={() => handleOnClick(t)}
                    className="btn btn-outline-black"
                  >
                    <img src={require("./assets/img/delete.png")} width={15} height={15} alt=""/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
