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
       $registroasistencia = $sqlserver->executeQuery("SELECT idHorario, idPersonal, HorarioIngreso, HorarioSalida, Dia from Horarios");
      if ($registroasistencia) {
        $columns=["idPersonal","HorarioIngreso","HorarioSalida","Dia"];

        foreach ($registroasistencia as $key => $value) {
            $campos_insert[] = '("'.$value["idPersonal"].'","'.$value["HorarioIngreso"].'","'.$value["HorarioSalida"].'","'.$value["Dia"].'")';
        }

        $response = $mysql->deleteDataNoWhere("kpi_asistencia_Horarios");

        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('kpi_asistencia_Horarios',$columns, $campos_insert);
       // }
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
