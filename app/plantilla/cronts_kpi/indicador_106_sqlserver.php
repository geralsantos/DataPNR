<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");



  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');

      $query= "SELECT COUNT(tick.StartTimeStamp) as cantidad, padre.name as entidad FROM kpi_sys_tickets tick INNER JOIN app_windows app ON tick.WindowID = app.WindowID INNER JOIN app_windows_padre padre ON app.app_windows_padre_id = padre.id where tick.UserID IS NOT NULL and date_format(tick.StartTimeStamp,'%Y-%m-%d') ='".$fdate."' AND tick.StartTimeStamp IS NOT NULL GROUP BY padre.id";
      $res = $modelo->executeQuery($query);
      //return $res;
      if ($res) {
        $arr = array();
        foreach ($res as $key => $value) {
          $arr[]=array("cantidad"=>($value["cantidad"]),"Entidad"=>utf8_encode($value["entidad"]));
        }
        $campos_insert = array("asistencia_entidad_json"=>json_encode($arr),"fecha"=>$fdate);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref106 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;
          $response = $modelo->insertData('kpi_indicador_ref106',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;
            $response = $modelo->updateDataAll('kpi_indicador_ref106',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate ) ) );
        }
        return $select;

      }else{
        return false;
      }
  }

print_r(cargar_datos_sqlserver());

 ?>
