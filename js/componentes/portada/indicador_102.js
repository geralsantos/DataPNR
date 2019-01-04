Vue.component('indicador_102',{
    template:'#indicador_102',
    data:()=>({

        entidades:[],
        turno_1:[],
        turno_2:[],
        fecha: moment(new Date()).format("YYYY-MM-DD"),
        dias:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        dia: moment((new Date()), "YYYY-MM-DD HH:mm:ss").format('dddd')

    }),
    created:function(){
    },mounted:function(){
     this.cargar();
      //this.mostrar_grafico();
    },methods:{
      cargar()
      {
        let where = {};
        let fecha = $('.dtp_fecha_indicador_102').val();
        this.fecha = moment(fecha,'YYYY-MM-DD').format("YYYY-MM-DD");
        this.entidades=[];
        this.turno_1=[];
        this.turno_2=[];
        where.fecha=['date_format(fecha,"%Y-%m-%d")',fecha];
        this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref102',where:where}).then(function(response){
            let body = response.body.atributos;
            let arr =[];
            if (!isempty(body)) {
                for (var i = 0; i < body.length; i++) {
                this.entidades.push(body[i]["entidad"]);
                this.turno_1.push(parseFloat(body[i]["turno_1"]));
                this.turno_2.push(parseFloat(body[i]["turno_2"]));

                }

            this.mostrar_grafico(this.entidades,  this.turno_1, this.turno_2, fecha);
            }else{
            swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");

            this.mostrar_grafico(0,0,0, fecha);
            }
        });
      },
      mostrar_grafico(entidades,turno_1,turno_2,fecha){

        Highcharts.chart('grafico_102', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Control de Asistencia'
    },
    subtitle: {
        text: fecha
    },
    xAxis: {
        categories: entidades,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'N° de Personas que tienen Hora de asistencia mayor o igual a la hora inicio de turno'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
            dataLabels: {
                enabled: true
            }
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
