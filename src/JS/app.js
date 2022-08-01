const load = () => {  // funcion que carga el archivo
    
    let edit = false;
    document.getElementById("task-result").hidden = true; // oculta el div de resultados
    fetchTasks(); // llama a la funcion que carga las tareas
    document.getElementById('search').addEventListener('keyup', (event) => {  // evento que se ejecuta al presionar una tecla
        if(document.getElementById('search').value.length > 0) {  // si el valor del input es mayor a 0
            let search = document.getElementById('search').value;  // obtiene el valor del input
            $.ajax({  // peticion ajax
                url: './php/task-search.php',  // archivo que se ejecuta
                type: 'POST',  // metodo de envio
                data: {search},  // datos que se envian
                success: (response) => {  // funcion que se ejecuta al recibir la respuesta
                    let tasks = JSON.parse(response);  // convierte la respuesta en un objeto
                    let template = '';  // variable que almacena el template (el template es el html que se va a mostrar)
                    tasks.forEach(task => {  // recorre el objeto
                        template += `<li>${task.name}</li>`  // agrega el template
                    });
                    document.getElementById('container').innerHTML = template;  // muestra el template
                    if(tasks.length == 0) {  // si no hay resultados
                        document.getElementById('container').innerHTML = `No hay resultados`;  // muestra el mensaje
                    }
                    document.getElementById("task-result").hidden = false;  // muestra el div de resultados
                }
            })
        }else{
            document.getElementById("task-result").hidden = true;  // oculta el div de resultados
        }
    });

    document.getElementById('task-form').addEventListener('submit', (event) => {  // evento que se ejecuta al enviar el formulario
        const postData = {  // objeto que almacena los datos del formulario
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            id: document.getElementById('taskId').value  // id de la tarea
        }

        let url = edit === false ? './php/task-add.php' : './php/task-edit.php';  // si edit es false, la url es task-add.php, si es true, la url es task-edit.php

        $.post(url, postData, (response) => {  // peticion ajax
            fetchTasks();  // llama a la funcion que carga las tareas
            $('#task-form').trigger('reset');  // limpia el formulario
            // lo mismo pero sin Jquery | document.getElementById('task-form').reset();
            edit = false;  // edit es false
            checkButton();  // llama a la funcion que cambia el texto del boton
        });
        event.preventDefault();  // evita que se recargue la pagina
    });

    function fetchTasks () {  // funcion que obtiene las tareas
        $.ajax({  // peticion ajax
            url: './php/task-list.php',  // archivo que se ejecuta
            type: 'GET',  // metodo de envio
            success: (response) => {  // funcion que se ejecuta al recibir la respuesta
                let tasks = JSON.parse(response);  // convierte la respuesta en un objeto
                let template = '';  // variable que almacena el template (el template es el html que se va a mostrar)
                tasks.forEach(task => {  // recorre el objeto
                    template += `<tr taskId="${task.id}">
                                    <td>${task.id}</td>
                                    <td>
                                        <a class="task-item">${task.name}</a>
                                    </td>
                                    <td>${task.description}</td>
                                    <td>
                                        <button class="task-delete btn btn-danger">
                                            Borrar
                                        </button>
                                    </td>
                                </tr>`  // agrega el template
                });
                document.getElementById('tasks').innerHTML = template;  // muestra el template
            }
        });
    }

    $(document).on('click', '.task-delete', (event) => {  // evento que se ejecuta al presionar el boton de borrar
        if(confirm('¿Estas seguro de querer borrar esta tarea?')) {  // pregunta si esta seguro de borrar la tarea
            let id = event.target.parentElement.parentElement.getAttribute('taskId');  // obtiene el id de la tarea
            $.post('./php/task-delete.php', {id}, (response) => {  // peticion ajax
                fetchTasks();  // llama a la funcion que carga las tareas
                console.log(response);
            });
        }
    });

    $(document).on('click', '.task-item', (event) => {  // evento que se ejecuta al presionar el nombre de la tarea
        let id = event.target.parentElement.parentElement.getAttribute('taskId')
        $.post('./php/task-single.php', {id}, (response) => {  // peticion ajax
            const task = JSON.parse(response);  // convierte la respuesta en un objeto
            document.getElementById('name').value = task.name;  // muestra el nombre de la tarea en el input
            document.getElementById('description').value = task.description;  // muestra la descripcion de la tarea en el input
            document.getElementById('taskId').value = task.id;  // muestra el id de la tarea en el input
            edit = true;  // cambia el valor de la variable edit a true
            checkButton();  // llama a la funcion que cambia el texto del boton
        });
    });

    // sin jquery seria:
    // document.querySelectorAll('.task-delete').forEach((element) => {
    //     element.addEventListener('click', (event) => {
    //         if(confirm('¿Estas seguro de querer borrar esta tarea?')) {
    //             console.log(event.target.parentElement.parentElement.getAttribute('taskId'));
    //         }
    //     });
    // });


    function checkButton () {  // funcion que verifica si el boton de buscar esta activo
        if(edit === true) {  // si edit es true
            document .querySelector('#task-form button').innerText = 'Editar Tarea';  // cambia el texto del boton
            document .querySelector('#task-form button').classList.remove('btn-primary');  // quita la clase btn-primary
            document .querySelector('#task-form button').classList.add('btn-warning');  // agrega la clase btn-warning
        }else{
            document .querySelector('#task-form button').innerText = 'Guardar Tarea';  // cambia el texto del boton
            document .querySelector('#task-form button').classList.remove('btn-warning');  // quita la clase btn-warning
            document .querySelector('#task-form button').classList.add('btn-primary');  // agrega la clase btn-primary
        }
    }
}

load();