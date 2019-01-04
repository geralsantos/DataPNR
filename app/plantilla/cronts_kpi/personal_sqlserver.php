<?php
date_default_timezone_set('America/Lima');

/**
 *
 */
class entidades_sqlserver extends App{
{

  public function cargar_datos_sqlserver(){

      $modelo = new modeloPortada();

      $where = array();
      $campos = array('Todo'=>'*');
      $groupby = '';
      $fecha = date('Y-m-d H:i:s');
      $usuario = $_SESSION["usuario"][0]["id"];
      $personal = $modelo->selectRowDataAll('kpi_asistencia_personal', $campos, $where, $groupby );
      if ($personal) {
        $columns=["NombrePersonal","DNIPersonal","FotoPersonal","Estado","FechaIncorporacion","IDEntidad"];
        foreach ($personal as $key => $value) {
            $campos_insert[] = '("'.utf8_encode($value["NombrePersonal"]).'","'.$value["DNIPersonal"].'","'.$value["FotoPersonal"].'","'.$value["Estado"].'","'.$value["FechaIncorporacion"].'","'.$value["IDEntidad"].'")';
        }
          $exist_delete = $modelo->deleteDataNoWhere("kpi_asistencia_personal");
        if ($exist_delete) {
          $modelo->insertDataMasivo('kpi_asistencia_personal',$columns, $campos_insert);
        }
      }else{
        return false;
      }
  }
}


 ?>
