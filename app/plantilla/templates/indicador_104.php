<template id="indicador_104">
  <div class="content mt-3">
  <div class="col-lg-12" v-if="mostrar">
          <div class="card">
              <div class="card-header">
              <strong>ALO MAC: Atenciones Totales Diarias y Acumuladas</strong>
              <h6>Formulario de Cargas de Datos</h6>
              </div>
              <div class="card-body card-block">
                  <form v-on:submit.prevent="cargar()" enctype="multipart/form-data" id="formuploadajax" class="form-horizontal">
                      <div class="row">
                          <div class="form-group col-md-2">
                              <label for="text-input" class=" form-control-label">Año</label>
                              <select name="select" id="select" v-model="anio" class="form-control">
                                  <option value="2018">2018</option>
                                  <option value="2019">2019</option>
                                  <option value="2020">2020</option>
                                  <option value="2021">2021</option>
                              </select>
                          </div>
                          <div class="form-group col-md-4">
                              <label for="text-input" class=" form-control-label">Mes</label>
                              <select name="select" id="select" v-model="mes" class="form-control">
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

                          <div class="form-group col-md-4">

                                  <label for="text-input" class=" form-control-label">Adjuntar archivo excel</label>

                                  <input type="file" id="archivo" v-model="archivo" name="archivo" value="archivo" class="form-control-file">
                          </div>


                      </div>

                      <div class="row">
                          <div class="col-md-12 text-center" >
                              <button type="button" @click="guardar()" class="btn btn-success btn-sm">
                                  <i class="fa fa-send"></i> Registrar
                              </button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <div class="col-lg-12">
          <div class="card">
              <div class="card-header">
                  <strong>ALO MAC: Atenciones Totales Diarias y Acumuladas</strong>
              </div>
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Año:</label></div>
                      <div class="col-12 col-md-3  col-sm-8">
                          <select name="select" id="select" v-model="anio_search" @change="cargar()" class="form-control">
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                          </select>
                      </div>
                      <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Mes:</label></div>
                      <div class="col-12 col-md-3  col-sm-8">
                          <select name="select" id="select" v-model="mes_search" @change="cargar()" class="form-control">
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


                  <div class="table-responsive">
                      <div class="row">
                      <div class="col-lg-12 ">
                          <table class="table">
                          <thead class="thead-dark">
                              <tr>
                              <th scope="col"></th>
                              <th scope="col">{{moment(mes,'MM').format("MMMM")}} (Promedio)</th>

                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                              <td>Llamadas Recibidas</td>
                              <td>{{(recibidas_prom)}}</td>
                              </tr>
                              <tr>
                              <td>Llamadas Atendidas</td>
                              <td>{{(atendidas_prom)}}</td>
                              </tr>
                              <tr>
                              <td>Llamadas Atendidas < 20 seg</td>
                              <td>{{(atendidas_seg_prom)}}</td>
                              </tr>
                              <tr>
                              <td>Nivel de Servicio(%) < 20 seg</td>
                              <td>{{((atendidas_seg_prom/(isempty(recibidas_prom)?1:recibidas_prom))*100).toFixed(2)}}%</td>

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
              <strong>ALO MAC: Atenciones Totales Diarias y Acumuladas</strong>
              </div>
              <div class="card-body card-block">
                  <div id="grafico_104" style="min-width: 900px; height: 400px; margin: 0 auto"></div>
              </div>
          </div>
      </div>
  </div> <!-- .content -->
</template>
