<template id="indicador_3">
<div class="cóntent mt-3">

    <div class="col-lg-12" v-if="mostrar">
            <div class="card">
                <div class="card-header">
                <strong>Incumplimiento de Condiciones Mínimas de Funcionamiento del Centro MAC</strong>
                <h6>Formulario de Carga de Datos</h6>
                </div>
                <div class="card-body card-block">
                    <form enctype="multipart/form-data" class="form-horizóntal" v-on:submit.prevent="guardar">
                    <div class="row form-group">

                            <div class="form-group col-md-3">
                                <label for="text-input" class=" form-cóntrol-label">Seleccione el día :</label>
                                <input type="date" class="form-cóntrol" v-model="fecha" @change="cargar_formulario()" name="dtpfechafinreal" data-language='es'  />
                            </div>

                        </div>
                    <div class="table-respónsive">
                            <div class="row">
                                <div class="col-lg-12 ">
                        <table class="table tbl_condiciones">
                        <thead class="thead-dark text-center">
                            <tr>
                                <th scope="col">GRUPO</th>
                                <th scope="col">RUBRO</th>
                                <th scope="col">MAL FUNCIONAMIENTO APERTURA</th>
                                <th scope="col">MAL FUNCIONAMIENTO RELEVO</th>
                                <th scope="col">MAL FUNCIONAMIENTO CIERRE</th>
                                <th scope="col">OBSERVACIÓN</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">

                            <tr v-for="grupo_rubro in grupos_rubros" class="noentidad">
                                <td>{{grupo_rubro.nombre_grupo}}</td>
                                <td>{{grupo_rubro.nombre_rubro}}</td>
                                <td><input type="checkbox" :name="'apertura_'+grupo_rubro.id" :id="'apertura_'+grupo_rubro.id" class="form-control" :checked="grupo_rubro.checked_apertura"></td>
                                <td><input type="checkbox" :name="'relevo_'+grupo_rubro.id"  :id="'relevo_'+grupo_rubro.id"  class="form-control" :checked="grupo_rubro.checked_relevo"></td>
                                <td><input type="checkbox" :name="'cierre_'+grupo_rubro.id" :id="'cierre_'+grupo_rubro.id" class="form-control" :checked="grupo_rubro.checked_cierre"></td>
                                <td><input type="text" :id="'observacion_'+grupo_rubro.id" class="form-control" :value="grupo_rubro.observacion" ></td>
                            </tr>

                            <tr v-for="entidad in entidades" class="entidad">
                                <td>RRHH</td>
                                <td> {{entidad.nombre}} </td>
                                <td><input type="checkbox"  :id="'aperturaRRHH_'+entidad.id" class="form-cóntrol entidad" :checked="entidad.checked_apertura"></td>
                                <td><input type="checkbox" :id="'relevoRRHH_'+entidad.id" class="form-cóntrol entidad" :checked="entidad.checked_relevo"></td>
                                <td><input type="checkbox" :id="'cierreRRHH_'+entidad.id" class="form-cóntrol entidad" :checked="entidad.checked_cierre"></td>
                                <td><input type="text" :id="'observacionRRHH_'+entidad.id" class="form-control" :value="entidad.observacion" ></td>
                            </tr>


                        </tbody>
                        </table>
                        <div class="form-group col-md-12 text-center">

                            <button type="submit"class="btn btn-success btn-md">
                                <i class="fa fa-send"></i> Registrar
                            </button>
                        </div>
                    </div>
                </div>
                </div>
                <br>

                    </form>
                </div>
            </div>

    </div>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <strong>Incumplimiento de Condiciones Mínimas de Funcionamiento del Centro MAC</strong>
            </div>
            <div class="card-body">
                <div class="row form-group">
                    <div class="col col-md-1 col-sm-2"><label for="select" class=" form-control-label">Fecha:</label></div>
                        <div class="col-12 col-md-3  col-sm-8">
                            <input type="date" class="form-control dtp_fecha_indicador_11_1" placeholder="YYYY-MM-DD" v-model="fecha_filtro" id="" @onchange="geral()">
                        </div>
                        <div class="col-md-3  col-sm-8">
                            <button type="button" @click="cargar()" class="btn btn-success btn-sm" style="margin-top:6px;">
                                <i class="fa fa-send"></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Lunes</th>
                        <th scope="col">Martes</th>
                        <th scope="col">Miércoles</th>
                        <th scope="col">Jueves</th>
                        <th scope="col">Viernes</th>
                        <th scope="col">Sábado</th>
                        <th scope="col">Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Apertura</th>
                        <td v-for="a in tabla_apertura">{{a }} </td>

                        </tr>
                        <tr>
                        <th scope="row">Relevo</th>
                        <td v-for="b in tabla_relevo">{{b }} </td>

                        </tr>
                        <tr>
                        <th scope="row">Cierre</th>
                        <td v-for="c in tabla_cierre">{{c }} </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                <strong>Incumplimiento de Condiciones Mínimas de Funcionamiento</strong>
                </div>
                <div class="card-body card-block">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12">
                            <div id="grafico_3" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
