function probarValidarNombre() {
	console.assert(
		validarNombre("") === "El nombre debe tener al menos un caracter.",
		"Validar nombre no validó que el nombre no sea vacío"
	);

	console.assert(
		validarNombre("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111") ===
			"El nombre debe tener menos de 50 caracteres.",
		"Validar nombre no validó que el nombre sea menor a 50 caracteres"
	);

	console.assert(
		validarNombre("Guido7") === "El nombre solo puede tener letras de la A a la Z",
		"Validar nombre no validó que el nombre solo tuviera caracteres de la A a la Z"
	);

	console.assert(validarNombre("Guido") === "", "Validar nombre falló con un nombre válido");
}

function probarValidarCiudad() {
	console.assert(
		validarCiudad("") === "Debes seleccionar una ciudad",
		"Validar nombre no validó que la ciudad no sea vacía"
	);
	console.assert(validarCiudad("Corrientes") === "", "Validar nombre falló con una ciudad válida");
}

function probarValidarDescripcionRegalo() {
	console.assert(
		validarDescripcionRegalo("") === "La descripción no puede estar vacía",
		"Validar descripción regalo no validó que la descripción no esté vacía"
	);
	console.assert(
		validarDescripcionRegalo(
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ipsum aut praesentium quaerat. Odit qui"
		) === "La descripción tiene que tener menos de 100 caracteres",
		"Validar descripción regalo no validó que la descripción tenga menos de 100 caracteres"
	);
	console.assert(
		validarDescripcionRegalo("*/*-/-*/") === "La descripción tiene que tener solo letras y números",
		"Validar descripción falló en validar caracteres"
	);
	console.assert(
		validarDescripcionRegalo("Quiero un auto azul, modelo 3") === "",
		"Validar descripción falló en validar una descripción correcta"
	);
}

probarValidarNombre();
probarValidarCiudad();
probarValidarDescripcionRegalo();
