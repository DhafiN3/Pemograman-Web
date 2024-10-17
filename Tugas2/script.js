// Mendapatkan elemen DOM
const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Muat data dari localStorage
document.addEventListener('DOMContentLoaded', loadTodosFromLocalStorage);

// Tambah tugas saat tombol diklik
addButton.addEventListener('click', addTodo);

// Fungsi untuk menambahkan tugas
function addTodo() {
    const taskText = inputField.value.trim();
    if (taskText === '') return; // Cek jika input kosong

    const todoItem = createTodoItem(taskText);
    todoList.appendChild(todoItem);

    saveToLocalStorage();

    // Reset input field
    inputField.value = '';
}

// Fungsi untuk membuat elemen tugas baru
function createTodoItem(taskText) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const span = document.createElement('span');
    span.textContent = taskText;

    const actions = document.createElement('div');
    actions.classList.add('todo-actions');

    // Tombol untuk menandai selesai
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveToLocalStorage();
    });

    // Tombol untuk mengedit tugas
    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText) {
            span.textContent = newTaskText.trim();
            saveToLocalStorage();
        }
    });

    // Tombol untuk menghapus tugas
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(li);
        saveToLocalStorage();
    });

    actions.appendChild(completeButton);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    li.appendChild(span);
    li.appendChild(actions);

    return li;
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const completed = item.classList.contains('completed');
        tasks.push({ taskText, completed });
    });
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Fungsi untuk memuat tugas dari localStorage
function loadTodosFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.forEach(task => {
        const todoItem = createTodoItem(task.taskText);
        if (task.completed) {
            todoItem.classList.add('completed');
        }
        todoList.appendChild(todoItem);
    });
}
