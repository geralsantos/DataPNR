<?php
date_default_timezone_set('America/Lima');
set_error_handler('exceptions_error_handler');

	function exceptions_error_handler($severity, $message, $filename, $lineno) {
		if (error_reporting() == 0) {
		//return;
		}
		if (error_reporting() & $severity) {
		//throw new Exception($message, 0, $severity, $filename, $lineno);
		}
	}
class portada extends App{
    public function index(){
      if(!isset($_SESSION["usuario"])){
          $this->vista->reenviar("index", "acceso");
      }
      $this->vista->setTitle("Inicio");
    }
    public function cerrar(){
      unset($_SESSION);
      session_destroy();
      $this->vista->reenviar("index");
    }
    public function list_modulos()
    {
      $modelo = new modeloPortada();
      //$nivel = $_SESSION["usuario"][0]["kpi_roles_id"];
      //$bd = isset($_SESSION["usuario"][0]["database_name"]) ? $_SESSION["usuario"][0]["database_name"] : 'portal-kpi' ;
      $usuario = "SELECT kpi_roles_id FROM kpi_usuarios WHERE id=".$_SESSION['usuario'][0]['id']." and estado = 1 limit 1";
      $usuario = $modelo->executeQuery( $usuario );
      $_SESSION["nivelusuario"] = $usuario[0]['kpi_roles_id'];
      $modulos = "SELECT * FROM kpi_modulos WHERE estado = 1";
      $modulos = $modelo->executeQuery( $modulos );
      $tree = $this->buildTree($modulos);
      $treeHtml = $this->buildTreeHtml($tree);
      print_r($treeHtml);
    }
    public function buildTree($elements, $parentId = 0) {
      $branch = array();
      foreach ($elements as $element) {
          if ($element['parent_id'] == $parentId) {
              $children = $this->buildTree($elements, $element['id']);
              if ($children) {
                  $element['children'] = $children;
              }
              $branch[] = $element;
          }
      }
      return $branch;
  }
  public function buildTreeHtml($elements,$opt="")
  {
    $branch = array();
    $li = '';
    foreach ($elements as $element)
    {
      if (in_array($_SESSION["nivelusuario"],(explode(',',$element["niveles"])))) {
        $li = $li  . (isset($element['children']) ? ('
                      <li class="menu-item-has-children dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">
                            <i class="menu-icon ' . $element["icon"] . '"></i>' . $element['nombre'] .'
                          </a>
                          <ul class="sub-menu children dropdown-menu">
                          '. $this->buildTreeHtml($element['children'],'childs').'
                          </ul>
                          </li>
                        ') :
                          ( in_array($_SESSION["nivelusuario"],(explode(',',$element["niveles"]))) ? ('<li data-url="'.$element['url'].'">
                            <i class="'.$element["icon"].'"></i>
                            <a style="font-size:1em;" href="#'.$element['url'].'" class="menu_direct"> '.$element['nombre'].'</a>
                          </li>') : '' ) ) ;
      }


    }
    return $li;
  }
    public function enviar(){
        $this->vista->reenviar("index", "portal");
    }

    public function cargar_datos(){

      if( $_POST['tabla'] && $_POST['where'] ){

        $_POST['where']["estado"] = 1;
        $modelo = new modeloPortada();
        $res = $modelo->selectData( $_POST['tabla'], $_POST['where'] );
        if ($res) {
          echo json_encode(array( "atributos"=>$res )) ;
        }else{
          return false;
        }
      }else{
        return false;
      }

    } 
     
    /*public function cargar_datos_sqlserver(){

        $modelo = new modeloPortada();
        $mes = date('n');

        $semestre = $mes>6 ? 2 :1 ;
        $where = array("Estado"=>array("Estado","Activo"));
        $campos = array('Todo'=>'count(*) as total_cantidad');
        $fecha = date('Y-m-d H:i:s');

        $groupby='';
        $tickets_totales = $modelo->selectRowDataAll( 'kpi_asistencia_personal', $campos, $where, $groupby );
        if ($tickets_totales) {
          $result = $tickets_totales[0]["total_cantidad"];
          $campos_insert = array("total_personal"=>$result,"fecha_modificacion"=>$fecha);
          $modelo->updateDataAll('kpi_indicador_ref19',$campos_insert,array("anio"=>array('anio',date('Y',strtotime($fecha) ) ),'semestre'=>array('semestre',$semestre) ) );
        }else{
          return false;
        }
    }*/
    public function cargar_excel(){
      if ($_SESSION["usuario"][0]["kpi_roles_id"] == '2') {
        $modelo = new modeloPortada();
      $res = json_decode(archivoExcel(),true);$response=true;
      if ($res["Error"]=="") {
        $anio = ($_POST["anio"]);
        $mes = ($_POST["mes"]);
        $exist_delete = $modelo->deleteData("kpi_indicador_ref104",array("anio"=>$anio,"mes"=>$mes));
        $Cabeceras = ["llamadas_accesadas_ivr","llamadas_recibidas","llamadas_atendidas","llamadas_atendidas_seg","llamadas_abandonadas","nivel_servicio","nivel_atencion","TMO","tiempo_total_ivr"];
        $x=0;
        $fecha = date('Y-m-d H:i:s');
        $usuario = $_SESSION["usuario"][0]["id"];
        $campos_auditoria = array("dia"=>"dia","anio"=>$anio,"mes"=>$mes,"fecha_creacion"=>$fecha,"fecha_modificacion"=>$fecha,"kpi_usuario_registro"=>$usuario,"kpi_usuario_modificacion"=>$usuario);
        $data = $res["Success"];
        $values=[];$Cabeceras_new=[];$values_excel=[];
        foreach ($data as $key_row => $row) {
          $campos_insert=[];$campos_insert_data=[];
          foreach ($row as $key_column => $column) {
            if ($Cabeceras[$key_column]=="nivel_servicio" || $Cabeceras[$key_column]=="nivel_atencion") {
              $column[1] = $column[1] * 100;
            }
            if ($key_row==0) {
              $Cabeceras_new[] = $Cabeceras[$key_column];
            }

            $campos_insert[]=round($column[1],1);
            $campos_insert_data[]=round($column[1],1);
            if ((count($row)-1)==$key_column) {
              foreach ($campos_auditoria as $key => $value) {
                if ($value=="dia") {
                  $value =$key_row+1;
                }
                $campos_insert[] ='"'.$value.'"';
                $campos_insert_data[] =$value;
              }
            }

          }
          if ($key_row==0) {
            foreach (array_keys($campos_auditoria) as $key => $value) {
              $Cabeceras_new[] = $value;
            }
          }
          $values_excel[]=$campos_insert_data;
          $values[]='('.implode(',',$campos_insert).')';
        }
        //campos de auditoria
        $insert = $modelo->insertDataMasivo("kpi_indicador_ref104",$Cabeceras_new,$values);
        if (!$insert) {
          $response = false;
        }else{
          $response = true;
        }
        //$campos_insert = array("llamadas_recibidas"=>$response,"fecha"=>$fecha,"fecha_creacion"=>$fecha);

      }else{
        $response=false;
      }

      echo json_encode(array("resultado"=>$response));
      }else{
        echo json_encode(array("resultado"=>false, "mensaje"=>"No posee permisos para cargar este excel" ));
      }

    }
     
    
public function borrar_registro(){
	$modelo = new modeloPortada();
	if( $_POST['tabla'] && $_POST['where'] ){
	$res = $modelo->deleteData( $_POST['tabla'], $_POST['where']);
		if ($res) {
		echo json_encode(array("resultado"=>true )) ;
		}else{
		return false;
		}
	}
}
 public function is_array_($array){
	try {
		foreach (array_keys($array) as $value) {
			if (!is_numeric($value)) {
				return false;
			}
		}
		return true;
	} catch (\Throwable $th) {
		return false;
	}
 }
 	
 	public function cargar_archivo(){
		
		$upload_folder  = APP."/cargas/";
		$destino_folder  = APP."/cargasleidos/";
		/*$handle = fopen($upload_folder, "r");
		$contents = fread($handle, filesize($upload_folder));*/

		$directorio = opendir($upload_folder); //ruta actual
		while ($archivo = readdir($directorio)) //obtenemos un archivo y luego otro sucesivamente
		{
			if (!is_dir($archivo))//verificamos si es o no un directorio
			{
				
				$nombre_archivo = basename($archivo);
				//$tipo_archivo   = $_FILES['archivo']['type'];
				//$tamano_archivo = $_FILES['archivo']['size'];
				//$tmp_archivo    = $_FILES['archivo']['tmp_name'];
				//$extension		= pathinfo($nombre_archivo, PATHINFO_EXTENSION);
				//echo "[".$archivo . "]<br />"; //de ser un directorio lo envolvemos entre corchetes
			
				/*$handle = fopen("/home/rasmus/file.gif", "wb");
				$handle = fopen("http://www.example.com/", "r");
				$handle = fopen("ftp://user:password@example.com/somefile.txt", "w");*/
				/*$nombre_archivo = $_FILES['archivo']['name'];
				$tipo_archivo   = $_FILES['archivo']['type'];
				$tamano_archivo = $_FILES['archivo']['size'];
				$tmp_archivo    = $_FILES['archivo']['tmp_name'];
				$extension		= pathinfo($nombre_archivo, PATHINFO_EXTENSION);*/
				$result=[];
					//$fichero_subido = $upload_folder . basename($nombre_archivo);
				
				//if (move_uploaded_file($tmp_archivo, $fichero_subido)) 
				if ($handle = fopen(($upload_folder.$archivo), "r")) 
				{
					//echo "subido";

					//$contents = fread($handle, filesize($upload_folder.$archivo));
					//print_r($contents);
					$modelo = new modeloPortada();
					while (($line = fgets($handle)) !== false) {
						if (strpos($line, ("xml version"))===false && strpos($line, ("BatchFeed"))===false) 
						{
							$ForPnrHandling = json_decode(json_encode(simplexml_load_string($line)), 1);
							//foreach ($ForPnrHandling as $key => $pnrs) 
							//{
								

								$pnrs = $ForPnrHandling["activePNRimage"];
								$data_pnr = $pnrs["pnrHeader"];
								$dataElementsIndiv = $pnrs["dataElementsMaster"]["dataElementsIndiv"];
								$dataElementsStruct = $pnrs["dataElementsMaster"]["dataElementsStruct"];
								
								$itinerary = $pnrs["originDestinationDetails"]["itineraryInfo"];
								$ruta_ida = $this->is_array_($itinerary) ? ($itinerary[0]["travelProduct"]["boardpointDetail"]["cityCode"] ." - ". $itinerary[0]["travelProduct"]["offpointDetail"]["cityCode"]) : ($itinerary["travelProduct"]["boardpointDetail"]["cityCode"] ." - ". $itinerary["travelProduct"]["offpointDetail"]["cityCode"]) ;

								$ruta_vuelta = $this->is_array_($itinerary) ? ( $itinerary[1]["elementManagementItinerary"]["segmentName"]=="AIR" ? ($itinerary[1]["travelProduct"]["boardpointDetail"]["cityCode"]." - ".$itinerary[1]["travelProduct"]["offpointDetail"]["cityCode"]):"") : $itinerary["travelProduct"]["boardpointDetail"]["cityCode"]." - ".$itinerary["travelProduct"]["offpointDetail"]["cityCode"];
								
								$trama_ida = $ruta_ida;
								$trama_vuelta = $ruta_vuelta;
							
								
								$vuelo_ida = $this->is_array_($itinerary) ? ($itinerary[0]["elementManagementItinerary"]["segmentName"]=="AIR" ? ($itinerary[0]["travelProduct"]["productDetails"]["identification"]) : "") : ($itinerary["travelProduct"]["productDetails"]["identification"]);
								
								$vuelo_retorno = $this->is_array_($itinerary) ? ($itinerary[1]["elementManagementItinerary"]["segmentName"]=="AIR" ? ($itinerary[1]["travelProduct"]["productDetails"]["identification"]) : "") : "";

								//$vuelo = empty($vuelo_retorno) ? $vuelo_ida : ($vuelo_ida." - ".$vuelo_retorno);
								
							//	$oficina =
								$pnr_cod = "";
								/*pnr_head table inicio*/
								if ($this->is_array_($data_pnr["reservationInfo"]) ) 
								{
									foreach ($data_pnr["reservationInfo"] as $key => $value) {
										if(isset($value["reservation"]["date"]) && isset($value["reservation"]["time"]) )
										{
											if($value["reservation"]["companyId"]=="1A") 
											{
												$pnr_cod = $value["reservation"]["controlNumber"];
											}
										}
									}
								}else {
									$pnr_cod = $data_pnr["reservationInfo"]["reservation"]["controlNumber"];
								}
								$arr_pnr_vuelo[] = "('".$pnr_cod."','".$trama_ida."','".$vuelo_ida."')";
								$arr_pnr_vuelo[] = "('".$pnr_cod."','".$trama_vuelta."','".$vuelo_retorno."')";
								$nombre_archivo = $nombre_archivo;
								/*pnr_head table end*/
								$numbers_ref = [];
								$num_docs = [];
								if (!empty($pnr_cod)) {
									
									try {
										foreach ($dataElementsIndiv	 as $key => $dataElement) {
											if (!empty($dataElement["serviceRequest"])) {
												if ($dataElement["serviceRequest"]["ssr"]["type"] == "FOID") {
													$num_docs[] = $dataElement["serviceRequest"]["ssr"]["freeText"];
													$numbers_ref[] = $dataElement["referenceForDataElement"]["reference"]["number"];
												}
											}
										}
										/*pnr_pax table inicio*/
										$pasajeros = $pnrs["travellerInfo"];
										//$arr_pnr_head = [];
										//$arr_pnr_vuelo = [];
										//$pasajeros_reserva = [];
										$infs=0;
										$adts=0;
										$chds=0;
										$boleto = "";
										
										if ($this->is_array_($pasajeros)) {
											foreach ($pasajeros as $key => $pas) {
												$reference = $pas["elementManagementPassenger"]["elementReference"]["number"];
												foreach ($numbers_ref as $key => $numref) {
													if ($numref == $reference) {
														//buscar boleto
														foreach ($dataElementsStruct as $key => $ElementsStruct) {
															if (isset($ElementsStruct["ticketDocumentData"])) {
																if (isset($ElementsStruct["referenceForStructDataElement"])) {
																	$references = $ElementsStruct["referenceForStructDataElement"]["reference"];
																	if ($this->is_array_($references)) {
																		foreach ($references as $key => $referenceStruct) {
																			if ($numref==$referenceStruct["number"] && $referenceStruct["qualifier"] == "PT") {
																				$otherCompany = $ElementsStruct["ticketDocumentData"]["numAirlineCode"]["companyIdentification"]["otherCompany"];
																				$tktNumber = $ElementsStruct["ticketDocumentData"]["tktNumber"]["documentDetails"]["number"];
																				$boleto = $otherCompany.$tktNumber;
																			}
																		}
																	}else {
																		if ($numref==$references["number"] && $references["qualifier"] == "PT") {
																			$otherCompany = $ElementsStruct["ticketDocumentData"]["numAirlineCode"]["companyIdentification"]["otherCompany"];
																			$tktNumber = $ElementsStruct["ticketDocumentData"]["tktNumber"]["documentDetails"]["number"];
																			$boleto = $otherCompany.$tktNumber;
																		}
																	}
																}
															}
														}
														//buscar boleto fin

														$passengerData = $pas["passengerData"];
														if ($this->is_array_($passengerData)) {
															foreach ($passengerData as $value) {
																$pax = $value["travellerInformation"]["passenger"]["type"];
																$infs = ($pax == "INF" ? ($infs + 1) : $infs);//cuenta los infantes
																$adts = ($pax == "INF" ? $adts : ($adts + 1));//cuenta los adultos
																
																$nombrewosplit = $pas["passengerData"][($pax == "INF" ? 1 : 0)]["travellerInformation"]["passenger"]["firstName"];
																//nombre = nombrewosplit.ToString().Substring(0, nombrewosplit.Length - 4);
																if (strpos($nombrewosplit, (" ".$pax))===true) {
																	$nombre = explode((" ".$pax), $nombrewosplit)[0];
																} else {
																	$nombre = $nombrewosplit;
																}
																$apellido = $pas["passengerData"][0]["travellerInformation"]["traveller"]["surname"];
																$tipodoc = substr($num_docs[$key], 0, 2);
																$numdoc = substr($num_docs[$key], strlen($tipodoc));
																$tipopax = $value["travellerInformation"]["passenger"]["type"];
																$pasajeros_reserva[] = "('".$pnr_cod."','".$numdoc."','".$apellido."','".$nombre."','".$pax."','".$tipodoc."','".$boleto."')";
																$boleto = "";
															}
														} else {
															$passenger = $passengerData["travellerInformation"]["passenger"];
															if ($this->is_array_($passenger)) {//con infantes
																$adulto_con_infante = $pas["enhancedPassengerData"];
																foreach ($adulto_con_infante as $pasajero) {
																	$pax = $pasajero["enhancedTravellerInformation"]["travellerNameInfo"]["type"];
																	$pax = $pax == null ? "ADT" : $pax;

																	$adts = ($pax == "ADT" ? ($adts + 1) : $adts);//cuenta los adultos
																	$infs = ($pax == "INF" ? ($infs + 1) : $infs);//cuenta los infantes
																	$nombrewosplit = $pasajero["enhancedTravellerInformation"]["otherPaxNamesDetails"]["givenName"];
																	//nombre = nombrewosplit.ToString().Contains(pax) ? nombrewosplit.ToString().Substring(0, nombrewosplit.Length - 4) : nombrewosplit.ToString();
																	if (strpos($nombrewosplit, (" ".$pax))===true) {
																		$nombre = explode((" ".$pax), $nombrewosplit)[0];
																	} else {
																		$nombre = $nombrewosplit;
																	}
																	$apellido = $pasajero["enhancedTravellerInformation"]["otherPaxNamesDetails"]["surname"];
																	$tipodoc = substr($num_docs[$key], 0, 2);
																	$numdoc = substr($num_docs[$key], strlen($tipodoc));
																	$pasajeros_reserva[] = "('".$pnr_cod."','".$numdoc."','".$apellido."','".$nombre."','".$pax."','".$tipodoc."','".$boleto."')";
																	$boleto = "";
																}
															} else {
																$pax = $passengerData["travellerInformation"]["passenger"]["type"];
																$adts = ($pax == "ADT" ? ($adts + 1) : $adts);//cuenta los adultos
																$chds = ($pax == "ADT" ? $chds : ($chds + 1));//cuenta los niños

																$nombrewosplit = $pas["passengerData"]["travellerInformation"]["passenger"]["firstName"];
																//nombre = nombrewosplit.ToString().Substring(0, nombrewosplit.Length - 4);
																if (strpos($nombrewosplit, (" ".$pax))===true) {
																	$nombre = explode((" ".$pax), $nombrewosplit)[0];
																} else {
																	$nombre = $nombrewosplit;
																}
																$apellido = $pas["passengerData"]["travellerInformation"]["traveller"]["surname"];
																$tipodoc = substr($num_docs[$key], 0, 2);
																$numdoc = substr($num_docs[$key], strlen($tipodoc));
																$pasajeros_reserva[] = "('".$pnr_cod."','".$numdoc."','".$apellido."','".$nombre."','".$pax."','".$tipodoc."','".$boleto."')";
																$boleto = "";
															}
														}
													}
												}
											}
										} else {
											$nombrewosplit = "";
											$boleto = "";
											//$reference = $pasajeros["elementManagementPassenger"]["reference"]["number"];
											$pass = $pasajeros["passengerData"];//con infante
											//buscar boleto
											$numref = $pasajeros["elementManagementPassenger"]["elementReference"]["reference"]["number"];
											foreach ($dataElementsStruct as $key => $ElementsStruct) {
												if (isset($ElementsStruct["ticketDocumentData"])) 
												{
													if (isset($ElementsStruct["referenceForStructDataElement"])) 
													{
														$references = $ElementsStruct["referenceForStructDataElement"]["reference"];
														if ($this->is_array_($references)) 
														{
															foreach ($references as $key => $referenceStruct){
																if ($numref==$referenceStruct["number"] && $referenceStruct["qualifier"] == "PT") 
																{
																	$otherCompany = $ElementsStruct["ticketDocumentData"]["numAirlineCode"]["companyIdentification"]["otherCompany"];
																	$tktNumber = $ElementsStruct["ticketDocumentData"]["tktNumber"]["documentDetails"]["number"];
																	$boleto = $otherCompany.$tktNumber;
																	break;
																}
															}
														}else {
															if ($numref==$references["number"] && $references["qualifier"] == "PT") 
															{
																$otherCompany = $ElementsStruct["ticketDocumentData"]["numAirlineCode"]["companyIdentification"]["otherCompany"];
																$tktNumber = $ElementsStruct["ticketDocumentData"]["tktNumber"]["documentDetails"]["number"];
																$boleto = $otherCompany.$tktNumber;
																break;
															}
														}
													}
													break;
												}
											}
											//buscar boleto fin
											if ($this->is_array_($pass)) {
												foreach ($pass as $key => $value) {
													$pax = $value["travellerInformation"]["passenger"]["type"];
													$infs = ($pax == "INF" ? ($infs + 1) : $infs);//cuenta los infantes
													$adts = ($pax == "ADT" ? ($adts + 1) : $adts);//cuenta los infantes
													$nombrewosplit = $pasajeros["passengerData"][($pax == "INF" ? 1 : 0)]["travellerInformation"]["passenger"]["firstName"];
													//nombre = nombrewosplit.ToString().Substring(0, nombrewosplit.Length - 4);
													if (strpos($nombrewosplit, (" ".$pax))===true) {
														$nombre = explode((" ".$pax), $nombrewosplit)[0];
													} else {
														$nombre = $nombrewosplit;
													}
													$apellido = $pasajeros["passengerData"][0]["travellerInformation"]["traveller"]["surname"];
													$tipodoc = substr($num_docs[$key], 0, 2);
													$numdoc = substr($num_docs[$key], strlen($tipodoc));
													$pasajeros_reserva[] = "('".$pnr_cod."','".$numdoc."','".$apellido."','".$nombre."','".$pax."','".$tipodoc."','".$boleto."')";
													$boleto = "";
												}
											} else { //sin infante
												$passenger = $pass["travellerInformation"]["passenger"];
												if ($this->is_array_($passenger)) 
												{//con infantes
													$adulto_con_infante = $pasajeros["enhancedPassengerData"];
													foreach ($adulto_con_infante as $pasajero) {
														$pax = $pasajero["enhancedTravellerInformation"]["travellerNameInfo"]["type"];
														$pax = empty($pax) ? "ADT" : $pax;

														$adts = ($pax == "ADT" ? ($adts + 1) : $adts);//cuenta los adultos
														$infs = ($pax == "INF" ? ($infs + 1) : $infs);//cuenta los infantes
														$nombrewosplit = $pasajero["enhancedTravellerInformation"]["otherPaxNamesDetails"]["givenName"];
														//nombre = nombrewosplit.ToString().Contains(pax) ? nombrewosplit.ToString().Substring(0, nombrewosplit.Length - 4) : nombrewosplit.ToString();
														if (strpos($nombrewosplit, (" ".$pax))===true) {
															$nombre = explode((" ".$pax), $nombrewosplit)[0];
														} else {
															$nombre = $nombrewosplit;
														}
														$apellido = $pasajero["enhancedTravellerInformation"]["otherPaxNamesDetails"]["surname"];
														$tipodoc = substr($num_docs[$key], 0, 2);
														$numdoc = substr($num_docs[$key], strlen($tipodoc));
														$pasajeros_reserva[] = "('".$pnr_cod."','".$numdoc."','".$apellido."','".$nombre."','".$pax."','".$tipodoc."','".$boleto."')";
														$boleto = "";
													}
												} else {
													$pax = $pass["travellerInformation"]["passenger"]["type"];
													$adts = ($pax == "ADT" ? ($adts + 1) : $adts);//cuenta los adultos
													$chds = ($pax == "ADT" ? $chds : ($chds + 1));//cuenta los niños
													$nombrewosplit = $pasajeros["passengerData"]["travellerInformation"]["passenger"]["firstName"];
													//nombre = nombrewosplit.ToString().Substring(0, nombrewosplit.Length - 4);
													if (strpos($nombrewosplit, (" ".$pax))===true) {
														$nombre = explode((" ".$pax), $nombrewosplit)[0];
													} else {
														$nombre = $nombrewosplit;
													}
													$apellido = $pasajeros["passengerData"]["travellerInformation"]["traveller"]["surname"];
													$tipodoc = substr($num_docs[0], 0, 2);
													$numdoc = substr($num_docs[0], strlen($tipodoc));
													$pasajeros_reserva[] = "('".$pnr_cod."','".$numdoc."','".$apellido."','".$nombre."','".$pax."','".$tipodoc."','".$boleto."')";
													$boleto = "";
												}
											}
										}
										/*pnr_pax table end*/
									//echo $pnr_cod;
									$arr_pnr_head[] = "('".$pnr_cod."','".$nombre_archivo."')";

									/*print_r($arr_pnr_head);
									print_r($arr_pnr_vuelo);
									print_r($pasajeros_reserva);
									echo "corte pnr";*/
									} catch (Exception $th) {
										echo $th->getMessage();
									}
								}
							//}fin for
						}
					}
					//echo $upload_folder.$archivo;
					//echo $destino_folder.$archivo;
					fclose($handle);
					rename (($upload_folder.$archivo),($destino_folder.$archivo."bk"));
					$modelo->insertDataMasivo("pnr_head",array("pnr_cod","nombre_archivo"), $arr_pnr_head);
					$modelo->insertDataMasivo("pnr_pax",array("pnr_cod","numdoc","apellido","nombre","pax","tipodoc","boleto"), $pasajeros_reserva);
					$modelo->insertDataMasivo("pnr_vuelo",array("pnr_cod","trama","vuelo"), $arr_pnr_vuelo);
					
				}
			}
		}
	}
} 
