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
      $fecha = date('Y-m-d H:i:s');
       $registroasistencia = $sqlserver->executeQuery("SELECT IDentidad, Entidad from entidad");
       //return $registroasistencia;
      if ($registroasistencia) {
        $columns=["IDentidad","Entidad","fecha_creacion"];
        $columns2=["codigo","nombre","fecha_creacion"];

        foreach ($registroasistencia as $key => $value) {
            $campos_insert[] = '("'.$value["IDentidad"].'","'.$value["Entidad"].'","'.$fecha.'")';
        }

        $response = $mysql->deleteDataNoWhere("kpi_asistencia_entidad");
        $response = $mysql->deleteDataNoWhere("kpi_entidades");
        //return $response;
        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('kpi_asistencia_entidad',$columns, $campos_insert);
         $response= $mysql->insertDataMasivo('kpi_entidades',$columns2, $campos_insert);
       // }
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
