const $form = document.formulario;

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

	// Limpiar resultados anteriores en caso de haberlos
	eliminarValoresResultados();

	// Selecciono todos mis elementos en un nodeList, luego los emprolijo en un array
	const $inputsSueldosCrudo = document.querySelectorAll(".generated-element-input");
	const inputsSueldos = [];
	for (let elemento of $inputsSueldosCrudo) {
		inputsSueldos.push(elemento.value);
	}

	// Hago validación y devuelve JSON
	const errores = procesarDatosValidados(inputsSueldos);

	// Manejo de errores y asignación a expresión booleana
	const exito = manejarErrores(errores) === 0;
	if (exito) {
		// Genero y agrego elementos según mis valores ingresados
		const $contenedorOutput = document.querySelector("#output");
		$contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoPromedio(inputsSueldos), "promedio"));
		$contenedorOutput.appendChild(
			crearElementoParrafo(calcularSueldoMensualPromedio(inputsSueldos), "mensual promedio")
		);
		$contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoMinimo(inputsSueldos), "mínimo"));
		$contenedorOutput.appendChild(crearElementoParrafo(calcularSueldoMaximo(inputsSueldos), "máximo"));
	}
};

document.querySelector("#reset").onclick = function(e) {
	e.preventDefault();
	eliminarInputsGenerados();
	eliminarErrores();
	eliminarValoresResultados();
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

function crearElementoParrafo(valorInterno, nombreFuncion) {
	const nuevoParrafo = document.createElement("p");
	nuevoParrafo.classList.add("p-element-output-info", "generated-element");
	nuevoParrafo.innerHTML = `El sueldo ${nombreFuncion} es $${valorInterno}`;
	return nuevoParrafo;
}

function eliminarValoresResultados() {
	const paragraphs = document.querySelectorAll(".p-element-output-info");
	paragraphs.forEach(element => {
		element.remove();
	});
}

function eliminarInputsGenerados() {
	const inputs = document.querySelectorAll(".generated-element");
	inputs.forEach(element => {
		element.remove();
	});
}

function eliminarErrores() {
	const errores = document.querySelectorAll("#errores > li");
	errores.forEach(error => {
		error.remove();
	});
}

function procesarDatosValidados(inputsSueldos) {
	// Toma un array, procesa a los datos llamando a validarSueldosIngresados y devuelve un JSON
	const objetoSueldos = {};
	for (let i = 1; i <= inputsSueldos.length; i++) {
		objetoSueldos[`familiar-${i}`] = validarSueldosIngresados(inputsSueldos[i - 1]);
	}
	return objetoSueldos;
}

// TODO Validaciones (Unit Tests)
// TODO Rechazar botón de calcular sin haber ingresado familiares/valores
function validarSueldosIngresados(valorAValidar) {
	// Toma un valor único y lo valida con una Regular Expression

	const soloNumeros = /^\d+(\.\d{1,2})?$/;
	if (valorAValidar == "") {
		return "Tenés que ingresar un valor";
	} else if (!soloNumeros.test(valorAValidar)) {
		return "Solo se pueden ingresar números (enteros o con hasta 2 decimales) positivos ";
	} else {
		return "";
	}
}

function manejarErrores(errores) {
	// Limpia errores anteriores
	eliminarErrores();

	const $errorContainer = document.querySelector("#errores");
	const nombreInputs = Object.keys(errores);
	let cantidadErorres = 0;
	nombreInputs.forEach(nombreInput => {
		const error = errores[nombreInput];
		if (error) {
			cantidadErorres++;
			$form[nombreInput].classList.add("error");
			const $elementoError = document.createElement("li");
			$elementoError.innerText = error;
			$errorContainer.appendChild($elementoError);
		} else {
			$form[nombreInput].classList.remove("error");
		}
	});
	return cantidadErorres;
}

function calcularSueldoPromedio(arraySueldos) {
	let sueldoPromedio = 0;
	let counter = 0;
	for (let i = 0; i < arraySueldos.length; i++) {
		counter++;
		sueldoPromedio += Number(arraySueldos[i]);
	}
	return (sueldoPromedio / counter).toFixed(2);
}

function calcularSueldoMensualPromedio(arraySueldos) {
	let sueldoPromedio = 0;
	let counter = 0;
	for (let i = 0; i < arraySueldos.length; i++) {
		counter++;
		sueldoPromedio += Number(arraySueldos[i]);
	}
	return (sueldoPromedio / counter / 12).toFixed(2);
}

function calcularSueldoMinimo(arraySueldos) {
	let sueldoMinimo = arraySueldos[0];
	for (let i = 0; i < arraySueldos.length; i++) {
		if (arraySueldos[i] < sueldoMinimo) {
			sueldoMinimo = arraySueldos[i];
		}
	}
	return sueldoMinimo;
}

function calcularSueldoMaximo(arraySueldos) {
	let sueldoMaximo = arraySueldos[0];
	for (let i = 0; i < arraySueldos.length; i++) {
		if (arraySueldos[i] > sueldoMaximo) {
			sueldoMaximo = arraySueldos[i];
		}
	}
	return sueldoMaximo;
}
