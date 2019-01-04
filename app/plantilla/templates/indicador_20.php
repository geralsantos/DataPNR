<template id="indicador_20">
    <div class="content mt-3">
        <div class="col-lg-12" v-if="mostrar">
            <div class="card">
                <div class="card-header">
                <strong>Cumplimiento de los Programas de Capacitación/Entrenamiento del Personal</strong>
                <h6>Formulario de Cargas de Datos</h6>
                </div>
                <div class="card-body card-block">
                    <form enctype="multipart/form-data" class="form-horizontal" v-on:submit.prevent="guardar">
                        <div class="row">
                            <div class="form-group col-md-2">
                                <label for="text-input" class=" form-control-label">Año</label>
                                <select name="select" v-model="anio" id="select" class="form-control">
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="text-input" class=" form-control-label">Trimestre</label>
                                <select name="select" id="select" v-model="trimestre"  class="form-control">
                                    <option value="1">Trimestre I</option>
                                    <option value="2">Trimestre II</option>
                                    <option value="3">Trimestre III</option>
                                    <option value="4">Trimestre IV</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <div class=""><label for="text-input" class=" form-control-label">Capacitaciones programadas</label>
                                    <input type="number" id="txtmeta" v-model="capacitaciones_programadas"  name="txtmeta" placeholder="" class="form-control"> </div>
                            </div>
                            <div class="form-group col-md-3">
                                <div class=""><label for="text-input" class=" form-control-label">Capacitaciones ejecutadas</label>
                                <input type="number" id="txtmeta" v-model="capacitaciones_ejecutadas" name="txtmeta" placeholder="" class="form-control"> </div>
                            </div>
                            

                        </div>

                        <div class="row">
                            <div class="col-md-12 text-center" >
                                <button type="submit" class="btn btn-success btn-sm">
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
                    <strong>Cumplimiento de los Programas de Capacitación/Entrenamiento del Personal</strong>
                </div>
                <div class="card-body">
                    <div class="row form-group">
                        <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Año:</label></div>
                        <div class="col-12 col-md-3  col-sm-8">
                        <select name="select" id="select" @change="cargar($event)" v-model="anio_filtro" class="form-control">
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table">
                                <thead class="thead-dark text-center">
                                    <tr>
                                        <th scope="col">Trimestre I</th>
                                        <th scope="col">Trimestre II</th>
                                        <th scope="col">Trimestre III</th>
                                        <th scope="col">Trimestre IV</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr>
                                        <td>{{trimestre_1}}</td>
                                        <td>{{trimestre_2}}</td>
                                        <td>{{trimestre_3}}</td>
                                        <td>{{trimestre_4}}</td>

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
                <strong>Cumplimiento de los Programas de Capacitación/Entrenamiento del Personal</strong>
                </div>
                <div class="card-body card-block">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12">
                            <div id="indicador_20" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- .content -->
</template>