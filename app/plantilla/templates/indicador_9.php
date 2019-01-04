<template id="indicador_9">
  <div class="content mt-3">
      <div class="col-lg-12">
          <div class="card">
              <div class="card-header">
                  <strong>Tasa de Atención de Citas</strong>
              </div>
              <div class="card-body">

                  <div class="form-group col-md-12" >
                    <div class="row">
                      <div class="col-lg-2 col-md-3col-sm-6">
                        <label for="text-input" class=" form-control-label">Año</label>
                        <select name="select" id="select" v-model="anio" @change="cargar();" class="form-control">
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                      </div>
                        <div class="col-lg-2 col-md-3 col-sm-6">
                          <label for="text-input" class=" form-control-label">Mes</label>
                              <select name="select" v-model="mes" id="select" class="form-control" @change="cargar();">
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                          </select>
                        </div>
                    </div>
                  </div>

                  <div class="table-responsive">
                      <table class="table">
                      <thead class="thead-dark">
                          <tr class="text-center">
                              <th v-for="(row,index) in cabecera" scope="col">{{row}}</th>

                          </tr>
                      </thead>
                      <tbody>
                          <tr class="text-center">
                              <td v-for="(row,index) in tabla_valores">{{row}}%</td>

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
              <strong>Tasa de Atención de Citas</strong>
              </div>
              <!--div class="card-body card-block">
                  <div id="lesly" style="min-width: 900px; height: 400px; margin: 0 auto"></div>
              </div-->

              <div class="card-body card-block">
                  <div id="indicador_9" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
              </div>

          </div>
      </div>
  </div> <!-- .content -->
</template>
