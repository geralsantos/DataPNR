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
       $registroasistencia = $sqlserver->executeQuery("SELECT idregistroasistencia,PrimeraMarcacion,SegundaMarcacion,TerceraMarcacion,CuartaMarcacion,Dia,IDPersonal from asistencia.registroasistencia  where Dia='".$fecha."'");
       //return $registroasistencia;
      if ($registroasistencia) {
        $columns=["PrimeraMarcacion","SegundaMarcacion","TerceraMarcacion","CuartaMarcacion","Dia","IDPersonal"];

        foreach ($registroasistencia as $key => $value) {
            $campos_insert[] = '("'.$value["PrimeraMarcacion"].'","'.$value["SegundaMarcacion"].'","'.$value["TerceraMarcacion"].'","'.$value["CuartaMarcacion"].'","'.$value["Dia"].'","'.$value["IDPersonal"].'")';
        }

        $response = $mysql->deleteDataNoWhere("kpi_asistencia_registroasistencia");

        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('kpi_asistencia_registroasistencia',$columns, $campos_insert);
       // }
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
