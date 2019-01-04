{
  'use strict';
  Vue.component('registrar_usuario', {
    template: '#registrar_usuario',
    data:()=>({
      nombre: null,
      apellido: null,
      dni: null,
      correo: null,
      username : null,
      password: null,
      cargo: null,
      kpi_roles_id: 0
    }),
    created:function(){
    },
    mounted:function(){

    },
    updated:function(){

    },
    methods:{
      guardar(){

        if( this.kpi_roles_id == 0){
          swal("Alerta", "Seleccione un Nivel de Usuario", "warning");
          return false;
        }

        let insert = {"nombre":this.nombre,
                       "apellido":this.apellido,
                      "dni":this.dni,
                      "correo":this.correo,
                       "username":this.username,
                      "password":this.password,
                      "cargo":this.cargo,
                      "kpi_roles_id":this.kpi_roles_id};
        let update = {};
        let where = { "dni":this.dni };
        this.$http.post('insertar_datos_only?view',{tabla:'kpi_usuarios',insert:insert, update:update, where: where}).then(function(response){
          if( response.body.resultado ){
            swal("Cambio Realizado", "Registro Guardado", "success");
            this.nombre= null,
            this.apellido= null,
            this.correo= null,
            this.username= null,
            this.dni= null,
            this.cargo=null,
            this.password=null,
            this.kpi_roles_id= 0
          }else{
            swal("Error", "Usuario ya registrado", "warning");
          }
        });

      },
    }
  })
}
