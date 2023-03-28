<?php

include_once '../db/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$cod = (isset($_POST['cod'])) ? $_POST['cod'] : '';


switch($opcion){
    case 1:
        $consulta = "SELECT *   FROM extintosH 
                            WHERE  curdate() BETWEEN STR_TO_DATE(substring(REPLACE(fechafal,'/',','), locate(' ', fechafal))  ,'%d,%m,%Y') AND 
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
    case 3:
        $consulta ="SELECT * from condolencias WHERE COD_EXTINTO = '$cod' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $consulta ="";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}
    

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;