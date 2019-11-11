function probarValidarCantidadFamiliares() {
	console.assert(
		validarCantidadFamiliares("") === "Tenés que ingresar un valor",
		"Validar Cantidad Familiares falló en validar que se ingresara algún valor"
	);
	console.assert(
		validarCantidadFamiliares("asd") === "Solo se pueden ingresar caracteres numéricos enteros",
		"Validar Cantidad Familiares falló en validar que solo se ingresaran caracteres numéricos"
	);
	console.assert(validarCantidadFamiliares(3) === "", "Validar Cantidad Familiares falló en validar valores correctos");
}

probarValidarCantidadFamiliares();
