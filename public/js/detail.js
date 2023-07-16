//phân tích chuỗi url để lấy id của task và tạo 1 chuỗi api để lấy thông tin trên server;
const href = window.location.href;
const elementsUrl = href.split('/');
const id = +elementsUrl[elementsUrl.length - 1];
let url = elementsUrl.slice(0, elementsUrl.length - 2).join('/') + '/' + 'tasksapi';
console.log(url);
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
    const audio = new Audio('/public/audios/tinhtinh.mp4');
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

//function handle update status task detail finish
async function updateStatusFinish(event) {
    const status = true;
    let elementTaskDetail = event.target;
    while (!elementTaskDetail.classList.contains('content_detail-item')) {
        elementTaskDetail = elementTaskDetail.parentElement;
    }
    const index = elementTaskDetail.getAttribute('data-index');
    const name = elementTaskDetail.querySelector(
        '.content_detail-name',
    ).textContent;
    const taskDetail = {
        id,
        idTaskDetail: index,
        name,
        status,
    };
    // //call api to server update status task detail
    // await fetch(url + '/' + id, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ index, status, id })
    // })
    //update status task detail to UI
    if (status) playTinhTinh();
    elementTaskDetail.remove();
    createTaskDetail(elementShowlistTaskDetail, taskDetail);
}

//function handle update status task detail not finsih
async function updateStatusNotFinish(event) {
    const status = false;
    let elementTaskDetail = event.target;
    while (!elementTaskDetail.classList.contains('content_detail-item')) {
        elementTaskDetail = elementTaskDetail.parentElement;
    }
    const index = elementTaskDetail.getAttribute('data-index');
    const name = elementTaskDetail.querySelector(
        '.content_detail-name',
    ).textContent;
    const taskDetail = {
        id,
        idTaskDetail: index,
        name,
        status,
    };
    // //call api to server update status task detail
    // await fetch(url + '/' + id, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ index, status, id })
    // })
    //update status task detail to UI
    elementTaskDetail.remove();
    createTaskDetail(elementShowlistTaskDetail, taskDetail);
}

async function deleteTaskDetail(event) {
    event.stopPropagation(); // stop bubbling
    let elementTaskDetail = event.target;
    while (!elementTaskDetail.classList.contains('content_detail-item')) {
        elementTaskDetail = elementTaskDetail.parentElement;
    }

    const index = elementTaskDetail.getAttribute('data-index');
    // //call api to server delete task detail
    // await fetch(url + '/' + id, {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ index, id })
    // })
    //delete task detail to UI
    elementTaskDetail.remove();
}

//function create task detail to UI
function createTaskDetail(elementShowTaskDetail, taskDetail) {
    const taskDetailElement = document.createElement('div');
    taskDetailElement.classList.add('content_detail-item');
    taskDetailElement.setAttribute('data-target', id);
    taskDetailElement.setAttribute('data-index', taskDetail.idTaskDetail);
    taskDetailElement.innerHTML = `<p class="content_detail-name">${taskDetail.name}</p>
                                            <div class="content_detail-action">
                                                <button class="content_detail-finish content_detail-btn" onclick="updateStatusFinish(event)">
                                                    <i class="fi fi-rr-check"></i>
                                                </button>
                                                <button class="content_detail-delete content_detail-btn"
                                                onclick="deleteTaskDetail(event)">
                                                    <i class="fi fi-rr-trash"></i>
                                                </button>
                                            </div>`;
    if (taskDetail.status) {
        taskDetailElement.addEventListener('click', updateStatusNotFinish);
        taskDetailElement.classList.add('finish');
        elementShowTaskDetail.appendChild(taskDetailElement);
    } else {
        elementShowTaskDetail.prepend(taskDetailElement);
    }
}

function handleAllEvent() {
    try {
        //Listen event change name task
        elementShowNameTask.addEventListener('blur', async () => {
            let name = elementShowNameTask.value;
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            console.log('Cập nhật tên thành công!');
        });

        //Listen event change description task
        elementShowDescription.addEventListener('blur', async () => {
            let description = elementShowDescription.value;
            await fetch(url + '/' + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description }),
            });
            console.log('Cập nhật mô tả thành công!');
        });

        //listen event add task detail
        elementAddTaskDetail.addEventListener('submit', async event => {
            event.preventDefault();
            const name = elementAddTaskDetail.querySelector(
                '.content_form-add-taskDetail-input',
            );
            idTaskDetail++;
            const taskDetail = {
                id,
                name: name.value,
                status: false,
                idTaskDetail,
            };
            // await fetch(url + '/' + id, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(taskDetail)
            // })
            createTaskDetail(elementShowlistTaskDetail, taskDetail);
            name.value = '';
        });

        //listen event load page;
        window.addEventListener('load', async () => {
            const res = await fetch(url + '/' + id);
            const task = await res.json();
            elementShowDescription.value = task?.description;
            elementShowNameTask.value = task?.name;

            //Show list task detail to UI
            task.ListDetail.forEach(taskDetail => {
                createTaskDetail(elementShowlistTaskDetail, taskDetail);
            });
            idTaskDetail =
                task.ListDetail[task.ListDetail.length - 1]?.idTaskDetail ?? 0;
            countNumberTaskDetail = task.ListDetail.length;
            elementShowNumberTaskDetail.innerHTML = countNumberTaskDetail;
        });
    } catch (err) {
        console.log(err);
    }
}

function start() {
    showDateNow();
    handleAllEvent();
}

start();
