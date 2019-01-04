Vue.component('indicador_5',{
    template:'#indicador_5',
    data:()=>({
      incidencias_resueltas:[],
      incidencias_identificadas:[],
      incidencias_resueltas_t2:[],
      incidencias_identificadas_t2:[],
      turno_1:[],
      turno_2:[],
      t1:[],
      t2:[],
      anio: moment(new Date()).format("YYYY"),
      meses:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
    }),
    created:function(){
    },mounted:function(){
      this.cargar();
      this.mostrar_grafico();
    },methods:{
      cargar()
      {

        this.incidencias_resueltas=[];
        this.incidencias_identificadas=[];
        this.incidencias_resueltas_t2=[];
        this.incidencias_identificadas_t2=[];
        this.turno_1=[];
        this.turno_2=[];
        this.t1=[];
        this.t2=[];
        let where = {'anio': this.anio, 'estado':1};


        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref5',where:where}).then(function(response){
          let body = response.body.atributos;
          let arr =[],tableobj = '', dias_new=[],ticks_aband_total='';

          if (!isempty(body)) {
            let turno_1 = [], turno_2=[];
            let res= body.map(function(e) { return (moment(e.mes,'MM').format('MMMM')); });

            for (var i = 0; i < this.meses.length; i++) {

              if (res.indexOf(this.meses[i])>=0) {

                this.t1.push(((body[res.indexOf(this.meses[i])]["incidentes_resueltos"])+"/"+body[res.indexOf(this.meses[i])]["incidentes_identificados"]));
                this.t2.push(((body[res.indexOf(this.meses[i])]["incidentes_resueltos_t2"])+"/"+body[res.indexOf(this.meses[i])]["incidentes_identificados_t2"]));
                this.turno_1.push(parseFloat((((body[res.indexOf(this.meses[i])]["turno_1"])/body[res.indexOf(this.meses[i])]["turno_2"])*100).toFixed(2))  );
                this.turno_2.push(parseFloat(((body[res.indexOf(this.meses[i])]["turno_2"]/body[res.indexOf(this.meses[i])]["turno_2"])*100).toFixed(2)));
              }else{
                this.t1.push(0);
                this.t2.push(0);
                this.turno_1.push(0);
                this.turno_2.push(0);
              }
            }
            this.mostrar_grafico(this.turno_1,this.turno_2);
          }else{
            swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
            this.mostrar_grafico(this.turno_1,this.turno_2);
          }
        });
      },
      mostrar_grafico(turno_1,turno_2){
        // Create the chart

        var chart= Highcharts.chart('grafico_5', {
            chart: {
                type: 'column'
            },
            title: {
                text: ('Efectividad de las acciones implementadas sobre incidencias ')
            },
            subtitle: {
                text: this.anio
            },
            xAxis: {
                categories: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'N° incidentes resueltos / N° incidentes identificados <br> Porcentaje'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} % </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,

            },
            credits:{
                enabled:false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                       enabled: true,
                       format: '<b>{point.name}</b><br>{point.y} %',
                   },
                   enableMouseTracking: true
                }
            },
            series: [{
                name: 'Turno 1',
                data: turno_1

            }, {
                name: 'Turno 2',
                data: turno_2

            }]
        });
      }
    }
  })
