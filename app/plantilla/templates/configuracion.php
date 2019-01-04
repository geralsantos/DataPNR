<template id="configuracion">
    <div class="content mt-3">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                <strong>Formulario de Configuración</strong>
                </div>
                <div class="card-body card-block">
                    <form  enctype="multipart/form-data" class="form-horizontal" v-on:submit.prevent="guardar">

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Nombre de Sede</label></div>
                            <div class="col-12 col-md-9"><input v-model="nombre" type="text" id="text-input" name="text-input"  class="form-control" required><small class="form-text text-muted">Por favor, ingrese nombre de la sede.</small></div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Código de Sede</label></div>
                            <div class="col-12 col-md-9"><input v-model="codigo" type="text" id="text-input" name="text-input"  class="form-control" required><small class="form-text text-muted">Por favor, ingrese código de la sede.</small> </div>
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
        <!--  <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <strong>REGISTRO DE ENTIDADES</strong>
                </div>
                <div class="card-body">

                    <form  enctype="multipart/form-data" class="form-horizontal" v-on:submit.prevent="guardar_entidad">
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Nombre de Entidad</label></div>
                            <div class="col-12 col-md-9">
                                <input type="text" v-model="nombre_entidad" id="text-input" name="text-input" placeholder="" class="form-control" required>
                                <small class="form-text text-muted">Por favor, ingrese el nombre de la entidad.</small>
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
                    <div>
                        <div class="card-header">
                        <strong>LISTA DE ENTIDADES</strong>
                        </div>
                        
                        <div class="table-responsive">
                        <table class="table">
                        <thead class="thead-dark text-center">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Opción</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center" v-for="entidad in entidades">
                                <td> {{entidad.nombre}}</td>
                                <td><a @click="borrar(entidad.id)" ><i class="fa fa-trash"> </i> </a></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>

                    </div>
                </div>
            </div>
        </div>  -->
    </div> <!-- .content -->
</template>