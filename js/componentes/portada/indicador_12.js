Vue.component('indicador_12',{
  template:'#indicador_12',
  data:()=>({
    promedios:[],
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
      this.promedios = [];
      let where = {};
      let fecha = $('.dtp_fecha_indicador_12').val();
      this.fecha=fecha
      where.fecha =['date_format(fecha,"%Y-%m-%d")',fecha];
      this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref12',where:where}).then(function(response){
        let body = response.body.atributos;
        let arr =[],prom_enti_json = '';
        if (!isempty(body)) {
          for (var x = 0; x < body.length; x++) {
            prom_enti_json = JSON.parse(body[x]['prom_enti_json']);
            if (Array.isArray(prom_enti_json)) {
              for (var i = 0; i < prom_enti_json.length; i++) {

                arr.push({name: (prom_enti_json[i]['Entidad']),y: parseFloat(prom_enti_json[i]['promedio']),drilldown:prom_enti_json[i]['Entidad'] });
                this.entidades.push({value: prom_enti_json[i]['Entidad'] });
                this.promedios.push({value: this.hora_min_seg(parseFloat(prom_enti_json[i]['promedio'])) }) ;
              }
            }else{
              arr.push({name: (prom_enti_json['Entidad']),y: parseFloat(prom_enti_json['promedio']),drilldown:prom_enti_json['Entidad'] });
              this.entidades.push({value: prom_enti_json['Entidad'] });
              this.promedios.push({value: this.hora_min_seg(parseFloat(prom_enti_json['promedio'])) }) ;
            }
          }
          this.mostrar_grafico(arr);
        }else{
          swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
        }
      });
    },
    hora_min_seg(time){
      time = time *60;
      var hours = Math.floor( time / 3600 );
      var minutes = Math.floor( (time % 3600) / 60 );
      var seconds = Math.floor(time % 60);
      //Anteponiendo un 0 a los minutos si son menos de 10
      minutes = minutes < 10 ? '0' + minutes : minutes;
      //Anteponiendo un 0 a los segundos si son menos de 10
      seconds = seconds < 10 ? '0' + seconds : seconds;
      var result = hours + ":" + minutes + ":" + seconds;  // 2:41:30
      return result;
    },
    mostrar_grafico(data){
      var self = this;
      // Create the chart
      var char = Highcharts.chart('indicador_12', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Tiempo Promedio de Espera del ciudadano por Trámite'
          },
          subtitle: {
              text: 'Fecha: '+ moment(this.fecha).format("DD-MM-YYYY")
          },
          xAxis: {
              type: 'category'
          },
          yAxis: {
              title: {
                  text: 'Hora de inicio de atención - (Hora de emisión de ticket u Hora de derivación) <br> Promedio de tiempo de espera por entidad'
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
                          return self.hora_min_seg(parseFloat(this.series.data[this.series.data.indexOf( this.point )].y));
                        }
                  }
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f} minuto(s)</b> aproximadamente<br/>',
              formatter: function () {
                  return '<span style="font-size:11px">'+this.series.name+'</span><br><span style="color:'+this.point.color+'">'+this.point.name+'</span>: <b>'+self.hora_min_seg(parseFloat(this.series.data[this.series.data.indexOf( this.point )].y))+'</b> aproximadamente<br/>';
                }
          },
          credits:{
              enabled:false
          },

          series: [
              {
                  name: "Promedio Minuto(s)",
                  colorByPoint: true,
                  data: data
              }
              ]
      });
    }
  }
})
