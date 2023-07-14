const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
const content = document.querySelector('.content');
const menu_hidden = document.querySelector('#menu_hidden');
const url = window.location.href + '/tasksapi';

const listTasksComplated = document.querySelector(
    '.content_mytask-compate-list',
);
const buttonShowTaskComlated = document.querySelector(
    '.content_mytask-complate-title',
);
const formDetailTask = document.querySelector('.detail');
const showDateNow = document.querySelector('#showDateNow');
const date = new Date(); // ngày tháng năm hiện tại
const buttonAddTask = document.querySelector('#add');
const formAddTask = document.querySelector('#form-add-task');
const audio = new Audio('/static/audios/tinhtinh.mp4');

let day = '';
let idTask = 0;
let idTaskNext = 0;

menu.onclick = () => {
    if (
        formDetailTask.classList.contains('show') &&
        content.classList.contains('content-5')
    ) {
        content.classList.remove('content-5');
        content.classList.add('content-7');
    } else {
        content.classList.add('content-10');
    }
    sidebar.classList.add('hidden');
    menu_hidden.classList.remove('hidden');
};

menu_hidden.onclick = () => {
    if (
        formDetailTask.classList.contains('show') &&
        content.classList.contains('content-7')
    ) {
        content.classList.remove('content-7');
        content.classList.add('content-5');
    } else {
        content.classList.remove('content-10');
    }
    sidebar.classList.remove('hidden');
    menu_hidden.classList.add('hidden');
};

buttonShowTaskComlated.onclick = () => {
    ShowTaskFinished();
};

