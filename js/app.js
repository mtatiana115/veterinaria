//Variables
const btnSubmit = document.querySelector("#btn_submit");
const namePetInput = document.querySelector("#name_pet");
const nameOwnerInput = document.querySelector("#name_owner");
const phoneNumberInput = document.querySelector("#phone_number");
const dateCiteInput = document.querySelector("#date_cite");
const timeCiteInput = document.querySelector("#time_cite");
const descriptionInput = document.querySelector("#description");
let pets = [];

//Eventos
document.addEventListener("DOMContentLoaded", function () {
	const petsCache = localStorage.getItem("petsVet");
	if (petsCache) {
		pets = JSON.parse(petsCache);
	}
});

btnSubmit.addEventListener("click", function (e) {
	e.preventDefault();
	//obtener los valores
	const namePet = namePetInput.value;
	const nameOwner = nameOwnerInput.value;
	const phoneNumber = phoneNumberInput.value;
	const dateCite = dateCiteInput.value;
	const timeCite = timeCiteInput.value;
	const description = descriptionInput.value;

	pets.push({
		namePet,
		nameOwner,
		phoneNumber,
		dateCite,
		timeCite,
		description,
		id: Date.now(),
	});
	formResults();

	//limpiar formulario
	document.querySelector("form").reset();
});
//FUNCIONES
function formResults() {
	const informationCollected = document.querySelector("#information_collected");
	informationCollected.innerHTML = "";

	pets.forEach((pet) => {
		const plantilla = document.createElement("p");
		plantilla.style.fontSize = "22px";
		plantilla.classList = "plantilla";
		plantilla.innerHTML = `Paciente: ${pet.namePet} </br>
    Propietario: ${pet.nameOwner} </br>
    Teléfono de contacto: ${pet.phoneNumber} </br>
    Fecha de la cita: ${pet.dateCite} </br>
    Hora de la cita: ${pet.timeCite} </br>
    Síntomas: ${pet.description}
    `;
		informationCollected.appendChild(plantilla);

		//crear los botones adicionales
		/*Editar*/
		const newDiv = document.createElement("div");
		newDiv.classList = "d-flex gap-2";
		plantilla.appendChild(newDiv);

		const btnEditar = document.createElement("button");
		btnEditar.textContent = "Editar";
		btnEditar.classList = "btn btn-success w-40";

		btnEditar.addEventListener("click", function () {
			mostrarFormularioEdicion(
				pet.namePet,
				pet.nameOwner,
				pet.phoneNumber,
				pet.dateCite,
				pet.timeCite,
				pet.description
			);
			plantilla.style.display = "none";
		});
		newDiv.appendChild(btnEditar);

		/*Eliminar*/
		const btnEliminar = document.createElement("button");
		btnEliminar.textContent = "Eliminar";
		btnEliminar.classList = "btn btn-success w-40";

		btnEliminar.addEventListener("click", function () {
			btnEliminar.parentElement.parentElement.remove();

			pets = pets.filter((petELiminar) => petELiminar.id != pet.id);
			localStorage.setItem("petsVet", JSON.stringify(pets));
		});
		newDiv.appendChild(btnEliminar);

		function mostrarFormularioEdicion() {
			const formularioEdicion = document.createElement("form");
			formularioEdicion.classList = "p-2";
			formularioEdicion.innerHTML = `
        <label for="edit_name_pet">Mascota:</label>
        <input class="form-control"  type="text" id="edit_name_pet" value="${pet.namePet}" required><br>

        <label for="edit_name_owner">Propietario:</label>
        <input class="form-control"  type="text" id="edit_name_owner" value="${pet.nameOwner}" required><br>
    
        <label for="edit_phone_number">Teléfono de contacto:</label>
        <input class="form-control"  type="text" id="edit_phone_number" value="${pet.phoneNumber}" required><br>
    
        <label for="edit_date_cite">Fecha de la cita:</label>
        <input class="form-control"  type="text" id="edit_date_cite" value="${pet.ateCite}" required><br>
    
        <label for="edit_time_cite">Hora de la cita:</label>
        <input class="form-control"  type="text" id="edit_time_cite" value="${pet.timeCite}" required><br>
    
        <label for="edit_description">Síntomas:</label>
        <textarea class="form-control"  id="edit_description" required>${pet.description}</textarea><br>
    
        <button class="btn btn-success w-40" type="button" id="btnGuardar" data-id="${pet.id}">Guardar</button>
      `;

			// Agregar el formulario de edición al contenedor
			informationCollected.appendChild(formularioEdicion);

			// Agregar evento al botón de guardar
			const btnGuardar = document.getElementById("btnGuardar");

			btnGuardar.addEventListener("click", function () {
				// Obtener valores del formulario de edición
				const editedNamePet = document.getElementById("edit_name_pet").value;
				const editedNameOwner =
					document.getElementById("edit_name_owner").value;
				const editedPhoneNumber =
					document.getElementById("edit_phone_number").value;
				const editedDateCite = document.getElementById("edit_date_cite").value;
				const editedTimeCite = document.getElementById("edit_time_cite").value;
				const editedDescription =
					document.getElementById("edit_description").value;
				const idUpdating = btnGuardar.getAttribute("data-id");

				const petUpdating = pets.find((pet) => pet.id == idUpdating);
				if (petUpdating) {
					petUpdating.namePet = editedNamePet;
					petUpdating.nameOwner = editedNameOwner;
					petUpdating.phoneNumber = editedPhoneNumber;
					petUpdating.dateCite = editedDateCite;
					petUpdating.timeCite = editedTimeCite;
					petUpdating.description = editedDescription;
				}
				// Llamar a la función con los valores editados
				formResults();

				// Mostrar el texto original y ocultar el formulario de edición
				formularioEdicion.style.display = "none";
				informationCollected.querySelector("p").style.display = "block";

				//localstorage
			});
		}
	});
	localStorage.setItem("petsVet", JSON.stringify(pets));
}
