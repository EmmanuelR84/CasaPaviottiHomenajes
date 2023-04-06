<?php

include_once '../db/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

//date_default_timezone_set('America/Argentina/Cordoba'); 
//$fechaNow = date("Y-m-d H:i:s");
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';


switch($opcion){
    case 1:
        $consulta = "SELECT *   FROM extintos
                    WHERE  (sala LIKE 'Sala DALI%' or sala='Sala VAN GOGH'   or sala='Sala PICASSO') AND
                        curdate() BETWEEN STR_TO_DATE(substring(REPLACE(fechafal,'/',','), locate(' ', fechafal))  ,'%d,%m,%Y') 
                    AND 
                        STR_TO_DATE(substring(REPLACE(fechasep,'/',','), locate(' ', fechasep))  ,'%d,%m,%Y')	
                    ORDER BY COD_EXTINTO";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;

    case 2:
        $consulta = "SELECT * FROM `extintos` ORDER BY `COD_EXTINTO` DESC LIMIT 3";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:///////////CUENTA CANTIDAD DE INHUMADOS ACTIVOS
        $consulta ="SELECT COUNT(COD_EXTINTO) AS CONTEO   FROM extintos
                    WHERE  (sala LIKE 'Sala DALI%' or sala='Sala VAN GOGH'   or sala='Sala PICASSO') AND
                                curdate() BETWEEN STR_TO_DATE(substring(REPLACE(fechafal,'/',','), locate(' ', fechafal))  ,'%d,%m,%Y') 
                    AND 
                                STR_TO_DATE(substring(REPLACE(fechasep,'/',','), locate(' ', fechasep))  ,'%d,%m,%Y')	
                    ORDER BY COD_EXTINTO";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta ="SELECT COUNT(COD_EXTINTO) AS CANTCOMENTARIO FROM `condolencias` WHERE COD_EXTINTO  = '$codigo' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta ="SELECT * FROM `condolencias` WHERE `COD_EXTINTO` = '$codigo' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
    

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;