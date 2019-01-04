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
      $entidades = $modelo->selectRowDataAll('app_windows', $campos, $where, $groupby );
      if ($entidades) {
        $columns=["WindowID","Name","Enabled","Available","fecha"];
        foreach ($entidades as $key => $value) {
            $campos_insert[] = '("'.$value["WindowID"].'","'.$value["Name"].'","'.$value["Enabled"].'","'.$value["Available"].'","'.$value["fecha"].'")';
        }
          $exist_delete = $modelo->deleteDataNoWhere("app_windows");
        if ($exist_delete) {
          $modelo->insertDataMasivo('app_windows',$columns, $campos_insert);
        }
      }else{
        return false;
      }
  }
}


 ?>
