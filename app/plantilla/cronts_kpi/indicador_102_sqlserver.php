<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_12_sqlserver extends App{
{*/
  function array_datechecknotempty($array){
    $count = 0;
    foreach ($array as $key => $value) {
        $value = trim($value);
        if (!empty($value) && $value != "00:00:00")
            $count++;
    }
    return $count;
  }
  function cargar_datos_sqlserver(){

      $modelo = new MySQL;

      
      $fecha = date('Y-m-d H:i:s');
      $fdate = date('Y-m-d');
      $usuario = $_SESSION["usuario"][0]["id"];
      $query= 'SELECT group_concat(reg.PrimeraMarcacion) as marca1, group_concat(reg.segundaMarcacion) as marca2,reg.PrimeraMarcacion as turno_1, reg.SegundaMarcacion as turno_2, per.idPersonal, ent.IDentidad, ent.Entidad FROM kpi_asistencia_registroasistencia reg LEFT JOIN kpi_asistencia_personal per on (reg.IdPersonal=per.idPersonal) left JOIN kpi_asistencia_entidad ent on (per.IDEntidad=ent.IDentidad) WHERE date_format(reg.Dia,"%Y-%m-%d") = "'.$fdate.'" group by ent.IDentidad';
      $res = $modelo->executeQuery($query);
      //return $res;
      if ($res) {
        $arr = array();
        $personas = array();
        foreach ($res as $key => $value) {
          $campos_insert = array("identidad"=>$value["IDentidad"],"entidad"=>utf8_encode($value["Entidad"]),"turno_1"=>array_datechecknotempty(explode(",", $value["marca1"])),"turno_2"=>array_datechecknotempty(explode(",", $value["marca2"])),"fecha"=>$fdate);
          $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref102 WHERE date_format(fecha,'%Y-%m-%d') = '".$fdate."' AND identidad='".$value["IDentidad"]."'");
          if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

            $response = $modelo->insertData('kpi_indicador_ref102',$campos_insert);
          }else{
            $campos_insert["fecha_modificacion"] = $fecha;

            $response = $modelo->updateDataAll('kpi_indicador_ref102',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$fdate),'identidad'=>array("identidad",$value["IDentidad"])));
          }
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
