Vue.component('indicador_19', {
    template: '#indicador_19',
    data:()=>({
      atributos : [],
      valores : {},
      personal_con_induccion : null,
      mostrar:false,
      semestre: 1,
      anio:moment().format("YYYY"),
      anio_filtro : moment().format("YYYY"),
      semestre_1: '',
      semestre_2: '',


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

        if( moment().format("MM")  == 7 || moment().format("MM")  == 8 || moment().format("MM")  == 9 || moment().format("MM")  == 10 ||
        moment().format("MM")  == 11 || moment().format("MM")  == 12 ){

            if(  this.semestre == 1 && this.anio > moment().format("YYYY") ){
              swal("Error", "No puedes ingresar registros con un semestre superior al semestre actual", "warning");
              return false;
            }
          }else{

            if( this.semestre > 1 && ( this.anio >= moment().format("YYYY")) ){
              swal("Error", "No puedes ingresar registros con un semestre superior al semestre actual", "warning");
              return false;
            }
        }

        let insert = {"personal_con_induccion":this.personal_con_induccion, "tmp_personal_con_induccion":this.personal_con_induccion, "total_personal":0, "semestre":this.semestre, "anio":this.anio};
        let update = {"personal_con_induccion":this.personal_con_induccion };
        let temporal = {"tmp_personal_con_induccion":this.personal_con_induccion };
        let where = { "semestre":this.semestre, "anio":this.anio};


        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref19',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
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
           where = {'anio':year, 'estado':1};

        }else{
          year = this.anio_filtro;
          where = {'anio':e.target.value, 'estado':1};
        }

        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref19',where:where}).then(function(response){
          this.atributos = response.body.atributos;

          if(this.atributos != undefined){
            let total_personal_total_1 = 0;
            let total_personal_con_induccion_1 = 0;
            let total_personal_total_2 = 0;
            let total_personal_con_induccion_2 = 0;

            for (var i = 0; i <  this.atributos.length; i++) {
              let m = this.atributos[i].semestre;
              if( m == 1  ){
                total_personal_total_1 = (total_personal_total_1) + (parseFloat(this.atributos[i].total_personal));
                total_personal_con_induccion_1 = (total_personal_con_induccion_1) + (parseFloat(this.atributos[i].personal_con_induccion));
              }else if ( m == 2 ) {
                total_personal_total_2 = (total_personal_total_2) + (parseFloat(this.atributos[i].total_personal));
                total_personal_con_induccion_2 = (total_personal_con_induccion_2) + (parseFloat(this.atributos[i].personal_con_induccion));
              }
            }

            this.semestre_1 = total_personal_con_induccion_1 + '/' + total_personal_total_1;
            this.semestre_2 = total_personal_con_induccion_2 + '/' + total_personal_total_2;

            let categoria = [];

            let total1 = [
                total_personal_total_1,
                total_personal_total_2

               ];
               let total2 = [
                total_personal_con_induccion_1,
                total_personal_con_induccion_2

                ];
                let t = 1;
                let data1 = [],  data2 = [];
                for (var i = 0; i < total1.length; i++) {
                    if (total1[i] >0 ) {
                    data1.push(total1[i]);
                    data2.push(total2[i]);
                    let r = romanize(t);
                    categoria.push('Semestre ' + r);
                    }
                    t++;
                }
                this.mostrar_grafico(data1, data2,categoria, year);

          }else{
            swal("Error", "No hay datos registrados para el año seleccionado", "warning");
            this.semestre_1 = null;
            this.semestre_2 = null;

            this.mostrar_grafico(0,0,0,this.anio_filtro);
          }

        });
      },
      mostrar_grafico(data1, data2,categoria,year){
    var chart=    Highcharts.chart('grafico_19', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Cobertura de difusión de la estrategia MAC al personal'
            },
            subtitle:{
                text: 'Año ' + year
            },
            xAxis: {
                categories: categoria
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'N° de personal al que se le impartió la inducción / N° total de personal'
                }
            }, {
                title: {
                    text: ''
                },
                opposite: true
            }],
            legend: {
                shadow: false
            },
            tooltip: {
                shared: false,
                useHTML: true,
                valueDecimals: 2,
                formatter: function () {
                    var entregadas = chart.series[1].data[this.series.data.indexOf( this.point )].y;
                      var programadas = chart.series[0].data[this.series.data.indexOf( this.point )].y;

                      var total = '';
                        total = ('<small> '+this.x+'</small><table><tr><td style="color: '+this.series.color+'">Porcentaje de inducción al personal: </td>' +
                            '<td style="text-align: right"><b>'+(((entregadas/programadas)*100).toFixed(2))+'%</b></td></tr></table>');

                      return total;
                  }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0,
                    dataLabels:{
                        enabled: true
                      }
                }
            },
            series: [{
                name: 'N° total de personal',
                data: data1,
                color: 'rgba(248,161,63,1)',

                pointPadding: 0.35,
                pointPlacement: 0
            }, {
                name: 'N° de personal al que se le impartió la inducción',
                data:data2,
                color: 'rgba(186,60,61,.9)',

                pointPadding: 0.4,
                pointPlacement: 0
            }]
        });

      }
    }
  })
