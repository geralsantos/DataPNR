{
  'use strict';
  Vue.component('lista_usuarios', {
    template: '#lista_usuarios',
    data:()=>({
      usuarios :[],
      showModal: false,
      user:[],
      nombre: null,
      apellido: null,
      dni: null,
      correo: null,
      username : null,
      cargo: null,
      password: null,
      userId:null,
      kpi_roles_id: 0

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
        where = {'estado':1};
        this.$http.post('cargar_datos_sin_editado?view',{tabla:'kpi_usuarios',where:where}).then(function(response){
          this.usuarios = response.body.atributos;
          
        });
      },

      mostrarModal(id){
        
        where = {'id':id};
        this.$http.post('cargar_datos_sin_editado?view',{tabla:'kpi_usuarios',where:where}).then(function(response){
          let user = response.body.atributos[0];
          this.nombre = user.nombre;
          this.apellido = user.apellido;
          this.dni = user.dni;
          this.correo= user.correo;
          this.username = user.username;
          this.cargo= user.cargo;
          this.password= user.password;
          this.kpi_roles_id= user.kpi_roles_id;
          this.userId = user.id;
          this.showModal = true;
        });

      },

      actualizar(id){
        let update = {"nombre":this.nombre,
                      "apellido":this.apellido,
                      "dni":this.dni,
                      "correo":this.correo,
                      "username":this.username,
                      "cargo":this.cargo,
                      "password":this.password,
                      "kpi_roles_id":this.kpi_roles_id};
       
        let where = { "id":id };
        this.$http.post('update_data?view',{tabla:'kpi_usuarios', update:update, where: where}).then(function(response){
          if( response.body.resultado ){
            swal("Cambio Realizado", "Registro Actualizado", "success");
            this.showModal = false;
            this.nombre= null;
            this.apellido= null;
            this.correo= null;
            this.username= null;
            this.dni= null;
            this.cargo= null;
            this.password=null;
            this.kpi_roles_id= 0;
            this.userId = null;
            this.cargar();
          }else{
            swal("Error", "Ha ocurrido un error", "warning");
          }
        });
      },

      eliminar(id){
        swal({
          title: "El usuario será eliminado",
          text: "¿Está seguro de querer eliminar este usuario?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            let update = {"estado":0 };
            let where = { "id":id };
            this.$http.post('update_data?view',{tabla:'kpi_usuarios', update:update, where: where}).then(function(response){
              if( response.body.resultado ){
                swal("Cambio Realizado", "Registro Eliminado", "success");
                this.showModal = false;
                this.nombre= null;
                this.apellido= null;
                this.correo= null;
                this.username= null;
                this.dni= null;
                this.clave= null;
                this.cargo=null;
                this.password=null;
                this.kpi_roles_id= 0;
                this.userId = null;
                this.cargar();
              }else{
                swal("Error", "Ha ocurrido un error", "warning");
              }
            });
          
          } else {
            return false;
          }
        });
        
      }

    }
  });
}
