const url = window.location.href + '/tasksapi';
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
const content = document.querySelector('.content');
const menu_hidden = document.querySelector('#menu_hidden');


const myTaskList = document.querySelector('.content_mytask-list');
const buttonShowTaskNotComplate = document.querySelector(
    '.content_mytask-notcomplate-title',
);

const listTasksComplated = document.querySelector(
    '.content_mytask-compate-list',
);
const buttonShowTaskComlated = document.querySelector(
    '.content_mytask-complate-title',
);

const ShowNumberTaskComplate =
    buttonShowTaskComlated.querySelector('#countTaskFinish');
const ShowNumberTaskNotComplate = buttonShowTaskNotComplate.querySelector(
    '#countTaskNotFinish',
);

const showDateNow = document.querySelector('#showDateNow');
const date = new Date(); // ngày tháng năm hiện tại

const buttonAddTask = document.querySelector('#add');
const formAddTask = document.querySelector('#form-add-task');
const audio = new Audio('/static/audios/tinhtinh.mp4');


let countTaskComplate = 0;
let countTaskNotComplate = 0;

let day = '';
let idTask = 0;
let idTaskNext = 0;
let countTaskFinish = 0;


function ShowTasksFinished() {
    listTasksComplated.classList.toggle('hidden');
}
function ShowTasksNotComplate() {
    myTaskList.classList.toggle('hidden');
}

function ShowDayNow() {
    if (date.getDay() == 0) {
        day = 'Chủ nhật';
    } else {
        day = 'Thứ ' + (date.getDay() + 1);
    }
    showDateNow.textContent = `${day}, ngày ${date.getDate()} tháng ${date.getMonth() + 1
        }, năm ${date.getFullYear()}`;
}

function playTinhTinh() {
    let promise = audio.play();
    if (promise !== undefined) {
        promise
            .then(_ => {
                audio.play();
            })
            .catch(error => {
                console.log('Lỗi phát nhạc');
            });
    }
}

