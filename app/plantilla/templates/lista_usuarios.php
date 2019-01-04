<template id="lista_usuarios">
  <div class="">
    

    <div class="content mt-3">

            <div class="animated fadeIn">
                    <div class="">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Lista de Usuarios</strong>
                            </div>
                            <div class="card-body">
                      <table id="bootstrap-data-table" class="table table-striped table-bordered text-center">
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Cargo</th>
                            <th>Correo</th>
                            <th>Username</th>
                            <th>Nivel</th>
                            <th>Editar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="usuario in usuarios">
                            <td>{{usuario.nombre}}</td>
                            <td>{{usuario.apellido}}</td>
                            <td>{{usuario.dni}}</td>
                            <td>{{usuario.cargo}}</td>
                            <td>{{usuario.correo}}</td>
                            <td>{{usuario.username}}</td>
                            <td v-if="usuario.kpi_roles_id==1">Administrador</td>
                            <td v-if="usuario.kpi_roles_id==2">Registrador</td>
                            <td v-if="usuario.kpi_roles_id==3">Usuario</td>
                            <td v-if="usuario.kpi_roles_id==4">Editor</td>
                            <td>
                                <div style="display:flex"><button  class="btn btn-primary" @click="mostrarModal(usuario.id)">Ver</button>
                                <button type="button"  @click= "eliminar(usuario.id)"  class="btn btn-danger">Eliminar</button>
                                </div>
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
                    <h5 class="modal-title">Datos Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data" class="form-horizontal">
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">DNI</label></div>
                            <div class="col-12 col-md-9"><input type="text"  v-model="dni" class="form-control" required ><small class="form-text text-muted">Por favor, ingrese dni.</small></div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Nombre</label></div>
                            <div class="col-12 col-md-9"><input type="text"  v-model="nombre" class="form-control" required ><small class="form-text text-muted">Por favor, ingrese nombre.</small></div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Apellido</label></div>
                            <div class="col-12 col-md-9"><input type="text"  v-model="apellido" class="form-control" required ><small class="form-text text-muted">Por favor, ingrese apellido.</small> </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Cargo</label></div>
                            <div class="col-12 col-md-9"><input type="text"  v-model="cargo" class="form-control" required ><small class="form-text text-muted">Por favor, ingrese el cargo.</small> </div>
                        </div>
                        <div class="row form-group">
                        <div class="col col-md-3"><label for="email-input" class=" form-control-label">Correo</label></div>
                        <div class="col-12 col-md-9"><input type="email" id="email-input" name="email-input" v-model="correo" class="form-control" required ><small class="form-text text-muted">Por favor, ingrese correo electrónico.</small></div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Usuario</label></div>
                            <div class="col-12 col-md-9"><input type="text"  v-model="username" class="form-control" required > <small class="form-text text-muted">Por favor,nombre de usuario.</small></div>
                        </div>
                        
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="password-input" class=" form-control-label">Contraseña</label></div>
                            <div class="col-12 col-md-9"><input type="password" v-model="password" class="form-control" required ><small class="form-text text-muted">Por favor, ingrese contraseña.</small></div>
                            </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="select" class=" form-control-label">Nivel de Usuario</label></div>
                            <div class="col-12 col-md-9">
                                <select name="select" id="select" v-model="kpi_roles_id" class="form-control" required >
                                    <option value="1">Administrador</option>
                                    <option value="2">Registrador</option>
                                    <option value="3">Usuario</option>
                                    <option value="4">Editar</option>
                                </select>
                            </div>
                        </div>
                     


                        </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Cerrar</button>
                   
                    <button type="button"  @click= "actualizar(userId)"  class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>

        </div>
      </div>
    </transition>
  </div>
  </div>
  
</template>
