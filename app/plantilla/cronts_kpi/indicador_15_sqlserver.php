<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_51_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
$fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $where = array("UserID"=>array('UserID','NOT NULL'),"Status"=>array("Status","M"),"Reactivado"=>array("Reactivado","1"),"CreationTimeStamp_"=>array('date_format(CreationTimeStamp,"%Y-%m-%d")',$fdate),"CreationTimeStamp"=>array('CreationTimeStamp','NOT NULL'));
      $campos = array('Status'=>'Status','Todo'=>'count(*) as total_cantidad');
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)');


      $usuario = $_SESSION["usuario"][0]["id"];
      $tickets_reactivados = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
      //return $tickets_reactivados;
      $where = array("UserID"=>array('UserID','NOT NULL'),"CreationTimeStamp_"=>array('date_format(CreationTimeStamp,"%Y-%m-%d")',$fdate ),"CreationTimeStamp"=>array('CreationTimeStamp','NOT NULL'));
      $campos = array('Status'=>'Status','Todo'=>'count(*) as total_cantidad');
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)');
      $tickets_totales = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
      //return $tickets_totales;
      if ($tickets_totales) {
        $arr = array();
        $personas = array();
        $acum_tot=count($tickets_totales);
        $acum_reac=count($tickets_reactivados);
        /*foreach ($tickets_totales as $key => $value) {
          $acum_tot+=$value["total_cantidad"];
        }*/
        $result = ($acum_reac/ (empty($acum_tot)?1:$acum_tot))*100;
        $response = array("ticks_react_total"=>number_format($result,2),"ticks_react"=>$acum_reac,"ticks_total"=>$acum_tot);

        $campos_insert = array("ticks_react_total"=>json_encode($response),"fecha"=>$fdate);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref15 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response = $modelo->insertData('kpi_indicador_ref15',$campos_insert);
          //return "insert";
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response = $modelo->updateDataAll('kpi_indicador_ref15',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate )));
          //return "update";
        }
        return $select;
      }else{
        return false;
      }
  }
/*}*/
print_r(cargar_datos_sqlserver());


 ?>
