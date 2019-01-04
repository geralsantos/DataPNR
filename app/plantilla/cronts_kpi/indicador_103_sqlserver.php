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

      //$where = array("UserID"=>array('UserID','NOT NULL'),"WaitTimeStamp_"=>array('date_format(WaitTimeStamp,"%Y-%m-%d")',date('Y-m-d')),"WaitTimeStamp"=>array('WaitTimeStamp','NOT NULL'));
      //$campos = array('WindowID'=>'WindowID','Promedio' => 'AVG((date_format(WaitTimeStamp,"%i")-date_format(CreationTimeStamp,"%i"))) as promedio');
      //$groupby = array('WindowID'=>'WindowID');
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $usuario = $_SESSION["usuario"][0]["id"];
      $groupby = array('ticket_servicio'=>'concat(Prefix,"-",Correlative)');

      $query = 'SELECT AVG(TIMESTAMPDIFF(MINUTE,tick.CreationTimeStamp,tick.WaitTimeStamp)) as promedio FROM kpi_sys_tickets tick WHERE UserID IS NOT NULL AND date_format(tick.WaitTimeStamp,"%Y-%m-%d") = "'.$fdate.'" AND WaitTimeStamp IS NOT NULL GROUP BY concat(tick.Prefix,"-",tick.Correlative)';
      $tiempo_espera = $modelo->executeQuery($query);
    $nro_asesores = $modelo->executeQuery("SELECT count(*) as cantidad  FROM kpi_asistencia_registroasistencia reg left join kpi_asistencia_personal per on(reg.IdPersonal=per.idPersonal) left join kpi_asistencia_entidad ent on (per.IDEntidad=ent.IDentidad) WHERE ent.IDentidad<>9 AND reg.PrimeraMarcacion IS NOT NULL OR reg.PrimeraMarcacion <>'' group by per.idPersonal");
     
    $nro_personas_asisten_mac = $modelo->executeQuery("SELECT count(*) as cantidad FROM kpi_sys_tickets WHERE CreationTimeStamp IS NOT NULL AND date_format(CreationTimeStamp,'%Y-%m-%d')='".$fdate."' group by concat(Prefix,'-',Correlative)");
   // return $nro_asesores;
      if ($tiempo_espera || $nro_asesores || $nro_personas_asisten_mac) {
        $arr = array();
        $personas = array();
        $acum_mac = count($nro_personas_asisten_mac);
        $acum_na = count($nro_asesores);
        $acum_te=0;
        foreach ($tiempo_espera as $key => $value) {
          $acum_te+=floatval($value["promedio"]);
        }
        /*foreach ($nro_asesores as $key => $value) {
          $acum_na+=floatval($value["cantidad"]);
        }*/
        $acum_te = round(($acum_te/(count($tiempo_espera)==0?1:count($tiempo_espera))),2);
        //$acum_na = round(($acum_na/(count($nro_asesores)==0?1:count($nro_asesores))),2);
        //echo  $acum_te;

        $campos_insert = array("tiempo_espera"=>$acum_te,"numero_asesores"=>$acum_na,"numero_personas_asisten_MAC"=>$acum_mac,"fecha"=>$fecha);

        $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref103 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."'");
        if(!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

          $response = $modelo->insertData('kpi_indicador_ref103',$campos_insert);
        }else{
            $campos_insert["fecha_modificacion"] = $fecha;
          $response = $modelo->updateDataAll('kpi_indicador_ref103',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate)));
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
