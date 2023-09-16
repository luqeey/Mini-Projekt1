loadTasks();

        function addTask() {
            var taskInput = document.getElementById("taskInput");
            var taskText = taskInput.value.trim();

            if (taskText !== "") {
                var taskList = document.getElementById("tasks");
                var li = document.createElement("li");
                li.textContent = taskText;

                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add("delete-button");

                deleteButton.onclick = function() {
                    taskList.removeChild(li);
                    saveTasks();
                };

                var doneButton = document.createElement('button');
                doneButton.textContent = 'Done';
                doneButton.classList.add('done-button');

                doneButton.onclick = function() {
                    li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
                    saveTasks();
                };

                li.appendChild(doneButton);
                li.appendChild(deleteButton);

                taskList.appendChild(li);
                saveTasks();
                taskInput.value = "";
            }
        }

        function saveTasks() {
            var taskList = document.getElementById('tasks');
            localStorage.setItem('taskList', taskList.innerHTML);
        }

        function loadTasks() {
            var taskList = document.getElementById('tasks');
            var savedTasks = localStorage.getItem('taskList');
            if (savedTasks) {
                taskList.innerHTML = savedTasks;

                var doneButtons = taskList.querySelectorAll('.done-button');
                doneButtons.forEach(function(button) {
                    button.onclick = function() {
                        var li = button.parentNode;
                        li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
                        saveTasks();
                    };
                });

                var deleteButtons = taskList.querySelectorAll('.delete-button');
                deleteButtons.forEach(function(button) {
                    button.onclick = function() {
                        taskList.removeChild(button.parentNode);
                        saveTasks();
                    };
                });
            }
        }