const new_task = document.getElementById('inp') as HTMLInputElement;
const store = document.getElementById('listing') as HTMLElement; 


interface checking {
    completed: boolean;
  }

  
function func(event: Event) {
    event.preventDefault();
    const task= new_task.value
    const check: checking={
        completed: false
    };

    if (!task){
        alert('Please Enter a task')
        return
    }
    const general = document.createElement('div') as HTMLDivElement;
    general.classList.add('task');
    const current_entity = document.createElement('div') as HTMLDivElement;
	general.appendChild(current_entity);


    const check_box: HTMLInputElement = document.createElement('input');
    check_box.type = 'checkbox';
    check_box.checked = check.completed;

    current_entity.appendChild(check_box);

    const input_section = document.createElement('input') as HTMLInputElement;
    input_section.classList.add('text');
    input_section.value = task;
    input_section.setAttribute('readonly', 'readonly');

    current_entity.appendChild(input_section);
    
    const task_edit = document.createElement('button') as HTMLButtonElement;
    task_edit.classList.add('edit');
    task_edit.innerText = 'Edit';

    const task_del = document.createElement('button') as HTMLButtonElement;
    task_del.classList.add('delete');
    task_del.innerText = 'Delete';

    general.appendChild(task_edit);
    general.appendChild(task_del);


    store.appendChild(general);
    

    check_box.addEventListener('change', () => {
        check.completed = check_box.checked;
        if (check.completed) {
            input_section.style.textDecoration = 'line-through';
          } else {
            input_section.style.textDecoration = 'none';
          }
      });
    task_del.addEventListener('click', deleteTask);
    task_edit.addEventListener('click',  () => {
        
        if (task_edit.innerText == "Edit") {
            (task_edit).innerText = "Save";
            input_section.removeAttribute("readonly");
        } else {
            (task_edit).innerText = "Edit";
            input_section.setAttribute("readonly", "readonly");
        }
    });
    
    function deleteTask() {
        store.removeChild(general);
    }
    new_task.value = '';
    
}


const form1= document.getElementById('form1') as HTMLFormElement
form1.addEventListener('submit', func);
