Vue.component('indicador_8', {
    template: '#indicador_8',
    data:()=>({
      atributos : [],
      valores : {},
      mostrar:false,
      total_encuestados : null,
      encuestados_satisfechos : null,
      trimestre: moment().quarter(),
      anio:(new Date()).getFullYear(),
      anio_filtro : (new Date()).getFullYear(),
      trimestre_1: '',
      trimestre_2: '',
      trimestre_3: '',
      trimestre_4: ''



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
      cargar(e=''){
          let year = (new Date()).getFullYear();
          let where = {};
          if(e==''){
            where = {'anio':year};

          }else{
            year = this.anio_filtro;
            where = {'anio':e.target.value};
          }
          //this.total_encuestados = null;
          //this.encuestados_satisfechos = null;
          //this.trimestre= moment().quarter();
          //this.anio=(new Date()).getFullYear();

        this.$http.post('cargar_datos?view',{tabla:'kpi_indicador_ref8',where:where}).then(function(response){
          this.atributos = response.body.atributos;


          if(this.atributos != undefined){
            let total_total_encuestados_1 = 0;
            let total_encuestados_satisfechos_1 = 0;
            let total_total_encuestados_2 = 0;
            let total_encuestados_satisfechos_2 = 0;
            let total_total_encuestados_3 = 0;
            let total_encuestados_satisfechos_3 = 0;
            let total_total_encuestados_4 = 0;
            let total_encuestados_satisfechos_4 = 0;


            for (var i = 0; i <  this.atributos.length; i++) {
              let m = this.atributos[i].trimestre;
              if( m == 1  ){
                total_total_encuestados_1 = (total_total_encuestados_1) + (parseFloat(this.atributos[i].total_encuestados));
                total_encuestados_satisfechos_1 = (total_encuestados_satisfechos_1) + (parseFloat(this.atributos[i].encuestados_satisfechos));
              }else if ( m == 2 ) {

                total_total_encuestados_2 = (total_total_encuestados_2) + (parseFloat(this.atributos[i].total_encuestados));
                total_encuestados_satisfechos_2 = (total_encuestados_satisfechos_2) + (parseFloat(this.atributos[i].encuestados_satisfechos));
              }else if ( m == 3 ) {
                total_total_encuestados_3 = (total_total_encuestados_3) + (parseFloat(this.atributos[i].total_encuestados));
                total_encuestados_satisfechos_3 = (total_encuestados_satisfechos_3) + (parseFloat(this.atributos[i].encuestados_satisfechos));
              }else if ( m == 4 ) {
                total_total_encuestados_4 = (total_total_encuestados_4) + (parseFloat(this.atributos[i].total_encuestados));
                total_encuestados_satisfechos_4 = (total_encuestados_satisfechos_4) + (parseFloat(this.atributos[i].encuestados_satisfechos));
              }

            }
            let total = [];

            let  div_1 = total_encuestados_satisfechos_1 / total_total_encuestados_1;
            div_1 = (isNaN(div_1)) ? 0 : div_1 * 100;
            this.trimestre_1 = total_encuestados_satisfechos_1 + '/' + total_total_encuestados_1;

            let  div_2 = total_encuestados_satisfechos_2 / total_total_encuestados_2;
            div_2 = (isNaN(div_2)) ? 0 : div_2 * 100;
            this.trimestre_2 = total_encuestados_satisfechos_2 + '/' + total_total_encuestados_2;

            let  div_3 = total_encuestados_satisfechos_3 / total_total_encuestados_3;
            div_3 = (isNaN(div_3)) ? 0 : div_3 * 100;
            this.trimestre_3 = total_encuestados_satisfechos_3 + '/' + total_total_encuestados_3;

            let  div_4 = total_encuestados_satisfechos_4 / total_total_encuestados_4;
            div_4 = (isNaN(div_4)) ? 0 : div_4 * 100;
            this.trimestre_4 = total_encuestados_satisfechos_4 + '/' + total_total_encuestados_4;


            let meses = [
                'Trimestre I',
                'Trimestre II',
                'Trimestre III',
                'Trimestre IV'
            ]
            total = [
                parseFloat(div_1.toFixed(2)),
                parseFloat(div_2.toFixed(2)),
                parseFloat(div_3.toFixed(2)),
                parseFloat(div_4.toFixed(2))
                ];
                let data = total_meses(total,meses);

            this.mostrar_grafico(data, year);

          }else{
            swal("Error", "No hay datos registrados para el año seleccionado", "warning");
            this.trimestre_1 = 0;
            this.trimestre_2 = 0;
            this.trimestre_3 = 0;
            this.trimestre_4 = 0;
            this.mostrar_grafico(0, year);
          }
        });
      },

      guardar(){

        if(( this.anio > moment().format("YYYY") )){
          swal("Error", "No puedes ingresar registros con fecha superior a la fecha actual", "warning");
            return false;
        }else{
          if(this.trimestre > moment().quarter() ){
            swal("Error", "No puedes ingresar registros con trimestre superior al trimestre actual", "warning");
            return false;
          }
        }

        if( parseFloat(this.total_encuestados) < parseFloat(this.encuestados_satisfechos)){
          swal("Error", "El total de encuestados no puede ser menor a la cantidad de encuestados satisfechos, verifique.", "warning");
          return false;
        }

        let insert = {"total_encuestados":this.total_encuestados, "encuestados_satisfechos":this.encuestados_satisfechos,
                      "trimestre":this.trimestre, "anio":this.anio};
        let update = {"total_encuestados":this.total_encuestados, "encuestados_satisfechos":this.encuestados_satisfechos };
        let temporal = {"tmp_total_encuestados":this.total_encuestados, "tmp_encuestados_satisfechos":this.encuestados_satisfechos };
        let where = { "trimestre":this.trimestre, "anio":this.anio};
        this.$http.post('insertar_datos?view',{tabla:'kpi_indicador_ref8',insert:insert, update:update, where: where, temporal:temporal}).then(function(response){
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

      mostrar_grafico(data, year){

        Highcharts.chart('grafico_8', {
          chart: {
              type: 'areaspline'
          },
          title: {
              text: 'Nivel de satisfacción de la información brindada al ciudadano'
          },
          subtitle: {
            text: 'Año ' + year
          },
          xAxis: {
            categories: data[0]

          },
          yAxis: {
              title: {
                  text: 'N° de ciudadanos satisfechos con la información / N° total de ciudadanos encuestados <br> Porcentaje'
              }
          },
          tooltip: {
              shared: false,
              valueSuffix: '%'
          },
          credits: {
              enabled: false
          },
          plotOptions: {
              areaspline: {
                  fillOpacity: 0.5,
                  dataLabels: {
                     enabled: true
                 },
                 enableMouseTracking: true
              }
          },
          series: [{
              name: 'Porcentaje',
              data: data[1],
              color: 'rgba(69,172,224)'
          }]
      });
      }
    }
  })
