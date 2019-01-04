Vue.component('indicador_1', {
    template: '#indicador_1',
    data:()=>({
      atributos : [],
      coincidencias : [],
      mostrar:false,
      id_editado:null,
      isLoading:false,
      bloque_busqueda:false,
      valores : {},
      nombre_accion : null,
      meta: null,
      resultado_meta: null,
      brecha: null,
      fecha_inicio_programada : null,
      fecha_fin_programada : null,
      fecha_inicio_real :null,
      fecha_fin_real     : null,
      anio_filtro : (new Date()).getFullYear(),
      trimestre: '',
      trimestre_1: '',
      trimestre_2: '',
      trimestre_3: '',
      trimestre_4: '',
      observacion: '',
      kpi_estado_accion: null,
      kpi_estado_actividad: null
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

        buscar(){
            this.id_editado = null;
            this.fecha_inicio_programada = null;
            this.fecha_fin_programada = null;
            this.fecha_inicio_real = null;
            this.fecha_fin_real  =  null;
            this.meta= null;
            this.resultado_meta= null;
            this.observacion     = null;
            let word = this.nombre_accion;
            if( word.length >= 4){
                this.coincidencias = [];
                this.bloque_busqueda = true;
                this.isLoading = true;
                this.$http.post('ejecutar_consulta?view',{tabla:'kpi_indicador_ref1', campo:'nombre_accion', like:word }).then(function(response){

                    if( response.body.data != undefined){
                        this.isLoading = false;
                        this.coincidencias = response.body.data;
                    }else{
                        this.bloque_busqueda = false;
                        this.isLoading = false;
                        this.coincidencias = [];
                    }
                 });
            }else{
                this.bloque_busqueda = false;
                this.isLoading = false;
                this.coincidencias = [];
            }
        },
        actualizar(id){
            this.id_editado = id;
            this.coincidencias = [];
            this.bloque_busqueda = false;
            let where = {"id": id, "estado": 1}
            this.$http.post('cargar_datos_sin_editado?view',{tabla:'kpi_indicador_ref1', where:where }).then(function(response){

                if( response.body.atributos != undefined){

                    this.nombre_accion = response.body.atributos[0]["nombre_accion"];
                    this.meta = response.body.atributos[0]["meta"];
                    this.resultado_meta = response.body.atributos[0]["resultado_meta"];
                    this.fecha_inicio_programada = moment(response.body.atributos[0]["fecha_inicio_programada"]).format("YYYY-MM-DD");
                    this.fecha_fin_programada = moment(response.body.atributos[0]["fecha_fin_programada"]).format("YYYY-MM-DD");
                    this.fecha_inicio_real = (response.body.atributos[0]["fecha_inicio_real"]!= '0000-00-00 00:00:00' ) ? moment(response.body.atributos[0]["fecha_inicio_real"]).format("YYYY-MM-DD") : null;
                    this.fecha_fin_real  =  (response.body.atributos[0]["fecha_fin_real"]!= '0000-00-00 00:00:00' ) ? moment(response.body.atributos[0]["fecha_fin_real"]).format("YYYY-MM-DD"): null;

                    this.observacion     = response.body.atributos[0]["observacion"];
                }
             });

        },
        cargar(e=''){
            this.nombre_accion=null;
            this.fecha_inicio_programada=null;
            this.fecha_fin_programada =null;
            this.fecha_inicio_real=null;
            this.fecha_fin_real=null;
            this.trimestre=null;
            this.observacion=null;
            this.meta=null;
            this.resultado_meta=null;
            this.brecha=null;

            let year = (new Date()).getFullYear();
            if(e==''){
                this.anio_filtro=(new Date()).getFullYear();
            }else{

                year = this.anio_filtro;

            }
        let consulta = "SELECT *, '1' AS tipo, count(trimestre) AS cantidad FROM kpi_indicador_ref1 WHERE date_format(fecha_inicio_programada,'%Y-%m-%d') between '"+year+"-01-01' AND '"+year+"-12-31' AND estado=1 group by trimestre";
        let consulta_2 = "SELECT *,  '2' AS tipo, count(trimestre) AS cantidad FROM kpi_indicador_ref1 WHERE date_format(fecha_fin_real,'%Y-%m-%d') between '"+year+"-01-01' AND '"+year+"-12-31' AND ( kpi_estado_actividad = 5 OR kpi_estado_actividad=6 )  AND  estado=1 group by trimestre";
        this.$http.post('cargar_datos_fecha?view',{consulta:consulta, consulta_2:consulta_2}).then(function(response){
            this.atributos = response.body.data;

            if(this.atributos != undefined){
                this.atributos =  Object.values(response.body.data);
                let mantenimientos_programados_1 = 0;
                let mantenimientos_ejecutados_1 = 0;
                let mantenimientos_programados_2 = 0;
                let mantenimientos_ejecutados_2 = 0;
                let mantenimientos_programados_3 = 0;
                let mantenimientos_ejecutados_3 = 0;
                let mantenimientos_programados_4 = 0;
                let mantenimientos_ejecutados_4 = 0;
                let programados_data = [];
                let ejecutadas_data = [];
                let categoria_data = [];

                for (var i = 0; i <  this.atributos.length; i++) {

                    programados_data.push(parseFloat(this.atributos[i].programados));
                    ejecutadas_data.push(parseFloat(this.atributos[i].ejecutados));
                    categoria_data.push(this.atributos[i].category);

                    let m = this.atributos[i].trimestre;
                    this.atributos[i].ejecutados = (this.atributos[i].ejecutados == undefined)? 0 : this.atributos[i].ejecutados;
                    if( m == 1  ){
                        mantenimientos_programados_1 = parseFloat(this.atributos[i].programados);
                        mantenimientos_ejecutados_1 =  parseFloat(this.atributos[i].ejecutados);
                    }else if ( m == 2 ) {
                        mantenimientos_programados_2 = parseFloat(this.atributos[i].programados);
                        mantenimientos_ejecutados_2 = parseFloat(this.atributos[i].ejecutados);
                    }else if ( m == 3 ) {
                        mantenimientos_programados_3 = parseFloat(this.atributos[i].programados);
                        mantenimientos_ejecutados_3 = parseFloat(this.atributos[i].ejecutados);
                    }else if ( m == 4 ) {
                        mantenimientos_programados_4 = parseFloat(this.atributos[i].programados);

                        mantenimientos_ejecutados_4 = parseFloat(this.atributos[i].ejecutados);
                    }
                }


                this.trimestre_1 = mantenimientos_ejecutados_1 + '/' + mantenimientos_programados_1;
                this.trimestre_2 = mantenimientos_ejecutados_2 + '/' + mantenimientos_programados_2;
                this.trimestre_3 = mantenimientos_ejecutados_3 + '/' + mantenimientos_programados_3;
                this.trimestre_4 = mantenimientos_ejecutados_4 + '/' + mantenimientos_programados_4;

                this.mostrar_grafico(programados_data, ejecutadas_data,categoria_data, year);

            }else{
                swal("Error", "No hay datos registrados para el año seleccionado", "warning");
                this.mostrar_grafico(0, 0,0, this.anio_filtro);
                this.trimestre_1 = null;
                this.trimestre_2 =  null;
                this.trimestre_3 = null;
                this.trimestre_4  = null;
            }
            });
        },

        guardar(){

            /* verifica que la fecha ingresada no se mayor al día actual*/

            if (this.nombre_accion == null){
                swal("Error", "Ingresar nombre del mantenimiento Programado", "warning");
                return false;
            }
            if (this.fecha_inicio_programada == null){
                swal("Error", "Ingresar fecha de inicio programada", "warning");
                return false;
            }else{
               var trimestre_programado = moment(this.fecha_inicio_programada).quarter();

            }

            if (this.fecha_fin_programada == null){
                swal("Error", "Ingresar fecha de fin programada", "warning");
                return false;
            }
            if( trimestre_programado != moment(this.fecha_fin_programada).quarter() && this.fecha_fin_programada!=null ){
                swal("Error", "Las fechas deben pertenecer al mismo trimestre", "warning");
                return false;
            }
            if (this.meta == null){
                swal("Error", "Ingresar meta", "warning");
                return false;
            }
            if (( this.fecha_fin_real > moment().format("YYYY-MM-DD") ) || ( this.fecha_inicio_real > moment().format("YYYY-MM-DD"))) {
                swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
                return false;
            }
            if( trimestre_programado != moment(this.fecha_fin_real).quarter() && this.fecha_fin_real!=null ){

                swal("Error", "Las fechas deben pertenecer al mismo trimestre", "warning");
                return false;
            }
            let trimestre = moment(this.fecha_fin_programada, 'DD-MM-YYYY').format("MM");
            if(trimestre==1 || trimestre==2 || trimestre==3) {
                    this.trimestre = 1;
            }
            if ( trimestre==4 || trimestre==5 || trimestre==6) {
                    this.trimestre = 2;
            }
            if ( trimestre==7 || trimestre==8 || trimestre==9) {
                    this.trimestre = 3;
                }
            if ( trimestre==10 || trimestre==11 || trimestre==12) {
                this.trimestre = 4;
            }
            if(  this.fecha_inicio_real == null ){
                //no iniciado
                this.kpi_estado_accion = 4;

            }else{
                if(this.fecha_inicio_programada >= this.fecha_inicio_real){
                    //inicio en plazo
                    this.kpi_estado_accion = 1;

                }else if(this.fecha_inicio_real > this.fecha_inicio_programada){
                    //inicio fuera de plazo
                    this.kpi_estado_accion = 2;

                }else if(this.fecha_inicio_real < this.fecha_inicio_programada && isempty(this.fecha_inicio_real) != true){

                        swal("Error", "La fecha de inicio real no puede ser menor a la fecha de inicio programada", "warning");
                        return false;
                    }else{
                        if( trimestre_programado != moment(this.fecha_inicio_real).quarter() && this.fecha_inicio_real!=null){
                            swal("Error", "Las fechas deben pertenecer al mismo trimestre", "warning");
                            return false;
                        }else{
                            this.kpi_estado_accion = 4;
                        }

                    }

            }

        if(  this.fecha_fin_real == null ){
            //en proceso
            this.kpi_estado_actividad = 7;
        }else{
            if(this.fecha_fin_programada >= this.fecha_fin_real){
                //fin en plazo
                this.kpi_estado_actividad = 5;
            }else if(this.fecha_fin_real > this.fecha_fin_programada){
                //inicio fuera de plazo
                this.kpi_estado_actividad = 6;
            }else if(this.fecha_fin_real < this.fecha_inicio_programada && isempty(this.fecha_fin_real) != true){

                swal("Error", "La fecha de fin real no puede ser menor a la fecha fin programada" + this.fecha_fin_real, "warning");
                return false;
                }else{
                    this.kpi_estado_actividad = 7;
                }

        }

        /* calculo de la brecha */
        this.brecha = ( isempty(this.meta)==false && isempty(this.resultado_meta)==false) ? (parseFloat(this.resultado_meta)/parseFloat(this.resultado_meta))*100 : '';

        this.fecha_inicio_real = ( isempty(this.fecha_inicio_real) == true)? '' :this.fecha_inicio_real;
        this.fecha_fin_real = ( isempty(this.fecha_fin_real) == true)? '' : this.fecha_fin_real;
            let insert = {  "nombre_accion":this.nombre_accion,
                            "meta":this.meta,
                            "resultado_meta":this.resultado_meta,
                            "brecha":this.brecha,
                            "fecha_inicio_programada": this.fecha_inicio_programada,
                            "fecha_fin_programada":this.fecha_fin_programada,
                            "fecha_inicio_real":this.fecha_inicio_real,
                            "fecha_fin_real":this.fecha_fin_real,
                            "kpi_estado_accion":this.kpi_estado_accion,
                            "kpi_estado_actividad": this.kpi_estado_actividad,
                            "observacion": this.observacion,
                            "trimestre":this.trimestre};
            let update = { "fecha_inicio_programada": this.fecha_inicio_programada,
                            "fecha_fin_programada": this.fecha_fin_programada,
                            "fecha_inicio_real":this.fecha_inicio_real,
                            "fecha_fin_real":this.fecha_fin_real,
                            "kpi_estado_accion":this.kpi_estado_accion,
                            "kpi_estado_actividad": this.kpi_estado_actividad,
                            "meta":this.meta,
                            "resultado_meta":this.resultado_meta,
                            "brecha":this.brecha,
                            "observacion": this.observacion,
                            "trimestre":this.trimestre};
        let temporal = { "tmp_fecha_inicio_programada": this.fecha_inicio_programada,
                            "tmp_fecha_fin_programada": this.fecha_fin_programada,
                            "tmp_fecha_inicio_real":this.fecha_inicio_real,
                            "tmp_fecha_fin_real":this.fecha_fin_real,
                            "tmp_kpi_estado_accion":this.kpi_estado_accion,
                            "tmp_kpi_estado_actividad": this.kpi_estado_actividad,
                            "tmp_meta":this.meta,
                            "tmp_resultado_meta":this.resultado_meta,
                            "tmp_brecha":this.brecha,
                            "tmp_observacion": this.observacion,
                            "tmp_trimestre":this.trimestre};
            let where = { "id": this.id_editado};


            this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref1',insert:insert, update:update, where: where, temporal:temporal }).then(function(response){
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

      mostrar_grafico(data1, data2,categoria, year){
        var chart = Highcharts.chart('grafico_1', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Nivel de ejecución del plan de acción del centro MAC'
            },
            subtitle: {
                text: 'Año ' + year
            },
            xAxis: {
                categories: categoria,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                useHTML: true,
                valueDecimals: 2,
                formatter: function () {
                    var ejecutadas = chart.series[0].data[this.series.data.indexOf( this.point )].y;
                    ejecutadas = ( ejecutadas == undefined) ? 0 : ejecutadas;
                    var programados = chart.series[1].data[this.series.data.indexOf( this.point )].y
                    var total = '';
                      total = ('<small> '+this.x+'</small><table><tr><td style="color: '+this.series.color+'">Porcentaje del Nivel de ejecución del plan de acción: </td>' +
                          '<td style="text-align: right"><b>'+(((ejecutadas/programados)*100).toFixed(2))+'%</b></td></tr></table>');

                    return total;
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'N° acciones realizadas',
                data: data2
            }, {
                name: 'N° de acciones programadas',
                data: data1
            }]
        });
      }
    }
  })
