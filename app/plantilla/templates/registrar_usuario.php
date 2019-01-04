<template id="registrar_usuario">


    <div class="content mt-3">

            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                    <strong>Formulario de Registro de Usuario</strong>
                    </div>
                    <div class="card-body card-block">
                        <form enctype="multipart/form-data" class="form-horizontal" v-on:submit.prevent="guardar">

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
                                        <option value="0">Seleccione</option>
                                        <option value="1">Administrador</option>
                                        <option value="2">Registrador</option>
                                        <option value="3">Usuario</option>
                                        <option value="4">Editar</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col col-md-12" style="text-align: center">
                                <button type="submit" class="btn btn-success btn-sm">
                                    <i class="fa fa-send"></i> Registrar
                                </button>

                            </div>


                        </form>
                    </div>
                </div>
            </div>



    </div> <!-- .content -->

</template>
