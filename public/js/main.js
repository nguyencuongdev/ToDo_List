const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
const content = document.querySelector('.content');
const menu_hidden = document.querySelector('#menu_hidden');
const url = window.location.href + '/tasksapi';


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
let countTaskComplate = 0;
let countTaskNotComplate = 0;

const showDateNow = document.querySelector('#showDateNow');
const date = new Date(); // ngày tháng năm hiện tại
const buttonAddTask = document.querySelector('#add');
const formAddTask = document.querySelector('#form-add-task');
const audio = new Audio('/static/audios/tinhtinh.mp4');

let day = '';
let idTask = 0;
let idTaskNext = 0;
let countTaskFinish = 0;

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

buttonShowTaskComlated.onclick = () => {
    ShowTaskFinished();
};

function ShowTaskFinished() {
    listTasksComplated.classList.toggle('hidden');
}

buttonShowTaskNotComplate.onclick = () => {
    ShowTaskNotComplate();
};
function ShowTaskNotComplate() {
    myTaskList.classList.toggle('hidden');
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
function ShowDayNow() {
    if (date.getDay() == 0) {
        day = 'Chủ nhật';
    } else {
        day = 'Thứ ' + (date.getDay() + 1);
    }
    showDateNow.textContent = `${day}, ngày ${date.getDate()} tháng ${date.getMonth() + 1
        }, năm ${date.getFullYear()}`;
}
ShowDayNow();

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

function createTask(List, task) {
    let myTaskItem = document.createElement('div');
    myTaskItem.setAttribute('data-index', task.id);
    myTaskItem.setAttribute('important', task.important);
    myTaskItem.classList.add('content_mytask-item');
    myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <button class="updatefinish" onclick="updatefinish(event)">
                                    <i class="fi fi-rr-circle" id="finish-icon"></i>
                                </button>
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
                                <button class="content_mytask-button-item edit" onclick="editTask(event)">
                                    Xem chi tiết
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                                <button class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                            </div>`;
    myTaskItem.addEventListener('click', showButtonTask);
    if (task.important) {
        myTaskItem.querySelector('.important').classList.add('hidden');
        myTaskItem.querySelector('.noimportant').classList.remove('hidden');
    }
    List.prepend(myTaskItem);
}

function createTaskFinish(List, task) {
    let myTaskItem = document.createElement('div');
    myTaskItem.setAttribute('data-index', task.id);
    myTaskItem.setAttribute('important', task.important);
    myTaskItem.classList.add('content_mytask-item');
    myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <button class="not-update-finish" onclick="updateTaskNotFinish(event)">
                                    <i class="fi fi-rr-check-circle"></i>
                                </button>
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
                                <button class="content_mytask-button-item edit" onclick="editTask(event)">
                                    Xem chi tiết
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                                <button class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                                </div>
                            </div>`;
    myTaskItem.addEventListener('click', showButtonTask);
    //Check task important ?
    if (task.important) {
        myTaskItem.querySelector('.important').classList.add('hidden');
        myTaskItem.querySelector('.noimportant').classList.remove('hidden');
    }
    List.prepend(myTaskItem);
}

function addTaskFinished(element) {
    let id = element.getAttribute('data-index');
    const name = element.querySelector('.content_mytask-title').textContent;
    const important = element.getAttribute('important');
    const startDate =
        element.querySelector('.content-mytask-date-start')?.value ??
        Date.now();
    const endDate =
        element.querySelector('.content-mytask-date-end')?.value ?? Date.now();
    createTaskFinish(listTasksComplated, {
        id,
        name,
        important,
        startDate,
        endDate,
    });
    listTasksComplated.classList.remove('hidden');
    playTinhTinh();
}

function addTaskNotFinish(element) {
    let id = element.getAttribute('data-index');
    const name = element.querySelector('.content_mytask-title').textContent;
    const important = element.getAttribute('important');
    const startDate =
        element.querySelector('.content-mytask-date-start')?.value ??
        Date.now();
    const endDate =
        element.querySelector('.content-mytask-date-end')?.value ?? Date.now();
    createTask(myTaskList, { id, name, important, startDate, endDate });
}

async function updatefinish(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        let elementTask = event.target.parentNode;
        while (!elementTask.classList.contains('content_mytask-item')) {
            elementTask = elementTask.parentNode;
        }
        addTaskFinished(elementTask);
        let id = elementTask.getAttribute('data-index');
        //call API to server update status task
        await fetch(url + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: true }),
        });
        elementTask.remove();
    } catch (error) {
        console.log('Lỗi update task');
    }
}

async function updateTaskNotFinish(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        let elementTask = event.target.parentNode;
        while (!elementTask.classList.contains('content_mytask-item')) {
            elementTask = elementTask.parentNode;
        }
        //add task to list task not finish and remove task in list task finish on UI
        addTaskNotFinish(elementTask);
        elementTask.remove();
        let id = elementTask.getAttribute('data-index');
        //Call API to server update status task
        await fetch(url + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: false }),
        });
    } catch (error) {
        console.log('Lỗi update task');
    }
}

//listen event submit form add task
formAddTask.onsubmit = async function (e) {
    e.preventDefault();
    try {
        const inputTaskElement = document.querySelector('#input_task');
        const inputStartDate = document.querySelector('#date-start');
        const inputEndDate = document.querySelector('#date-end');
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
            createTask(myTaskList, task); //create task on UI
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            inputTaskElement.value = '';
        }
    } catch (err) {
        alert('Lỗi thêm task');
    }
};

function editTask(event) {
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
    console.log(urlNew + '/detail/' + id);
}

async function deleteTask(event) {
    try {
        event.stopPropagation(); // ngăn chặn sự kiện nổi bọt
        // lấy ra task cần xóa
        let taskElement = event.target;
        while (!taskElement.classList.contains('content_mytask-item')) {
            taskElement = taskElement.parentNode;
        }
        const id = taskElement.getAttribute('data-index');
        //call api to server to delete task
        await fetch(url + '/' + id, {
            method: 'DELETE',
        });
        alert('Xóa thành công!');
        taskElement.remove(); // delete task in UI
    } catch (err) {
        console.log(err);
    }
}

function showButtonTask(event) {
    event.preventDefault();
    const taskElement = event.target;
    console.log(taskElement);
    const buttonTask = taskElement.querySelector('.content_mytask-item-button');
    console.log(buttonTask);
    buttonTask.style.display = 'block';
    function hiddenButtonTask(event) {
        if (event.target != taskElement) {
            buttonTask.style.display = 'none';
        }
    }
    window.addEventListener('click', hiddenButtonTask);
}
window.addEventListener('load', async function () {
    try {
        const res = await fetch(url);
        const tasks = await res.json();
        if (tasks.length > 0) {
            idTask = tasks[tasks.length - 1].id;
        }
        //Lấy từng task trong db và hiển thị lên UI
        tasks.forEach(task => {
            if (task.status) {
                createTaskFinish(listTasksComplated, task);
                countTaskFinish++;
                ShowNumberTaskComplate.textContent = countTaskFinish;
            } else {
                createTask(myTaskList, task);
                countTaskNotComplate++;
                ShowNumberTaskNotComplate.textContent = countTaskNotComplate;
            }
        });
    } catch (err) {
        console.log(err);
    }
});
