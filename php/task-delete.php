<?php

    include('./database.php');  // Incluimos el archivo database.php

    if(isset($_POST['id'])){  // Si la variable id está definida
        $id = $_POST['id'];  // Recibimos el valor de la variable id
        $query = "DELETE FROM tarea WHERE id = $id";  // Creamos la consulta
        $result = mysqli_query($conexion, $query); // Ejecutamos la consulta
        if(!$result) { // Si no se ejecuta la consulta
            die('Error de Consulta' . mysqli_error($conexion)); // Mostramos el error
        }
        echo "Tarea eliminada satisfactoriamente"; // Mostramos el mensaje
    }else{
        echo "No se ha recibido el id de la tarea"; // Mostramos el mensaje
    }

?>