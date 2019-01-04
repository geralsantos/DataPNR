Vue.component('indicador_104',{
  template:'#indicador_104',
  data:()=>({
    recibidas:[],
    atendidas:[],
    atendidas_seg:[],
    mostrar:false,
    nivel_servicio:[],
    recibidas_prom:0,
    atendidas_prom:0,
    atendidas_seg_prom:0,
    nivel_servicio_prom:0,
    anio: moment(new Date()).format("YYYY"),
    meses:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
    mes:moment(new Date()).format("M"),
    mes_search:moment(new Date()).format("M"),
    anio_search:moment(new Date()).format("YYYY"),
    archivo:'',
  }),
  created:function(){
  },mounted:function(){
    this.verificar_nivel_usuario();
    this.cargar();
  },methods:{
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
          if(( parseFloat(this.anio) > parseFloat(moment().format("YYYY")) )){
            swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
              return false;
          }else{
            if(parseFloat(this.mes) > parseFloat(moment().format("MM")) ){
              swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
              return false;
            }
          }
      let where = {};
      this.recibidas_prom=0;
      this.atendidas_prom=0;
      this.atendidas_seg_prom=0;
      this.nivel_servicio_prom=0;
      this.recibidas=[];
      this.atendidas=[];
      this.atendidas_seg=[];
      this.nivel_servicio=[];
      this.nivel_servicio_porcent=[];
      this.anio_search = this.anio;
      this.mes_search = this.mes;
      where.anio =['date_format(anio,"%Y")',this.anio];
      where.mes =['date_format(mes,"%m")',this.mes];
      var formData = new FormData(document.getElementById("formuploadajax"))
      formData.append("archivo",document.getElementById('archivo'));
      formData.append("anio",(this.anio));
      formData.append("mes",(this.mes));
      this.$http.post('cargar_excel?view',formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function(response){

        let body = response.body;
/*$_SESSION["usuario"][0]["kpi_roles_id"] == '2'*/
        if (body.resultado) {

          swal("El archivo Excel se ha cargado con éxito","guardado sin problemas", "success");
          this.cargar();

        }else{
          if (!body.resultado) {

            swal("Acceso Denegado", body.mensaje , "error");
          this.mostrar_grafico(this.recibidas,this.atendidas,this.atendidas_seg);
          }else{
            swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
          this.mostrar_grafico(this.recibidas,this.atendidas,this.atendidas_seg);

          }
          }
      });
    },
    cargar()
    {
      let where = {};
      where.anio =['anio',this.anio_search];
      where.mes =['mes',this.mes_search];
      this.recibidas=[];
      this.atendidas=[];
      this.atendidas_seg=[];
      this.nivel_servicio=[];
      this.nivel_servicio_porcent=[];
      this.recibidas_prom=0;
      this.atendidas_prom=0;
      this.atendidas_seg_prom=0;
      this.nivel_servicio_prom=0;
      this.$http.post('cargar_datos_all?view',{tabla:"kpi_indicador_ref104",where:where}).then(function(response){
        let body = response.body.atributos;
        let dias = [];
        if (!isempty(body)) {
          let obj = body;
          for (var i = 0; i < obj.length; i++) {
            dias.push((i+1));
            this.recibidas_prom = parseFloat(this.recibidas_prom) + parseFloat(obj[i]["llamadas_recibidas"]);
            this.atendidas_prom = parseFloat(this.atendidas_prom) + parseFloat(obj[i]["llamadas_atendidas"]);
            this.atendidas_seg_prom= parseFloat(this.atendidas_seg_prom) + parseFloat(obj[i]["llamadas_atendidas_seg"]);
            this.nivel_servicio_prom= parseFloat(this.nivel_servicio_prom) + parseFloat(obj[i]["nivel_servicio"]),
            this.recibidas.push(parseFloat(obj[i]["llamadas_recibidas"]));
            this.atendidas.push(parseFloat(obj[i]["llamadas_atendidas"]));
            this.atendidas_seg.push(parseFloat(obj[i]["llamadas_atendidas_seg"]));
            this.nivel_servicio.push(parseFloat(obj[i]["nivel_servicio"]));
          }


          this.mostrar_grafico(this.recibidas,this.atendidas,this.atendidas_seg,dias);
        }else{
          swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
          this.mostrar_grafico(this.recibidas,this.atendidas,this.atendidas_seg,dias);
        }
      });
    },
    mostrar_grafico(recibidas,atendidas,nivel_servicio,dias){
      // Create the chart

      Highcharts.createElement('link', {
          href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
          rel: 'stylesheet',
          type: 'text/css'
      }, null, document.getElementsByTagName('head')[0]);

      Highcharts.theme = {
          colors: ['#7cb5ec', '#f7a35c', '#586675'],
          chart: {
              backgroundColor: null,
              style: {
                  fontFamily: 'Dosis, sans-serif'
              }
          },
          title: {
              style: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
              }
          },
          tooltip: {
              borderWidth: 0,
              backgroundColor: 'rgba(219,219,216,0.8)',
              shadow: false
          },
          legend: {
              itemStyle: {
                  fontWeight: 'bold',
                  fontSize: '13px'
              }
          },
          xAxis: {
              gridLineWidth: 1,
              labels: {
                  style: {
                      fontSize: '12px'
                  }
              }
          },
          yAxis: {
              minorTickInterval: 'auto',
              title: {
                  style: {
                      textTransform: 'uppercase'
                  }
              },
              labels: {
                  style: {
                      fontSize: '12px'
                  }
              }
          },
          plotOptions: {
              candlestick: {
                  lineColor: '#404048'
              }
          },


          // General
          background2: '#F0F0EA'

      };

      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);
      var chart = Highcharts.chart('grafico_104', {
          title: {
              text: 'Atenciones Totales Diarias'
          },
          subtitle: {
              text: (moment(this.mes_search,'MM').format("MMMM")+" "+this.anio_search)
          },
          xAxis: {
              categories: dias
          },
          yAxis: {
              min: 0,
              title: {
                  text: ''
              }
          },
          labels: {
              items: [{
                  html: 'Conocer el Nivel de Atención',
                  style: {
                      left: '50px',
                      top: '18px',
                      color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                  }
              }]
          },
          plotOptions: {
              column: {
                  grouping: false,
                  shadow: false,
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true
                  },
              },
              spline: {
                  dataLabels: {
                      enabled: true
                  },
              }
          },
          tooltip: {
              useHTML: true,
              headerFormat: '<small>{point.key}</small><table>',
              pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                  '<td style="text-align: right"><b>{point.percentage}</b></td></tr>',
              footerFormat: '</table>',
              valueDecimals: 2,
              formatter: function () {
                  var recibidas = chart.series[0].data[this.series.data.indexOf( this.point )].y;
                  var nivel_servicio = this.y;
                    recibidas = ('<small> Día '+this.x+'</small><table><tr><td style="color: '+this.series.color+'">'+this.series.name+': </td>' +
                        '<td style="text-align: right"><b>'+(((nivel_servicio/recibidas)*100).toFixed(2))+'%</b></td></tr></table>');
                        if (this.series.name != "Nivel de Servicio < 20 seg") {
                          recibidas = ('<small> Día '+this.x+'</small><table><tr><td style="color: '+this.series.color+'">'+this.series.name+': </td>' +
                              '<td style="text-align: right"><b>'+this.y+'</b></td></tr></table>');
                        }
                  return recibidas;
              }
          },
          credits:{
              enabled:false
          },
          series: [{
              type: 'column',
              name: 'Llamadas Recibidas',
              data: recibidas,
          }, {
              type: 'column',
              name: 'Llamadas Atendidas',
              pointPadding: 0.2,
              data: atendidas
          }, {
              type: 'spline',
              name: 'Nivel de Servicio < 20 seg',
              data: nivel_servicio, /*este resultado es con la columna (Llamadas Atendidas<20seg / Llamadas recibidas) * 100*/
              marker: {
                  lineWidth: 2,
                  lineColor: Highcharts.getOptions().colors[3],
                  fillColor: 'white'
              }

          }]
      });
    }
  }
})
