<template id="lista_cambios">
<div class="">


    <div class="content mt-3">

            <div class="animated fadeIn">
                    <div class="">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Lista de Cambios</strong>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table" class="table table-striped table-bordered text-center">
                                    <thead>
                                    <tr>

                                        <th>Usuario</th>
                                        <th>Indicador</th>
                                        <th>Fecha de Modificación</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="cambio in cambios">
                                        <td>{{cambio.usuario_nombre}}</td>
                                        <td>{{cambio.nombre_indicador}}</td>
                                        <td>{{cambio.fecha_modificacion}}</td>

                                        <td><button  class="btn btn-primary" @click="verRegistro(cambio.id_registro, cambio.nombre_tabla)">Ver</button>
                                        <button  class="btn btn-success" @click="aprobar(cambio.id, cambio.id_registro, cambio.nombre_tabla)">Aprobar</button>
                                        <button  class="btn btn-danger" @click="descartar(cambio.id, cambio.id_registro, cambio.nombre_tabla)">Descartar</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                        </div>
                    </div>


                    </div>
                </div><!-- .animated -->



    </div> <!-- .content -->
    <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Registro Historial</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <ul>
                    <li v-for="reg, index in registro">{{index}} : {{reg}} </li>
                </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Cerrar</button>
                </div>
            </div>
        </div>

        </div>
      </div>
    </transition>
  </div>
  </div>

</template>
