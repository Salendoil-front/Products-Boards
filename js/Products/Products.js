const urlurl = 'http://176.57.78.17:8888/oilProducts'

function boardProduct(obj){
	let html = `
		<div class="board-product__item">
			<div class="board-product__id">Код: ${obj.id}</div>
			<div class="board-product__name">Название: ${obj.name}</div>
			<div class="board-product__volume">Значение на складе: ${obj.volume}</div>
			<div class="board-product__arrive">Дата прибытия: ${obj.arriveData}</div>
			<div class="board-product__departure">Дата отправки: ${obj.departureData}</div>
	`		
		if(obj.supplier){
			html +=`
				<div class="board-product__supplier__menu">	Поставщик: 	
					<div class="board-consumer__supplier__id">Код поставщика: ${obj.supplier.id}</div>
					<div class="board-consumer__supplier__id">Адрес поставщика: ${obj.supplier.address}</div>
				</div>
			`
		}
		else{
			html += `<div class="board-product__supplier__menu">Не найдено</div>`
		}

		if(obj.consumer){
			html +=`
				<div class="board-product__consumer__menu">Потребитель:
					<div class="board-consumer__consumer__id">Код потребителя: ${obj.consumer.id}</div>
					<div class="board-consumer__consumer__id">Адрес потребителя: ${obj.consumer.address}</div>
				</div>
			`
		}

		else{
			html += 
				`
					<div class="board-product__consumer__menu">
						Не найдено
					</div>
				`
		}
			
		html +=` 
			<div class="board-product__arrivng">Отправка: ${obj.arriving}</div>
		`

		html +=`<button class="btn-product--update" id="btn-product--update-id" onclick="showUpdateForm()">Update</button>
			<button class="btn-product--delete" onclick="deleteProduct(${obj.id})">DELETE</button>
		</div>`
			

	

	return html
}

class ProductApi{

	static getProduct(){
		return fetch(urlurl + '/oilProducts', {
			method:'GET'
		}).then(res => res.json())
	}

	static deleteProduct(id){
		return fetch(urlurl + `/oilProduct?id=${id}`,{
			method:'DELETE'
		}).then(res => res.json())
	}

	static createProduct(body){
		const headers={'Content-Type': 'application/json'}

		return fetch(urlurl + '/oilProduct', {
			method:'POST',
			headers:headers,
			body:body
		}).then(res => res.json())
	}

	static updateProduct(body){
		const headers={'Content-Type': 'application/json'}

		return fetch(urlurl + '/oilProduct', {
			method:'PUT',
			headers:headers,
			body:body
		}).then(res => res.json())
	}
}


document.addEventListener('DOMContentLoaded' , function(){
	ProductApi.getProduct()
		.then(data => {
			console.log(data)
			renderProduct(data)
		})
})


function showUpdateForm(){
	document.getElementById('form-product-update-id').classList.add('active')
}

function renderProduct(data){
	let visibleBoard = document.getElementById('board-products')

	visibleBoard.innerHTML = ''

	data.forEach((item) => {
		let newHtml = boardProduct(item)

		visibleBoard.innerHTML += newHtml
	})
}

function deleteProduct(id){
	console.log(id)

	ProductApi.deleteProduct(id)
		.then(data => {
			console.log(data)
			renderProduct(data)
		})
		.catch(err => console.log('Error', err))
}

function createProduct(body){
	const newProduct ={
		name: document.getElementById('btn-product__name-id').value,
		volume: document.getElementById('btn-product__volume-id').value,
		arriveData: document.getElementById('btn-product__arrive-id').value,
		departureData: document.getElementById('btn-product__departure-id').value,
		supplier: {
			id: document.getElementById('btn-product__supplier__id-id').value
		},
		consumer: {
			id: document.getElementById('btn-product__consumer__id-id').value
		},
		arriving: document.getElementById('btn-product__arriving-id').value
	}

	console.log(newProduct)

	ProductApi.createProduct(JSON.stringify(newProduct))
		.then(data => {
			console.log(data)
			renderProduct(data)
		})
		.catch(err => console.log('Error', err))
}


function updateProduct(body){
	const updatingProduct = {
		id: document.getElementById('btn-product-update__id-id').value,
        name: document.getElementById('btn-product-update__name-id').value,
        volume: document.getElementById('btn-product-update__volume-id').value,
        arriveData: document.getElementById('btn-product-update__arrive-id').value,
        departureData: document.getElementById('btn-product-update__departure-id').value,
        supplier: {
            id: document.getElementById('btn-product-update__supplier-id').value
        },
        consumer: {
            id: document.getElementById('btn-product-update__consumer-id').value
        },
        "arriving":document.getElementById('btn-product-update__arriving-id').value
	}

	console.log(updatingProduct)

	ProductApi.updateProduct(JSON.stringify(updatingProduct))
		.then(data => {
			console.log(data)
			renderProduct(data)
		})
		.catch(err => console.log('Error', err))
}