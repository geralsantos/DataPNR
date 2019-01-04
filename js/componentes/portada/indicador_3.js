Vue.component('indicador_3',{
    template:'#indicador_3',
    data:()=>({
        objeto: {},
        grupos_rubros:[],
        entidades:[],
        hhh:[],
        lunes :null,
        fecha : moment().format("YYYY-MM-DD"),
        fecha_filtro :  moment().format("YYYY-MM-DD"),

        dias:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        atributos:[],
        tabla_apertura:[],
        tabla_relevo:[],
        tabla_cierre:[],
        mostrar:false,

    }),
    created:function(){
    },
    mounted:function(){
        this.cargar_formulario();
        this.cargar();
        this.verificar_nivel_usuario();

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

            if ( this.fecha > moment().format("YYYY-MM-DD") ) {
                swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
                return false;
            }

            let arrayApertura  = new Array();
            let arrayRelevo = new Array();
            let arrayCierre   = new Array();
            let arrayObservaciones   = new Array();
            let grupos = [];

         for(var i= 0; i < this.grupos_rubros.length; i++) {

            arrayApertura[this.grupos_rubros[i].id] = (jQuery("#apertura_"+this.grupos_rubros[i].id).is(':checked'))? 1: 0;
            arrayRelevo[this.grupos_rubros[i].id] = (jQuery("#relevo_"+this.grupos_rubros[i].id).is(':checked'))? 1: 0;
            arrayCierre[this.grupos_rubros[i].id] = (jQuery("#cierre_"+this.grupos_rubros[i].id).is(':checked'))? 1: 0;
            arrayObservaciones[this.grupos_rubros[i].id] = jQuery("#observacion_"+this.grupos_rubros[i].id).val();

        }
        for(var i= 0; i < this.grupos_rubros.length; i++) {

            grupos.push({
                "id": this.grupos_rubros[i].id,
                "apertura"    : arrayApertura[this.grupos_rubros[i].id],
                "relevo"  : arrayRelevo[this.grupos_rubros[i].id],
                "cierre"    : arrayCierre[this.grupos_rubros[i].id],
                "observacion"    : arrayObservaciones[this.grupos_rubros[i].id]
            });

        }
        /* entidades RRHH */
        let arrayAperturaRRHH  = new Array();
        let arrayRelevoRRHH = new Array();
        let arrayCierreRRHH   = new Array();
        let arrayObservacionesRRHH   = new Array();
          let entidades = [];

         for(var i= 0; i < this.entidades.length; i++) {

            arrayAperturaRRHH[this.entidades[i].id] = (jQuery("#aperturaRRHH_"+this.entidades[i].id).is(':checked'))? 1: 0;
            arrayRelevoRRHH[this.entidades[i].id] = (jQuery("#relevoRRHH_"+this.entidades[i].id).is(':checked'))? 1: 0;
            arrayCierreRRHH[this.entidades[i].id] = (jQuery("#cierreRRHH_"+this.entidades[i].id).is(':checked'))? 1: 0;
            arrayObservacionesRRHH[this.entidades[i].id] = jQuery("#observacionRRHH_"+this.entidades[i].id).val();
        }
        for(var i= 0; i < this.entidades.length; i++) {

            entidades.push({
                "id": this.entidades[i].id,
                "apertura"    : arrayAperturaRRHH[this.entidades[i].id],
                "relevo"  : arrayRelevoRRHH[this.entidades[i].id],
                "cierre"    : arrayCierreRRHH[this.entidades[i].id],
                "observacion"    : arrayObservacionesRRHH[this.entidades[i].id]
            });

        }

        let total = [];
        total.push({
            "name": "grupos",
            "valores": grupos
        });
        total.push({
            "name": "entidades",
            "valores": entidades
        })


        this.objeto = total;
       this.objeto= JSON.stringify(this.objeto);

       let insert = {  "valores" : this.objeto,
                        "fecha" : this.fecha };
            let update = { "valores":this.objeto };
        let temporal = { "tmp_valores": this.objeto};
            let where = { "fecha": this.fecha};


         this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref3',insert:insert, update:update, where: where, temporal:temporal }).then(function(response){
              if( response.body.resultado ){

                let alerta = (response.body.editado == '1') ?  'warning' : 'success';
                swal("Cambio Registrado", response.body.mensaje, alerta);
                this.cargar_formulario();
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
        cargar_formulario(){

            this.cargar_grupo_rubro();
            this.cargar_entidades();

            let where = {};


            where.fecha =['date_format(fecha,"%Y-%m-%d")',this.fecha];

                this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref3',where:where}).then(function(response){

                    let tableobj = response.body.atributos;

                    if(tableobj != undefined){
                        for (var i = 0; i < tableobj.length; i++) {

                            let consulta = JSON.parse(tableobj[i].valores);
                            for(var u= 0; u <  consulta.length; u++) {

                                if(consulta[u].name == 'grupos'){
                                    let valores = consulta[u].valores;
                                    for(var e= 0; e <  valores.length; e++) {
                                        for(var o = 0; o <  this.grupos_rubros.length; o++) {
                                            if(this.grupos_rubros[o].id == valores[e].id ){
                                                if(valores[e].apertura == 1 ){
                                                    this.grupos_rubros[o].checked_apertura = true;
                                                }
                                                if(valores[e].relevo == 1 ){
                                                    this.grupos_rubros[o].checked_relevo = true;
                                                }
                                                if(valores[e].cierre == 1 ){
                                                    this.grupos_rubros[o].checked_cierre = true;
                                                }

                                                if(valores[e].observacion != '' ){

                                                    this.grupos_rubros[o].observacion=valores[e].observacion;

                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                this.grupos_rubros.splice(0, this.grupos_rubros);



                                if(consulta[u].name == 'entidades'){
                                    let valores = consulta[u].valores;

                                    for(var e= 0; e <  valores.length; e++) {

                                        for(var o = 0; o <  this.entidades.length; o++) {
                                            if(this.entidades[o].id == valores[e].id ){

                                                if(valores[e].apertura == 1 ){
                                                    this.entidades[o].checked_apertura = true;
                                                }
                                                if(valores[e].relevo == 1 ){

                                                    this.entidades[o].checked_relevo = true;
                                                }
                                                if(valores[e].cierre == 1 ){
                                                    this.entidades[o].checked_cierre = true;
                                                }
                                                if(valores[e].observacion !== '' ){
                                                    this.entidades[o].observacion = valores[e].observacion;
                                                }
                                                break;
                                            }
                                        }
                                    }

                                }
                                this.entidades.splice(0, this.entidades);

                            }
                        }
                     }


                });

        },
        cargar(){


            this.tabla_apertura=[];
            this.tabla_relevo=[];
            this.tabla_cierre=[];
             let where = {};
            let namefecha = moment((this.fecha_filtro), "YYYY-MM-DD HH:mm:ss").format('dddd'),
            diasemanaini= this.dias.indexOf(toLower(namefecha)),
            diasemanafin= this.dias.length-(diasemanaini+1),
            fechaini= moment(this.fecha_filtro).subtract(diasemanaini,'days').format("YYYY-MM-DD"),
            fechafin= moment(this.fecha_filtro).add(diasemanafin,'days').format("YYYY-MM-DD");

            where.fecha =['date_format(fecha,"%Y-%m-%d")','BETWEEN',fechaini,fechafin];

                this.$http.post('cargar_datos_all?view',{tabla:'kpi_indicador_ref3',where:where}).then(function(response){

                    let tableobj = response.body.atributos;
                    if(tableobj != undefined){

                    let valores = "",  data_apertura=[], data_relevo=[], data_cierre=[];
                    for (var i = 0; i < this.dias.length; i++) {
                        let res = tableobj.map(function(e) { return toLower(moment(e.fecha,"YYYY-MM-DD HH:mm:ss").format('dddd')); });

                      if (res.indexOf(this.dias[i])>=0) {
                        this.objeto = JSON.parse(tableobj[res.indexOf(this.dias[i])]['valores']);
                        let incumplimiento_apertura = 0;
                        let incumplimiento_relevo = 0;
                        let incumplimiento_cierre = 0;
                        let total_condiciones = 0;
                        let entidad_incumplimiento_apertura = 0;
                        let entidad_incumplimiento_relevo = 0;
                        let entidad_incumplimiento_cierre = 0;
                        let apertuta_per=0, relevo_per=0, cierre_per=0;
                        for(var u= 0; u <  this.objeto.length; u++) {

                            if(this.objeto[u].name == 'grupos'){
                                let valores = this.objeto[u].valores;

                                for(var e= 0; e <  valores.length; e++) {

                                    total_condiciones++;

                                    if(valores[e].apertura == 1 ){
                                        incumplimiento_apertura++;
                                    }
                                    if(valores[e].relevo == 1 ){
                                        incumplimiento_relevo++;
                                    }
                                    if(valores[e].cierre == 1 ){
                                        incumplimiento_cierre++;
                                    }
                                }
                            }

                            if(this.objeto[u].name == 'entidades'){

                                total_condiciones++;
                                let valores = this.objeto[u].valores;
                                for(var e= 0; e <  valores.length; e++) {

                                    if(valores[e].apertura == 1){
                                        entidad_incumplimiento_apertura++
                                    }
                                    if(valores[e].relevo == 1 ){
                                        entidad_incumplimiento_relevo++
                                    }
                                    if( valores[e].cierre == 1){
                                        entidad_incumplimiento_cierre++
                                    }

                                }
                                if(entidad_incumplimiento_apertura!=0){
                                    incumplimiento_apertura++;
                                }
                                if(entidad_incumplimiento_relevo!=0){
                                    incumplimiento_relevo++;
                                }
                                if(entidad_incumplimiento_cierre!=0){
                                    incumplimiento_cierre++;
                                }
                            }


                        }

                        apertuta_per = parseFloat(((incumplimiento_apertura/total_condiciones)*100).toFixed(2));
                        relevo_per = parseFloat(((incumplimiento_relevo/total_condiciones)*100).toFixed(2));
                        cierre_per = parseFloat(((incumplimiento_cierre/total_condiciones)*100).toFixed(2));
                        data_apertura.push(apertuta_per);
                        data_relevo.push(relevo_per);
                        data_cierre.push(cierre_per);
                        this.tabla_apertura.push(incumplimiento_apertura + '/' + total_condiciones );
                        this.tabla_relevo.push(incumplimiento_relevo + '/' + total_condiciones );
                        this.tabla_cierre.push(incumplimiento_cierre + '/' + total_condiciones );

                      }else{ // no encuentra match y ese dia se llena con cero

                        data_apertura.push(0);
                        data_relevo.push(0);
                        data_cierre.push(0);
                        this.tabla_apertura.push('0/25');
                        this.tabla_relevo.push('0/25' );
                        this.tabla_cierre.push('0/25' );
                      //  this.ticks_abandonados.push(0);
                      }
                    }
                    this.mostrar_grafico(data_apertura, data_relevo,data_cierre);
                     }else{
                        swal("Error", "No hay datos registrados para este período", "warning");
                        this.mostrar_grafico(0, 0,0);
                     }
                });

        },
        cargar_grupo_rubro(){
            this.grupos_rubros = [];
          let where = {estado:1};
          this.$http.post('cargar_datos_rubro_grupo?view').then(function(response){

            this.grupos_rubros = response.body.data;
            for(var i= 0; i <  this.grupos_rubros.length; i++) {
                this.grupos_rubros[i].checked_apertura = false;
                this.grupos_rubros[i].checked_relevo = false;
                this.grupos_rubros[i].checked_cierre = false;
                this.grupos_rubros[i].observacion = '';
            }

           });
        },
        cargar_entidades(){
            this.entidades = [];
            let where = {'estado':1};
            this.$http.post('cargar_datos_sin_editado?view',{tabla:'kpi_entidades',where:where}).then(function(response){
                this.entidades = response.body.atributos;
                for(var i= 0; i <  this.entidades.length; i++) {
                    this.entidades[i].checked_apertura = false;
                    this.entidades[i].checked_relevo = false;
                    this.entidades[i].checked_cierre = false;
                    this.entidades[i].observacion = '';
                }
             });
        },
        mostrar_grafico(data_apertura, data_relevo,data_cierre){
        // Create the chart
        Highcharts.chart('grafico_3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Incumplimiento de condiciones mínimas de funcionamiento'
                },
                subtitle: {
                    text: 'Fecha: '+ moment(this.fecha_filtro).format("DD-MM-YYYY")
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
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'N° condiciones no conformes / N° condiciones totales <br> Porcentaje'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} % </b></td></tr>',
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
                    },
                    enableMouseTracking: true
                    }
                },
                series: [{
                    name: 'Apertura',
                    data: data_apertura

                }, {
                    name: 'Relevo',
                    data: data_relevo

                }, {
                    name: 'Cierre',
                    data: data_cierre

                }]
            });
        }

    }
  })
