const $form = document.formulario;
$form.onsubmit = validarFormulario;

function validarFormulario(e) {
	e.preventDefault();

	const nombre = $form.nombre.value;
	const ciudad = $form.ciudad.value;
	const descripcionRegalo = $form["descripcion-regalo"].value; //para nombres que tienen "-"
	const errorNombre = validarNombre(nombre);
	const errorCiudad = validarCiudad(ciudad);
	const errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo);
	const errores = {
		nombre: errorNombre,
		ciudad: errorCiudad,
		"descripcion-regalo": errorDescripcionRegalo
	};
	const esExito = manejarErrores(errores) === 0;
	if (esExito) {
		document.querySelector("#exito").classList = "";
		$form.classList = "oculto";
		setTimeout(() => {
			window.location.href = "../wishlist.html";
		}, 5000);
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

function validarNombre(nombre) {
	const contieneSoloLetras = /^[a-z]+$/i.test(nombre);
	if (nombre.length === 0) {
		return "El nombre debe tener al menos un caracter.";
	}
	if (nombre.length > 50) {
		return "El nombre debe tener menos de 50 caracteres.";
	}
	if (!contieneSoloLetras) {
		return "El nombre solo puede tener letras de la A a la Z";
	}
	return "";
}

function validarCiudad(ciudad) {
	if (ciudad.length === 0) {
		return "Debes seleccionar una ciudad";
	}
	return "";
}

function validarDescripcionRegalo(descripcionRegalo) {
	if (descripcionRegalo.length === 0) {
		return "La descripción no puede estar vacía";
	} else if (descripcionRegalo.length >= 100) {
		return "La descripción tiene que tener menos de 100 caracteres";
	} else if (!/[a-z0-9,\._ ]+$/i.test(descripcionRegalo)) {
		return "La descripción tiene que tener solo letras y números";
	} else {
		return "";
	}
}
