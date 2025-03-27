let cart = [];
let totalPrice = 0;

function addToCart(productName, price) {
    // Add product to cart array
    cart.push({ name: productName, price: price });

    // Update total price
    totalPrice += price;

    // Update cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    cart.forEach((item, index) => {
        let itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsDiv.appendChild(itemDiv);
    });

    // Update the total price
    document.getElementById('totalPrice').textContent = totalPrice;
}

function removeFromCart(index) {
    // Remove the item from cart array
    totalPrice -= cart[index].price;
    cart.splice(index, 1);

    // Update cart display
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCartDisplay();
}
