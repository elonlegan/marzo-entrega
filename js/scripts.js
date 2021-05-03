const timeLineDiv = document.querySelector('.timelinespace');

$(function () {
	function hideCardsInfo() {
		document
			.querySelectorAll('#issues.contenidorexperiencia')
			.forEach((element) => {
				element.style.display = 'none';
			});
	}

	function showCardById(id) {
		$('#' + id + ' .contenidorexperiencia').show();
		$('#issues').show();
		timeLineDiv.style.height = '90%';
	}

	const timeLineDates = document.querySelectorAll('#dates a');
	timeLineDates.forEach((date) =>
		date.addEventListener('click', (event) => {
			hideCardsInfo();
			showCardById(event.target.href.split('#')[1]);
		})
	);

	$('.closeCard').bind('click', () => {
		$('#issues').hide();
		timeLineDiv.style.height = '20%';
	});

	$('#issues').hide();
});

var bgd = document.querySelector('#animated_div');
console.log(bgd);

/*window.setInterval(function(){
  $('#animated_div').css('background', '../img/EscenarioUnoSVG.svg');
}, 1000);*/

/*
var fondos = ['../img/EscenarioUnoSVG.svg', '../img/EscenarioDosSVG.svg'];
var fondo_actual = 0;
// aqui hacemos la rotación
var CambiarFondo = function(){
  if (fondo_actual == fondos.length) {
  fondo_actual = 0;
}
var precargar =fondo_actual++;
var precargar2 = precargar+1;
// cambiamos el background del body
document.bgd.style.backgroundImage = 'url('+ fondos[precargar]+ ')';
// cargamos en el div no visible "#precarga" la imagen siguiente que se cargará en el body
// para ya tenerla en la cache, comenzamos con la imagen 3, ya que la 1 y 2 las tenemos en el css
document.getElementById('precarga').style.backgroundImage =  'url('+fondos[precargar2]+ ')';
}
//aqui definís el tiempo en milisegundos e  inicias la función con setInterval para que se repita indefinidamente
window.setInterval(CambiarFondo, 1000); 
//]]>*/
