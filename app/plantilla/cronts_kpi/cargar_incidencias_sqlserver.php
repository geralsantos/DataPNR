<?php
date_default_timezone_set('America/Lima');
$DBNAME="Incidencias";
require_once("/var/www/html/portal-kpi/app/core/sqlserver.class.php");
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/*
$x = new SQLServer;
$campos = array('Estado'=>'Estado','FechaInicio'=>'date_format(FechaInicio,"%Y-%m-%d") as hora');
print_r($x->executeQuery("SELECT Estado FROM Incidencia"));*/

  function cargar_datos_sqlserver(){

      $sqlserver = new SQLServer;
      $mysql = new MySQL;
      $fecha = date('Y-m');
      $incidencias = $sqlserver->executeQuery("SELECT Estado,FechaInicio,HoraInicio,FechaFin,HoraFin,FechaInicioAtencion,HoraInicioAtencion,LogHistoricoCierre FROM Incidencia WHERE LEFT(CONVERT(varchar, FechaInicio,112),6) = '".date('Ym')."'");
     //return $incidencias;
      if ($incidencias) {
        $columns=["Estado","FechaInicio","HoraInicio","FechaFin","HoraFin","FechaInicioAtencion","HoraInicioAtencion","LogHistoricoCierre"];
        foreach ($incidencias as $key => $value) {
            $campos_insert[] = '("'.$value["Estado"].'","'.$value["FechaInicio"].'","'.$value["HoraInicio"].'","'.$value["FechaFin"].'","'.$value["HoraFin"].'","'.$value["FechaInicioAtencion"].'","'.$value["HoraInicioAtencion"].'","'.$value["LogHistoricoCierre"].'")';
        }
        $response = $mysql->deleteDataNoWhere("kpi_sys_incidencias");

        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('kpi_sys_incidencias',$columns, $campos_insert);
       // }
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
