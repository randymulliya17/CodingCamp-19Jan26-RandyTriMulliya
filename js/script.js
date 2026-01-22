const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filterAktif = false;

document.addEventListener("DOMContentLoaded", renderTodos);

// TAMBAH TODO
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (todoInput.value === "" || dateInput.value === "") {
        alert("Tugas dan tanggal wajib diisi!");
        return;
    }

    todos.push({
        tugas: todoInput.value,
        tanggal: dateInput.value,
        selesai: false
    });

    simpanData();
    renderTodos();

    todoInput.value = "";
    dateInput.value = "";
});

// RENDER TODO
function renderTodos() {
    todoList.innerHTML = "";

    let data = filterAktif ? todos.filter(t => !t.selesai) : todos;

    if (data.length === 0) {
        todoList.innerHTML = `
            <tr>
                <td colspan="4" class="empty">Tidak ada tugas</td>
            </tr>
        `;
        return;
    }

    data.forEach((todo, index) => {
        todoList.innerHTML += `
            <tr>
                <td>${todo.tugas}</td>
                <td>${todo.tanggal}</td>
                <td>
                    <span class="status">${todo.selesai ? "Selesai" : "Belum"}</span>
                </td>
                <td>
                    <button class="btn-edit" onclick="toggleStatus(${index})">Selesai</button>
                    <button class="btn-delete" onclick="hapusTodo(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// TOGGLE STATUS
function toggleStatus(index) {
    todos[index].selesai = !todos[index].selesai;
    simpanData();
    renderTodos();
}

// HAPUS SATU
function hapusTodo(index) {
    todos.splice(index, 1);
    simpanData();
    renderTodos();
}

// HAPUS SEMUA
deleteAllBtn.addEventListener("click", function () {
    if (confirm("Yakin ingin menghapus semua tugas?")) {
        todos = [];
        simpanData();
        renderTodos();
    }
});

// FILTER
filterBtn.addEventListener("click", function () {
    filterAktif = !filterAktif;
    filterBtn.textContent = filterAktif ? "Tampilkan Semua" : "Filter";
    renderTodos();
});

// SIMPAN DATA
function simpanData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
