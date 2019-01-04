Vue.component('indicador_106',{
    template:'#indicador_106',
    data:()=>({
      cantidades:[],
      entidades:[],
      fecha: moment(new Date()).format("YYYY-MM-DD"),
    }),
    created:function(){
    },mounted:function(){
      this.cargar();
    },methods:{
      cargar()
      {
        this.entidades = [];
        this.cantidades = [];
        let where = {};
        let fecha = $('.dtp_fecha_indicador_106').val();
        this.fecha=fecha
        where.fecha =['date_format(fecha,"%Y-%m-%d")',fecha];
        this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref106',where:where}).then(function(response){
          let body = response.body.atributos;
          let arr =[],asistencia_entidad_json = '';

          if (!isempty(body)) {


            for (var x = 0; x < body.length; x++) {
              asistencia_entidad_json = JSON.parse(body[x]['asistencia_entidad_json']);
              if (Array.isArray(asistencia_entidad_json)) {
                for (var i = 0; i < asistencia_entidad_json.length; i++) {

                  arr.push({name: (asistencia_entidad_json[i]['Entidad']),y: parseFloat(asistencia_entidad_json[i]['cantidad']),drilldown:asistencia_entidad_json[i]['Entidad'] });

                }
              }else{
                arr.push({name: (asistencia_entidad_json['Entidad']),y: parseFloat(asistencia_entidad_json['cantidad']),drilldown:asistencia_entidad_json['Entidad'] });

              }
            }
            var arr_ordenado = arr.slice(0);
            arr_ordenado.sort(function(a,b) {
                var x = a.y;
                var y = b.y;
                return x < y ? -1 : x > y ? 1 : 0;
            });

            for (var i = 0; i < arr_ordenado.length; i++) {

                this.entidades.push({value: arr_ordenado[i]['name'] });
                this.cantidades.push({value: parseFloat(arr_ordenado[i]['y']) }) ;

            }

            this.mostrar_grafico(arr_ordenado);
          }else{
            swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
            this.mostrar_grafico(0);
          }
        });
      },

      mostrar_grafico(data){
        var self = this;
        // Create the chart
        var char = Highcharts.chart('indicador_106', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ranking de atenciones diarias  por entidad'
            },
            subtitle: {
                text: 'Fecha: '+ moment(this.fecha).format("DD-MM-YYYY")
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Número de atenciones diarias'
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
                        formatter: function () {
                            return parseFloat(this.series.data[this.series.data.indexOf( this.point )].y);
                          }
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f} minuto(s)</b> aproximadamente<br/>',
                formatter: function () {
                    return '<span style="font-size:11px">'+this.series.name+'</span><br><span style="color:'+this.point.color+'">'+this.point.name+'</span>: <b>'+parseFloat(this.series.data[this.series.data.indexOf( this.point )].y)+'</b> asistencias<br/>';
                  }
            },
            credits:{
                enabled:false
            },

            series: [
                {
                    name: "Entidad",
                    colorByPoint: true,
                    data: data
                }
                ]
        });
      }
    }
  })
