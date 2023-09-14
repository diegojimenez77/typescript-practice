interface todoItems  {
    id: number;
    title: string;
    status: TodoStatus;
    completedOn?: Date;
}

enum TodoStatus {
    Done = "done",
    InProgres = "in-progress",
    Todo = "todo"
}

const todoItems: todoItems[] = [
    { id: 1, title: "Learn HTML", status: TodoStatus.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: TodoStatus.InProgres },
    { id: 3, title: "Write the best app in the world", status: TodoStatus.Todo },
]

function addTodoItem(todo: string): todoItems {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: TodoStatus.Todo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId<T extends {id: number}>(items: T[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
