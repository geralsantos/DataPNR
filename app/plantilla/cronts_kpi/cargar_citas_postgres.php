<?php
date_default_timezone_set('America/Lima');
$DBNAME="citas";
require_once("/var/www/html/portal-kpi/app/config.php");
include("/var/www/html/portal-kpi/app/core/postgres.class.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/*
$x = new SQLServer;
$campos = array('Estado'=>'Estado','FechaInicio'=>'date_format(FechaInicio,"%Y-%m-%d") as hora');
print_r($x->executeQuery("SELECT Estado FROM Incidencia"));*/

  function cargar_datos_postgres(){

      $postgres = new Postgres;
      $mysql = new MySQL;
      $fecha = date('Y-m-d');
      $weeks = [7,14,21,28];
      $weeks_ini = ["01","07","14","21"];
      $date = date('d');
      $fecha_sql = "";
      foreach ($weeks as $key => $value) {
        if ($date<=$value || ($value==28 && $date>$value)) {
          $fecha_sql = "to_char(fecha_registro,'YYYY-mm-dd') BETWEEN '".date('Y-m-'.$weeks_ini[$key])."' AND '".date('Y-m-'.$date)."' AND";
          break;
        }
      }
      //return $fecha_sql;
      $citas = $postgres->executeQuery("SELECT id_estado, fecha_cita, usuario_auditoria, fecha_usuario_auditoria FROM citas where id_sede=5 and to_char(fecha_cita,'YYYY-mm')='".date("Y-m")."';");
      //return $citas;
      if ($citas) {
        $columns=["id_estado","fecha_cita","usuario_auditoria","fecha_usuario_auditoria"];

        foreach ($citas as $key => $value) {
            $campos_insert[] = '("'.$value["id_estado"].'","'.$value["fecha_cita"].'","'.$value["usuario_auditoria"].'","'.$value["fecha_usuario_auditoria"].'")';
        }

        $response = $mysql->deleteDataNoWhere("kpi_sys_citas");

        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('kpi_sys_citas',$columns, $campos_insert);
       // }
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_postgres());

 ?>
