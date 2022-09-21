let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('.bill');
const cartSumPrice =document.querySelector('#sum-price');
const cartNetPrice =document.querySelector('#n-tot');
const cartTotalQuantity =document.querySelector('#t-tot');
const products = document.querySelectorAll('.cardd');
const cashAmountPrice =document.querySelector('.amount')
const cashAmount1Price =document.querySelector('.amount1')
const cashAmount2Price =document.querySelector('.amount2')
const cashAmount3Price =document.querySelector('.amount3')

const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}
const ccountTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}
const countTheNetPrice = function (){
    let sumPrice = 0;
    productsInCart.forEach(item =>{
        sumPrice += item.price;
    });
    return sumPrice;
}
const countTheTotalQuantity = function (){
    let Totalquantity = 0;
    productsInCart.forEach(item =>{
        Totalquantity += item.count;
    });
    return Totalquantity;
}
const ccountTheTotalQuantity = function (){
    let Totalquantity = 0;
    productsInCart.forEach(item =>{
        Totalquantity += item.count;
    });
    return Totalquantity;
}


const countAmountPrice = function () { 
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}
const countAmount1Price = function () { 
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum-5;
}


const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
			<table>
			    <tr>
				  <td><span><h6>${product.name}</h6></span> </td>
				   <td><button class="button-minus" data-id='${product.id}'>-</button>

                  <span class="countOfProduct">${product.count}</span>
				  <td><button class="button-plus" data-id='${product.id}'>+</button><td>
                  <td><span><p class="bill-price">${product.price}</p></span> </td>
				   <button class="btn btn-danger" type="button">REMOVE</button>
                  <td><span><p class="bill-price"><i class="bi bi-trash3-fill"></i> </p></span> </td>
				</tr>
			</table>`
		});
		parentElement.innerHTML = result.join('');
		cartSumPrice.innerHTML = '₹' + countTheSumPrice();
		cartNetPrice.innerHTML = '₹' + countTheNetPrice();
		cashAmountPrice.innerHTML= '₹' +countAmountPrice();
		cartTotalQuantity.innerHTML=countTheTotalQuantity();
		ccartSumPrice.innerHTML = '₹' + ccountTheSumPrice();
		ccartTotalQuantity.innerHTML=ccountTheTotalQuantity();
		result.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)

	}
	else {
		parentElement.innerHTML = '<h6 class="cart">No items in cart</h6>';
		cartSumPrice.innerHTML = '₹0';
		cartNetPrice.innerHTML = '₹0';
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.productsInCart[i].id.removeCartItem
    updateCartTotal() 
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.productPrice').innerHTML;
			
			let product = {
				name: productName,
			    id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();