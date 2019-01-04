<?php
date_default_timezone_set('America/Lima');
require_once("/var/www/html/portal-kpi/app/config.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/**
 *
 *//*
class indicador_9_sqlserver extends App{
{
*/
  function recursive_array_search($needle,$haystack) {
    foreach($haystack as $key=>$value) {
        $current_key=$key;
        if($needle===$value OR (is_array($value) && recursive_array_search($needle,$value) !== false)) {
            return $current_key;
        }
    }
    return false;
}
  function cargar_datos_sqlserver(){

       $modelo = new MySQL;
      $dias = array("monday","tuesday","wednesday","thursday","friday","saturday","sunday");

      $weeks = [7,14,21,28];
      $weeks_ini = ["01","07","14","21"];
      $date = date('d');
      $fecha_sql = "";
      $dia = [];
      foreach ($weeks as $key => $value) {
        if ($date<=$value || ($value==28 && $date>$value)) {
          $fecha_sql = "date_format(fecha_cita,'%Y-%m-%d') BETWEEN '".date('Y-m-'.$weeks_ini[$key])."' AND '".date('Y-m-'.$date)."' AND";
          $dia[0]=$weeks_ini[$key];
          $dia[1]=$date;
          break;
        }
      }

      $where = array("id_estado"=>array("id_estado","A"),"usuario_auditoria"=>array('usuario_auditoria','NOT NULL'),"fecha_usuario_auditoria"=>array('fecha_usuario_auditoria','NOT NULL'),"fecha_cita"=>array('fecha_cita','NOT NULL'),"fecha_usuario_auditoria"=>array("date_format(fecha_usuario_auditoria,'%Y-%m')",date('Y-m') )  );
      $campos = array('todo'=>'count(*) as total_cantidad','dia'=>"date_format(fecha_usuario_auditoria,'%Y-%m-%d') as dia");
      $groupby = array("date_format(fecha_usuario_auditoria,'%Y-%m-%d')");
      //return $where;
      $orderby = array("fecha_usuario_auditoria"=>1);
      $fecha = date('Y-m-d H:i:s');
      $usuario = $_SESSION["usuario"][0]["id"];

      $citas_entregadas = $modelo->selectRowDataAll( 'kpi_sys_citas', $campos, $where, $groupby, $orderby);
      //return $citas_entregadas;
      $where = array("fecha_cita"=>array('fecha_cita','NOT NULL'),"fecha_cita"=>array("date_format(fecha_cita,'%Y-%m')",date('Y-m') ) );
      $campos = array('todo'=>'count(*) as total_cantidad','dia'=>"date_format(fecha_cita,'%Y-%m-%d') as dia");
      $orderby = array("fecha_cita"=>1);
      $groupby = array("date_format(fecha_cita,'%Y-%m-%d')");

      $citas_programadas = $modelo->selectRowDataAll('kpi_sys_citas', $campos, $where, $groupby, $orderby);
     //return $citas_programadas;
      if ($citas_programadas) {
        $arr = array();
        $personas = array();

        foreach ($citas_programadas as $key => $value) {
         // return $key;
          $entregada="";
          foreach ($citas_entregadas as $key => $value_) {
            if ($value["dia"]==$value_["dia"]) {
              $entregada = $value_["total_cantidad"];
              break;
            }
          }
          $result = ($entregada / $value["total_cantidad"])*100;

          $campos_insert = array("tasa_atencion" => number_format($result,2),"citas_entregadas"=>$entregada,"citas_programadas"=>$value["total_cantidad"], "fecha" => $value["dia"]);
          $select = $modelo->executeQuery("SELECT * FROM kpi_indicador_ref9 WHERE date_format(fecha,'%Y-%m-%d') = '".$value["dia"]."'");
          if (!$select) {
          $campos_insert["fecha_creacion"] = $fecha;

            $response = $modelo->insertData('kpi_indicador_ref9',$campos_insert);
          }else{
            $campos_insert["fecha_modificacion"] = $fecha;

            $response = $modelo->updateDataAll('kpi_indicador_ref9',$campos_insert,array('fecha'=>array('date_format(fecha,"%Y-%m-%d")',$value["dia"]) ) );

          }
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
