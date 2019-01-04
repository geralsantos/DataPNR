<?php
date_default_timezone_set('America/Lima');
$DBNAME="Queuesmart";
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
      $entidades = $sqlserver->executeQuery("SELECT WindowID, Name, Enabled, Available FROM app_Windows");
      //return $entidades;
      if ($entidades) {
        $columns=["WindowID","Name","Enabled","Available","app_windows_padre_id","fecha"];
        $columns2=["Name","fecha"];
        $campos_insert_padre =[];$arr_winpad=[];
        $x=0;
        foreach ($entidades as $key => $value) {
          $window_name = explode(" ",trim(utf8_encode($value["Name"])));
          $campos_insert_padre[$window_name[0]] = '("'.$window_name[0].'","'.$fecha.'")';
          if (!isset($windpad[$window_name[0]])) {
            $windpad[$window_name[0]]=++$x;
          }
        }
        foreach ($entidades as $key_entidad => $entidad) {
          $window_name = explode(" ",trim(utf8_encode($entidad["Name"])));
          $campos_insert[] = '("'.$entidad["WindowID"].'","'.trim(utf8_encode($entidad["Name"])).'","'.$entidad["Enabled"].'","'.$entidad["Available"].'","'.($windpad[$window_name[0]]).'","'.$fecha.'")';
        }
       // return $campos_insert;
        $response = $mysql->deleteDataNoWhere("app_windows");
        $response = $mysql->deleteDataNoWhere("app_windows_padre");

        //if ($response) {
        //echo("arg1");
         $response= $mysql->insertDataMasivo('app_windows',$columns, $campos_insert);
         $response= $mysql->insertDataMasivo('app_windows_padre',$columns2, $campos_insert_padre);
        //}
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
