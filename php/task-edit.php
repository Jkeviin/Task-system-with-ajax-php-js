<?php

    include('./database.php');  // Incluimos el archivo database.php

    if(isset($_POST['id'])){  // Si la variable id está definida
        $id = $_POST['id'];  // Recibimos el valor de la variable id
        $name = $_POST['name'];  // Recibimos el valor de la variable name
        $description = $_POST['description'];  // Recibimos el valor de la variable description
        $query = "UPDATE tarea SET name = '$name', description = '$description' WHERE id = $id";  // Creamos la consulta
        $result = mysqli_query($conexion, $query); // Ejecutamos la consulta
        if(!$result) { // Si no se ejecuta la consulta
            die('Error de Consulta' . mysqli_error($conexion)); // Mostramos el error
        }
        echo "Tarea actualizada satisfactoriamente"; // Mostramos el mensaje
    }else{
        echo "No se ha recibido el id de la tarea"; // Mostramos el mensaje
    }

?>