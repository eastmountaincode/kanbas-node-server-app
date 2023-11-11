import { combineReducers } from "redux";

const hard_coded_assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const todos = [
    { id: 1, title: "Task 1", description:"blah blah blah", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: true },
    { id: 4, title: "Task 4", completed: false },
  ];

const Lab5 = (app) => {
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
    });
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });
    app.get("/a5/assignment", (req, res) => {
        res.json(hard_coded_assignment)
    });
    app.get("/a5/assignment/title", (req, res) => {
        res.json(hard_coded_assignment.title);
    });

    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
    });
    
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        hard_coded_assignment.title = newTitle;
        res.json(hard_coded_assignment);
    });

    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        hard_coded_assignment.score = parseInt(newScore, 10);
        res.json(hard_coded_assignment);
    });
    
    app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        hard_coded_assignment.completed = newCompleted === 'true';
        res.json(hard_coded_assignment);
    });

    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const isCompleted = completed === 'true';
            const completedTodos = todos.filter(
                (t) => t.completed === isCompleted);
                res.json(completedTodos);
                return;
            }
        res.json(todos);
    });

    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });

    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo); // Send the found todo item if it exists
    });

    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === parseInt(id));
        
        // Check if the todo with the given id was found
        if (index === -1) {
          // If not found, send a 404 Not Found response
          return res.status(404).send('Todo not found.');
        }
      
        // If found, delete the todo item
        todos.splice(index, 1);
        // Send a 200 OK response
        res.sendStatus(200);
      });
      

    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === parseInt(id));
        
        // Only proceed if the todo was found
        if (index !== -1) {
            todos.splice(index, 1);
            res.json(todos);
        } else {
            // If no todo was found with the given id, respond accordingly
            res.status(404).send(`Todo with id ${id} not found.`);
        }
    });

    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id, 10));
        if (todo) {
            // ...URL parameters are always strings apparently
            todo.completed = completed === 'true';
            res.json(todo);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    });
    

    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.description = description;
        res.json(todo);
    });
    

};
export default Lab5;