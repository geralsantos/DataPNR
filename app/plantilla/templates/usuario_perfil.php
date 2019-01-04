<template id="usuario_perfil">
    <div class="content mt-3">

        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                <strong>Mi Perfil</strong>
                </div>
                <div class="card-body card-block">
                    <form action="" method="post" enctype="multipart/form-data" v-on:submit.prevent="actualizar">
                        <input type="hidden" id="id_usuario" value="<?php echo $_SESSION["usuario"][0]["id"]?>">
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Nombre</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text"  name="text-input" placeholder="" class="form-control" v-model="nombre" disabled>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Apellido</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text"  name="text-input" placeholder=""  v-model="apellido" class="form-control" disabled >
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">DNI</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text"  name="text-input" placeholder="" class="form-control" v-model="dni" disabled>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="text-input" class=" form-control-label">Cargo</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="text" id="cargo" name="cargo" placeholder="" class="form-control" v-model="cargo" >
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="email-input" class=" form-control-label">Correo</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="email" id="email-input" name="email-input" placeholder="" class="form-control" v-model="correo">
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Usuario</label></div>
                            <div class="col-12 col-md-9"><input type="text"  name="text-input" v-model="username" placeholder="" class="form-control" >
                            <small class="form-text text-muted">Esta será su usuario para ingresar al sistema.</small></div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3">
                                <label for="password-input" class=" form-control-label">Contraseña</label>
                            </div>
                            <div class="col-12 col-md-9">
                                <input type="password" id="password-input" name="password-input" v-model="password" placeholder="" class="form-control">
                                <small class="form-text text-muted">Esta será su contraseña para ingresar al sistema.</small>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-12" style="text-align: center">
                                <button type="submit" class="btn btn-success btn-sm">
                                    <i class="fa fa-send"></i> Actualizar
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> <!-- .content -->
</template>