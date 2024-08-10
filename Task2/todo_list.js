var new_task = document.getElementById('inp');
var store = document.getElementById('listing');
function func(event) {
    event.preventDefault();
    var task = new_task.value;
    var check = {
        completed: false
    };
    if (!task) {
        alert('Please Enter a task');
        return;
    }
    var general = document.createElement('div');
    general.classList.add('task');
    var current_entity = document.createElement('div');
    general.appendChild(current_entity);
    var check_box = document.createElement('input');
    check_box.type = 'checkbox';
    check_box.checked = check.completed;
    current_entity.appendChild(check_box);
    var input_section = document.createElement('input');
    input_section.classList.add('text');
    input_section.value = task;
    input_section.setAttribute('readonly', 'readonly');
    current_entity.appendChild(input_section);
    var task_edit = document.createElement('button');
    task_edit.classList.add('edit');
    task_edit.innerText = 'Edit';
    var task_del = document.createElement('button');
    task_del.classList.add('delete');
    task_del.innerText = 'Delete';
    general.appendChild(task_edit);
    general.appendChild(task_del);
    store.appendChild(general);
    check_box.addEventListener('change', function () {
        check.completed = check_box.checked;
        if (check.completed) {
            input_section.style.textDecoration = 'line-through';
        }
        else {
            input_section.style.textDecoration = 'none';
        }
    });
    task_del.addEventListener('click', deleteTask);
    task_edit.addEventListener('click', function () {
        if (task_edit.innerText == "Edit") {
            (task_edit).innerText = "Save";
            input_section.removeAttribute("readonly");
        }
        else {
            (task_edit).innerText = "Edit";
            input_section.setAttribute("readonly", "readonly");
        }
    });
    function deleteTask() {
        store.removeChild(general);
    }
    new_task.value = '';
}
var form1 = document.getElementById('form1');
form1.addEventListener('submit', func);
