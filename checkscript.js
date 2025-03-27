document.addEventListener('DOMContentLoaded', function() {
    // Show/hide credit card info based on payment method
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const creditCardInfo = document.getElementById('credit-card-info');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardInfo.style.display = 'block';
            } else {
                creditCardInfo.style.display = 'none';
            }
        });
    });
    
    // Form validation
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const requiredFields = orderForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Validate credit card if selected
        const creditCardSelected = document.getElementById('credit-card').checked;
        if (creditCardSelected) {
            const cardNumber = document.getElementById('card-number').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            const cardName = document.getElementById('card-name').value;
            
            if (!cardNumber || !expiry || !cvv || !cardName) {
                alert('Please fill in all credit card details');
                isValid = false;
            }
        }
        
        if (isValid) {
            // In a real application, you would process the order here
            alert('Order placed successfully! Thank you for your purchase.');
            // orderForm.submit(); // Uncomment to actually submit the form
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Format credit card number
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Limit to 16 digits
            if (value.length > 19) {
                value = value.substring(0, 19);
            }
            
            this.value = value;
        });
    }
    
    // Format expiry date
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            // Limit to 5 characters (MM/YY)
            if (value.length > 5) {
                value = value.substring(0, 5);
            }
            
            this.value = value;
        });
    }
});
