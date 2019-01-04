<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_5_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;

      $where=array("Estado"=>array("Estado","C"),"FechaInicio"=>array('date_format(FechaInicio,"%Y-%m")',date('Y-m')),"FechaInicio"=>array('FechaInicio','NOT NULL'),"HoraFin"=>array('HoraFin','<=','14:01'));
      $campos = array('Todo'=>'count(*) as total_cantidad');
      $groupby = '';
      $fecha = date('Y-m-d H:i:s');
      //$usuario = $_SESSION["usuario"][0]["id"];
      $incidentes_resueltos_turno1 = $modelo->selectRowDataAll( 'kpi_sys_incidencias', $campos, $where, $groupby );

      $where=array("Estado"=>array("Estado","C"),"FechaInicio"=>array('date_format(FechaInicio,"%Y-%m")',date('Y-m')),"FechaInicio"=>array('FechaInicio','NOT NULL'),"HoraFin"=>array('HoraFin','>=','14:00'));
      $campos = array('Todo'=>'count(*) as total_cantidad');
      $incidentes_resueltos_turno2 = $modelo->selectRowDataAll( 'kpi_sys_incidencias', $campos, $where, $groupby );
//return $incidentes_resueltos_turno1;
      $where = array("Estado"=>array("Estado","NOT NULL"),"FechaInicio"=>array('date_format(FechaInicio,"%Y-%m")',date('Y-m')),"FechaInicio"=>array('FechaInicio','NOT NULL'),"HoraInicio"=>array('HoraInicio','<=','13:59'));
      $campos = array('Todo'=>'count(*) as total_cantidad');
      $incidentes_identificados_turno1 = $modelo->selectRowDataAll( 'kpi_sys_incidencias', $campos, $where, $groupby );

      $where = array("Estado"=>array("Estado","NOT NULL"),"FechaInicio"=>array('date_format(FechaInicio,"%Y-%m")',date('Y-m')),"FechaInicio"=>array('FechaInicio','NOT NULL'),"HoraInicio"=>array('HoraInicio','>=','14:00'));
      $campos = array('Todo'=>'count(*) as total_cantidad');
      $incidentes_identificados_turno2 = $modelo->selectRowDataAll( 'kpi_sys_incidencias', $campos, $where, $groupby );

      if ($incidentes_identificados_turno1) {
        $arr = array();
        $result_turno1 = $incidentes_resueltos_turno1[0]["total_cantidad"] / (empty($incidentes_identificados_turno1[0]["total_cantidad"])?1:$incidentes_identificados_turno1[0]["total_cantidad"]);
        $result_turno2 = $incidentes_resueltos_turno2[0]["total_cantidad"] / (empty($incidentes_identificados_turno2[0]["total_cantidad"])?1:$incidentes_identificados_turno2[0]["total_cantidad"]);
        $incidentes_r = ($incidentes_resueltos_turno1[0]["total_cantidad"]);
        $incidentes_i = ($incidentes_identificados_turno1[0]["total_cantidad"]);
        $incidentes_r_turno2 = ($incidentes_resueltos_turno2[0]["total_cantidad"]);
        $incidentes_i_turno2 = ($incidentes_identificados_turno2[0]["total_cantidad"]);
        $incidentes_p = ($incidentes_r/(empty($incidentes_i)?1:$incidentes_i));

        $campos_insert = array("incidentes_resueltos"=>$incidentes_r,"incidentes_identificados"=>$incidentes_i,"incidentes_resueltos_t2"=>$incidentes_r_turno2,"incidentes_identificados_t2"=>$incidentes_i_turno2,"incidentes_porcentaje"=>$incidentes_p,"turno_1"=>($result_turno1),"turno_2"=>($result_turno2),"anio"=>date('Y'),"mes"=>date('m'));

        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref5 WHERE anio = '".date('Y')."' AND mes='".date('m')."'");
      //  return !$select;
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response = $modelo->insertData('kpi_indicador_ref5',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response = $modelo->updateDataAll('kpi_indicador_ref5',$campos_insert,array('anio'=>array('anio',date('Y')),'mes'=>array('mes',date('m') ) ) );
        }
        return $select;
        //echo json_encode(array("atributos"=>$response)) ;
      }else{
        return false;
      }
  }
/*}*/
print_r(cargar_datos_sqlserver());


 ?>
