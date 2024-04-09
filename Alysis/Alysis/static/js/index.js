const new_data_set_button = document.getElementById('new-data-set-button')

//new data set form
const new_data_set_modal = document.getElementById('new-data-set-modal')
const new_data_set_modal_form = document.getElementById('new-data-set-modal-form')
const add_new_row_button = document.getElementById('add-new-row')
const send_new_data_set = document.getElementById('send-new-data-set')


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


new_data_set_button.addEventListener('click', function(e) {
	openModal(new_data_set_modal)
})

add_new_row_button.addEventListener('click', function(e) {
	e.preventDefault()
})

new_data_set_modal_form.addEventListener('submit', function(e) {
	e.preventDefault()
	let data = JSON.stringify({
		action: 'new_data_set',

		//this should later contain a list with all the data 
		data: '10'

	})
	sendFormData(data)
})

send_new_data_set.addEventListener('click', function(e) {
	//
})