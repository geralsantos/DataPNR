<template id="indicador_25">
    <div class="content mt-3">
        <div class="col-lg-12" v-if="mostrar">
            <div class="card">
                <div class="card-header">
                <strong>Nivel de Calificación del Personal</strong>
                <h6>Formulario de Carga de Datos</h6>
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
                                <select name="select"  id="select" v-model="trimestre"  class="form-control">
                                    <option value="1">Trimestre I</option>
                                    <option value="2">Trimestre II</option>
                                    <option value="3">Trimestre III</option>
                                    <option value="4">Trimestre IV</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <div class=" "><label for="text-input" class=" form-control-label">DNI</label>
                                <input type="text" id="txtaccionprogramada" v-model="dni" name="txtaccionprogramada" maxlength="8" class="form-control"> </div>
                            </div>
                            <div class="form-group col-md-3">
                                <div class=""><label for="text-input" class=" form-control-label">Nota</label>
                                <input type="number" v-model="nota" id="txtmeta" name="txtmeta" placeholder="" class="form-control"> </div>
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
                    <strong>Nivel de Calificación del Personal</strong>
                </div>
                <div class="card-body">
                    <div class="row form-group">
                    <div class="form-group col-md-3">
                        <label for="text-input" class=" form-control-label">Año</label>
                        <select name="select" @change="cargar($event)" v-model="anio_filtro" id="select" class="form-control">
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>

                        </select>
                    </div>
                <div class="form-group col-md-3">
                    <label for="text-input" class=" form-control-label">Trimestre</label>
                    <select name="select" @change="cargar($event)" v-model="trimestre_filtro" id="select" class="form-control">
                        <option value="1">I TRIMESTRE</option>
                        <option value="2">II TRIMESTRE</option>
                        <option value="3">III TRIMESTRE</option>
                        <option value="4">IV TRIMESTRE</option>
                    </select>
                </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table">
                                <thead class="thead-dark">
                                    <tr class="text-center">
                                        <th></th>
                                        <th scope="col">Promedio del Trimestre</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-center">
                                        <td scope="col">Promedio</td>
                                        <td>{{trimestre_promedio}}</td>


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
                <strong>Nivel de Calificación del Personal</strong>
                </div>
                <div class="card-body card-block">

                    <div id="grafico_25" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                </div>
            </div>
        </div>
    </div> <!-- .content -->
</template>
