Vue.component('indicador_11_1',{
  template:'#indicador_11_1',
  data:()=>({
    tickets:[],
    hora:[],
    fecha: moment(new Date()).format("YYYY-MM-DD"),
  }),
  created:function(){
  },mounted:function(){
    this.cargar();
    //this.mostrar_grafico('');
  },methods:{
    cargar()
    {
      //let where = {},groupby={},campos={};
      let where = {};
      let fecha = $('.dtp_fecha_indicador_11_1').val();
      this.fecha=fecha
      this.tickets = [];
      this.hora = [];
      where.fecha =['date_format(fecha,"%Y-%m-%d")',fecha];
      //where.fecha =['date_format(fecha,"%Y-%m-%d ")',this.fecha];
      this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref11_1',where:where}).then(function(response){
        let body = response.body.atributos;
        let arr =[],arr2=[],ticketsjson = '';
        if (!isempty(body)) {
          for (var x = 0; x < body.length; x++) {
            ticketsjson = JSON.parse(body[x]['ticketsjson']);
            if (Array.isArray(ticketsjson)) {
              for (var i = 0; i < ticketsjson.length; i++) {
                arr.push(ticketsjson[i]['tickets']);
                arr2.push(ticketsjson[i]['hora']);
                this.tickets.push({value: ticketsjson[i]['tickets'] }) ;
                this.hora.push({value: ticketsjson[i]['hora'] }) ;
              }
            }else{
              arr.push(ticketsjson['tickets']);
              arr2.push(ticketsjson['hora']);
              this.tickets.push({value: ticketsjson['tickets'] }) ;
              this.hora.push({value: ticketsjson['hora'] }) ;
            }
          }
          this.mostrar_grafico(arr2,arr);
        }else{
          swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
        }
      });
    },
    mostrar_grafico(horas,tickets){

Highcharts.chart('indicador_11_1', {
    chart: {
        type: 'area',
        spacingBottom: 30
    },
    title: {
        text: ('Tickets de Atención x Hora ')
    },
    subtitle: {
        text: 'Fecha: '+ moment(this.fecha).format("DD-MM-YYYY"),
        floating: true,
        align: 'right',
        verticalAlign: 'bottom',
        y: 15
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories: horas
    },
    yAxis: {
        title: {
            text: 'N° de tickets generados x hora'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        formatter: function () {

            return 'De '+this.x+':00 a '+(parseFloat(this.x)+1)+':00 <br/> han sido emitidos <b>'+this.y+'</b> tickets';
        }
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Diario',
        data: tickets
    }]
});
      /*Highcharts.chart('indicador_11_1', {
          chart: {
              type: 'area'
          },
          title: {
              text: 'Tickets de atencion x hora'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              allowDecimals: false,
              categories: ['8:00','9:00']

          },
          yAxis: {
              title: {
                  text: 'N° de tickets generados x hora'
              },
              labels: {
                  formatter: function () {
                      return this.value ;
                  }
              }
          },
          tooltip: {
              pointFormat: 'A las {point.x}:00 <br/> han sido emitidos <b>{point.y:,.0f}</b> tickets'
          },
          plotOptions: {
              area: {
                  pointStart: 8,
                  marker: {
                      enabled: true,
                      symbol: 'circle',
                      radius: 3,
                      states: {
                          hover: {
                              enabled: true
                          }
                      }
                  },
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          series: [{
              name: 'Tickets de atención',
              data: [20, 40
              ]
          }]
      });*/
    }
  }
})
