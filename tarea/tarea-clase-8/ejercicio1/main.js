/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $form = document.formulario;

document.querySelector("#aceptar-cantidad-familiares").onclick = function(e) {
	e.preventDefault();
	// Primera etapa, click en el botón de Aceptar para agregar los elementos
	const $cantidadFamiliares = document.querySelector("#cantidad-familiares").value;
	const errorCantidadFamiliares = validarCantidadFamiliares($cantidadFamiliares);
	const errores = {
		"cantidad-familiares": errorCantidadFamiliares
	};

	const esExito = !Boolean(manejarErrores(errores));

	if (esExito) {
		agregarElementos($cantidadFamiliares);
		document.querySelector("#calcular-edades").hidden = false;
		document.querySelector("#cantidad-familiares").disabled = true;
		document.querySelector("#aceptar-cantidad-familiares").disabled = true;
	}
};
document.querySelector("#calcular-edades").onclick = function(e) {
	e.preventDefault();
	// Segunda etapa, click en el botón de Calcular Edades para calcular valores

	const inputsEdadesCrudo = document.querySelectorAll(".generated-element-input");
	const inputsEdades = [];
	for (let elemento of inputsEdadesCrudo) {
		inputsEdades.push(Number(elemento.value));
	}
	// No se la cantidad de inputs a generar, no puedo generar previamente el JSON
	// La función validar edades hace las validaciones y devuelve directamente el JSON
	const erroresEdadFamiliares = validarInputsNumericos(inputsEdades);
	const esExito = manejarErrores(erroresEdadFamiliares) === 0;

	if (esExito) {
		const contenedorOutput = document.querySelector("#output");
		eliminarElementosResultado();
		contenedorOutput.appendChild(crearElementoResultado(calcularEdadPromedio(inputsEdades), "promedio"));
		contenedorOutput.appendChild(crearElementoResultado(calcularEdadMinima(inputsEdades), "mínima"));
		contenedorOutput.appendChild(crearElementoResultado(calcularEdadMaxima(inputsEdades), "máxima"));
	}
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
	const paragraphs = document.querySelectorAll(".li-element");
	paragraphs.forEach(element => {
		element.remove();
	});
	const $cantidadFamiliares = document.querySelector("#cantidad-familiares");
	document.querySelector("#aceptar-cantidad-familiares").disabled = false;
	$cantidadFamiliares.disabled = false;
	$cantidadFamiliares.value = "";
	$cantidadFamiliares.className = "";
	document.querySelector("#calcular-edades").hidden = true;
	limpiarErrores();
};

function validarCantidadFamiliares($cantidadFamiliares) {
	const soloNumeros = /^\d+$/.test($cantidadFamiliares);
	if ($cantidadFamiliares == "") {
		return "Tenés que ingresar un valor";
	} else if (!soloNumeros) {
		return "Solo se pueden ingresar caracteres numéricos enteros";
	} else {
		return "";
	}
}
function validarInputsNumericos(edadesFamiliares) {
	const erroresJSON = {};

	edadesFamiliares.forEach((edad, index) => {
		erroresJSON[`familiar-${index + 1}`] = validarCantidadFamiliares(edad);
	});

	return erroresJSON;
}
function manejarErrores(errores) {
	const nombreInputs = Object.keys(errores);
	const $errores = document.querySelector("#errores");
	limpiarErrores();

	let cantidadErrores = 0;
	nombreInputs.forEach(nombreInput => {
		const error = errores[nombreInput];
		if (error) {
			cantidadErrores++;
			// Reemplazo className por classList para poder agregar/quitar
			// En vez de reemplazar todas las clases de mis elementos
			$form[nombreInput].classList.add("error");
			const $error = document.createElement("li");
			$error.innerText = error;
			$errores.appendChild($error);
		} else {
			$form[nombreInput].classList.remove("error");
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
function agregarElementos(cantidad) {
	for (let i = 0; i < cantidad; i++) {
		const newLabel = document.createElement("label");
		newLabel.for = `Familiar ${i + 1}`;
		newLabel.textContent = `Edad familiar ${i + 1}`;
		newLabel.classList.add("generated-element-label");
		const newInput = document.createElement("input");
		newInput.id = `familiar-${i + 1}`;
		newInput.classList.add("generated-element-input");
		document.querySelector("#input-edades-container").appendChild(newLabel);
		document.querySelector("#input-edades-container").appendChild(newInput);
	}
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
function crearElementoResultado(valorInterno, nombreFuncion) {
	const nuevoElementoResultado = document.createElement("li");
	nuevoElementoResultado.classList.add("li-element");
	nuevoElementoResultado.innerHTML = `La edad ${nombreFuncion} es ${valorInterno}`;
	return nuevoElementoResultado;
}
function eliminarElementosResultado() {
	const $elementosResultado = document.querySelectorAll("#output > li");
	$elementosResultado.forEach(elementoResultado => {
		elementoResultado.parentNode.removeChild(elementoResultado);
	});
}
