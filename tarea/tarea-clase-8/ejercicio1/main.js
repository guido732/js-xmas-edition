/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $form = document.formulario;

document.querySelector("#submit-cantidad-familiares").onclick = function(e) {
	e.preventDefault();
	const cantidadFamiliares = document.querySelector("#cantidad-familiares").value;
	const errorCantidadFamiliares = validarCantidadFamiliares(cantidadFamiliares);
	const errores = {
		"cantidad-familiares": errorCantidadFamiliares
	};

	const esExito = manejarErrores(errores) === 0;
	if (esExito) {
		agregarElementos(cantidadFamiliares);
	}
};

function validarCantidadFamiliares(cantidadFamiliares) {
	const soloNumeros = /^\d+$/.test(cantidadFamiliares);
	if (cantidadFamiliares === "") {
		return "Tenés que ingresar un valor";
	} else if (!soloNumeros) {
		return "Solo se pueden ingresar caracteres numéricos enteros";
	} else {
		return "";
	}
}

function manejarErrores(errores) {
	const nombreInputs = Object.keys(errores);
	const $errores = document.querySelector("#errores");
	limpiarErrores();

	let cantidadErrores = 0;
	nombreInputs.forEach(function(nombreInput) {
		const error = errores[nombreInput];
		if (error) {
			cantidadErrores++;
			$form[nombreInput].className = "error";
			const $error = document.createElement("li");
			$error.innerText = error;
			$errores.appendChild($error);
		} else {
			$form[nombreInput].className = "";
		}
	});
	return cantidadErrores;
}

function limpiarErrores() {
	const errores = document.querySelector("#errores").querySelectorAll("li");
	errores.forEach(error => {
		error.parentNode.removeChild(error);
	});
}

document.querySelector("#calcular-edades").onclick = function(e) {
	e.preventDefault();
	const inputsEdadesCrudo = document.querySelectorAll(".generated-element-input");
	const inputsEdades = [];
	for (let elemento of inputsEdadesCrudo) {
		inputsEdades.push(Number(elemento.value));
	}
	const contenedorOutput = document.querySelector("#output");
	contenedorOutput.appendChild(crearElementoParrafo(calcularEdadPromedio(inputsEdades), "promedio"));
	contenedorOutput.appendChild(crearElementoParrafo(calcularEdadMinima(inputsEdades), "mínima"));
	contenedorOutput.appendChild(crearElementoParrafo(calcularEdadMaxima(inputsEdades), "máxima"));
};
document.querySelector("#reset").onclick = function(e) {
	e.preventDefault();
	const inputs = document.querySelectorAll(".generated-element-input");
	inputs.forEach(element => {
		element.remove();
	});
	const labels = document.querySelectorAll(".generated-element-label");
	labels.forEach(element => {
		element.remove();
	});
	const paragraphs = document.querySelectorAll(".paragraph-element");
	paragraphs.forEach(element => {
		element.remove();
	});
	document.querySelector("#submit-cantidad-familiares").disabled = false;
	document.querySelector("#cantidad-familiares").disabled = false;
	document.querySelector("#cantidad-familiares").value = "";
	document.querySelector("#cantidad-familiares").className = "";
	document.querySelector("#calcular-edades").hidden = true;
	limpiarErrores();
};
function agregarElementos(cantidad) {
	for (let i = 0; i < cantidad; i++) {
		const newLabel = document.createElement("label");
		newLabel.for = `Familiar ${i + 1}`;
		newLabel.textContent = `Edad familiar ${i + 1}`;
		newLabel.classList.add("generated-element-label");
		const newInput = document.createElement("input");
		newInput.id = `familiar-${i + 1}`;
		newInput.classList.add("generated-element-input");
		document.querySelector("#element-container").appendChild(newLabel);
		document.querySelector("#element-container").appendChild(newInput);
	}
	document.querySelector("#calcular-edades").hidden = false;
	document.querySelector("#cantidad-familiares").disabled = true;
	document.querySelector("#submit-cantidad-familiares").disabled = true;
}
function calcularEdadPromedio(arrayEdades) {
	let edadPromedio = 0;
	for (let i = 0; i < arrayEdades.length; i++) {
		edadPromedio += arrayEdades[i];
	}
	return edadPromedio / arrayEdades.length;
}
function calcularEdadMinima(arrayEdades) {
	let edadMinima = arrayEdades[0];
	for (let i = 0; i < arrayEdades.length; i++) {
		if (arrayEdades[i] < edadMinima) {
			edadMinima = arrayEdades[i];
		}
	}
	return edadMinima;
}
function calcularEdadMaxima(arrayEdades) {
	let edadMaxima = arrayEdades[0];
	for (let i = 0; i < arrayEdades.length; i++) {
		if (arrayEdades[i] > edadMaxima) {
			edadMaxima = arrayEdades[i];
		}
	}
	return edadMaxima;
}
function crearElementoParrafo(valorInterno, nombreFuncion) {
	const nuevoParrafo = document.createElement("p");
	nuevoParrafo.classList.add("paragraph-element");
	nuevoParrafo.innerHTML = `La edad ${nombreFuncion} es ${valorInterno}`;
	return nuevoParrafo;
}
