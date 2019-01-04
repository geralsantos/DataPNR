<template id="indicador_106">
  <div class="content mt-3">
    <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <strong>Ranking de atenciones diarias  por entidad</strong>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Fecha:</label></div>
                            <div class="col-12 col-md-3  col-sm-8">
                              <input type="date" class="form-control dtp_fecha_indicador_106" placeholder="YYYY-MM-DD" v-model="fecha" id="" @onchange="geral()">
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
                                    <th v-for="entidad in entidades" scope="col">{{entidad.value}}</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr>
                                    <td v-for="cantidad in cantidades">{{cantidad.value}}</td>
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
                  <strong>Ranking de atenciones diarias  por entidad</strong>
                  </div>
                  <div class="card-body card-block">
                      <div id="indicador_106" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                  </div>

              </div>
          </div>



  </div> <!-- .content -->

</template>
