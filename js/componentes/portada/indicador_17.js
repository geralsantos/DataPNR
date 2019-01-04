Vue.component('indicador_17', {
    template: '#indicador_17',
    data:()=>({
      atributos : [],
      valores : {},
      cantidad_quejas : null,
      mostrar:false,
      mes: moment().format("MM"),
      anio:moment().format("YYYY"),
      anio_filtro : moment().format("YYYY"),
      enero: '',
      febrero: '',
      marzo: '',
      abril: '',
      mayo: '',
      junio: '',
      julio: '',
      agosto: '',
      septiembre: '',
      octubre: '',
      noviembre: '',
      diciembre: '',

    }),
    created:function(){

    },
    mounted:function(){
        this.verificar_nivel_usuario();
      this.cargar();

    },

    methods:{
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

        if( moment().format("MM") == 12 ){

            if( this.mes == 1 && ( this.anio > parseFloat(moment().format("YYYY") ))){
              swal("Error", "No puedes ingresar registros con mes superior al mes actual", "warning");
              return false;
            }
          }else{
            if( this.mes > parseFloat(moment().format("MM")) && ( this.anio >= parseFloat(moment().format("YYYY"))) ){
              swal("Error", "No puedes ingresar registros con mes superior al mes actual", "warning");
              return false;
            }
          }

        let insert = {"cantidad_quejas":this.cantidad_quejas, "tmp_cantidad_quejas":this.cantidad_quejas, "cantidad_tickets":0, "mes":this.mes, "anio":this.anio};
        let update = {"cantidad_quejas":this.cantidad_quejas };
        let temporal = {"tmp_cantidad_quejas":this.cantidad_quejas };
        let where = { "mes":this.mes, "anio":this.anio};


        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref17',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
            if( response.body.resultado ){
                let alerta = (response.body.editado == '1') ?  'warning' : 'success';
                swal("Cambio Registrado", response.body.mensaje, alerta);
                this.cargar();
            }else{
                if( response.body.mensaje ){
                    swal("Acceso Denegado", response.body.mensaje , "error");
                }else{
                    swal("Error", "Un error ha ocurrido", "warning");
                }
            }
        });

      },

      cargar(e=''){

        let year = (new Date()).getFullYear();

        let where = {};
        if(e==''){
           where = {'anio':year, 'estado':1};

        }else{
          year = this.anio_filtro;
          where = {'anio':e.target.value, 'estado': 1};
        }


        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref17',where:where}).then(function(response){
          this.atributos = response.body.atributos;

          if(this.atributos != undefined){
            let total_cantidad_quejas_1 = 0;
            let total_cantidad_tickets_1 = 0;
            let total_cantidad_quejas_2 = 0;
            let total_cantidad_tickets_2 = 0;
            let total_cantidad_quejas_3 = 0;
            let total_cantidad_tickets_3 = 0;
            let total_cantidad_quejas_4 = 0;
            let total_cantidad_tickets_4 = 0;
            let total_cantidad_quejas_5 = 0;
            let total_cantidad_tickets_5 = 0;
            let total_cantidad_quejas_6 = 0;
            let total_cantidad_tickets_6 = 0;
            let total_cantidad_quejas_7 = 0;
            let total_cantidad_tickets_7 = 0;
            let total_cantidad_quejas_8 = 0;
            let total_cantidad_tickets_8 = 0;
            let total_cantidad_quejas_9 = 0;
            let total_cantidad_tickets_9 = 0;
            let total_cantidad_quejas_10 = 0;
            let total_cantidad_tickets_10 = 0;
            let total_cantidad_quejas_11 = 0;
            let total_cantidad_tickets_11 = 0;
            let total_cantidad_quejas_12 = 0;
            let total_cantidad_tickets_12 = 0;

            let total = 0;

            for (var i = 0; i <  this.atributos.length; i++) {
                let m = this.atributos[i].mes;
                if( m == 1  ){
                total_cantidad_quejas_1 = (total_cantidad_quejas_1) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_1 = (total_cantidad_tickets_1) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 2 ) {

                total_cantidad_quejas_2 = (total_cantidad_quejas_2) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_2 = (total_cantidad_tickets_2) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 3 ) {
                total_cantidad_quejas_3 = (total_cantidad_quejas_3) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_3 = (total_cantidad_tickets_3) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 4 ) {
                total_cantidad_quejas_4 = (total_cantidad_quejas_4) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_4 = (total_cantidad_tickets_4) + (parseFloat(this.atributos[i].cantidad_tickets));
                } else if ( m == 5 ) {
                total_cantidad_quejas_5 = (total_cantidad_quejas_5) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_5 = (total_cantidad_tickets_5) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 6 ) {
                total_cantidad_quejas_6 = (total_cantidad_quejas_6) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_6 = (total_cantidad_tickets_6) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 7 ) {
                total_cantidad_quejas_7 = (total_cantidad_quejas_7) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_7 = (total_cantidad_tickets_7) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 8 ) {
                total_cantidad_quejas_8 = (total_cantidad_quejas_8) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_8 = (total_cantidad_tickets_8) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 9 ) {
                total_cantidad_quejas_9 = (total_cantidad_quejas_9) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_9 = (total_cantidad_tickets_9) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 10 ) {
                total_cantidad_quejas_10 = (total_cantidad_quejas_10) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_10 = (total_cantidad_tickets_10) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 11 ) {
                total_cantidad_quejas_11 = (total_cantidad_quejas_11) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_11 = (total_cantidad_tickets_11) + (parseFloat(this.atributos[i].cantidad_tickets));
                }else if ( m == 12 ) {
                total_cantidad_quejas_12 = (total_cantidad_quejas_12) + (parseFloat(this.atributos[i].cantidad_quejas));
                total_cantidad_tickets_12 = (total_cantidad_tickets_12) + (parseFloat(this.atributos[i].cantidad_tickets));
                }

            }

          let  div_1 = total_cantidad_quejas_1 / total_cantidad_tickets_1 ;
          div_1 = (isNaN(div_1)) ? 0 : div_1 * 100;
          this.enero = total_cantidad_quejas_1 + '/' + total_cantidad_tickets_1;

          let  div_2 =  total_cantidad_quejas_2 / total_cantidad_tickets_2;
          div_2 = (isNaN(div_2)) ? 0 : div_2 * 100;
          this.febrero =  total_cantidad_quejas_2 + '/' + total_cantidad_tickets_2;

          let  div_3 = total_cantidad_quejas_3 / total_cantidad_tickets_3 ;
          div_3 = (isNaN(div_3)) ? 0 : div_3 * 100;
          this.marzo = total_cantidad_quejas_3 + '/' + total_cantidad_tickets_3;

          let  div_4 = total_cantidad_quejas_4 / total_cantidad_tickets_4;
          div_4 = (isNaN(div_4)) ? 0 : div_4 * 100;
          this.abril = total_cantidad_quejas_4  + '/' + total_cantidad_tickets_4;

          let  div_5 = total_cantidad_quejas_5 / total_cantidad_tickets_5;
          div_5 = (isNaN(div_5)) ? 0 : div_5 * 100;
          this.mayo =  total_cantidad_quejas_5 + '/' + total_cantidad_tickets_5;

          let  div_6 = total_cantidad_quejas_6 / total_cantidad_tickets_6;
          div_6 = (isNaN(div_6)) ? 0 : div_6 * 100;
          this.junio = total_cantidad_quejas_6 + '/' + total_cantidad_tickets_6;

          let  div_7 = total_cantidad_quejas_7 / total_cantidad_tickets_7;
          div_7 = (isNaN(div_7)) ? 0 : div_7 * 100;
          this.julio = total_cantidad_quejas_7 + '/' + total_cantidad_tickets_7;

          let  div_8 = total_cantidad_quejas_8 / total_cantidad_tickets_8;
          div_8 = (isNaN(div_8)) ? 0 : div_8 * 100;
          this.agosto = total_cantidad_quejas_8 + '/' + total_cantidad_tickets_8;

          let  div_9 = total_cantidad_quejas_9 / total_cantidad_tickets_9;
          div_9 = (isNaN(div_9)) ? 0 : div_9 * 100;
          this.septiembre = total_cantidad_quejas_9 + '/' + total_cantidad_tickets_9;

          let  div_10 = total_cantidad_quejas_10 / total_cantidad_tickets_10;
          div_10 = (isNaN(div_10)) ? 0 : div_10 * 100;
          this.octubre = total_cantidad_quejas_10 + '/' + total_cantidad_tickets_10;

          let  div_11 = total_cantidad_quejas_11 / total_cantidad_tickets_11;
          div_11 = (isNaN(div_11)) ? 0 : div_11 * 100;
          this.noviembre =  total_cantidad_quejas_11 + '/' + total_cantidad_tickets_11;

          let  div_12 = total_cantidad_quejas_12 / total_cantidad_tickets_12;
          div_12 = (isNaN(div_12)) ? 0 : div_12 * 100;
          this.diciembre = total_cantidad_quejas_12  + '/' + total_cantidad_tickets_12;

            total = [
            ['Enero', div_1],
            ['Febrero', div_2],
            ['Marzo', div_3],
            ['Abril', div_4],
            ['Mayo', div_5],
            ['Junio', div_6],
            ['Julio',div_7],
            ['Agosto', div_8],
            ['Septiembre', div_9],
            ['Octubre', div_10],
            ['Noviembre', div_11],
            ['Diciembre', div_12]
        ];
        let data = [];
        for (var i = 0; i < total.length; i++) {
          if (total[i][1]>0) {
            data.push(total[i]);
          }
        }
         this.mostrar_grafico(data, year);

          }else{
            swal("Error", "No hay datos registrados para el año seleccionado", "warning");
            this.enero = null;
            this.febrero = null;
            this.marzo = null;
            this.abril = null;
            this.mayo = null;
            this.junio = null;
            this.julio = null;
            this.agosto = null;
            this.septiembre = null;
            this.octubre = null;
            this.noviembre = null;
            this.diciembre = null;
            this.mostrar_grafico(0,this.anio_filtro);
          }

        });
      },
      mostrar_grafico(total, year){
        Highcharts.chart('grafico_17', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tasa de reclamos y quejas'
            },
            subtitle: {
                text: 'Año ' + year
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'N° de quejas y reclamos / N° de tickets totales <br> Porcentaje'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Tasa de reclamos y quejas: <b>{point.y:.1f} %</b>'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Population',
                data: total,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f} %', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });

      }
    }
  })
