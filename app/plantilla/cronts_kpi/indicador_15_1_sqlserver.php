<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_15_1_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;

      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $usuario = $_SESSION["usuario"][0]["id"];
      $where = array("UserID"=>array('UserID','NOT NULL'),"StartTimeStamp_"=>array('date_format(StartTimeStamp,"%Y-%m-%d")',$fdate),"StartTimeStamp"=>array('StartTimeStamp','NOT NULL'));
      $campos = array('Status'=>'Status','Todo'=>'count(*) as total_cantidad');
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)');
      $tickets_totales = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
     //return $tickets_totales;
      if ($tickets_totales) {
        $result = count($tickets_totales);
        $response = array("ticks_atencion_total"=>floatval($result));

        $campos_insert = array("ticks_atencion_total"=>json_encode($response),"fecha"=>$fdate);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref15_1 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response = $modelo->insertData('kpi_indicador_ref15_1',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response = $modelo->updateDataAll('kpi_indicador_ref15_1',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate)));
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
