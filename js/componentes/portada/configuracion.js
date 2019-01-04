Vue.component('configuracion', {
    template: '#configuracion',
    data:()=>({

      entidades: [],
      nombre_entidad: null,
      nombre: null,
      codigo:null,

    }),
    created:function(){

    },
    mounted:function(){
     // this.cargar();
      this.cargar_sede();

    },

    methods:{
      cargar(){
        this.nombre_entidad=null;
        where = {'estado':1};
        this.$http.post('cargar_datos?view',{tabla:'kpi_entidades',where:where}).then(function(response){
          this.entidades = response.body.atributos;
       
          if(this.entidades != undefined){


          }
        });
      },

      cargar_sede(){
        where = {'estado':1};
        this.$http.post('cargar_datos_sin_editado?view',{tabla:'kpi_sedes',where:where}).then(function(response){
          if(response.body.atributos != undefined){
            this.nombre = response.body.atributos[0]["nombre"];
            this.codigo = response.body.atributos[0]["codigo"];

          }


        });
      },

      guardar_entidad(){

        let insert = {"nombre":this.nombre_entidad};
        let where = { "nombre":this.nombre_entidad};
        this.$http.post('insertar_datos_only?view',{tabla:'kpi_entidades',insert:insert,  where: where}).then(function(response){
          if( response.body.resultado ){
          swal("Cambio Realizado", "Registro Guardado", "success");
            this.cargar();

          }else{
            swal("Error", "Un error ha ocurrido", "warning");

          }
        });

      },
      guardar(){

        let update = {"nombre":this.nombre, "codigo":this.codigo};
        let where = { "id":1};
        this.$http.post('update_data?view',{tabla:'kpi_sedes',update:update,  where: where}).then(function(response){
          if( response.body.resultado ){
          swal("Cambio Realizado", "Registro Guardado", "success");
            this.cargar();

          }else{
            swal("Error", "Un error ha ocurrido", "warning");


          }
        });

      },
      borrar(e){

        let update = {"estado":0};
        let where = { "id":e};
        this.$http.post('update_data?view',{tabla:'kpi_entidades',update:update,  where: where}).then(function(response){
          if( response.body.resultado ){
          swal("Cambio Realizado", "Registro Eliminado", "success");
            this.cargar();

          }else{
            swal("Error", "Un error ha ocurrido", "warning");


          }
        });

      }

    }
  })
