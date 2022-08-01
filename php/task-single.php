<?php

    include('./database.php');  // Incluimos el archivo database.php

    if(isset($_POST['id'])){  // Si la variable id está definida
        $id = $_POST['id'];  // Recibimos el valor de la variable id
        $query = "SELECT * FROM tarea WHERE id = $id";  // Creamos la consulta
        $result = mysqli_query($conexion, $query); // Ejecutamos la consulta
        if(!$result) { // Si no se ejecuta la consulta
            die('Error de Consulta' . mysqli_error($conexion)); // Mostramos el error
        }
        $json = array(); // Creamos un array
        while($row = mysqli_fetch_array($result)) { // Recorremos el array
            $json[] = array( // Creamos un array asociativo
                'name' => $row['name'], // Guardamos el nombre
                'description' => $row['description'], // Guardamos la descripción
                'id' => $row['id'] // Guardamos el id
            );
        }
        $jsonstring = json_encode($json[0]); // Codificamos el array en formato JSON
        echo $jsonstring; // Mostramos el array en formato JSON
    }else{
        echo "No se ha recibido el id de la tarea"; // Mostramos el mensaje
    }

?>