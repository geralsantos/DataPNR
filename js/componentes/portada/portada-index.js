Vue.component('portada-index', {
    template: '#portada-index',
    data:()=>({
      atributos : [],
      mostrar:false,
      archivo:'',
    }),
    created:function(){

    },
    mounted:function(){

    },

    methods:{
        guardar(){
           /* var formData = new FormData(document.getElementById("formuploadajax"))
            formData.append("archivo",document.getElementById('archivo'));*/
            this.$http.post('cargar_archivo?view').then(function(response){
              //  console.log(response);
                swal("Subida", "El archivo ha sido subido.", "success");
/*
                let data = response.body.resultado;
                if (data) {
                    swal("Subida", "El archivo ha sido subido.", "success");
                }else{
                    swal("Error", "Un error ha ocurrido", "error");
                }*/
            });
        }
    }
  })
