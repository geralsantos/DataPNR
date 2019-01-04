<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_17_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m');
      $where = array("UserID"=>array('UserID','NOT NULL'),"CreationTimeStamp_"=>array('date_format(CreationTimeStamp,"%Y-%m")',$fdate),"CreationTimeStamp"=>array('CreationTimeStamp','NOT NULL'));
      $campos = array('Todo'=>'count(*) as total_cantidad');
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)','CreationTimeStamp'=>'date_format(CreationTimeStamp,"%Y-%m-%d")');
      $tickets_totales = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
      //return $tickets_totales;
      if ($tickets_totales) {
        $result = count($tickets_totales);
        $campos_insert = array("cantidad_tickets"=>$result);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref17 WHERE anio = '".date('Y')."' AND mes ='".date('m')."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;
          $campos_insert["estado"] = "0";
          $campos_insert["kpi_usuario_registro"] = "1";
          $campos_insert["kpi_usuario_modificacion"] = "1";
          $campos_insert["anio"] = date('Y',strtotime($fecha));
          $campos_insert["mes"] = date('m',strtotime($fecha));

          $response = $modelo->insertData('kpi_indicador_ref17',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;
          $response = $modelo->updateDataAll('kpi_indicador_ref17',$campos_insert,array("anio"=>array('anio',date('Y',strtotime($fecha))),"mes"=>array('mes',date('m',strtotime($fecha))) ) );

        }
        return $response;
      }else{
        return false;
      }
  }
/*}*/
print_r(cargar_datos_sqlserver());


 ?>
