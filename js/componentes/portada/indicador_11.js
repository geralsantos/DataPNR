Vue.component('indicador_11',{
  template:'#indicador_11',
  data:()=>({
    personas:[],
    servicios:[],
    personas_total:[],
    fecha: moment(new Date()).format("YYYY-MM-DD"),
  }),
  created:function(){
  },mounted:function(){
    this.cargar();
  },methods:{
    cargar()
    {
      let where = {};
      let fecha = $('.dtp_fecha_indicador_11').val();
      this.fecha=fecha
      this.servicios = [];
      this.personas = [];
      this.personas_total=[];
      where.fecha =['date_format(fecha,"%Y-%m-%d")',fecha];
      this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref11',where:where}).then(function(response){
        let body = response.body.atributos;
        let arr =[],serviciosjson = '';
        if (!isempty(body)) {
          for (var x = 0; x < body.length; x++) {
            serviciosjson = JSON.parse(body[x]['serviciosjson']);
            if (Array.isArray(serviciosjson)) {
              for (var i = 0; i < serviciosjson.length; i++) {
                arr.push({name: (serviciosjson[i]['servicios']+' Servicio(s)'),y: serviciosjson[i]['personas'],sliced:true,selected:true });
                this.servicios.push({value: serviciosjson[i]['servicios'] });
                this.personas.push({value: serviciosjson[i]['personas'] }) ;
                this.personas_total.push({value: serviciosjson[i]['personas_total'] }) ;

              }
            }else{
              arr.push({name: (serviciosjson['servicios']+' Servicio(s)'),y: serviciosjson['personas'],sliced:true,selected:true });
              this.servicios.push({value: serviciosjson['servicios'] });
              this.personas.push({value: serviciosjson['personas'] }) ;
                this.personas_total.push({value: serviciosjson['personas_total'] }) ;

            }
          }
          this.mostrar_grafico(arr);
        }else{
          swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
        }
      });
    },
    mostrar_grafico(data){
      Highcharts.chart('indicador_11', {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: ('Ratio de atención por número de tickets emitidos ')
          },
          subtitle: {
              text: 'Fecha: '+ moment(this.fecha).format("DD-MM-YYYY")
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          credits: {
              enabled: false
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.y} personas ',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  }
              }
          },
          series: [{
              name: 'Cantidad de Personas',
              colorByPoint: true,
              data: data
          }]
      });
    }
  }
})
