function probarValidarSueldosIngresados() {
	console.assert(
		validarSueldosIngresados("") === "Tenés que ingresar un valor",
		"Validar Cantidad Familiares falló en validar que se ingresara algún valor"
	);
	console.assert(
		validarSueldosIngresados("asd") === "Solo se pueden ingresar números (enteros o con hasta 2 decimales) positivos",
		"Validar Cantidad Familiares falló en validar que solo se ingresaran caracteres numéricos"
	);
	console.assert(
		validarSueldosIngresados("3.asd") === "Solo se pueden ingresar números (enteros o con hasta 2 decimales) positivos",
		"Validar Cantidad Familiares falló en validar que solo se ingresaran caracteres numéricos"
	);
	console.assert(
		validarSueldosIngresados("asd.3") === "Solo se pueden ingresar números (enteros o con hasta 2 decimales) positivos",
		"Validar Cantidad Familiares falló en validar que solo se ingresaran caracteres numéricos"
	);
	console.assert(
		validarSueldosIngresados("22.333") ===
			"Solo se pueden ingresar números (enteros o con hasta 2 decimales) positivos",
		"Validar Cantidad Familiares falló en validar que solo se ingresaran caracteres numéricos"
	);
	console.assert(
		validarSueldosIngresados(0) === "El valor ingresado tiene que ser mayor a 0",
		"Validar Cantidad Familiares falló en validar valores en 0"
	);
	console.assert(validarSueldosIngresados(1) === "", "Validar Cantidad Familiares falló en validar valores correctos");
	console.assert(
		validarSueldosIngresados(1.1) === "",
		"Validar Cantidad Familiares falló en validar valores correctos"
	);
}

probarValidarSueldosIngresados();
