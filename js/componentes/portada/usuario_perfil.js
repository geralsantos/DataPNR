{
    'use strict';
    Vue.component('usuario_perfil', {
      template: '#usuario_perfil',
      data:()=>({
        nombre: null,
        apellido: null,
        dni: null,
        cargo: null,
        correo: null,
        username : null,
        password: null,
        kpi_roles_id: null,
        usuario_id: null
      }),
      created:function(){
      },
      mounted:function(){
        this.cargar();
      },
      updated:function(){

      },
      methods:{
        cargar(){
            this.usuario_id = $("#id_usuario").val();
            where = {'estado':1, 'id': this.usuario_id };
            this.$http.post('cargar_datos_sin_editado?view',{tabla:'kpi_usuarios',where:where}).then(function(response){

              
              if(response.body.atributos != undefined){

                this.nombre = response.body.atributos[0]["nombre"];
                this.apellido = response.body.atributos[0]["apellido"];
                this.cargo = response.body.atributos[0]["cargo"];
                this.correo = response.body.atributos[0]["correo"];
                this.username = response.body.atributos[0]["username"];
                this.password = response.body.atributos[0]["password"];
                this.dni = response.body.atributos[0]["dni"];

              }
            });
          },
        actualizar(){

          let update = {
                        "cargo":this.cargo,
                        "correo":this.correo,
                         "username":this.username,
                        "password":this.password,
                        };
            
            let where = { "id":this.usuario_id };
            this.$http.post('update_data?view',{tabla:'kpi_usuarios', update:update, where: where}).then(function(response){
            if( response.body.resultado ){
            swal("Cambio Realizado", "Registro Actualizado", "success");
            this.cargar();

            }else{
              swal("Error", "Ha ocurrido un error, verifique sus datos.", "warning");


            }
          });

        },
      }
    })
  }
