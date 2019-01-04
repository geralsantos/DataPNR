<template id="indicador_18">
    <div class="content mt-3">
        <div class="col-lg-12" v-if="mostrar">
            <div class="card">
                <div class="card-header">
                    <strong>Porcentaje de Reclamos y Quejas Atendidos Oportunamente</strong>
                    <h6>Formulario de Carga de Datos</h6>
                </div>
                <div class="card-body card-block">
                    <form action="" method="post" enctype="multipart/form-data" class="form-horizontal"  v-on:submit.prevent="guardar">
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
                                <label for="text-input" class=" form-control-label">N° de Quejas y Reclamos</label>
                                <input type="number" id="txtmeta"  v-model="quejas_reportadas" name="txtmeta" placeholder="" class="form-control">

                            </div>
                            <div class="form-group col-md-4">
                                <label for="text-input" class="form-control-label"  >N° de Quejas y Reclamos Respondidos</label>
                                <input type="number" id="txtmeta" name="txtmeta" v-model="quejas_respondidas" placeholder="" class="form-control">

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
                    <strong>Porcentaje de Reclamos y Quejas Atendidos Oportunamente</strong>
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
                                        <td><div>{{enero}}</div></td>
                                        <td><div>{{febrero}}</div></td>
                                        <td><div>{{marzo}}</div></td>
                                        <td><div>{{abril}}</div></td>
                                        <td><div>{{mayo}}</div></td>
                                        <td><div>{{junio}}</div></td>
                                        <td><div>{{julio}}</div></td>
                                        <td><div>{{agosto}}</div></td>
                                        <td><div>{{septiembre}}</div></td>
                                        <td><div>{{octubre}}</div></td>
                                        <td><div>{{noviembre}}</div></td>
                                        <td><div>{{diciembre}}</div></td>

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
                <strong>Porcentaje de Reclamos y Quejas Atendidos Oportunamente</strong>
                </div>
                <div class="card-body card-block">
                    
                    <div class="row">
                        <div class="col-lg-12 col-sm-12">
                            <div id="grafico_18" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
