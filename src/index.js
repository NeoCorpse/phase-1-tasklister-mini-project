document.addEventListener('DOMContentLoaded', () => {
	// your code here
	class Task {
		constructor(name, priority, status) {
			this.name = name;
			this._priority = priority;
			this._status = status;
		}

		set status(val) {
			this._status = val;
		}

		get status() {
			return this._status;
		}

		set priority(val) {
			this._priority = val;
		}

		get priority() {
			return this._priority;
		}
	}

	const form = document.querySelector('form');
	const input = form.querySelector('input');
	const completed = document.querySelector('.completed > div');
	const inProgress = document.querySelector('.in-progress > div');
	const toDo = document.querySelector('.to-do > div');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.querySelector('input').value;
		let [status, priority] = [...document.querySelectorAll('select')];
		status = status.value;
		priority = priority.value;
		const task = new Task(name, priority, status);

		const div = document.createElement('div');
		console.log(task);
		div.innerHTML = `<img src="./assets/${task.priority}.svg" alt="${task.priority}" />
							<p>${task.name}</p>
							<button>x</button>`;

		div.querySelector('button').addEventListener('click', (e) => {
			e.target.parentNode.remove();
		});

		render(div, task);
		input.value = '';
	});

	function render(div, task) {
		switch (task.status) {
			case 'to-do':
				toDo.appendChild(div);
				break;
			case 'in-progress':
				inProgress.appendChild(div);
				break;
			case 'completed':
				completed.appendChild(div);
		}
	}
});
