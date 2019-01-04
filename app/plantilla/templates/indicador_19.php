<template id="indicador_19">
<div class="content mt-3">
            <div class="col-lg-12" v-if="mostrar">
                <div class="card">
                    <div class="card-header">
                    <strong>Cobertura de Difusión de la Estrategia MAC al Personal</strong>
                    <h6>Formulario de Carga de Datos</h6>
                    </div>
                    <div class="card-body card-block">
                        <form enctype="multipart/form-data" class="form-horizontal" v-on:submit.prevent="guardar">
                            <div class="row">
                                <div class="form-group col-md-2">
                                    <label for="text-input" class=" form-control-label">Año</label>
                                    <select id="anio" v-model="anio" class="form-control">
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="text-input" class=" form-control-label">Semestre</label>
                                    <select id="mes" v-model="semestre" class="form-control" >
                                        <option value="1">Semestre I</option>
                                        <option value="2">Semestre II</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-6">
                                    <div class=""><label for="text-input" class=" form-control-label">N° de personal al que se le impartió la inducción</label>
                                    <input type="number" v-model="personal_con_induccion" id="txtmeta" name="txtmeta" placeholder="" class="form-control"> </div>
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
                        <strong>Cobertura de Difusión de la Estrategia MAC al Personal</strong>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-1 col-sm-2">
                                <label for="select" class=" form-control-label">Año:</label>
                            </div>
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
                                    <thead class="thead-dark">
                                        <tr class="text-center">
                                            <th scope="col">Semestre I</th>
                                            <th scope="col">Semestre II</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center">
                                            <td>{{semestre_1}}</td>
                                            <td>{{semestre_2}}</td>
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
                    <strong>Cobertura de Difusión de la Estrategia MAC al Personal</strong>
                    </div>
                    <div class="card-body card-block">
                        <div class="row">
                            <div class="col-lg-12 col-sm-12">
                                <div id="grafico_19" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- .content -->
</template>
