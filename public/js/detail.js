//phân tích chuỗi url để lấy id của task và tạo 1 chuỗi url api để lấy thông tin trên server;
const href = window.location.href;
const elementsUrl = href.split('/');
const id = +elementsUrl[elementsUrl.length - 1];
let url = elementsUrl.slice(0, elementsUrl.length - 2).join('/') + '/' + 'tasksapi';
let idTaskDetail = 0,
    countNumberTaskDetail = 0;

const elementShowNameTask = document.querySelector('.content-name-text'),
    elementShowlistTaskDetail = document.querySelector('.content_detail-list'),
    elementShowDescription = document.querySelector(
        '.content_description-text',
    ),
    elementShowNumberTaskDetail = document.querySelector('#countDetail'),
    elementAddTaskDetail = document.querySelector(
        '.content_form-add-taskDetail',
    );

let nameRoot = '';

function showDateNow() {
    const elementShowDayNow = document.querySelector('#showDateNow');
    const day = new Date();
    let dayInWeek = day.getDay(),
        dateInMonth = day.getDate(),
        month = day.getMonth() + 1,
        year = day.getFullYear();
    let stringDateMonthYear = '';
    if (dayInWeek == 0) {
        stringDateMonthYear = 'Chủ nhật, ';
    } else {
        stringDateMonthYear = `Thứ ${dayInWeek + 1}, `;
    }
    stringDateMonthYear += `Ngày ${dateInMonth} tháng ${month}, năm ${year}`;
    elementShowDayNow.innerHTML = stringDateMonthYear;
}
function playTinhTinh() {
    const audio = new Audio('/static/audios/tinhtinh.mp4');
    let promise = audio.play();
    if (promise) {
        promise
            .then(_ => {
                audio.play();
            })
            .catch(error => {
                console.log('Lỗi phát nhạc');
            });
    }
}

async function updateStatusTaskDetailOnUIAndServer(event, status = false) {
    let elementTaskDetail = event.target;
    while (!elementTaskDetail.classList.contains('content_detail-item')) {
        elementTaskDetail = elementTaskDetail.parentElement;
    }
    const idTaskDetail = elementTaskDetail.getAttribute('data-index');
    const name = elementTaskDetail.querySelector(
        '.content_detail-name',
    ).textContent;

    const taskDetail = {
        id,
        idTaskDetail,
        name,
        status,
    };

    updateStatusTaskDetailInServer(idTaskDetail, status)//update status task detail in server

    //update status task detail to UI
    elementTaskDetail.remove();
    createTaskDetail(elementShowlistTaskDetail, taskDetail);
    if (status) playTinhTinh();
}

async function updateStatusTaskDetailInServer(idTaskDetail, status) {
    //call api to server update status task detail
    try {
        await fetch(url + '/detail/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idTaskDetail, status, id })
        })
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteTaskDetailOnServerAndUI(event) {
    event.stopPropagation(); // stop bubbling

    let elementTaskDetail = event.target;
    while (!elementTaskDetail.classList.contains('content_detail-item')) {
        elementTaskDetail = elementTaskDetail.parentElement;
    }

    const idTaskDetail = elementTaskDetail.getAttribute('data-index');
    await deleteTaskInServer(idTaskDetail, id);//delete task detail in server

    //delete task detail to UI
    elementTaskDetail.remove();
    countNumberTaskDetail--;
    elementShowNumberTaskDetail.innerHTML = countNumberTaskDetail;
}

async function deleteTaskInServer(idTaskDetail, id) {
    try {
        //call api to server delete task detail
        await fetch(url + '/detail/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idTaskDetail, id })
        })
    }
    catch (err) {
        console.log(err);
    }
}

//function create task detail to UI
function createTaskDetail(elementShowTaskDetail, taskDetail) {
    const taskDetailElement = document.createElement('div');
    taskDetailElement.classList.add('content_detail-item');
    taskDetailElement.setAttribute('data-target', id);
    taskDetailElement.setAttribute('data-index', taskDetail.idTaskDetail);
    taskDetailElement.innerHTML = `<p class="content_detail-name">${taskDetail.name}</p>
                                            <div class="content_detail-action">
                                                <button class="content_detail-finish content_detail-btn" onclick="updateStatusTaskDetailOnUIAndServer(event,true)">
                                                    <i class="fi fi-rr-check"></i>
                                                </button>
                                                <button class="content_detail-delete content_detail-btn"
                                                onclick="deleteTaskDetailOnServerAndUI(event)">
                                                    <i class="fi fi-rr-trash"></i>
                                                </button>
                                            </div>`;
    if (taskDetail.status) {
        taskDetailElement.addEventListener('click', updateStatusTaskDetailOnUIAndServer);
        taskDetailElement.classList.add('finish');
        elementShowTaskDetail.appendChild(taskDetailElement);
    } else {
        elementShowTaskDetail.prepend(taskDetailElement);
    }
}

async function addTaskDetailToServer(taskDetail) {
    try {
        //call api to server add task detail
        await fetch(url + '/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskDetail),
        });
    }
    catch (err) {
        console.log(err);
    }
}

function handleAllEvents() {
    try {
        //Listen event change name task
        elementShowNameTask.addEventListener('blur', async () => {
            let name = elementShowNameTask.value;
            if (name == '') {
                elementShowNameTask.value = nameRoot;
                return alert('Tên không được để trống!');
            }
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            console.log('Cập nhật tên thành công!');
        })

        //Listen event change description task
        elementShowDescription.addEventListener('blur', async () => {
            let description = elementShowDescription.value;
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });
            console.log('Cập nhật mô tả thành công!');
        })

        //listen event add task detail
        elementAddTaskDetail.addEventListener('submit', async event => {
            event.preventDefault();
            const name = elementAddTaskDetail.querySelector(
                '.content_form-add-taskDetail-input',
            );
            if (name.value) {
                idTaskDetail++;
                const taskDetail = {
                    id,
                    name: name.value,
                    status: false,
                    idTaskDetail,
                };
                await addTaskDetailToServer(taskDetail); //add task detail to server
                createTaskDetail(elementShowlistTaskDetail, taskDetail); //add task detail to UI
                name.value = '';
                countNumberTaskDetail++;
                elementShowNumberTaskDetail.innerHTML = countNumberTaskDetail;
            }
            else {
                alert('Tên không được để trống!');
            }
        })

        //listen event load page;
        window.addEventListener('load', async () => {
            const res = await fetch(url + '/' + id);
            const task = await res.json();
            elementShowDescription.value = task.description;
            elementShowNameTask.value = task.name;
            //Show list task detail to UI
            task.ListDetail.forEach(taskDetail => {
                createTaskDetail(elementShowlistTaskDetail, taskDetail);
            });
            idTaskDetail =
                task.ListDetail[task.ListDetail.length - 1]?.idTaskDetail ?? 0;
            countNumberTaskDetail = task.ListDetail.length;
            nameRoot = task.name;
            elementShowNumberTaskDetail.innerHTML = countNumberTaskDetail;
        })
    } catch (err) {
        console.log(err);
    }
}

function start() {
    showDateNow();
    handleAllEvents();
}

start();
