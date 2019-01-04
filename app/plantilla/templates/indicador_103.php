<template id="indicador_103">
  <div class="">
    <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <strong>Eficiencia en la Atención</strong>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Fecha:</label></div>
                            <div class="col-12 col-md-3  col-sm-8">
                              <input type="date" class="form-control dtp_fecha_indicador_103" placeholder="YYYY-MM-DD" v-model="fecha" id="" @onchange="geral()">
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
                                    <th scope="col"></th>
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
                                    <td>Tiempo de Espera</td>
                                    <td v-for="te in tiempo_espera">{{te}} </td>
                                </tr>
                                <tr class="text-center">
                                    <td>Número de Asesores</td>
                                    <td v-for="as in numero_asesores">{{as}} </td>
                                </tr>
                                <tr class="text-center">
                                    <td>Número de personas que asisten al centro MAC</td>
                                    <td v-for="np in numero_personas_asisten_MAC">{{np}} </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
    <div class="content mt-3">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                <strong>Eficiencia en la Atención</strong>
                </div>
                <div class="card-body card-block">
                    <div id="grafico_103" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                </div>
            </div>
        </div>
    </div> <!-- .content -->
  </div>
</template>
