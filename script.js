loadTasks();
        updateClock();

        function addTask() {
            var taskInput = document.getElementById("taskInput");
            var taskText = taskInput.value.trim();

            var deadlineInput = document.getElementById("deadlineInput");
            var deadlineValue = deadlineInput.value;

            if (taskText !== "") {
                var taskList = document.getElementById("tasks");
                var li = document.createElement("li");
                li.textContent = taskText + " - (Deadline) "+ deadlineValue;

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
                    li.classList.remove("overdue-task")
                    saveTasks();
                };

                var deadline = new Date(deadlineValue);
                var currentDate = new Date();
                if (deadline < currentDate) {
                    li.classList.add("overdue-task");
                }

                li.appendChild(doneButton);
                li.appendChild(deleteButton);

                taskList.appendChild(li);
                saveTasks();
                taskInput.value = "";
                deadlineInput.value = "";
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

        function updateClock() {
            const dayElement = document.getElementById('day');
            const dateElement = document.getElementById('date');
            const timeElement = document.getElementById('time');
            const now = new Date();

            const dayOptions = {
                weekday: 'long',
            };

            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            const timeOptions = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };

            const formattedDay = now.toLocaleDateString(undefined, dayOptions);
            const formattedDate = now.toLocaleDateString(undefined, dateOptions);
            const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

            dayElement.textContent = formattedDay;
            dateElement.textContent = formattedDate;
            timeElement.textContent = formattedTime;

            setTimeout(updateClock, 1000);
        }