function ShowTaskFinished() {
    listTasksComplated.classList.toggle('hidden');
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

const myTaskList = document.querySelector('.content_mytask-list');
function createTask(
    List,
    id,
    name,
    important = false,
) {
    let myTaskItem = document.createElement('div');
    myTaskItem.setAttribute('data-index', id);
    myTaskItem.classList.add('content_mytask-item');
    myTaskItem.setAttribute('important', important)
    myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <button class="updatefinish" onclick="updatefinish(event)">
                                    <i class="fi fi-rr-circle" id="finish-icon"></i>
                                </button>
                                <h4 class="content_mytask-title" onclick=" event.stopPropagation();">${name}</h4>
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
                                    Sửa task
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                                <button class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                                </div>
                            </div>`;
    myTaskItem.addEventListener('click', showDetailTask);
    myTaskItem.addEventListener('contextmenu', showButtonTask);
    if (important) {
        myTaskItem.querySelector('.important').classList.add('hidden');
        myTaskItem.querySelector('.noimportant').classList.remove('hidden');
    }
    List.prepend(myTaskItem);
}

function createTaskFinish(
    List,
    id,
    name,
    important = false,
) {
    let myTaskItem = document.createElement('div');
    myTaskItem.setAttribute('data-index', id);
    myTaskItem.setAttribute('important', important)
    myTaskItem.classList.add('content_mytask-item');
    myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <button class="not-update-finish" onclick="updateTaskNotFinish(event)">
                                    <i class="fi fi-rr-check-circle"></i>
                                </button>
                                <h4 class="content_mytask-title" onclick=" event.stopPropagation();">${name}</h4>
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
                                    Sửa task
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                                <button class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                                </div>
                            </div>`;
    myTaskItem.addEventListener('click', showDetailTask);
    myTaskItem.addEventListener('contextmenu', showButtonTask);
    //Check task important ?
    if (important) {
        myTaskItem.querySelector('.important').classList.add('hidden');
        myTaskItem.querySelector('.noimportant').classList.remove('hidden');
    }
    List.prepend(myTaskItem);
}

function addTaskFinished(element) {
    const name = element.querySelector('.content_mytask-title')?.textContent;
    const id = element.getAttribute('data-index');
    const important = element.getAttribute('important');
    createTaskFinish(listTasksComplated, id, name, important);
    listTasksComplated.classList.remove('hidden');
    playTinhTinh();
}

function addTaskNotFinish(element) {
    const name = element.querySelector('.content_mytask-title')?.textContent;
    const id = element.getAttribute('data-index');
    const important = element.getAttribute('important');
    createTask(myTaskList, id, name, important);
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
        elementTask.remove();
        await fetch(url + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: true }),
        });
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
        const inputTaskElement = formAddTask.querySelector('#input_task');
        if (inputTaskElement.value) {
            idTask++;
            createTask(myTaskList, idTask, inputTaskElement.value); //create task on UI
            const task = {
                id: idTask,
                name: inputTaskElement.value,
                description: '',
                important: false,
                status: false,
            };
            inputTaskElement.value = '';
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
        }
    } catch (err) {
        console.log('Lỗi add task');
    }
};
const closeFormDetailTask = formDetailTask.querySelector(
    '.detail_mytask-button>i',
);
//function add task next
function createTaskNext(list, idTaskDetail, name, status = false, idOfTask) {
    const taskNext = document.createElement('div');
    taskNext.classList.add('detail_mytask-next-item');
    taskNext.setAttribute('data-target', +idOfTask);
    taskNext.setAttribute('data-index', idTaskDetail);
    taskNext.innerHTML = ` <div class="detail_mytask-next-group">
                                  <button class="detail_mytask-btn update-finish">
                                        <i class="fi fi-rr-circle"></i>
                                    </button>
                                    <button class="detail_mytask-btn not-update-finish hidden">
                                        <i class="fi fi-rr-check-circle"></i>
                                    </button>
                                    <h4 class="detail_mytask-next-title">${name}</h4>
                                    </div>
                                    <button class="detail_mytask-btn delete">
                                        <i class="fi fi-rr-cross-small"></i>
                                    </button>`;
    list.appendChild(taskNext);
}
let ListDetail = [];
const ListDetailTemp = [];
async function showDetailTask(event) {
    ListDetail = [];
    //reponsive UI
    if (
        sidebar.classList.contains('hidden') &&
        content.classList.contains('content-10')
    ) {
        content.classList.remove('content-10');
        content.classList.add('content-7');
    } else {
        content.classList.add('content-5');
    }

    //show form detail task and listen events on form dateil task
    formDetailTask.classList.add('show');
    closeFormDetailTask.addEventListener('click', hiddenDetailTask);

    //Lấy title,id của task và hiển thị lên UI
    const detailTaskTitle = formDetailTask.querySelector(
        '.detail_mytask-title',
    );
    const TaskElementInDetail = formDetailTask.querySelector(
        '.detail_mytask-item',
    );

    const taskElement = event.target;
    let id = +taskElement.getAttribute('data-index');
    const title = taskElement.querySelector(
        '.content_mytask-title',
    )?.textContent;
    detailTaskTitle.textContent = title;
    TaskElementInDetail.setAttribute(
        'data-index',
        taskElement.getAttribute('data-index'),
    );

    //all API để lấy dữ liệu của task đó.
    let description = '';
    await fetch(url + '/' + id)
        .then(res => res.json())
        .then(task => {
            ListDetail = task.ListDetail;
            description = task.description;
        })
        .catch(err => console.log(err));
    let idTaskDetail = ListDetail[ListDetail?.length - 1]?.idTaskDetail ?? 0;

    //lấy ra form add task next và list task next
    const formAddTasksNext = formDetailTask.querySelector('#form_mytask-next');
    const listTaskNext = formDetailTask.querySelector(
        '.detail_mytask-next-list',
    );

    listTaskNext.innerHTML = ''; // clear list task next trước khi add tasks next vào

    //Show list task next to UI
    ListDetail.forEach(task => {
        ListDetailTemp.push(task);
        createTaskNext(
            listTaskNext,
            task.idTaskDetail,
            task.name,
            task.status,
            task.id,
        );
    });

    //Show description of task to UI
    const inputDescription = formAddTasksNext.querySelector('#description');
    inputDescription.value = description;

    const buttonAddTaskNext = formDetailTask.querySelector('#detail_task-add');
    const inputTaskNext = formAddTasksNext.querySelector('#input_task-next');
    const buttonResertDetailTask = formAddTasksNext.querySelector(
        '.detail_mytask-cancel',
    );

    //listen event click button add task next and resert form preview
    buttonAddTaskNext.addEventListener('click', handleClickAddTaskDetail);
    buttonResertDetailTask.addEventListener('click', handleResertDetailTask);

    function handleClickAddTaskDetail(event) {
        event.preventDefault();
        event.stopPropagation();
        if (inputTaskNext.value) {
            idTaskDetail++;
            createTaskNext(
                listTaskNext,
                idTaskDetail,
                inputTaskNext.value,
                false,
                id,
            ); // add to UI
            const taskDetail = {
                idTaskDetail,
                name: inputTaskNext.value,
                status: false,
                id,
            };
            ListDetail.push(taskDetail); // add to list Task next temp
            inputTaskNext.value = '';
        }
    }

    function handleResertDetailTask(event) {
        event.preventDefault();
        listTaskNext.innerHTML = '';
        ListDetailTemp.forEach((task, index) => {
            createTaskNext(
                listTaskNext,
                task.idTaskDetail,
                task.name,
                task.status,
                task.id,
            );
        });
        ListDetail = ListDetailTemp;
        inputDescription.value = description;
        inputTaskNext.value = '';
    }

    // listen event save add tasks next in form
    formAddTasksNext.addEventListener('submit', async function (event) {
        try {
            event.preventDefault();
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: inputDescription.value,
                    ListDetail,
                }),
            });
            //giải phóng bộ nhớ
            ListDetail = [];
            ListDetailTemp = [];
        } catch (err) {
            console.log('Lỗi add tasks next');
        }
    });
}
//function handle close form detail task
function hiddenDetailTask() {
    if (
        !sidebar.classList.contains('hidden') &&
        content.classList.contains('content-5')
    ) {
        content.classList.remove('content-5');
    } else {
        content.classList.remove('content-7');
        content.classList.add('content-10');
    }
    formDetailTask.classList.remove('show');
    closeFormDetailTask.removeEventListener('click', hiddenDetailTask);
}

