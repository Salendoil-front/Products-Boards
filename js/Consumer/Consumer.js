const urlurl = 'http://176.57.78.17:8888/oilProducts'



function  boardConsumer(obj){
	let html = `
		
			<div class="board-consumer__item">
				<div class="board-consumer__id">Код потребителя: ${obj.id}</div>
				<div class="board-consumer__address">Местонахождение: ${obj.address}</div>
				<div class="board-consumer__phone">Номер телефона: ${obj.phone}</div>
				
				<button class="btn-consumer--update" id="btn-consumer--update-id" onclick="showUpdateForm()">UPDATE</button>
				<button class="btn-consumer--delete" onclick="deleteConsumer(${obj.id})">DELETE</button>
			</div>

		
		
	`

	return html
}

class ConsumerApi{

	static getConsumer(){
		return fetch(urlurl + '/consumers',{
			method:'GET'
		}).then(res => res.json())
	}

	static deleteConsumer(id){
		return fetch(urlurl + `/consumer?id=${id}`,{
			method:'DELETE'
		}).then(res => res.json())
	}

	static createNewConsumer(body){
		const headers = {
			'Content-Type': 'application/json'
		}

		console.log(body)

		return fetch(urlurl + '/consumer',{
			method: 'POST',
			headers: headers,
			body: body
		}).then(res => res.json())
	}

	static updateConsumer(body){
		const headers={'Content-Type': 'application/json'}

		console.log(body)

		return fetch(urlurl + '/consumer',{
			method: 'PUT',
			headers : headers,
			body: body
		}).then(res => res.json())
	}
}


document.addEventListener('DOMContentLoaded' , function(){
	ConsumerApi.getConsumer()
		.then(data => {
			console.log(data)
			renderConsumer(data)
		})
})



function showUpdateForm(){
	document.getElementById('form-consumer--update').classList.add('active')
}


function renderConsumer(data){
	let visebleBoard = document.getElementById('board-consumer')

	visebleBoard.innerHTML = '';

	data.forEach((item) => {
		let newHtml = boardConsumer(item)

		visebleBoard.innerHTML += newHtml;		
	})
}

function deleteConsumer(id){
	console.log(id)

	ConsumerApi.deleteConsumer(id)
		.then(data => {
			console.log(`Delete elem with id = ${id}`,data)
			renderConsumer(data)
		})
		.catch(err => console.log('Error', err))
}

function createConsumer(){
	const newConsumer ={
		address: document.getElementById('btn-consumer__addres-id').value,
		phone: document.getElementById('btn-consumer__phone-id').value,
		bankAccountId: document.getElementById('btn-consumer__bank-id').value
	}

	console.log(newConsumer)

	ConsumerApi.createNewConsumer(JSON.stringify(newConsumer))
		.then(data => {
			console.log(data)
			renderConsumer(data)
		})
		.catch(err => console.log('Error', err))
}

function updateConsumer(body){
	const updatingConsumer = {
		id: document.getElementById('btn-consumer--update__id-id').value,
		address: document.getElementById('btn-consumer--update__address-id').value,
		phone: document.getElementById('btn-consumer--update__phone-id').value,
		bankAccountId: document.getElementById('btn-consumer--update__bank-id').value
	}

	console.log(updatingConsumer)

	ConsumerApi.updateConsumer(JSON.stringify(updatingConsumer))
		.then(data => {
			console.log(data)
			renderConsumer(data)
		})
		.catch(err => console.log('Error', err))
}


