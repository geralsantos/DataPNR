Vue.component('indicador_105', {
    template: '#indicador_105',
    data:()=>({
      atributos : [],
      valores : {},
      nro_atenciones : 0,
      mostrar:false,
      id_centro_mac : 0,
      mes: moment(new Date()).format("MM"),
      anio:moment(new Date()).format("YYYY"),
      anio_filtro : moment(new Date()).format("YYYY"),
      v1: '',
      v2: '',
      v3: '',
      v4: '',
      v5: '',
      v6: '',
      v7: '',
      v8: '',
      v9: '',
      v10: '',
      v11: '',
      v12: '',
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      c5: '',
      c6: '',
      c7: '',
      c8: '',
      c9: '',
      c10: '',
      c11: '',
      c12: '',
      r1: '',
      r2: '',
      r3: '',
      r4: '',
      r5: '',
      r6: '',
      r7: '',
      r8: '',
      r9: '',
      r10: '',
      r11: '',
      r12: '',
      e1: '',
      e2: '',
      e3: '',
      e4: '',
      e5: '',
      e6: '',
      e7: '',
      e8: '',
      e9: '',
      e10: '',
      e11: '',
      e12: ''

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

        if(this.id_centro_mac=='0'){
            swal("Error", "Seleccione un Centro MAC", "warning");
        }
        if(( this.anio > moment().format("YYYY") )){
            swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
              return false;
        }else{
            if(this.mes > moment().format("MM") ){
              swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
              return false;
            }
         }

        let insert = {"nro_atenciones":this.nro_atenciones,"id_centro_mac":this.id_centro_mac,"mes":this.mes, "anio":this.anio};
        let update = {"nro_atenciones":this.nro_atenciones };
        let temporal = {"tmp_nro_atenciones":this.nro_atenciones };
        let where = { "id_centro_mac":this.id_centro_mac, "mes":this.mes, "anio":this.anio};


        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref105',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
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

        let year = moment(new Date()).format("YYYY");
        let where = {};
        if(e==''){
           where = {'anio':year};

        }else{
          year = this.anio_filtro;
          where = {'anio':e.target.value};
        }

        this.nro_atenciones = 0;
        this.id_centro_mac = 0;
        this.mes= moment(new Date()).format("MM");
        this.anio= moment(new Date()).format("YYYY");

        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref105',where:where}).then(function(response){
          this.atributos = response.body.atributos;

          if(this.atributos != undefined){
            let visitas_1 = 0;
            let visitas_2 = 0;
            let visitas_3 = 0;
            let visitas_4 = 0;
            let visitas_5 = 0;
            let visitas_6 = 0;
            let visitas_7 = 0;
            let visitas_8 = 0;
            let visitas_9 = 0;
            let visitas_10 = 0;
            let visitas_11 = 0;
            let visitas_12 = 0;

            let chats_1 = 0;
            let chats_2 = 0;
            let chats_3 = 0;
            let chats_4 = 0;
            let chats_5 = 0;
            let chats_6 = 0;
            let chats_7 = 0;
            let chats_8 = 0;
            let chats_9 = 0;
            let chats_10 = 0;
            let chats_11 = 0;
            let chats_12 = 0;

            let redes_1 = 0;
            let redes_2 = 0;
            let redes_3 = 0;
            let redes_4 = 0;
            let redes_5 = 0;
            let redes_6 = 0;
            let redes_7 = 0;
            let redes_8 = 0;
            let redes_9 = 0;
            let redes_10 = 0;
            let redes_11 = 0;
            let redes_12 = 0;

            let emails_1 = 0;
            let emails_2 = 0;
            let emails_3 = 0;
            let emails_4 = 0;
            let emails_5 = 0;
            let emails_6 = 0;
            let emails_7 = 0;
            let emails_8 = 0;
            let emails_9 = 0;
            let emails_10 = 0;
            let emails_11 = 0;
            let emails_12 = 0;

            for (var i = 0; i <  this.atributos.length; i++) {
                let m = this.atributos[i].mes;
                if( m == 1  ){
                    visitas_1 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_1;
                    chats_1 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_1;
                    redes_1 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_1;
                    emails_1 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_1;
                }else if ( m == 2 ) {
                    visitas_2 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_2;
                    chats_2 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_2;
                    redes_2 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_2;
                    emails_2 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_2;
                }else if ( m == 3 ) {
                    visitas_3 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_3;
                    chats_3 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_3;
                    redes_3 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_3;
                    emails_3 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_3;
                }else if ( m == 4 ) {
                    visitas_4 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_4;
                    chats_4 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_4;
                    redes_4 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_4;
                    emails_4 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_4;
                } else if ( m == 5 ) {
                    visitas_5 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_5;
                    chats_5 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_5;
                    redes_5 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_5;
                    emails_5 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_5;
                }else if ( m == 6 ) {
                    visitas_6 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_6;
                    chats_6 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_6;
                    redes_6 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_6;
                    emails_6 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_6;
                }else if ( m == 7 ) {
                    visitas_7 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_7;
                    chats_7 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_7;
                    redes_7 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_7;
                    emails_7 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_7;
                }else if ( m == 8 ) {
                    visitas_8 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_8;
                    chats_8 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_8;
                    redes_8 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_8;
                    emails_8 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_8;
                }else if ( m == 9 ) {
                    visitas_9 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_9;
                    chats_9 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_9;
                    redes_9 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_9;
                    emails_9 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_9;
                }else if ( m == 10 ) {
                    visitas_10 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_10;
                    chats_10 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_10;
                    redes_10 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_10;
                    emails_10 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_10;
                }else if ( m == 11 ) {
                    visitas_11 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_11;
                    chats_11 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_11;
                    redes_11 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_11;
                    emails_11 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_11;
                }else if ( m == 12 ) {
                    visitas_12 = ( this.atributos[i].id_centro_mac == '1' ) ? parseFloat(this.atributos[i].nro_atenciones) : visitas_12;
                    chats_12 = ( this.atributos[i].id_centro_mac == '2' ) ? parseFloat(this.atributos[i].nro_atenciones) : chats_12;
                    redes_12 = ( this.atributos[i].id_centro_mac == '3' ) ? parseFloat(this.atributos[i].nro_atenciones) : redes_12;
                    emails_12 = ( this.atributos[i].id_centro_mac == '4' ) ? parseFloat(this.atributos[i].nro_atenciones) : emails_12;
                }

            }
            this.v1= visitas_1;
            this.v2= visitas_2;
            this.v3= visitas_3;
            this.v4= visitas_4;
            this.v5= visitas_5;
            this.v6= visitas_6;
            this.v7= visitas_7;
            this.v8= visitas_8;
            this.v9= visitas_9;
            this.v10= visitas_10;
            this.v11= visitas_11;
            this.v12= visitas_12;

            this.c1= chats_1;
            this.c2= chats_2;
            this.c3= chats_3;
            this.c4= chats_4;
            this.c5= chats_5;
            this.c6= chats_6;
            this.c7= chats_7;
            this.c8= chats_8;
            this.c9= chats_9;
            this.c10= chats_10;
            this.c11= chats_11;
            this.c12= chats_12;

            this.r1= redes_1;
            this.r2= redes_2;
            this.r3= redes_3;
            this.r4= redes_4;
            this.r5= redes_5;
            this.r6= redes_6;
            this.r7= redes_7;
            this.r8= redes_8;
            this.r9= redes_9;
            this.r10= redes_10;
            this.r11= redes_11;
            this.r12= redes_12;

            this.e1= emails_1;
            this.e2= emails_2;
            this.e3= emails_3;
            this.e4= emails_4;
            this.e5= emails_5;
            this.e6= emails_6;
            this.e7= emails_7;
            this.e8= emails_8;
            this.e9= emails_8;
            this.e10= emails_10;
            this.e11= emails_11;
            this.e12= emails_12;


       var  visitas_arr = [visitas_1,visitas_2, visitas_3,visitas_4,visitas_5,visitas_6, visitas_7, visitas_8, visitas_9, visitas_10, visitas_11, visitas_12];
       var  chats_arr = [chats_1,chats_2, chats_3, chats_4, chats_5, chats_6,chats_7, chats_8, chats_9, chats_10, chats_11,chats_12];
       var  redes_arr = [redes_1,redes_2, redes_3, redes_4, redes_5, redes_6,redes_7, redes_8, redes_9, redes_10, redes_11,redes_12];
       var  emails_arr = [emails_1, emails_2, emails_3, emails_4, emails_5, emails_6, emails_7, emails_8, emails_9, emails_10,emails_11, emails_12];


         this.mostrar_grafico(visitas_arr, chats_arr, redes_arr, emails_arr, year);

          }else{
            swal("Error", "No hay datos registrados para el año seleccionado", "warning");
            this.v1= 0;
            this.v2= 0;
            this.v3= 0;
            this.v4= 0;
            this.v5= 0;
            this.v6= 0;
            this.v7= 0;
            this.v8= 0;
            this.v9= 0;
            this.v10= 0;
            this.v11= 0;
            this.v12= 0;

            this.c1= 0;
            this.c2= 0;
            this.c3= 0;
            this.c4= 0;
            this.c5= 0;
            this.c6= 0;
            this.c7= 0;
            this.c8= 0;
            this.c9= 0;
            this.c10= 0;
            this.c11= 0;
            this.c12= 0;

            this.r1= 0;
            this.r2= 0;
            this.r3= 0;
            this.r4= 0;
            this.r5= 0;
            this.r6= 0;
            this.r7= 0;
            this.r8= 0;
            this.r9= 0;
            this.r10= 0;
            this.r11= 0;
            this.r12= 0;

            this.e1= 0;
            this.e2= 0;
            this.e3= 0;
            this.e4= 0;
            this.e5= 0;
            this.e6= 0;
            this.e7= 0;
            this.e8= 0;
            this.e9= 0;
            this.e10= 0;
            this.e11= 0;
            this.e12= 0;
            this.mostrar_grafico(0, 0, 0, 0, year)
          }
        });
      },
      mostrar_grafico(visitas_arr, chats_arr, redes_arr, emails_arr, year){

        Highcharts.chart('grafico_105', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Nro de Atenciones Acumuladas'
            },
            subtitle: {
                text: 'Año ' + year
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
                    text: 'N° de Atenciones'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} atenciones</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'N° de Visitas Portal',
                data: visitas_arr

            }, {
                name: 'Chat Atendidos',
                data: chats_arr

            }, {
                name: 'Redes Sociales',
                data: redes_arr

            }, {
                name: 'E-mails Atendidos',
                data: emails_arr

            }]
        });

      }
    }
  })
