<template id="portada-index">
    <div class="content mt-3">
        <div class="col-lg-12" v-if="mostrar">
            <div class="card">
                <div class="card-header">
                    <strong>Nivel de Ejecución del Plan de Acción del Centro MAC</strong>
                    <h6>Formulario de Carga de Datos</h6>
                </div>
                <div class="card-body card-block">
                    <form  enctype="multipart/form-data" class="form-horizontal" v-on:submit.prevent="guardar">
                    <input type="hidden" v-model="id_editado">
                        <div class="row">

                            <div class="form-group col-md-7">
                                <label for="text-input" class=" form-control-label">Acción Programada</label>
                                <div class="autocomplete">
                                    <input type="text"  v-model="nombre_accion" class="form-control" @keyup="buscar()"/>
                                    <ul  id="autocomplete-results" class="autocomplete-results" v-if="bloque_busqueda">
                                        <li class="loading" v-if="isLoading">
                                            Loading results...
                                        </li>
                                        <li  @click="actualizar(coincidencia.id)" class="autocomplete-result" v-for="coincidencia in coincidencias">
                                            {{coincidencia.nombre_accion}}
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="text-input" class=" form-control-label">Meta</label>
                                <input type="number" id="txtmeta" v-model="meta" placeholder="" class="form-control">

                            </div>
                            <div class="form-group col-md-3">
                                <div class=""><label for="text-input" class=" form-control-label">Resultado de Meta</label>
                                    <input type="number" id="txtmeta" v-model="resultado_meta" placeholder="" class="form-control"> </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <div class=""><label for="text-input" class=" form-control-label">Fecha Inicio Programada</label>
                                    <input type="date" class="form-control" v-model="fecha_inicio_programada" id=""  placeholder="DD-MM-YYYY"  data-language='es'  /></div>
                            </div>

                            <div class="form-group col-md-6">
                                <div class=""><label for="text-input" class=" form-control-label">Fecha Inicio Real</label>
                                    <input type="date" class="form-control" v-model="fecha_inicio_real" id=""  placeholder="DD-MM-YYYY" data-language='es'  /></div>
                            </div>

                            <div class="form-group col-md-6">
                                <div class=""><label for="text-input" class=" form-control-label">Fecha Fin Programada</label>
                                    <input type="date" class="form-control" id=""  placeholder="DD-MM-YYYY" v-model="fecha_fin_programada"  data-language='es'  /></div>
                            </div>
                            <div class="form-group col-md-6">
                                <div class=""><label for="text-input" class=" form-control-label">Fecha Fin Real</label>
                                    <input type="date" class="form-control" id=""  placeholder="DD-MM-YYYY" v-model="fecha_fin_real"  data-language='es'  /></div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-12">
                            <label for="text-input" class=" form-control-label">Observación</label>
                                <textarea name="" id="" v-model="observacion" cols="30" rows="3" class="form-control"></textarea>

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
                        <strong>Nivel de Ejecución del Plan de Acción del Centro MAC</strong>
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
                    <strong>Nivel de Ejecución del Plan de Acción del Centro MAC</strong>
                    </div>
                    <div class="card-body card-block">
                        <div id="grafico_1" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                    </div>
                </div>
            </div>
    </div> <!-- .content -->
</template>