async function noImportant(event) {
    try {
        event.stopPropagation();
        let buttonNoImportant = event.target;
        buttonNoImportant = buttonNoImportant.parentNode;
        console.log(buttonNoImportant);
        const buttonImportant =
            buttonNoImportant.parentNode.querySelector('.important');
        if (buttonImportant.classList.contains('hidden')) {
            buttonImportant.classList.remove('hidden');
            buttonNoImportant.classList.add('hidden');

            //Lấy ra task và id của task cần update
            let taskElement = buttonNoImportant.parentNode;
            console.log(taskElement);
            while (!taskElement.classList.contains('content_mytask-item')) {
                taskElement = taskElement.parentNode;
            }
            const id = taskElement.getAttribute('data-index');
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ important: false }),
            });
        }
    } catch (error) {
        console.log(error);
    }
}
async function important(event) {
    try {
        event.stopPropagation();
        let buttonImportant = event.target;
        buttonImportant = buttonImportant.parentNode;
        const buttonNoImportant =
            buttonImportant.parentNode.querySelector('.noimportant');
        if (buttonNoImportant.classList.contains('hidden')) {
            buttonNoImportant.classList.remove('hidden');
            buttonImportant.classList.add('hidden');

            let taskElement = buttonImportant.parentNode;
            while (!taskElement.classList.contains('content_mytask-item')) {
                taskElement = taskElement.parentNode;
            }
            const id = taskElement.getAttribute('data-index');
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ important: true }),
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function createTask(List, task) {
    let myTaskItem = document.createElement('div');
    myTaskItem.setAttribute('data-index', task.id);
    myTaskItem.setAttribute('important', task.important);
    myTaskItem.classList.add('content_mytask-item');
    myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <h4 class="content_mytask-title" onclick=" event.stopPropagation();">${task.name}</h4>
                            </div>
                            <div class="content_mytask-date">
                                <span class="content-mytask-date-start content-mytask-date-item">
                                  ${task.startDate}
                                </span>
                                <span class="content-mytask-divider">/</span>
                                <span class="content-mytask-date-end content-mytask-date-item">
                                   ${task.endDate}
                                </span>
                            </div>
                            <div title="Đánh dấu công việc quan trọng">
                                <button class="important" onclick="important(event)">
                                    <i class="fi fi-rr-star"></i>
                                </button>
                                <button class="noimportant hidden" onclick="noImportant(event)">
                                    <img src="/static/imgs/star.png">
                                </button>
                            </div>
                            <div class="content_mytask-item-button">
                                <button class="content_mytask-button-item edit" onclick="showPageDetailTask(event)">
                                    Xem chi tiết
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                                <button class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                            </div>`;
    myTaskItem.addEventListener('click', showButtonTask);

    //Check task important ? if important = true => show button off important
    //and else show button on important
    if (task.important) {
        myTaskItem.querySelector('.important').classList.add('hidden');
        myTaskItem.querySelector('.noimportant').classList.remove('hidden');
    }

    //Check task status ? if status = finish => add button update not finish 
    // and else add button update finish
    const elementGroupButtonAndTitle = myTaskItem.querySelector('.content_mytask-group');
    if (task.status) {
        elementGroupButtonAndTitle.innerHTML =
            `<button class="not-update-finish" onclick="updateStatusTaskOnUIAndServer(event,false)">
             <i class="fi fi-rr-check-circle"></i>
        </button>` + elementGroupButtonAndTitle.innerHTML;
    } else {
        elementGroupButtonAndTitle.innerHTML =
            `<button class="updatefinish" onclick="updateStatusTaskOnUIAndServer(event,true)">
            <i class="fi fi-rr-circle" id="finish-icon" ></i>
        </button >` + elementGroupButtonAndTitle.innerHTML;
    }
    List.prepend(myTaskItem);
}

function addTaskToUI(task) {
    const id = task.id,
        name = task.name,
        important = task.important,
        startDate = task.startDate,
        endDate = task.endDate,
        status = task.status;

    //if task status = true 
    //=> add task to list task finish else add task to list task not finish
    if (status) {
        createTask(listTasksComplated, { id, name, important, status, startDate, endDate });
        countTaskNotComplate--;
        countTaskFinish++;
    }
    else {
        createTask(myTaskList, { id, name, important, status, startDate, endDate });
        countTaskNotComplate++;
        countTaskFinish--;
    }
    ShowNumberTaskComplate.textContent = countTaskFinish;
    ShowNumberTaskNotComplate.textContent = countTaskNotComplate;
}

async function addTaskToServer(task) {
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
    }
    catch (err) {
        console.log(err);
    }
}

async function updateStatusTaskOnUIAndServer(event, status = false) {
    event.preventDefault();
    event.stopPropagation();
    let elementTask = event.target.parentNode;
    while (!elementTask.classList.contains('content_mytask-item')) {
        elementTask = elementTask.parentNode;
    }
    const id = elementTask.getAttribute('data-index'),
        name = elementTask.querySelector('.content_mytask-title').textContent,
        important = elementTask.getAttribute('important'),
        startDate = elementTask.querySelector('.content-mytask-date-start').value,
        endDate = elementTask.querySelector('.content-mytask-date-end').value;

    const task = {
        id, name, important, status, startDate, endDate
    }
    //add task to list task respective and remove task in list task finish on UI
    addTaskToUI(task);
    elementTask.remove();

    //update status task to server
    updateStatusTaskToServer(id, status);
}

async function updateStatusTaskToServer(id, status) {
    try {
        await fetch(url + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
    } catch (error) {
        console.log('Lỗi update status task');
    }
}

function showPageDetailTask(event) {
    event.stopPropagation(); // ngăn chặn sự kiện nổi bọt
    let elementTask = event.target;
    while (!elementTask.classList.contains('content_mytask-item')) {
        elementTask = elementTask.parentNode;
    }
    const id = +elementTask.getAttribute('data-index');

    //Phân tích chuỗi url và điều hướng đến trang đích;
    const elementsUrl = url.split('/');
    let urlNew = elementsUrl.slice(0, elementsUrl.length - 1).join('/');
    location.href = urlNew + '/detail/' + id;
}

async function deleteTask(event) {
    event.stopPropagation(); // ngăn chặn sự kiện nổi bọt
    // lấy ra task cần xóa
    let taskElement = event.target;
    while (!taskElement.classList.contains('content_mytask-item')) {
        taskElement = taskElement.parentNode;
    }
    const id = taskElement.getAttribute('data-index');
    await deleteTaskOnServer(id);//delte task in server
    taskElement.remove(); // delete task in UI
}

async function deleteTaskOnServer(id) {
    try {
        await fetch(url + '/' + id, {
            method: 'DELETE',
        });
    } catch (err) {
        console.log('Xóa thất bại');
    }
}

function showButtonTask(event) {
    event.preventDefault();
    const taskElement = event.target;
    const buttonTask = taskElement.querySelector('.content_mytask-item-button');
    buttonTask.style.display = 'block';
    function hiddenButtonTask(event) {
        if (event.target != taskElement) {
            buttonTask.style.display = 'none';
        }
    }
    window.addEventListener('click', hiddenButtonTask);
}

function handleAllEvents() {

    //listen event submit form add task
    formAddTask.onsubmit = async function (e) {
        e.preventDefault();
        try {
            const inputTaskElement = document.querySelector('#input_task'),
                inputStartDate = document.querySelector('#date-start'),
                inputEndDate = document.querySelector('#date-end');

            if (inputTaskElement.value) {
                idTask++;
                const task = {
                    id: idTask,
                    name: inputTaskElement.value,
                    description: '',
                    important: false,
                    status: false,
                    startDate: inputStartDate.value,
                    endDate: inputEndDate.value,
                };
                await addTaskToServer(task); //add task to server
                addTaskToUI(task); //add task to UI
                inputTaskElement.value = '';
            }
        } catch (err) {
            alert('Lỗi thêm task');
        }
    };

    //listen event load page
    window.addEventListener('load', async function () {
        try {
            const res = await fetch(url);
            const tasks = await res.json();
            if (tasks.length > 0) {
                idTask = tasks[tasks.length - 1].id;
            }
            //Lấy từng task trong db và hiển thị lên UI
            tasks.forEach(task => {
                addTaskToUI(task);
            })
        } catch (err) {
            console.log(err);
        }
    });

    //listen event click button show task not complate
    buttonShowTaskNotComplate.onclick = ShowTasksNotComplate;

    //listen event click button show task complate
    buttonShowTaskComlated.onclick = ShowTasksFinished;

    //listen event hidden, show menu bar
    menu.onclick = () => {
        content.classList.add('content-10');
        sidebar.classList.add('hidden');
        menu_hidden.classList.remove('hidden');
    };
    menu_hidden.onclick = () => {
        content.classList.remove('content-10');
        sidebar.classList.remove('hidden');
        menu_hidden.classList.add('hidden');
    };
}

function start() {
    ShowDayNow();
    handleAllEvents();
}
start();