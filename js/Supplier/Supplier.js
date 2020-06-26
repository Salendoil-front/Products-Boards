const urlurl = 'http://176.57.78.17:8888/oilProducts'

function boardSupplier(obj){
	let html = `
		<div class="board-consumer__item">
				<div class="board-consumer__id">Код потребителя: ${obj.id}</div>
				<div class="board-consumer__address">Местонахождение: ${obj.address}</div>
				<div class="board-consumer__phone">Номер телефона: ${obj.phone}</div>
				
				<button class="btn-consumer--update" id="btn-consumer--update-id" onclick="showUpdateForm()">UPDATE</button>
				<button class="btn-consumer--delete" onclick="deleteSupplier(${obj.id})">DELETE</button>
			</div>
	`
	return html
}

class SupplierApi{
	static getSupplier(){
		return fetch(urlurl + '/suppliers',{
			method: 'GET'
		}).then(data => data.json())
	}

	static deleteSupplier(id){
		return fetch(urlurl + `/supplier?id=${id}`,{
			method:'DELETE'
		}).then(res => res.json())
	}

	static createSupplier(body){
		const headers = {'Content-Type': 'application/json'}

		console.log(body)

		return fetch(urlurl+'/supplier',{
			method:'POST',
			headers:headers,
			body:body
		}).then(res => res.json())
	}

	static updateSupplier(body){
		const headers = {'Content-Type': 'application/json'}

		console.log(body)

		return fetch(urlurl + '/supplier',{
			method:'PUT',
			headers:headers,
			body:body
		}).then(res => res.json())
	}
}

document.addEventListener('DOMContentLoaded', function(){
	SupplierApi.getSupplier()
		.then(data => {
			console.log(data)
			renderSupplier(data)
		})
})

function showUpdateForm(){
	document.getElementById('form-consumer--update').classList.add('active')
}

function renderSupplier(data){
	let visibleBoard = document.getElementById('board-supplier')

	visibleBoard.innerHTML =''

	data.forEach((item) => {
		visibleBoard.innerHTML += boardSupplier(item) 
	})
}

function deleteSupplier(id){
	console.log(id)

	SupplierApi.deleteSupplier(id)
		.then(data => {
			console.log(data)
			renderSupplier(data)
		})
		.catch(err => console.log('Error', err))
}

function createSupplier(body){
	let newSupplier = {
		address: document.getElementById('btn-consumer__addres-id').value,
        phone: document.getElementById('btn-consumer__phone-id').value ,
        bankAccountId: document.getElementById('btn-consumer__bank-id').value
   	}

   	console.log(newSupplier)

   	SupplierApi.createSupplier(JSON.stringify(newSupplier))
   		.then(data => {
   			console.log(data)
   			renderSupplier(data)
   		})
   		.catch(err => console.log('Error', err))
}

function updateSupplier(body){
	const updatingSupplier ={
		id:document.getElementById('btn-consumer--update__id-id').value,
		address:document.getElementById('btn-consumer--update__address-id').value,
		phone:document.getElementById('btn-consumer--update__phone-id').value,
		bankAccountId:document.getElementById('btn-consumer--update__bank-id').value
	}

	console.log(updatingSupplier)

	SupplierApi.updateSupplier(JSON.stringify(updatingSupplier))
		.then(data => {
			console.log(data)
			renderSupplier(data)
		})
		.catch(err => console.log('Error', err))
}