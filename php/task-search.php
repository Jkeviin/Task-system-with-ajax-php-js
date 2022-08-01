<?php

    include('database.php');  // Incluimos el archivo database.php

    $search = $_POST['search'];  // Recibimos el valor de la variable search

    if(!empty($search)) {  // Si la variable search no está vacía
        $query = "SELECT * FROM tarea WHERE name LIKE '$search%'";  // Creamos la consulta ($search% para que busque por el principio de la palabra)
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
        $jsonstring = json_encode($json); // Codificamos el array en formato JSON
        echo $jsonstring; // Mostramos el array en formato JSON
    }

?>