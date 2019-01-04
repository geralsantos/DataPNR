<?php
date_default_timezone_set('America/Lima');
$DBNAME="Queuesmart";
require_once("/var/www/html/portal-kpi/app/config.php");
include("/var/www/html/portal-kpi/app/core/sqlserver.class.php");
require_once("/var/www/html/portal-kpi/app/core/mysql.class.php");
/*
$x = new SQLServer;
$campos = array('Estado'=>'Estado','FechaInicio'=>'date_format(FechaInicio,"%Y-%m-%d") as hora');
print_r($x->executeQuery("SELECT Estado FROM Incidencia"));*/

  function cargar_datos_sqlserver(){

      $sqlserver = new SQLServer;
      $mysql = new MySQL;
      $fecha = date('Ym');
      $tickets = $sqlserver->executeQuery("SELECT tick.Prefix, tick.Correlative, tick.UserID, tick.WindowID, tick.Status, tick.Reactivado, tick.StartTimeStamp, tick.CreationTimeStamp, tick.WaitTimeStamp, tick.TicketTypeID FROM sys_Tickets_Hist tick WHERE LEFT(CONVERT(varchar, tick.Creationtimestamp,112),6)>='".$fecha."' UNION SELECT tick.Prefix, tick.Correlative, tick.UserID, tick.WindowID, tick.Status, tick.Reactivado, tick.StartTimeStamp, tick.CreationTimeStamp, tick.WaitTimeStamp, tick.TicketTypeID FROM sys_Tickets tick WHERE LEFT(CONVERT(varchar, tick.Creationtimestamp,112),6)>='".$fecha."' ORDER BY 1 DESC;");

//return $tickets;
      if ($tickets) {
        $columns=["Prefix","Correlative","UserID","WindowID","Status","Reactivado","StartTimeStamp","CreationTimeStamp","WaitTimeStamp","TicketTypeID"];
        $x = 0;
        $response = $mysql->deleteDataNoWhere("kpi_sys_tickets");
        foreach ($tickets as $key => $value) {
            $campos_insert[] = '("'.trim(utf8_encode($value["Prefix"])).'","'.$value["Correlative"].'","'.$value["UserID"].'","'.$value["WindowID"].'","'.$value["Status"].'","'.$value["Reactivado"].'","'.$value["StartTimeStamp"].'","'.$value["CreationTimeStamp"].'","'.$value["WaitTimeStamp"].'","'.$value["TicketTypeID"].'")';
            if ($x==1000) {
              
              //return $response;
              //if ($response) {
              //echo("arg1");
               $response= $mysql->insertDataMasivo('kpi_sys_tickets',$columns, $campos_insert);
               $campos_insert=[];
               $x=0;
            }
            $x++;
        }
        if ($x<=1000) {
          //$response = $mysql->deleteDataNoWhere("kpi_sys_tickets");
              //return $response;
              //if ($response) {
              //echo("arg1");
               $response= $mysql->insertDataMasivo('kpi_sys_tickets',$columns, $campos_insert);
               $campos_insert=[];
               $x=0;
        }
        //return $campos_insert;
        
         echo $response;
        //}
      return $response;

      }else{

        return false;
      }
  }
print_r(cargar_datos_sqlserver());

 ?>
