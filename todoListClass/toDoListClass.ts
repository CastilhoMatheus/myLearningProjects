class TodoList{
    private todo: Task[];
    private completed: Task[];
    private render: TodoRender;

    constructor (render: TodoRender) {
        this.todo = [];
        this.completed = [];
        this.render = render;
    }

    addTodo(text) {
        this.todo.push(new Task (text));
        this.uptade();
    }

    addToCompleted (text) {
        const index = this.todo.findIndex((item) => item.getTitle() === text);
        if (index > -1) {
            this.completed.push(this.todo[index]);
            this.todo.splice(index, 1);
        }
        this.uptade();
    }
    
    clearCompleted () {
        this.completed = [];
        this.uptade();
    }

    backToTodo (text) {
        if (this.completed.length === 0) {
            return;
        }
        const index = this.completed.findIndex((item) => item.getTitle() === text);
        if (index > -1) {
            this.todo.push(this.completed[index]);
            this.completed.splice(index, 1);
        }

        this.uptade();
    }

    public uptade () {
        console.log('todos', this.todo);
        console.log('completed', this.completed);
        console.log('----------------------------------------------');

        this.render.render(this.todo, this.completed);
    }
}

class Task {
    private title: string;

    constructor (title: string) {
        this.title = title;
    }

    public getTitle () {
        return this.title;
    }
}

interface TodoRender {
    render(todos: Task[], completed: Task[]): void;
}

class TodoDomRender implements TodoDomRender {
    render (todos: Task[], completed: Task[]) {

        if (completed.length === 0) {
            document.getElementById('completed-wrapper').setAttribute('style', 'display: none');
        }
        else {
            document.getElementById('completed-wrapper').setAttribute('style', 'display: block');
        }

        const todoUl = document.getElementById('todo-list')!;
        const completedUl = document.getElementById('todo-list-completed');
        let html = '';
        let i = 0;


        todos.forEach(t => {
            html +=`<li>
                        <div>
                            <input type="radio" value="${t.getTitle()}" id="task-${i}" onchange="myList.addToCompleted('${t.getTitle()}')"/>
                            <label for="task-${i}">${t.getTitle()}</label>
                        </div>
                    </li>`;
            i++;
        });    
        todoUl.innerHTML = html;

        html = '';
        
        completed.forEach(t => {
            html +=`<li>
                        <div>
                            <input type="radio" value="${t.getTitle()}" id="task-${i}-completed" onchange="myList.backToTodo('${t.getTitle()}')"/>
                            <label for="task-${i}-completed">${t.getTitle()}</label>
                        </div>
                    </li>`;
            i++;
        });    
        completedUl.innerHTML = html;
    }
}


const myList = new TodoList(new TodoDomRender());
