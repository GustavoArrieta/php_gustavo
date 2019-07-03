$(document).ready(function() {
    $('#formulario').submit(function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: './buscador.php',
            data: $(this).serialize(),
            success: function(response) {
                console.log(response);
                var jsonData = JSON.parse(response);

                $(".informacion").empty();
                for (var i = 0; i < jsonData.length; i++) {
                    if (jsonData) {


                        $(".informacion").append(`<div class="col s12 "> <div class="card horizontal"> 
                           <div class="card-image"> <img src="img/home.jpg"> </div> 
                           <div class="card-stacked"> 
                           <div class="card-content">
                           <b>Id:</b> ${jsonData[i].Id} <br> 
                           <b>Dirección:</b> ${jsonData[i].Direccion} <br> 
                           <b>Ciudad:</b> ${jsonData[i].Ciudad} <br> 
                           <b>Teléfono:</b> ${jsonData[i].Telefono} <br> 
                           <b>Código postal:</b> ${jsonData[i].Codigo_Postal} <br> 
                           <b>Tipo:</b> ${jsonData[i].Tipo} <br> 
                           <b>Precio:</b> ${jsonData[i].Precio} </div> 
                           <div class="card-action"> <a href="#">Ver mas</a> </div> </div> </div> </div>`);

                    }
                }
            }
        });
    });
});

//Inicializamos el input Ciudad

var ciudades = ["New York", "Orlando", "Los Angeles", "Houston", "Washington", "Miami"];

for (var i = 0; i < ciudades.length; i++) {
option = ciudades[i];
var x = document.createElement("OPTION");
var t = document.createTextNode(option);
x.appendChild(t);
document.getElementById("selectCiudad").appendChild(x);
}

$('select').material_select();

//Inicializamos el input Tipo

var tipo = ["Casa", "Casa de Campo", "Apartamento"];

for (var i = 0; i < tipo.length; i++) {
option = tipo[i];
var x = document.createElement("OPTION");
var t = document.createTextNode(option);
x.appendChild(t);
document.getElementById("selectTipo").appendChild(x);
}

$('select').material_select();




//funcion para mostrar todos los elementos al ejecutar el boton mostrar Todos

$('#mostrarTodos').click(function(){
mostrarTodos();
});
 function mostrarTodos() {
    $.ajax({
        url: "mostrar.php",
        type: "GET",
        success: function(response) {
            console.log(response);
            response = JSON.parse(response);
            $(".informacion").empty();
            $.each(response, function(i, data) {
                $(".informacion").append(`
                    <div class="tituloContenido card itemMostrado">
                        <img src="img/home.jpg">
                        <div class="card-stacked">
                           <div class="card-content">
                              <b>Id:</b> ${data.Id}<br>
                              <b>Dirección:</b> ${data.Direccion} <br>
                              <b>Ciudad:</b> ${data.Ciudad}<br>
                              <b>Telefono:</b> ${data.Telefono}<br>
                              <b>Codigo Postal:</b> ${data.Codigo_Postal}<br>
                              <b>Tipo:</b> ${data.Tipo}<br>
                              <b>Precio:</b> ${data.Precio}<br>
                              </div>
                          <div class="card-action"> <a href="#">Ver mas</a> </div> </div> </div> </div>

                `)
            });
        }
    });
}



/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};



/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 200,
        to: 80000,
        prefix: "$"
    });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/

function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            if (scrollActual > ultimoScroll) {
                video.play();
            } else {
                //this.rewind(1.0, video, intervalRewind);
                video.play();
            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            video.pause();
        }, 10)
}



inicializarSlider();
playVideoOnScroll();

