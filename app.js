document.addEventListener("DOMContentLoaded", () =>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

const newTask = document.getElementById('newTask');
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

newTask.addEventListener('click',function(e){
    e.preventDefault();
    addTask();
})



function addTask(){
    const newInput = document.getElementById('newInput');
    const text = newInput.value.trim();

    if (text){
        tasks.push({text:text, completed: false});
        newInput.value= "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

function toggleTaskComplete(index){
    tasks[index].completed= !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

function deleteTask(index){
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

function editTask(index){
    const taskInput = document.getElementById('newInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

function updateStats(){
    const completeTasks = tasks.filter((task) => task.completed).length;
    const totalTask = tasks.length;
    const progress =  ( completeTasks / totalTask ) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTask}`

    if(tasks.length && completeTasks === totalTask){
        launchConfetti();
    }
}

function updateTaskList(){
    const taskList = document.getElementById('task-list');
    taskList.innerHTML= "";

    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed': ''}">
                <input type="checkbox" class="checkbox" 
                    ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})">
                <img src="./img/bin.png" onClick="deleteTask(${index})">
            </div>
        </div>
        `;
        listItem.addEventListener('change',() =>  toggleTaskComplete(index));
        taskList.append(listItem);
    })
};

function launchConfetti(){
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
};