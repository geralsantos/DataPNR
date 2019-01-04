<template id="indicador_105">
<div class="content mt-3">
            <div class="col-lg-12" v-if="mostrar">
                <div class="card">
                    <div class="card-header">
                    <strong>Canal Digital: Atenciones Totales Acumuladas</strong>
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
                                <div class="form-group col-md-2">
                                    <label for="text-input" class=" form-control-label">Mes</label>
                                    <select id="mes" v-model="mes" class="form-control" >
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
                                    <label for="text-input" class=" form-control-label">Servicio Digital</label>
                                    <select name="select" v-model="id_centro_mac" id="select" class="form-control">
                                        <option value="0">Seleccione</option>
                                        <option value="1">N° de Visitas Portal</option>
                                        <option value="2">Chat Atendidos</option>
                                        <option value="3">Redes Sociales</option>
                                        <option value="4">E-mails Atendidos</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="text-input" class=" form-control-label">N° de Atenciones</label>
                                    <input v-model="nro_atenciones"  type="text" id="text-input" name="text-input" placeholder="" class="form-control">
                                </div>
                                
                            </div>
                            
                            <div class="row form-group">
                                <div class="col col-md-12" style="text-align: center">
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
                        <strong>Canal Digital: Atenciones Totales acumuladas
            </strong>
                    </div>
                    <div class="card-body">
                        <div class="row form-group">
                            <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Año:</label></div>
                            <div class="col-12 col-md-3  col-sm-8">
                                <select name="select" @change="cargar($event)" v-model="anio_filtro" id="select" class="form-control">
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table">
                            <thead class="thead-dark">
                                <tr class="text-center">
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
                            <tbody>

                                <tr class="text-center">
                                <td class="col">N° de Visitas Portal</td>
                                    <td>{{v1}}</td>
                                    <td>{{v2}}</td>
                                    <td>{{v3}}</td>
                                    <td>{{v4}}</td>
                                    <td>{{v5}}</td>
                                    <td>{{v6}}</td>
                                    <td>{{v7}}</td>
                                    <td>{{v8}}</td>
                                    <td>{{v9}}</td>
                                    <td>{{v10}}</td>
                                    <td>{{v11}}</td>
                                    <td>{{v12}}</td>

                                </tr>
                                <tr class="text-center">
                                <td>Chats Atendidos</td>
                                    <td>{{c1}}</td>
                                    <td>{{c2}}</td>
                                    <td>{{c3}}</td>
                                    <td>{{c4}}</td>
                                    <td>{{c5}}</td>
                                    <td>{{c6}}</td>
                                    <td>{{c7}}</td>
                                    <td>{{c8}}</td>
                                    <td>{{c9}}</td>
                                    <td>{{c10}}</td>
                                    <td>{{c11}}</td>
                                    <td>{{c12}}</td>

                                </tr>
                                <tr class="text-center">
                                <td>Redes Sociales</td>
                                    <td>{{r1}}</td>
                                    <td>{{r2}}</td>
                                    <td>{{r3}}</td>
                                    <td>{{r4}}</td>
                                    <td>{{r5}}</td>
                                    <td>{{r6}}</td>
                                    <td>{{r7}}</td>
                                    <td>{{r8}}</td>
                                    <td>{{r9}}</td>
                                    <td>{{r10}}</td>
                                    <td>{{r11}}</td>
                                    <td>{{r12}}</td>

                                </tr>
                                <tr class="text-center">
                                <td>E-mails Atendidos</td>
                                    <td>{{e1}}</td>
                                    <td>{{e2}}</td>
                                    <td>{{e3}}</td>
                                    <td>{{e4}}</td>
                                    <td>{{e5}}</td>
                                    <td>{{e6}}</td>
                                    <td>{{e7}}</td>
                                    <td>{{e8}}</td>
                                    <td>{{e9}}</td>
                                    <td>{{e10}}</td>
                                    <td>{{e11}}</td>
                                    <td>{{e12}}</td>

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
                    <strong>Canal Digital: Atenciones Totales Acumuladas</strong>
                    </div>
                    <div class="card-body card-block">

                        <div id="grafico_105" style="min-width: 300; height: 400px; margin: 0 auto"></div>
                    </div>
                </div>
            </div>

        </div> <!-- .content -->
</template>
