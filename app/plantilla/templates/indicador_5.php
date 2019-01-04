<template id="indicador_5">
  <div class="content mt-3">

          <div class="col-lg-12">
              <div class="card">
                  <div class="card-header">
                      <strong>Efectividad de las Acciones Implementadas Sobre Incidencias</strong>
                  </div>
                  <div class="card-body">
                      <div class="row form-group">
                          <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Año:</label></div>
                          <div class="col-12 col-md-3  col-sm-8">
                              <select name="select" id="select" v-model="anio" @change="cargar();" class="form-control">
                                  <option value="2018">2018</option>
                                  <option value="2019">2019</option>
                                  <option value="2020">2020</option>
                                  <option value="2021">2021</option>
                              </select>
                          </div>
                      </div>

                      <div class="table-responsive">
                          <table class="table">
                          <thead class="thead-dark text-center">
                              <tr>
                              <th scope="col"></th>
                                  <th scope="col">Enero</th>
                                  <th scope="col">Febrero</th>
                                  <th scope="col">Marzo</th>
                                  <th scope="col">Abril</th>
                                  <th scope="col">Mayo</th>
                                  <th scope="col">Junio</th>
                                  <th scope="col">Julio</th>
                                  <th scope="col">Agosto</th>
                                  <th scope="col">Septiembre</th>
                                  <th scope="col">Octubre</th>
                                  <th scope="col">Noviembre</th>
                                  <th scope="col">Diciembre</th>
                              </tr>
                          </thead>
                          <tbody class="text-center">
                              <tr>
                              <td >Turno 1</td>
                                  <td v-for="(row,index) in t1">{{row}}</td>
                              </tr>
                              <tr>
                              <td>Turno 2</td>
                                <td v-for="(row,index) in t2">{{row}}</td>
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
                  <strong>Efectividad de las Acciones Implementadas Sobre Incidencias</strong>
                  </div>
                  <div class="card-body card-block">
                          <div id="grafico_5" style="min-width: 900px; height: 400px; margin: 0 auto"></div>
                  </div>

              </div>
          </div>



  </div> <!-- .content -->
</template>
