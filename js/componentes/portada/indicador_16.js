Vue.component('indicador_16', {
    template: '#indicador_16',
    data:()=>({
      atributos : [],
      valores : {},
      mostrar:false,
      sugerencias_reportadas : null,
      sugerencias_respondidas : null,
      mes:  moment(new Date()).format("MM"),
      anio: moment(new Date()).format("YYYY"),
      anio_filtro :  moment(new Date()).format("YYYY"),
      enero: '',
      febrero: '',
      marzo: '',
      abril: '',
      mayo: '',
      junio: '',
      julio: '',
      agosto: '',
      septiembre: '',
      octubre: '',
      noviembre: '',
      diciembre: '',
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
      guardar(){

        if(( this.anio > moment().format("YYYY") )){
          swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
            return false;
        }else{
          if(this.mes > moment().format("MM") ){
            swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
            return false;
          }
        }

        if( parseFloat(this.sugerencias_reportadas) < parseFloat(this.sugerencias_respondidas)){
          swal("Error", "Las sugerencias reportadas no pueden ser menor a las sugerencias respondidas, verifique.", "warning");
          return false;
        }

        let insert = {"sugerencias_reportadas":this.sugerencias_reportadas, "sugerencias_respondidas":this.sugerencias_respondidas,
        "mes":this.mes, "anio":this.anio};
        let update = {"sugerencias_reportadas":this.sugerencias_reportadas, "sugerencias_respondidas":this.sugerencias_respondidas };
        let temporal = {"tmp_sugerencias_reportadas":this.sugerencias_reportadas, "tmp_sugerencias_respondidas":this.sugerencias_respondidas };
        let where = { "mes":this.mes, "anio":this.anio};

        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref16',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
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

      cargar(e=''){
        let year = (new Date()).getFullYear();
        let where = {};
        if(e==''){
           where = {'anio':year};

        }else{
          year = this.anio_filtro;
          where = {'anio':e.target.value};
        }
       // this.sugerencias_reportadas = null;
       // this.sugerencias_respondidas = null;
       // this.mes= (new Date()).getMonth();
       // this.anio=(new Date()).getFullYear();

        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref16',where:where}).then(function(response){
          this.atributos = response.body.atributos;
          if(this.atributos != undefined){
          let total_sugerencias_reportadas_1 = 0;
          let total_sugerencias_respondidas_1 = 0;
          let total_sugerencias_reportadas_2 = 0;
          let total_sugerencias_respondidas_2 = 0;
          let total_sugerencias_reportadas_3 = 0;
          let total_sugerencias_respondidas_3 = 0;
          let total_sugerencias_reportadas_4 = 0;
          let total_sugerencias_respondidas_4 = 0;
          let total_sugerencias_reportadas_5 = 0;
          let total_sugerencias_respondidas_5 = 0;
          let total_sugerencias_reportadas_6 = 0;
          let total_sugerencias_respondidas_6 = 0;
          let total_sugerencias_reportadas_7 = 0;
          let total_sugerencias_respondidas_7 = 0;
          let total_sugerencias_reportadas_8 = 0;
          let total_sugerencias_respondidas_8 = 0;
          let total_sugerencias_reportadas_9 = 0;
          let total_sugerencias_respondidas_9 = 0;
          let total_sugerencias_reportadas_10 = 0;
          let total_sugerencias_respondidas_10 = 0;
          let total_sugerencias_reportadas_11 = 0;
          let total_sugerencias_respondidas_11 = 0;
          let total_sugerencias_reportadas_12 = 0;
          let total_sugerencias_respondidas_12 = 0;

          let total = 0;

          for (var i = 0; i <  this.atributos.length; i++) {
            let m = this.atributos[i].mes;
            if( m == 1  ){
              total_sugerencias_reportadas_1 = (total_sugerencias_reportadas_1) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_1 = (total_sugerencias_respondidas_1) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 2 ) {

              total_sugerencias_reportadas_2 = (total_sugerencias_reportadas_2) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_2 = (total_sugerencias_respondidas_2) + (parseFloat(this.atributos[i].sugerencias_respondidas));

            }else if ( m == 3 ) {
              total_sugerencias_reportadas_3 = (total_sugerencias_reportadas_3) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_3 = (total_sugerencias_respondidas_3) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 4 ) {
              total_sugerencias_reportadas_4 = (total_sugerencias_reportadas_4) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_4 = (total_sugerencias_respondidas_4) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            } else if ( m == 5 ) {
              total_sugerencias_reportadas_5 = (total_sugerencias_reportadas_5) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_5 = (total_sugerencias_respondidas_5) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 6 ) {
              total_sugerencias_reportadas_6 = (total_sugerencias_reportadas_6) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_6 = (total_sugerencias_respondidas_6) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 7 ) {
              total_sugerencias_reportadas_7 = (total_sugerencias_reportadas_7) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_7 = (total_sugerencias_respondidas_7) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 8 ) {
              total_sugerencias_reportadas_8 = (total_sugerencias_reportadas_8) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_8 = (total_sugerencias_respondidas_8) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 9 ) {
              total_sugerencias_reportadas_9 = (total_sugerencias_reportadas_9) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_9 = (total_sugerencias_respondidas_9) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 10 ) {
              total_sugerencias_reportadas_10 = (total_sugerencias_reportadas_10) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_10 = (total_sugerencias_respondidas_10) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 11 ) {
              total_sugerencias_reportadas_11 = (total_sugerencias_reportadas_11) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_11 = (total_sugerencias_respondidas_11) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }else if ( m == 12 ) {
              total_sugerencias_reportadas_12 = (total_sugerencias_reportadas_12) + (parseFloat(this.atributos[i].sugerencias_reportadas));
              total_sugerencias_respondidas_12 = (total_sugerencias_respondidas_12) + (parseFloat(this.atributos[i].sugerencias_respondidas));
            }

          }
          let  div_1 = total_sugerencias_respondidas_1 / total_sugerencias_respondidas_1;
          div_1 = (isNaN(div_1)) ? 0 : div_1 * 100;
          this.enero = total_sugerencias_respondidas_1 + '/' + total_sugerencias_reportadas_1;

          let  div_2 = total_sugerencias_respondidas_2 / total_sugerencias_reportadas_2;
          div_2 = (isNaN(div_2)) ? 0 : div_2 * 100;
          this.febrero = total_sugerencias_respondidas_2 + '/' + total_sugerencias_reportadas_2;

          let  div_3 = total_sugerencias_respondidas_3 / total_sugerencias_reportadas_3;
          div_3 = (isNaN(div_3)) ? 0 : div_3 * 100;
          this.marzo = total_sugerencias_respondidas_3 + '/' + total_sugerencias_reportadas_3;

          let  div_4 = total_sugerencias_respondidas_4 / total_sugerencias_reportadas_4;
          div_4 = (isNaN(div_4)) ? 0 : div_4 * 100;
          this.abril = total_sugerencias_respondidas_4 + '/' + total_sugerencias_reportadas_4;

          let  div_5 = total_sugerencias_respondidas_5 / total_sugerencias_reportadas_5;
          div_5 = (isNaN(div_5)) ? 0 : div_5 * 100;
          this.mayo = total_sugerencias_respondidas_5 + '/' + total_sugerencias_reportadas_5;

          let  div_6 = total_sugerencias_respondidas_6 / total_sugerencias_reportadas_6;
          div_6 = (isNaN(div_6)) ? 0 : div_6 * 100;
          this.junio = total_sugerencias_respondidas_6 + '/' + total_sugerencias_reportadas_6;

          let  div_7 = total_sugerencias_respondidas_7 / total_sugerencias_reportadas_7;
          div_7 = (isNaN(div_7)) ? 0 : div_7 * 100;
          this.julio = total_sugerencias_respondidas_7 + '/' + total_sugerencias_reportadas_7;

          let  div_8 = total_sugerencias_respondidas_8 / total_sugerencias_reportadas_8;
          div_8 = (isNaN(div_8)) ? 0 : div_8 * 100;
          this.agosto = total_sugerencias_respondidas_8 + '/' + total_sugerencias_reportadas_8;

          let  div_9 = total_sugerencias_respondidas_9 / total_sugerencias_reportadas_9;
          div_9 = (isNaN(div_9)) ? 0 : div_9 * 100;
          this.septiembre = total_sugerencias_respondidas_9 + '/' + total_sugerencias_reportadas_9;

          let  div_10 = total_sugerencias_respondidas_10 / total_sugerencias_reportadas_10;
          div_10 = (isNaN(div_10)) ? 0 : div_10 * 100;
          this.octubre = total_sugerencias_respondidas_10 + '/' + total_sugerencias_reportadas_10;

          let  div_11 = total_sugerencias_respondidas_11 / total_sugerencias_reportadas_11;
          div_11 = (isNaN(div_11)) ? 0 : div_11 * 100;
          this.noviembre = total_sugerencias_respondidas_11 + '/' + total_sugerencias_reportadas_11;

          let  div_12 = total_sugerencias_respondidas_12 / total_sugerencias_reportadas_12;
          div_12 = (isNaN(div_12)) ? 0 : div_12 * 100;
          this.diciembre = total_sugerencias_respondidas_12 + '/' + total_sugerencias_reportadas_12;

         total = [
          ['Enero', div_1],
          ['Febrero', div_2],
          ['Marzo', div_3],
          ['Abril', div_4],
          ['Mayo', div_5],
          ['Junio', div_6],
          ['Julio',div_7],
          ['Agosto', div_8],
          ['Septiembre', div_9],
          ['Octubre', div_10],
          ['Noviembre', div_11],
          ['Diciembre', div_12]
      ];

      let data = [];
      for (var i = 0; i < total.length; i++) {
        if (total[i][1] >0 ) {
          data.push(total[i]);
        }
      }

         this.mostrar_grafico(data, year);
        }else{
          swal("Error", "No hay datos registrados para el año seleccionado", "warning");
          this.enero = null;
          this.febrero = null;
          this.marzo = null;
          this.abril = null;
          this.mayo = null;
          this.junio = null;
          this.julio = null;
          this.agosto = null;
          this.septiembre = null;
          this.octubre = null;
          this.noviembre = null;
          this.diciembre = null;
          this.mostrar_grafico(0,this.anio_filtro);
        }

        });
      },
      mostrar_grafico(total, year){

        Highcharts.chart('grafico_16', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Porcentaje de sugerencias atendidas oportunamente'
          },
          subtitle: {
              text: 'Año ' + year
          },
          xAxis: {
              type: 'category',

          },
          yAxis: {

              title: {
                  text: 'N° de sugerencias respondidas oportunamente / N° de sugerencias reportadas <br> Porcentaje'
              }
          },
          legend: {
              enabled: false
          },
          plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
          tooltip: {
              pointFormat: 'Porcentaje de sugerencias atendidas oportunamente: <b>{point.y:.1f} %</b>'
          },
          credits: {
              enabled: false
          },
          series: [{
              name: 'Population',
              "colorByPoint": true,
              data:total,

          }]
      });


      }
    }
  })
