Vue.component('indicador_14',{
  template:'#indicador_14',
  data:()=>({
    ticks_abandonados:[],
    fecha: moment(new Date()).format("YYYY-MM-DD"),
    dias:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
    dia: moment((new Date()), "YYYY-MM-DD HH:mm:ss").format('dddd'),
    semana_inicio:null,
    semana_fin:null,
  }),
  created:function(){
  },mounted:function(){
    this.cargar();
  },methods:{
    cargar()
    {
      let where = {};
      let fecha = $('.dtp_fecha_indicador_14').val();
      this.fecha = fecha;
      this.ticks_abandonados=[];
      let namefecha = moment((fecha), "YYYY-MM-DD HH:mm:ss").format('dddd'),
      diasemanaini= this.dias.indexOf(toLower(namefecha)),
      diasemanafin= this.dias.length-(diasemanaini+1),
      fechaini= moment(fecha).subtract(diasemanaini,'days').format("YYYY-MM-DD"),
      fechafin= moment(fecha).add(diasemanafin,'days').format("YYYY-MM-DD");
      where.fecha =['date_format(fecha,"%Y-%m-%d")','BETWEEN',fechaini,fechafin];

      this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref14',where:where}).then(function(response){
        let body = response.body.atributos;
        let arr =[],tableobj = '', dias_new=[],ticks_aband_total='';

        if (!isempty(body)) {
          tableobj = body;
            for (var i = 0; i < this.dias.length; i++) { // recorremos todos los dias
              let res = tableobj.map(function(e) { return toLower(moment(e.fecha,"YYYY-MM-DD HH:mm:ss").format('dddd')); });
              //res:= obtengo el array de los dias que me devuelve el body
            if (res.indexOf(this.dias[i])>=0) { // valido que el dia se encuentre en el array de dias que trae el body
              ticks_aband_total = JSON.parse(tableobj[res.indexOf(this.dias[i])]['ticks_aband_total']);
                dias_new.push(parseFloat(ticks_aband_total['ticks_aband_total']) ); // el "res.indexOf(this.dias[i])" devuelve el indice exacto de donde se encuentra el dia de lo que trae el body
                this.ticks_abandonados.push({aband: ticks_aband_total['ticks_aband'],total: ticks_aband_total['ticks_total'] });
            }else{ // no encuentra match y ese dia se llena con cero
              dias_new.push(0);
              this.ticks_abandonados.push(0);
            }
          }
            /*for (var i = 0; i < this.dias.length; i++) {
              if (this.dias[i] == toLower(moment(body[x]['fecha'],"YYYY-MM-DD HH:mm:ss").format('dddd'))) {
                dias_new.push(parseFloat(tableobj['ticks_aband_total']));
                this.ticks_abandonados.push({aband: tableobj['ticks_aband'],total: tableobj['ticks_total'] });
              }else{
                dias_new.push(0);
                this.ticks_abandonados.push(0);
              }
            }*/
            this.semana_inicio = moment(this.fecha).weekday(1).format('DD-MM-YYYY');
          this.semana_fin = moment(this.fecha).weekday(7).format('DD-MM-YYYY');
          this.mostrar_grafico(dias_new);
        }else{
          swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
        }
      });
    },
    mostrar_grafico(data){
      // Create the chart

      Highcharts.chart('indicador_14', {
          chart: {
              type: 'areaspline'
          },
          title: {
              text: 'Tasa de tickets en abandono'
          },
          subtitle: {
                text: 'Semana del : '+ this.semana_inicio + ' al ' + this.semana_fin
          },
          legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 150,
              y: 100,
              floating: true,
              borderWidth: 1,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          xAxis: {
              categories: [
                  'Lunes',
                  'Martes',
                  'Miércoles',
                  'Jueves',
                  'Viernes',
                  'Sábado',
                  'Domingo'
              ],
              plotBands: [{ // visualize the weekend
                  from: 4.5,
                  to: 6.5,
                  color: 'rgba(68, 170, 213, .2)'
              }]
          },
          yAxis: {
              title: {
                  text: 'N° de tickets abandonados / N° de tickets totales'
              }
          },
          tooltip: {
              shared: true,
              valueSuffix: '%'
          },
          credits: {
              enabled: false
          },
          plotOptions: {
              areaspline: {
                  fillOpacity: 0.5,
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b><br>{point.y:.1f} %',
                  }
              },

          },
          series: [/*{
              name: 'N° de tickets abandonados ',
              data: [1, 3, 4, 3, 3, 5, 4]
          }, */{
              name: 'Porcentaje de la tasa de tickets en abandono',

              data: data
          }]
      });
    }
  }
})
