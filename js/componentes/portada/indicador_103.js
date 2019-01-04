Vue.component('indicador_103',{
    template:'#indicador_103',
    data:()=>({

        tiempo_espera:[],
        numero_asesores:[],
        numero_personas_asisten_MAC:[],
        fecha: moment(new Date()).format("YYYY-MM-DD"),
        dias:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        dia: moment((new Date()), "YYYY-MM-DD HH:mm:ss").format('dddd'),
        semana_inicio:null,
        semana_fin:null,

    }),
    created:function(){
    },mounted:function(){
     this.cargar();
     // this.mostrar_grafico();
    },methods:{
      cargar()
      {
        let where = {};
        let fecha = $('.dtp_fecha_indicador_103').val();
        this.fecha = fecha;
        this.tiempo_espera=[];
        this.numero_asesores=[];
        this.numero_personas_asisten_MAC=[];

        let namefecha = moment((fecha), "YYYY-MM-DD HH:mm:ss").format('dddd'),
        diasemanaini= this.dias.indexOf(toLower(namefecha)),
        diasemanafin= this.dias.length-(diasemanaini+1),
        fechaini= moment(fecha).subtract(diasemanaini,'days').format("YYYY-MM-DD"),
        fechafin= moment(fecha).add(diasemanafin,'days').format("YYYY-MM-DD");
        where.fecha =['date_format(fecha,"%Y-%m-%d")','BETWEEN',fechaini,fechafin];

        this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref103',where:where}).then(function(response){
            let body = response.body.atributos;
            let arr =[],tableobj = '', dias_new=[];
            if (!isempty(body)) {

                tableobj = body;
              let  max_tiempo_espera = 0;
              let  max_numero_asesores = 0;
              let  max_numero_personas_asisten_MAC = 0;
              let  per_tiempo_espera = 0;
              let  per_numero_asesores = 0;
              let  per_numero_personas_asisten_MAC = 0;
                for (var i = 0; i < this.dias.length; i++) {
                  let res = tableobj.map(function(e) { return toLower(moment(e.fecha,"YYYY-MM-DD HH:mm:ss").format('dddd')); });

                /* establecer el valor máximo para el denominador */
                  if (res.indexOf(this.dias[i])>=0) {

                    if( max_tiempo_espera < parseFloat(tableobj[res.indexOf(this.dias[i])]['tiempo_espera']).toFixed(2) ){
                        max_tiempo_espera = parseFloat(tableobj[res.indexOf(this.dias[i])]['tiempo_espera']).toFixed(2);
                    }
                    if( max_numero_asesores < parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_asesores']) ){
                        max_numero_asesores = parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_asesores']);
                    }
                    if( max_numero_personas_asisten_MAC < parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_personas_asisten_MAC']) ){
                        max_numero_personas_asisten_MAC = parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_personas_asisten_MAC']);
                    }

                    }
                }
                /* armar el array */
                let array_tiempo_espera = [];
                let array_numero_asesores = [];
                let array_numero_personas_asisten_MAC = [];
                for (var i = 0; i < this.dias.length; i++) {
                     let res = tableobj.map(function(e) { return toLower(moment(e.fecha,"YYYY-MM-DD HH:mm:ss").format('dddd')); });
                    if (res.indexOf(this.dias[i])>=0) {

                        per_tiempo_espera = ( parseFloat(tableobj[res.indexOf(this.dias[i])]['tiempo_espera']).toFixed(2) / max_tiempo_espera ) * 100;
                        per_tiempo_espera.toFixed(2);
                        per_numero_asesores = ( parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_asesores'])/ max_numero_asesores ) * 100;
                        per_numero_asesores.toFixed(2);
                        per_numero_personas_asisten_MAC = ( parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_personas_asisten_MAC']) / max_numero_personas_asisten_MAC ) * 100;
                        per_numero_personas_asisten_MAC.toFixed(2);

                        this.tiempo_espera.push(parseFloat(tableobj[res.indexOf(this.dias[i])]['tiempo_espera']).toFixed(2));
                        this.numero_asesores.push(parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_asesores']));
                        this.numero_personas_asisten_MAC.push(parseFloat(tableobj[res.indexOf(this.dias[i])]['numero_personas_asisten_MAC']));
                        per_tiempo_espera = parseFloat(per_tiempo_espera.toFixed(2));
                        per_numero_asesores = parseFloat(per_numero_asesores.toFixed(2));
                        per_numero_personas_asisten_MAC = parseFloat(per_numero_personas_asisten_MAC.toFixed(2));
                        array_tiempo_espera.push(per_tiempo_espera);
                        array_numero_asesores.push(per_numero_asesores);
                        array_numero_personas_asisten_MAC.push(per_numero_personas_asisten_MAC);



                    }else{

                    this.tiempo_espera.push(0);
                    this.numero_asesores.push(0);
                    this.numero_personas_asisten_MAC.push(0);
                        array_tiempo_espera.push(0);
                        array_numero_asesores.push(0);
                        array_numero_personas_asisten_MAC.push(0);
                    }
              }

              this.semana_inicio = moment(this.fecha).weekday(1).format('DD-MM-YYYY');
              this.semana_fin = moment(this.fecha).weekday(7).format('DD-MM-YYYY');
            this.mostrar_grafico(array_tiempo_espera,  array_numero_asesores, array_numero_personas_asisten_MAC, this.fecha);
            }else{
            swal("No existen registros para esa fecha", "Verifique que la fecha sea la correcta", "warning");
            this.semana_inicio = moment(this.fecha).weekday(1).format('DD-MM-YYYY');
          this.semana_fin = moment(this.fecha).weekday(7).format('DD-MM-YYYY');
            this.mostrar_grafico(0,0,0, this.fecha);
            }
        });
      },
      mostrar_grafico(tiempo_espera, numero_asesores, numero_personas_asisten_MAC, fecha){

        Highcharts.chart('grafico_103', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Eficiencia en la atención'
            },
            subtitle: {
                text: 'Semana del : '+ this.semana_inicio + ' al ' + this.semana_fin
            },
            xAxis: {
                categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
            },
            yAxis: {
                title: {
                    text: 'Porcentaje (%)'
                }
            },
            tooltip: {
                pointFormat: 'Porcentaje: <b>{point.y:.1f} %</b>'
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true,

                }
            },

            credits:{
                enabled:false
            },
            series: [{
                name: 'Tiempo de espera',
                data: tiempo_espera
            },{
                name: 'Número de Asesores',
                data: numero_asesores
            },{
                name: 'Número de Personas que Asisten al Centro MAC',
                data: numero_personas_asisten_MAC
            }]
        });
      }
    }
  })
