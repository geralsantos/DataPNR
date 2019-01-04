<?php
date_default_timezone_set('America/Lima');
$DBNAME="asistencia";
require_once("/var/www/html/portal-kpi/app/config.php");
include("/var/www/html/portal-kpi/app/core/sqlserver.class.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/*
$x = new SQLServer;
$campos = array('Estado'=>'Estado','FechaInicio'=>'date_format(FechaInicio,"%Y-%m-%d") as hora');
print_r($x->executeQuery("SELECT Estado FROM Incidencia"));*/

  function cargar_datos_sqlserver(){
    
      $sqlserver = new SQLServer;
      $mysql = new MySQL;
      $fecha = date('Y-m-d');
      $personal = $sqlserver->executeQuery("SELECT idPersonal,NombrePersonal,DNIPersonal,FotoPersonal,Estado,FechaIncorporacion,IDEntidad FROM asistencia.personal");
      if ($personal) {
        $columns=["idPersonal","NombrePersonal","DNIPersonal","FotoPersonal","Estado","FechaIncorporacion","IDEntidad"];

        foreach ($personal as $key => $value) {
            $campos_insert[] = '("'.$value["idPersonal"].'","'.utf8_encode($value["NombrePersonal"]).'","'.$value["DNIPersonal"].'","'.utf8_encode($value["FotoPersonal"]).'","'.$value["Estado"].'","'.$value["FechaIncorporacion"].'","'.$value["IDEntidad"].'")';
        }

        $response = $mysql->deleteDataNoWhere("kpi_asistencia_personal");

        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('kpi_asistencia_personal',$columns, $campos_insert);
       // }
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
