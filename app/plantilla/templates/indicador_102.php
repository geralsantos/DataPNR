<template id="indicador_102">

<div class="content mt-3">
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-header">
                      <strong>Control de Asistencia</strong>
                  </div>
                  <div class="card-body">
                        <div class="row form-group">
                          <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Fecha:</label></div>
                          <div class="col-12 col-md-3  col-sm-8">
                            <input type="date" class="form-control dtp_fecha_indicador_102" id="dtp_fecha_indicador_102" name="dtpfechafinreal" v-model="fecha" data-language='es'  />
                          </div>
                          <div class="col-md-3  col-sm-8">
                              <button type="button" @click="cargar()" class="btn btn-success btn-sm" style="margin-top:6px;">
                                  <i class="fa fa-send"></i> Buscar
                              </button>
                            </div>
                      </div>
                      <div class="table-responsive">
                          <table class="table">
                          <thead class="thead-dark text-center">
                              <tr>
                                  <th scope="col">TURNO</th>
                                  <th v-for="(row,index) in entidades " scope="col">{{row}}</th>

                              </tr>
                          </thead>
                          <tbody class="text-center">
                              <tr>
                                  <td>Turno 1</td>
                                  <td v-for="(row,index) in turno_1">{{row}}</td>
                              </tr>
                              <tr>
                                  <td>Turno 2</td>
                                  <td v-for="(row,index) in turno_2">{{row}}</td>

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
                    <strong>Control de Asistencia</strong>
                    </div>
                    <div class="card-body card-block">

                        <div id="grafico_102" style="min-width: 900px; height: 400px; margin: 0 auto"></div>
                    </div>
                </div>
            </div>
        </div>
</template>
