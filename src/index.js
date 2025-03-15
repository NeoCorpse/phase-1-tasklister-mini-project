const form = document.querySelector('form');
const input = form.querySelector('input');
const priority = document.querySelector('select');
const tasksElement = document.querySelector('#tasks');
const divider = document.createElement('div');
divider.classList.add('divider');
const clearBtn = document.querySelector('.clear');

// Updates DOM if there is data in local storage
if (localStorage.getItem('tasks')) updateDOMTasks();

// Sets taskArray to locally stored data or an empty array if there is no stored data
const tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
class Task {
	constructor(name, priority, val) {
		this.name = name;
		this.priority = priority;
		this.val = val;
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const name = document.querySelector('input').value;
	if (name === '') return;

	// Sets priority value to task for sorting
	let val = priority.value === 'low' ? 1 : priority.value === 'medium' ? 2 : 3;
	const task = new Task(name, priority.value, val);

	tasksArray.unshift(task);
	updateDOMTasks();

	input.value = '';
});

clearBtn.addEventListener('click', clear);

// Event listener for delete and edit buttons
tasksElement.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete')) deleteFunc(e);
	if (e.target.classList.contains('edit')) editFunc(e);
});

function updateDOMTasks() {
	tasksElement.replaceChildren();
	let i = 0;
	sortFunc();
	tasksArray.forEach((task) => {
		tasksElement.innerHTML += `<div class="task ${task.priority}" data-item="${i}">
		<label> <input type="checkbox" />${task.name}</label>
		<div class="buttons">
			<div class="edit"></div>
			<div class="delete"></div>
		</div>
		</div>`;
		tasksElement.appendChild(divider);
		i++;
	});
}

function editFunc(e) {
	let parent = e.target.parentNode.parentNode;
	let dataItem = parent.getAttribute('data-item');
	let initial = parent.querySelector('label').textContent;
	let newVal = prompt('Input the new value', `${initial}`);
	if (newVal === '') {
		alert('Task cannot be empty');
		return;
	}
	tasksArray[dataItem].name = newVal;
	parent.querySelector('label').innerHTML = `<input type="checkbox" />${newVal}`;
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function deleteFunc(e) {
	let parent = e.target.parentNode.parentNode;
	let dataItem = parent.getAttribute('data-item');
	tasksArray.splice(dataItem, 1);
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
	parent.nextElementSibling.remove();
	parent.remove();
}

function sortFunc() {
	tasksArray.sort((a, b) => b.val - a.val);
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function clear() {
	localStorage.clear();
	tasksElement.replaceChildren();
	tasksArray.length = 0;
}
