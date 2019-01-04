<template id="portada-index">
    <div class="content mt-3">
        <div class="col-lg-12" >
            <div class="card">
                <div class="card-header">
                    <strong>Cargar Archivo</strong>
                    <h6>Formulario de Carga de Datos</h6>
                </div>
                <div class="card-body card-block">
                <form  class="form-horizontal" enctype="multipart/form-data" id="formuploadajax" v-on:submit.prevent="guardar">
                        <div class="row">
                        <div class="form-group col-md-4">

                        <label for="text-input" class=" form-control-label">Adjuntar archivo</label>

                        <input type="file" id="archivo" v-model="archivo" name="archivo" value="archivo" class="form-control-file">
                        </div>
                        </div>
                        
                       
                        <div class="row">
                            <div class="col-md-12 text-center" >
                                <button type="submit" class="btn btn-success btn-sm">
                                    <i class="fa fa-send"></i> Grabar datos
                                </button>
                            </div>
                        </div>
                        </form>
                </div>
            </div>
        </div>
           
    </div> <!-- .content -->
</template>
