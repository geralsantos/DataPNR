Vue.component('indicador_25', {
    template: '#indicador_25',
    data:()=>({
      atributos : [],
      valores : {},
      nota : null,
      mostrar:false,
      dni : null,
      trimestre: moment().quarter(),
      anio:moment().format("YYYY"),
      anio_filtro : moment().format("YYYY"),
      trimestre_filtro : moment().quarter(),
      trimestre_promedio: '',
    }),
    created:function(){

    },
    mounted:function(){
        this.verificar_nivel_usuario();
      this.cargar();

    },

    methods:{
        verificar_nivel_usuario(){
            this.$http.post('verificar_nivel_usuario?view',{}).then(function(response){
                if( response.body.nivel != undefined){
                    if( response.body.nivel == '2'){
                        this.mostrar=true;
                    }
                 }
            });
        },

      cargar(e=''){
        let year = (new Date()).getFullYear();
        let trim = moment().quarter();
        let where = {};
        if(e==''){
           where = {'anio':year, 'trimestre':trim};


        }else{
          year = this.anio_filtro;
          trim = this.trimestre_filtro;
          where = {'anio':this.anio_filtro, 'trimestre':this.trimestre_filtro};
        }

        //  this.nota = null;
         // this.dni = null;
        //  this.trimestre= 1;
        //  this.anio=(new Date()).getFullYear();


        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref25',where:where}).then(function(response){
          this.atributos = response.body.atributos;


          if(this.atributos != undefined){
            let total_nota = 0;
            let total_dni = 0;
            let array_x = [];
            let data = [];
            let obj = {};
            let count = 0;
            let notas_acumuladas = 0;
            for (var i = 0; i <  this.atributos.length; i++) {
              var notas = Math.round(this.atributos[i].nota);
              if(array_x.indexOf(notas)<0){
                array_x.push(notas);
              }
              obj[notas]=typeof obj[notas] ==='undefined'?(1):(obj[notas]+1);
              notas_acumuladas = notas + notas_acumuladas;
              count++;
            }
            data = Object.values(obj);
            let promedio = notas_acumuladas / count;
            this.trimestre_promedio = promedio.toFixed(2);

            function sortNumber(a,b) {
                return a - b;
            }


            this.mostrar_grafico(array_x.sort(sortNumber), data, year, trim);

          }else{

              swal("Error", "No hay datos registrados para este rango de fecha", "warning");
              this.mostrar_grafico(0, 0, year, trim);
             this.trimestre_promedio = null;
          }
        });
      },

      guardar(){


        if(( this.anio > moment().format("YYYY") )){
            swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
              return false;
          }else{
            if(this.trimestre > moment().quarter() ){
              swal("Error", "No puedes ingresar registros con trimestre superior al trimestre actual", "warning");
              return false;
            }
          }



        let insert = {"nota":this.nota, "dni":this.dni,
                      "trimestre":this.trimestre, "anio":this.anio};
        let update = {"nota":this.nota,};
        let temporal = {"tmp_nota":this.nota,};
        let where = { "trimestre":this.trimestre, "anio":this.anio, "dni":this.dni};
        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref25',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
          if( response.body.resultado ){
            let alerta = (response.body.editado == '1') ?  'warning' : 'success';
            swal("Cambio Registrado", response.body.mensaje, alerta);
            this.cargar();
          }else{
              if( response.body.mensaje ){
                  swal("Acceso Denegado", response.body.mensaje , "error");
              }else{
                  swal("Error", "Un error ha ocurrido", "warning");
              }
          }
        });

      },

      mostrar_grafico(array_x, data, year, trim){

        Highcharts.chart('grafico_25', {
            title: {
                text: 'Nivel de caificación del personal'
            },
            subtitle: {
              text: 'Año ' + year + ' Trimestre ' + trim
          },
            xAxis: {
                categories: array_x
            },
            yAxis: [{

                title: {
                    text: 'N° de Personas'
                }
            }],

            labels: {
                items: [{
                    html: 'Número de personas ',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            credits:{
                enabled: false
            },
            series: [{
                type: 'column',
                name: 'Número de Personas',
                data: data
            }, {
                type: 'spline',
                name: 'Curva',
                data: data,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[8],
                    fillColor: 'red'
                }
            }]
        });
      }
    }
  })
