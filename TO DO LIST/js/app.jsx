document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('new-task-input');
    const list = document.getElementById('task-list');

    let tasks = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (input.value.trim() === '') return;

        const task = {
            id: Date.now(),
            text: input.value.trim(),
            completed: false
        };

        tasks.push(task);
        input.value = '';
        renderTasks();
    });

    function renderTasks() {
        list.innerHTML = '';

        tasks.forEach((task) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            const label = document.createElement('label');
            const deleteButton = document.createElement('button');

            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                renderTasks();
            });
            label.textContent = task.text;
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter((t) => t.id !== task.id);
                renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteButton);
            list.appendChild(li);
        });

        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');

        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    }

    loadTasks();
});