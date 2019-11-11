/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

document.querySelector("#agregar-familiar").onclick = function(e) {
	e.preventDefault();
	agregarElemento();
};
document.querySelector("#eliminar-familiar").onclick = function(e) {
	e.preventDefault();
	eliminarElemento();
};

document.querySelector("#calcular").onclick = function(e) {
	e.preventDefault();
	const paragraphs = document.querySelectorAll(".p-element-output-info");
	paragraphs.forEach(element => {
		element.remove();
	});
	const inputsEdadesCrudo = document.querySelectorAll(".generated-element-input");
	const inputsEdades = [];
	for (let elemento of inputsEdadesCrudo) {
		inputsEdades.push(Number(elemento.value));
	}
	const contenedorOutput = document.querySelector("#output");
	contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoPromedio(inputsEdades), "promedio"));
	contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoMensualPromedio(inputsEdades), "mensual promedio"));
	contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoMinimo(inputsEdades), "mínimo"));
	contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoMaximo(inputsEdades), "máximo"));
};

document.querySelector("#reset").onclick = function(e) {
	e.preventDefault();
	const inputs = document.querySelectorAll(".generated-element");
	inputs.forEach(element => {
		element.remove();
	});
};

function agregarElemento() {
	const newLabel = document.createElement("label");
	newLabel.for = `Familiar ${document.querySelectorAll("input").length + 1}`;
	newLabel.textContent = `Sueldo anual familiar ${document.querySelectorAll("input").length + 1}`;
	newLabel.classList.add("generated-element-label", "generated-element");
	const newInput = document.createElement("input");
	newInput.id = `familiar-${document.querySelectorAll("input").length + 1}`;
	newInput.classList.add("generated-element-input", "generated-element");
	document.querySelector("#element-container").appendChild(newLabel);
	document.querySelector("#element-container").appendChild(newInput);
}

function eliminarElemento() {
	if (document.querySelectorAll("input").length === 0) {
		return false;
	}
	const inputs = document.querySelectorAll(".generated-element-input");
	inputs[inputs.length - 1].remove();
	const labels = document.querySelectorAll(".generated-element-label");
	labels[labels.length - 1].remove();
}

function validarArray(arrayInput) {
	let arrayOutput = [];
	for (let arrayValue of arrayInput) {
		if (arrayValue > 0) {
			arrayOutput.push(arrayValue);
		}
	}
	return arrayOutput;
}

function calcularSueldoPromedio(arraySueldos) {
	let sueldoPromedio = 0;
	let counter = 0;
	for (let i = 0; i < arraySueldos.length; i++) {
		if (arraySueldos[i] >= 1) {
			counter++;
			sueldoPromedio += arraySueldos[i];
		}
	}
	if (counter === 0) {
		return "Ingresá al menos un sueldo válido";
	} else {
		return (sueldoPromedio / counter).toFixed(2);
	}
}
function calcularSueldoMensualPromedio(arraySueldos) {
	let sueldoPromedio = 0;
	let counter = 0;
	for (let i = 0; i < arraySueldos.length; i++) {
		if (arraySueldos[i] >= 1) {
			counter++;
			sueldoPromedio += arraySueldos[i];
		}
	}
	if (counter === 0) {
		return "Ingresá al menos un sueldo válido";
	} else {
		return (sueldoPromedio / counter / 12).toFixed(2);
	}
}
function calcularSueldoMinimo(arraySueldos) {
	let arraySueldosProcesado = validarArray(arraySueldos);
	let sueldoMinimo = arraySueldosProcesado[0];
	for (let i = 0; i < arraySueldosProcesado.length; i++) {
		if (arraySueldosProcesado[i] < sueldoMinimo && arraySueldos[i] >= 1) {
			sueldoMinimo = arraySueldosProcesado[i];
		}
	}
	if (sueldoMinimo < 1 || sueldoMinimo === undefined) {
		throw "Ingresá al menos un sueldo válido";
	} else {
		return sueldoMinimo.toFixed(2);
	}
}
function calcularSueldoMaximo(arraySueldos) {
	let sueldoMaximo = arraySueldos[0];
	for (let i = 0; i < arraySueldos.length; i++) {
		if (arraySueldos[i] > sueldoMaximo && arraySueldos[i] >= 1) {
			sueldoMaximo = arraySueldos[i];
		}
	}
	if (sueldoMaximo < 1) {
		return "Ingresá al menos un sueldo válido";
	} else {
		return sueldoMaximo.toFixed(2);
	}
}
function crearElementoParrafo(valorInterno, nombreFuncion) {
	const nuevoParrafo = document.createElement("p");
	nuevoParrafo.classList.add("p-element-output-info", "generated-element");
	nuevoParrafo.innerHTML = `El sueldo ${nombreFuncion} es $${valorInterno}`;
	return nuevoParrafo;
}
