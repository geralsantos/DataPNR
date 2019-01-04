<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_19_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
      $mes = date('n');
      /*$semestre_1 = ["Enero","Febrero","Marzo","Abril","Mayo","Junio"];
      $semestre_2 = ["Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
      $fecha1 = $mes>6? date('Y-06'):date('Y-01');
      $fecha2 = $mes>6? date('Y-12'):date('Y-06');*/
      $semestre = $mes>6 ? 2 :1 ;
      $where = array("Estado"=>array("Estado","Activo"));
      $campos = array('Todo'=>'count(*) as total_cantidad');
      $fecha = date('Y-m-d H:i:s');

      $groupby='';
      $asistencia_personal = $modelo->selectRowDataAll( 'kpi_asistencia_personal', $campos, $where, $groupby );
      if ($asistencia_personal) {
        $result = $asistencia_personal[0]["total_cantidad"];
        $campos_insert = array("total_personal"=>$result);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref19 WHERE anio = '".date('Y')."' AND semestre ='".$semestre."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;
          $campos_insert["kpi_usuario_registro"] = $fecha;
          $campos_insert["kpi_usuario_modificacion"] = $fecha;
          $campos_insert["estado"] = "0";
          $campos_insert["anio"] = date('Y');
          $campos_insert["semestre"] = $semestre;

          $response = $modelo->insertData('kpi_indicador_ref19',$campos_insert);
        }else {
            $campos_insert["fecha_modificacion"] = $fecha;

          $response = $modelo->updateDataAll('kpi_indicador_ref19',$campos_insert,array("anio"=>array('anio',date('Y',strtotime($fecha) ) ),'semestre'=>array('semestre',$semestre) ) );
        }
        return $response;
      }else{
        return false;
      }
  }
/*}*/
print_r(cargar_datos_sqlserver());


 ?>
