Vue.component('indicador_9',{
  template:'#indicador_9',
  data:()=>({

    cabecera:[],
    tabla_valores:[],
    anio: moment().format("YYYY"),
    mes:moment().format("MM"),
  }),
  created:function(){
  },mounted:function(){
    this.cargar();

  },methods:{
    cargar()
    {
       let fechaini = moment(this.anio + '-'+ this.mes + '-2').startOf('month').format("YYYY-MM-DD");
       let fechafin   = moment(this.anio + '-'+ this.mes + '-6').endOf('month').format("YYYY-MM-DD");

      let where = {};
      this.cabecera = [];
      this.tabla_valores = [];
      where.fecha =['date_format(fecha,"%Y-%m-%d")','BETWEEN',fechaini,fechafin];
      this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref9',where:where}).then(function(response){
        let body = response.body.atributos;


        if (!isempty(body)) {
            //obtengo número de semanas
            let number_weeks = getWeekNums(this.anio + '-'+ this.mes + '-1');


            let semanasstr = [];
            let num = 0;
            let date='';
            let array_citas_programadas=[];
            let array_citas_entregadas=[];
            let array_valor_tabla=[];
            let total_semanas_ini = moment(fechaini).isoWeek();

            for (var i = 0; i < number_weeks; i++) {


             let   valor_acumulado_programadas=0;
             let   valor_acumulado_entregadas=0;
                //armo el array de semanas
                num = num + 1;
                semanasstr.push('Semana ' + num);

                for (var u = 0; u < body.length; u++) {

                    if(moment(body[u]["fecha"]).isoWeek()==total_semanas_ini){
                        valor_acumulado_programadas = (valor_acumulado_programadas == 0)?
                        parseFloat(body[u]["citas_programadas"]): (parseFloat(valor_acumulado_programadas) + parseFloat(body[u]["citas_programadas"]));
                        valor_acumulado_entregadas = (valor_acumulado_entregadas == 0)?
                        parseFloat(body[u]["citas_entregadas"]): (parseFloat(valor_acumulado_entregadas) + parseFloat(body[u]["citas_entregadas"]));
                    }

                }
                total_semanas_ini++;
                array_citas_programadas[i]=valor_acumulado_programadas;
                array_citas_entregadas[i]=valor_acumulado_entregadas;
                array_valor_tabla[i] = ((valor_acumulado_entregadas/(isempty(parseFloat(valor_acumulado_programadas))?1:valor_acumulado_programadas))*100).toFixed(2);


            }
            this.cabecera = semanasstr;
            this.tabla_valores = array_valor_tabla;

            this.mostrar_grafico(array_citas_entregadas,array_citas_programadas);
        }else{

            this.mostrar_grafico(0,0);
          swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
        }

      });
    },
    mostrar_grafico(entregadas,programadas){

       var chart = Highcharts.chart('indicador_9', {
          chart: {
              type: 'column'
          },
          title: {
              text: ('Tasa de atención de citas: '+$('#select option:selected').html())
          },
          subtitle:{
              text: moment(this.mes, 'MM').format('MMMM') + ' ' + this.anio
          },
          xAxis: {
              categories: this.cabecera
          },
          yAxis: [{
              min: 0,
              title: {
                  text: 'N° de citas'
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
            useHTML: true,
            valueDecimals: 2,
            shared:false,
            formatter: function () {
              var entregadas = chart.series[1].data[this.series.data.indexOf( this.point )].y;
                var programadas = chart.series[0].data[this.series.data.indexOf( this.point )].y;
                var total = '';
                  total = ('<small> '+this.x+'</small><table><tr><td style="color: '+this.series.color+'">N° de citas atendidas/N° de citas programadas: </td>' +
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
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: true
              }
          },
          series: [{
              name: 'N° de citas programadas',
              data: programadas,
              color: 'rgba(165,170,217,1)',

              pointPadding: 0.3,
              pointPlacement: 0.
          }, {
              name: 'N° de citas atendidas',
              data: entregadas,
              color: 'rgba(126,86,134,.9)',

              pointPadding: 0.4,
              pointPlacement: 0
          }]
      });
    }
  }
})
