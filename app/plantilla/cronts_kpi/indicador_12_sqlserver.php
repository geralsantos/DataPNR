<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_12_sqlserver extends App{
{*/

  function cargar_datos_sqlserver(){

      $modelo = new MySQL;
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $where = array("UserID"=>array('UserID','NOT NULL'),"WaitTimeStamp_"=>array('date_format(WaitTimeStamp,"%Y-%m-%d")',$fdate),"WaitTimeStamp"=>array('WaitTimeStamp','NOT NULL'));
      $campos = array('WindowID'=>'WindowID','Promedio' => 'AVG((date_format(WaitTimeStamp,"%i")-date_format(CreationTimeStamp,"%i"))) as promedio');
      $groupby = array('WindowID'=>'WindowID');
      $usuario = $_SESSION["usuario"][0]["id"];
      $query = 'SELECT tick.WindowID,AVG(TIMESTAMPDIFF(MINUTE,tick.CreationTimeStamp,tick.WaitTimeStamp)) as promedio,app.Name FROM kpi_sys_tickets tick LEFT JOIN app_windows app on (tick.WindowID=app.WindowID) WHERE UserID IS NOT NULL AND date_format(tick.WaitTimeStamp,"%Y-%m-%d") = "'.$fdate.'" AND WaitTimeStamp IS NOT NULL GROUP BY tick.WindowID';
      $res = $modelo->executeQuery($query);
      if ($res) {
        $arr = array();
        $personas = array();
        foreach ($res as $key => $value) {
          $arr[]=array("promedio"=>($value["promedio"]),"WindowID"=>$value["WindowID"],"Entidad"=>utf8_encode($value["Name"]));
        }
        $campos_insert = array("prom_enti_json"=>json_encode($arr),"fecha"=>$fecha);
        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref12 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response = $modelo->insertData('kpi_indicador_ref12',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;

          $response = $modelo->updateDataAll('kpi_indicador_ref12',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate ) ) );
        }
        return $select;
        //echo json_encode(array("atributos"=>$arr)) ;
      }else{
        return false;
      }
  }
/*}*/
print_r(cargar_datos_sqlserver());

 ?>
