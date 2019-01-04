<template id="indicador_11">
  <div class="content mt-3">
      <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <strong>Ratio de Atención por Ticket Emitido</strong>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Fecha:</label></div>
                            <div class="col-12 col-md-3  col-sm-8">
                              <input type="date" class="form-control dtp_fecha_indicador_11" placeholder="YYYY-MM-DD" v-model="fecha" id="" @onchange="geral()">
                            </div>
                            <div class="col-md-3  col-sm-8">
                              <button type="button" @click="cargar()" class="btn btn-success btn-sm" style="margin-top:6px;">
                                  <i class="fa fa-send"></i> Buscar
                              </button>
                            </div>
                        </div>

                        <div class="table-responsive">
                              <div class="row">
                                  <div class="col-lg-12 ">
                                      <table class="table">
                                          <thead class="thead-dark">
                                              <tr>
                                                  <th v-for="servicio in servicios" scope="col">N°&nbsp;Servicios&nbsp;{{servicio.value}}</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr>

                                                      <td v-for="(row,index) in personas">{{row["value"]}}/{{personas_total[index]["value"]}}&nbsp;=&nbsp;{{((row["value"]/personas_total[index]["value"])*100).toFixed(2)}}% Personas</td>

                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                        </div>

                    </div>
                </div>
            </div>
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-header">
                  <strong>Ratio de Atención por Ticket Emitido</strong>
                  </div>
                  <div class="card-body card-block">
                      <div class="row">
                        <div class="col-md-12">
                          <div id="indicador_11" style="min-width: 300px; height: 400px; margin: 0 auto"></div>

                        </div>
                      </div>
                  </div>
              </div>
          </div>



  </div> <!-- .content -->

</template>
