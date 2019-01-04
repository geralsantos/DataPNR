Vue.component('indicador_20', {
    template: '#indicador_20',
    data:()=>({
      atributos : [],
      valores : {},
      mostrar:false,
      capacitaciones_programadas : null,
      capacitaciones_ejecutadas : null,
      trimestre: moment().quarter(),
      anio:moment().format("YYYY"),
      anio_filtro : moment().format("YYYY"),
      trimestre_1: '',
      trimestre_2: '',
      trimestre_3: '',
      trimestre_4: ''



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
        let where = {};
        if(e==''){
           where = {'anio':year};

        }else{
          year = this.anio_filtro;
          where = {'anio':e.target.value};
        }
         // this.capacitaciones_programadas = null;
        //  this.capacitaciones_ejecutadas = null;
         // this.trimestre= moment().quarter();
         // this.anio=(new Date()).getFullYear();

        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref20',where:where}).then(function(response){
          this.atributos = response.body.atributos;

          if(this.atributos != undefined){
            let total_capacitaciones_programadas_1 = 0;
            let total_capacitaciones_ejecutadas_1 = 0;
            let total_capacitaciones_programadas_2 = 0;
            let total_capacitaciones_ejecutadas_2 = 0;
            let total_capacitaciones_programadas_3 = 0;
            let total_capacitaciones_ejecutadas_3 = 0;
            let total_capacitaciones_programadas_4 = 0;
            let total_capacitaciones_ejecutadas_4 = 0;


            for (var i = 0; i <  this.atributos.length; i++) {

              let m = this.atributos[i].trimestre;
              if( m == 1  ){
                total_capacitaciones_programadas_1 = (total_capacitaciones_programadas_1) + (parseFloat(this.atributos[i].capacitaciones_programadas));
                total_capacitaciones_ejecutadas_1 = (total_capacitaciones_ejecutadas_1) + (parseFloat(this.atributos[i].capacitaciones_ejecutadas));
              }else if ( m == 2 ) {

                total_capacitaciones_programadas_2 = (total_capacitaciones_programadas_2) + (parseFloat(this.atributos[i].capacitaciones_programadas));
                total_capacitaciones_ejecutadas_2 = (total_capacitaciones_ejecutadas_2) + (parseFloat(this.atributos[i].capacitaciones_ejecutadas));
              }else if ( m == 3 ) {
                total_capacitaciones_programadas_3 = (total_capacitaciones_programadas_3) + (parseFloat(this.atributos[i].capacitaciones_programadas));
                total_capacitaciones_ejecutadas_3 = (total_capacitaciones_ejecutadas_3) + (parseFloat(this.atributos[i].capacitaciones_ejecutadas));
              }else if ( m == 4 ) {
                total_capacitaciones_programadas_4 = (total_capacitaciones_programadas_4) + (parseFloat(this.atributos[i].capacitaciones_programadas));
                total_capacitaciones_ejecutadas_4 = (total_capacitaciones_ejecutadas_4) + (parseFloat(this.atributos[i].capacitaciones_ejecutadas));
              }

            }


            this.trimestre_1 = total_capacitaciones_ejecutadas_1 + '/' + total_capacitaciones_programadas_1;
            this.trimestre_2 = total_capacitaciones_ejecutadas_2 + '/' + total_capacitaciones_programadas_2;
            this.trimestre_3 = total_capacitaciones_ejecutadas_3 + '/' + total_capacitaciones_programadas_3;
            this.trimestre_4 = total_capacitaciones_ejecutadas_4 + '/' + total_capacitaciones_programadas_4;
            let categoria = [];

            let total1 = [
                total_capacitaciones_programadas_1,
                total_capacitaciones_programadas_2,
                total_capacitaciones_programadas_3,
                total_capacitaciones_programadas_4
               ];
               let total2 = [
                total_capacitaciones_ejecutadas_1,
                total_capacitaciones_ejecutadas_2,
                total_capacitaciones_ejecutadas_3,
                total_capacitaciones_ejecutadas_4
                ];
                let t = 1;
                let data1 = [],  data2 = [];
                for (var i = 0; i < total1.length; i++) {
                    if (total1[i] >0 ) {
                    data1.push(total1[i]);
                    data2.push(total2[i]);
                    let r = romanize(t);
                    categoria.push('Trimestre ' + r);
                    }
                    t++;
                }


            this.mostrar_grafico(data1, data2,categoria, year);

          }else{
            this.trimestre_1 = null;
            this.trimestre_2 = null;
            this.trimestre_3 = null;
            this.trimestre_4 = null;

            this.mostrar_grafico(0,0,0,this.anio_filtro);
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

        if( parseFloat(this.capacitaciones_programadas) < parseFloat(this.capacitaciones_ejecutadas)){
          swal("Error", "Las capacitaciones programadas no pueden ser menor a las capacitaciones ejecutadas, verifique.", "warning");
          return false;
        }
        let insert = {"capacitaciones_programadas":this.capacitaciones_programadas, "capacitaciones_ejecutadas":this.capacitaciones_ejecutadas,
                      "trimestre":this.trimestre, "anio":this.anio};
        let update = {"capacitaciones_programadas":this.capacitaciones_programadas, "capacitaciones_ejecutadas":this.capacitaciones_ejecutadas };
        let temporal = {"tmp_capacitaciones_programadas":this.capacitaciones_programadas, "tmp_capacitaciones_ejecutadas":this.capacitaciones_ejecutadas };
        let where = { "trimestre":this.trimestre, "anio":this.anio};
        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref20',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
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

      mostrar_grafico(data1, data2,categoria, year){

        var chart = Highcharts.chart('indicador_20', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Cumplimiento de los programas de capacitación/entrenamiento del personal'
            },
            subtitle: {
              text: 'Año ' + year
            },
            xAxis: {
                categories: categoria
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'N° de capacitaciones ejecutadas / N° capacitaciones programadas'
                }
            }, {

                opposite: true
            }],
            legend: {
                shadow: false
            },
            tooltip: {
              useHTML: true,
              valueDecimals: 2,
              shared:false,
              formatter: function () {
                var entregadas = chart.series[1].data[this.series.data.indexOf( this.point )].y;
                  var programadas = chart.series[0].data[this.series.data.indexOf( this.point )].y;
                  var total = '';
                    total = ('<small> '+this.x+'</small><table><tr><td style="color: '+this.series.color+'">Porcentaje de Cumplimiento de los programas de capacitación al personal: </td>' +
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
                name: 'N° de capacitaciones programadas',
                data: data1,
                color: 'rgba(248,161,63,1)',

                pointPadding: 0.35,
                pointPlacement: 0
            }, {
                name: 'N° de capacitaciones ejecutadas',
                data: data2,
                color: 'rgba(186,60,61,.9)',

                pointPadding: 0.4,
                pointPlacement: 0
            }]
        });
      }
    }
  })
