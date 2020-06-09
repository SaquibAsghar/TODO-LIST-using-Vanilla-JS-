// DEFINE UI VARS
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//  Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// Fetch LS
	document.addEventListener("DOMContentLoaded", fetchTask);

	// add task event
	form.addEventListener("submit", addTask);
	// remove task element
	taskList.addEventListener("click", removeTask);

	clearBtn.addEventListener("click", clearTask);

	filter.addEventListener("keyup", filterTask);
}

function fetchTask() {
	let showTask;

	if (localStorage.getItem("tasks") === null) {
		showTask = [];
	} else {
		showTask = JSON.parse(localStorage.getItem("tasks"));
	}

	showTask.forEach(function (task) {
		// create a li
		const li = document.createElement("li");

		// add class name
		li.className = "collection-item";

		// create text node
		const textNode = document.createTextNode(task);
		// const textNode = document.createTextNode(taskInput.value)

		// Append Child
		li.appendChild(textNode);

		// create new link
		const link = document.createElement("a");
		link.className = "delete-item secondary-content";

		// add icon
		link.innerHTML = '<i class="fa fa-remove"></i>';

		// append link to li
		li.appendChild(link);

		// append li to the ul
		taskList.appendChild(li);
	});
}

function addTask(e) {
	if (taskInput.value === "") {
		return alert("Add task");
	}

	const li = document.createElement("li");

	li.className = "collection-item";

	const textNode = document.createTextNode(taskInput.value);

	li.appendChild(textNode);

	// create new link
	const link = document.createElement("a");
	link.className = "delete-item secondary-content";

	// add icon
	link.innerHTML = '<i class="fa fa-remove"></i>';

	// append link to li
	li.appendChild(link);

	// append li to the ul
	taskList.appendChild(li);

	// STORE IN Local Storage
	storeTaskInLocalStorage(taskInput.value);

	// clear input field
	taskInput.value = "";

	e.preventDefault();
}

function storeTaskInLocalStorage(addTask) {
	let addTasks;

	if (localStorage.getItem("tasks") === null) {
		addTasks = [];
	} else {
		addTasks = JSON.parse(localStorage.getItem("tasks"));
	}
	addTasks.push(addTask);

	localStorage.setItem("tasks", JSON.stringify(addTasks));
}

function removeTask(e) {
	if (e.target.parentNode.classList.contains("delete-item")) {
		// a parent -> li parent
		if (confirm("Are you sure?")) {
			e.target.parentNode.parentNode.remove();
			removeTaskFromLocalStorage(e.target.parentNode.parentNode);
		}
	}
}

function removeTaskFromLocalStorage(removeTask) {
	let addTasks;

	if (localStorage.getItem("tasks") === null) {
		addTasks = [];
	} else {
		addTasks = JSON.parse(localStorage.getItem("tasks"));
	}
	addTasks.forEach((removeT, index) => {
		if (removeTask.textContent === removeT) {
			return addTasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(addTasks));
}

function clearTask(e) {
	// Either use this
	// taskList.innerHTML = "";

	// OR

	// FASTER way
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearLocalStorage();
}

function clearLocalStorage() {
	localStorage.clear();
}

function filterTask(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach((task) => {
		const item = task.firstChild.textContent.toLowerCase();
		if (item.indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