function editTask(event) {
    event.stopPropagation(); // ngăn chặn sự kiện nổi bọt

    // lấy ra task cần sửa
    let taskElement = event.target;
    while (!taskElement.classList.contains('content_mytask-item')) {
        taskElement = taskElement.parentNode;
    }

    //show form update and listen event submit
    const formUpdate = document.querySelector('#form-update');
    formUpdate.classList.add('show');
    const btnCloseFormUpdate = formUpdate.querySelector('.form-update-btn');
    const inputOldName = formUpdate.querySelector('#old-name');
    inputOldName.value = taskElement.querySelector(
        '.content_mytask-title',
    ).textContent;

    const inputNewName = formUpdate.querySelector('#new-name');
    const errElement = formUpdate.querySelector('.message');

    //form upadate dialog
    const formDialogUpdate = formUpdate.querySelector('.form-update-dialog');
    //listent event onsubmit form update dialog
    formDialogUpdate.addEventListener('submit', async function (e) {
        e.preventDefault();
        try {
            if (inputNewName.value != inputOldName.value) {
                let id = taskElement.getAttribute('data-index');
                let name = inputNewName.value;
                //call api to server update task name
                await fetch(url + '/' + id, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name }),
                });
                //change task in UI
                taskElement.querySelector('.content_mytask-title').textContent =
                    name;
                //close form update
                inputOldName.value = '';
                inputNewName.value = '';
                formUpdate.classList.remove('show');
                alert('Cập nhật thành công!');
            } else {
                errElement.textContent = 'Tên task không được trùng với tên cũ';
            }
        } catch (err) {
            console.log('Cập nhật thất bại!');
        }
    });

    //listen event click button close form update
    function hiddenFormUpdate(e) {
        e.preventDefault();
        formUpdate.classList.remove('show');
        btnCloseFormUpdate.removeEventListener('click', hiddenFormUpdate);
    }
    btnCloseFormUpdate.addEventListener('click', hiddenFormUpdate);
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
        taskElement.remove(); // delete task in UI
        await fetch(url + '/' + id, {
            method: 'DELETE',
        });
    } catch (err) {
        console.log('Lỗi xóa task thất bại');
    }
}

function showButtonTask(event) {
    event.preventDefault();
    const taskElement = event.target;
    const buttonTask = taskElement.querySelector('.content_mytask-item-button');
    buttonTask.style.display = 'block';
    function hiddenButtonTask() {
        buttonTask.style.display = 'none';
    }
    window.addEventListener('click', hiddenButtonTask);
}
window.removeEventListener('click', hiddenDetailTask);
window.addEventListener('click', function () { });
window.addEventListener('load', async function () {
    try {
        const res = await fetch(url);
        const tasks = await res.json();
        if (tasks.length > 0) {
            idTask = tasks[tasks.length - 1].id;
        }
        //Lấy từng task trong db và hiển thị lên UI
        tasks.forEach(task => {
            task.status
                ? createTaskFinish(
                    listTasksComplated,
                    task.id,
                    task.name,
                    task.important,
                )
                : createTask(
                    myTaskList,
                    task.id,
                    task.name,
                    task.important,
                );
        });
        console.log('Tải task thành công!');
    } catch (err) {
        console.log('Load tasks thất bại');
    }
});
