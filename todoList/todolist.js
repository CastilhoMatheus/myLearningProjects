let i = 0;

function backToTodo (taskId, label) {
    addTodo(label);

    const completedListWrapper = document.getElementById('todo-list-completed');
    const removeDiv = document.getElementById(`${taskId}-completed-wrapper`);

    completedListWrapper.removeChild(removeDiv);
    if (document.getElementById('todo-list-completed').children.length === 0) {
        document.getElementById('completed-wrapper').style = 'display: none';  
    } 

}

function addToCompleted(taskId, label) {
    const element = document.getElementById(taskId);
    element.parentNode.removeChild(element);
    
    const completedListWrapper = document.getElementById('todo-list-completed');
    document.getElementById('completed-wrapper').style = 'display: block;';
    const li = document.createElement('li');
    li.id = `${taskId}-completed-wrapper`;
    li.innerHTML = `<div>
                        <input type="radio" value="${label}" id="${taskId}-completed" onchange ="backToTodo('${taskId}', '${label}')"/>
                        <label for="${taskId}-completed">${label}</label>
                    </div>`;
    
    completedListWrapper.appendChild(li);
    
}

function addTodo(todoText) {
    const taskId = "task-" + i;
    const inputId = `${taskId}-radio`;
    
    const todoListWrapper = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.id = taskId;
    li.innerHTML = `<div>
                        <input type="radio" value="${todoText}" id="${inputId}" onchange="addToCompleted('${taskId}', '${todoText}')"/>
                        <label for="${inputId}">${todoText}</label>
                    </div>`;
    
    todoListWrapper.appendChild(li);
    i++;
}

const addButton = document.getElementById('add');

addButton.addEventListener('click', () => {
   const textInput = document.getElementById('text');

   if (textInput === null || textInput.value === "") {
        return;
   } else {
        addTodo(textInput.value);
   }
   textInput.value = "";
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const textInput = document.getElementById('text');

        if (textInput === null || textInput.value === "") {
            return;
        } else {
            addTodo(textInput.value);
        }
        textInput.value = "";
    }
});

const clearButton = document.getElementById('clear');

clearButton.addEventListener('click', () => {
    const completedListWrapper = document.getElementById('todo-list-completed');
    while (completedListWrapper.firstChild) {
        completedListWrapper.removeChild(completedListWrapper.lastChild);
        i--;
    }
    document.getElementById('completed-wrapper').style = 'display: none';

});

