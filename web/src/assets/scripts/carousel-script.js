import $ from 'jquery';
$(document).ready(function(){
    console.log("El script de inicialización del carrusel se está ejecutando.");
    $('.carousel').carousel({
        interval: 3000 
    });
});