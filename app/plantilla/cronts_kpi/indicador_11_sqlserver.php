<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_11_sqlserver extends App{
{
*/
  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $where = array("UserID"=>array('UserID','NOT NULL'),"StartTimeStamp_"=>array('date_format(StartTimeStamp,"%Y-%m-%d")',$fdate),"StartTimeStamp"=>array('StartTimeStamp','NOT NULL'));

      $campos = array("concat"=>'concat(Prefix,"-",Correlative,"-",TicketTypeID) as concat',"precorre"=>'concat(Prefix,"-",Correlative) as precorre');
      /*$groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)');*/
       $groupby = array('Prefix'=>'concat(Prefix,"-",Correlative,"-",TicketTypeID)');
      $usuario = $_SESSION["usuario"][0]["id"];
      $res = $modelo->selectRowDataAll( 'kpi_sys_tickets', $campos, $where, $groupby );
      //return $res;
      if ($res) {
        $arr = array();
        $personas = array();

        foreach ($res as $key => $value) {
          $arr[$value["precorre"]]=isset($arr[$value["precorre"]])?($arr[$value["precorre"]]+1):1;
        }
        //return $arr;
        $arr = array_count_values($arr);
        ksort($arr);
        //return $arr;
        $rr = [];$serviciosjson=[];$acum=0;
        foreach ($arr as $key => $value) {
          $acum+=floatval($value);
        }
        //return ($arr);
        foreach ($arr as $key => $value) {
          $rr[]= array("personas"=>floatval($value),"servicios"=>$key,"personas_total"=>$acum);
        }
        $campos_insert = array("serviciosjson"=>json_encode($rr),"fecha"=>$fdate,"fecha_creacion"=>$fdate);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref11 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;
          
          $response = $modelo->insertData('kpi_indicador_ref11',$campos_insert);
          echo "insert";
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response = $modelo->updateDataAll('kpi_indicador_ref11',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate)));
          echo "update";

        }
        return $select;
      }else{
        return false;
      }
  }
/*}*/
print_r(cargar_datos_sqlserver());


 ?>
