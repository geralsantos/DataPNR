<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_11_1_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      //$modelo = new modeloPortada();
      $modelo = new MySQL;

      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $where = array("StartTimeStamp_"=>array('date_format(StartTimeStamp,"%Y-%m-%d")',date('Y-m-d')),"StartTimeStamp"=>array("StartTimeStamp","NOT NULL"));
      $campos = array('todo'=>'count(*) as servicios','Prefix'=>'Prefix','StartTimeStamp'=>'date_format(StartTimeStamp,"%H") as hora');
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)','CreationTimeStamp'=>'date_format(CreationTimeStamp,"%Y-%m-%d")');
      $orderby = array("date_format(CreationTimeStamp,'%Y-%m-%d %H') asc");
      //$usuario = $_SESSION["usuario"][0]["id"];
      $res = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby,$orderby );
      //return $res;
      if ($res) {
        $arr = array();
        $personas = array();
        $i = 0;$x=0;$count = array();

        foreach ($res as $key => $value) {
          $count[$value["hora"]] = isset($count[$value["hora"]])? ($count[$value["hora"]]+1):1;
        }
        ksort($count);
        $rr = [];
        foreach ($count as $key_ => $value) {
          $rr[]= array("tickets"=>floatval($value),"hora"=>$key_);
        }

        $campos_insert = array("ticketsjson"=>json_encode($rr),"fecha"=>$fecha);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref11_1 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response=$modelo->insertData('kpi_indicador_ref11_1',$campos_insert);
          return "insert";
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response=$modelo->updateDataAll('kpi_indicador_ref11_1',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate ) ) );
          return "update";
        }

        //echo json_encode(array("atributos"=>$rr)) ;
        //echo json_encode(array("atributos"=>$arr)) ;
        return $select;
      }else{
        return false;
      }
  }
/*}
*/
print_r(cargar_datos_sqlserver());
 ?>
