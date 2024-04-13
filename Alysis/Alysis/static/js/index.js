const new_data_set_button = document.getElementById('new-data-set-button')

//new data set form
const new_data_set_close_button = document.getElementById('new-data-set-modal-close-x')
const new_data_set_modal = document.getElementById('new-data-set-modal')
const new_data_set_modal_form = document.getElementById('new-data-set-modal-form')
const add_new_row_button = document.getElementById('add-new-row')


function getCookie(name) {

	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}


function sendFormData(data) {
	console.log(data)
	let requestOptions = {

		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"X-CSRFToken": getCookie('csrftoken'),
		},
		// send 
		body: data
	}

	fetch('./', requestOptions)

		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Network response was not ok.');
		})

		.then(data => {
			console.log(data)
		})

		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		})
}


function openModal(modal) {
	modal.style.display = 'block'
}


function closeModal(modal) {
	modal.style.display = 'none'
}


function deleteElements(class_name, except_id){
	class_name = '.' + class_name
	document.querySelectorAll(class_name).forEach(function(element) {
		if (!(element.id === except_id)){
			element.remove()
		}
	});
}


function takeLastAfter(after, string){
    const parts = string.split(after);
	return parts.length > 1 ? parts[1] : "";
}


function getLastInputNumber(){
	let max = 0

	document.querySelectorAll('.data-input').forEach(function(element) {
		let id_number = parseInt(takeLastAfter(after='_', string=element.id))
		if (id_number > max){
			max = id_number
		}
	});

	return max
}


function addNewRow(){
	let max = getLastInputNumber() 
	max++

	let input_name = 'data-' + max.toString()
	let input_id = 'data-input_' + max.toString() 

	let container = document.getElementById('new-data-append')
	let new_input = document.createElement('input')
	
	new_input.setAttribute('type', 'text')
	new_input.setAttribute('name', input_name)
	new_input.setAttribute('id', input_id)
	new_input.setAttribute('class', 'data-input')
	new_input.setAttribute('placeholder', 'Data')

	container.appendChild(new_input)

	new_input.focus();
}

// open modal
new_data_set_button.addEventListener('click', function(e) {
	openModal(new_data_set_modal)
})

// save actual data row
add_new_row_button.addEventListener('click', function(e) {
	e.preventDefault()
	addNewRow()
})

// save actual data row (by pressing enter)
add_new_row_button.addEventListener('keyup', function(e) {
	if (e.key === 'Enter'){
		e.preventDefault()
		addNewRow()
	}
})

// send the data to the server
new_data_set_modal_form.addEventListener('submit', function(e) {
	e.preventDefault()
	let data = JSON.stringify({
		action: 'new_data_set',

		//this should later contain a list with all the data 
		data: '10'

	})
	sendFormData(data)
	new_data_set_modal_form.reset()

	deleteElements(class_name='data-input', except_id='data-input_0')

	closeModal(new_data_set_modal)
})

// close new data set modal
new_data_set_close_button.addEventListener('click', function(e){
	closeModal(new_data_set_modal)
})