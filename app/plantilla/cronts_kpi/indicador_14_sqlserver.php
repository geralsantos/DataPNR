<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_14_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');

      //$where = array("UserID"=>array('UserID','NOT NULL'),"Status"=>array("Status","OR","M","P"),"CreationTimeStamp_"=>array('date_format(CreationTimeStamp,"%Y-%m-%d")',$fdate),"CreationTimeStamp"=>array('CreationTimeStamp','NOT NULL'));
      $where = array("UserID"=>array('UserID','NOT NULL'),"Status"=>array("Status","OR","M","P"));
      $campos = array('Status'=>'Status','Todo'=>'count(*) as total_cantidad');
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)');
      $usuario = $_SESSION["usuario"][0]["id"];
      $tickets_abandonados = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
      //return $tickets_abandonados;
      $where = array("UserID"=>array('UserID','NOT NULL'),"Status"=>array("Status","C"),"CreationTimeStamp_"=>array('date_format(CreationTimeStamp,"%Y-%m-%d")',$fdate),"CreationTimeStamp"=>array("CreationTimeStamp","NOT NULL"));
      $campos = array('Status'=>'Status','Todo'=>'count(*) as total_cantidad');

      $tickets_totales = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
      //return $tickets_totales;
      if ($tickets_totales) {
        $arr = array();
        $personas = array();
        $acum_tot=count($tickets_totales);
        $acum_aband=count($tickets_abandonados);
        $result = ($acum_aband / $acum_tot)*100;
        $response = array("ticks_aband_total"=>number_format($result,2),"ticks_aband"=>$acum_aband,"ticks_total"=>$acum_tot );

        $campos_insert = array("ticks_aband_total"=>json_encode($response),"fecha"=>$fecha);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref14 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response=$modelo->insertData('kpi_indicador_ref14',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response=$modelo->updateDataAll('kpi_indicador_ref14',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate)));
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
