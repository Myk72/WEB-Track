const new_task = document.getElementById('inp');
const store = document.getElementById('listing'); 


function add(event) {
    event.preventDefault();
    const task = new_task.value;
    if (!task){
        alert('Please Enter a task')
        return
    }
    const general = document.createElement('div');
    general.classList.add('task');
    const current_entity = document.createElement('div');
	general.appendChild(current_entity);

    const input_section = document.createElement('input');
    input_section.classList.add('text');
    input_section.value = task;
    input_section.setAttribute('readonly', 'readonly');

    current_entity.appendChild(input_section);
    
    const task_edit = document.createElement('button');
    task_edit.classList.add('edit');
    task_edit.innerText = 'Edit';

    const task_del = document.createElement('button');
    task_del.classList.add('delete');
    task_del.innerText = 'Delete';

    general.appendChild(task_edit);
    general.appendChild(task_del);


    store.appendChild(general);
    
    task_edit.addEventListener('click', edittask);
    
    task_del.addEventListener('click', deleteTask);
    new_task.value = '';
    function edittask(event) {
        
        if (event.target.innerText == "Edit") {
            event.target.innerText = "Save";
            input_section.removeAttribute("readonly");
        } else {
            event.target.innerText = "Edit";
            input_section.setAttribute("readonly", "readonly");
        }
    }
}

function deleteTask(event) {
    event.target.parentElement.remove();
}




document.getElementById('form1').addEventListener('submit', add);

