<?php

    include('./database.php');  // Incluimos el archivo database.php

    if(isset($_POST['name'])){  // Si la variable name está definida
        $name = $_POST['name'];  // Recibimos el valor de la variable name
        $description = $_POST['description'];  // Recibimos el valor de la variable description
        $query = "INSERT INTO tarea(name, description) VALUES ('$name', '$description')";  // Creamos la consulta
        $result = mysqli_query($conexion, $query); // Ejecutamos la consulta
        if(!$result) { // Si no se ejecuta la consulta
            die('Error de Consulta' . mysqli_error($conexion)); // Mostramos el error
        }
        echo "Tarea agregada satisfactoriamente"; // Mostramos el mensaje

    }
?>