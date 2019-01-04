<template id="indicador_15_1">
  <div class="content mt-3">
    <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <strong>Atenciones Totales Diarias</strong>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Fecha:</label></div>
                            <div class="col-12 col-md-3  col-sm-8">
                              <input type="date" class="form-control dtp_fecha_indicador_15_1" placeholder="YYYY-MM-DD" v-model="fecha" id="" @onchange="geral()">
                            </div>
                            <div class="col-md-3  col-sm-8">
                              <button type="button" @click="cargar()" class="btn btn-success btn-sm" style="margin-top:6px;">
                                  <i class="fa fa-send"></i> Buscar
                              </button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">LUNES</th>
                                    <th scope="col">MARTES</th>
                                    <th scope="col">MIERCOLES</th>
                                    <th scope="col">JUEVES</th>
                                    <th scope="col">VIERNES</th>
                                    <th scope="col">SABADO</th>
                                    <th scope="col">DOMINGO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center">
                                  <td v-for="atencion in ticks_atencion">{{isempty(atencion.atencion)?0:atencion.atencion}}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-header">
                  <strong>Atenciones Totales Diarias</strong>
                  </div>
                  <div class="card-body card-block">
                      <div id="indicador_15_1" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                  </div>
              </div>
          </div>
  </div> <!-- .content -->
</template>