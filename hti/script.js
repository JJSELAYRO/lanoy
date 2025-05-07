// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Quantity buttons
    document.querySelectorAll('.input-group button').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input')
            let value = parseInt(input.value)
            
            if (this.textContent === '+' && value < 10) {
                input.value = value + 1
            } else if (this.textContent === '-' && value > 1) {
                input.value = value - 1
            }
            
            // Update cart total (simplified)
            updateCartTotal()
        })
    })
    
    // Remove item from cart
    document.querySelectorAll('.fa-trash-alt').forEach(icon => {
        icon.addEventListener('click', function() {
            this.closest('tr').remove()
            updateCartTotal()
        })
    })
    
    // Update cart badge
    function updateCartBadge() {
        const badge = document.querySelector('.navbar .badge')
        const count = document.querySelectorAll('#cartModal tbody tr').length
        badge.textContent = count
    }
    
    // Update cart total
    function updateCartTotal() {
        let subtotal = 0
        const rows = document.querySelectorAll('#cartModal tbody tr')
        
        rows.forEach(row => {
            const price = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', ''))
            const quantity = parseInt(row.querySelector('input').value)
            const total = price * quantity
            row.querySelector('td:nth-child(4)').textContent = '$' + total.toFixed(2)
            subtotal += total
        })
        
        const deliveryFee = 2.99
        const tax = subtotal * 0.08
        const total = subtotal + deliveryFee + tax
        
        document.querySelector('#cartModal .bg-light span:nth-child(2)').textContent = '$' + subtotal.toFixed(2)
        document.querySelector('#cartModal .bg-light span:nth-child(4)').textContent = '$' + tax.toFixed(2)
        document.querySelector('#cartModal .bg-light span:nth-child(7)').textContent = '$' + total.toFixed(2)
        
        updateCartBadge()
    }
    
    // Initialize cart modal
    const cartModal = document.getElementById('cartModal')
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', updateCartTotal)
    }
    
    // View menu buttons
    document.querySelectorAll('.btn-outline-danger').forEach(button => {
        if (button.textContent.trim() === 'View Menu') {
            button.addEventListener('click', function(e) {
                e.preventDefault()
                alert('Menu loading functionality would be implemented here with actual restaurant data.')
            })
        }
    })
    
    // Add to cart buttons
    document.querySelectorAll('.btn-danger').forEach(button => {
        if (button.textContent.trim() === 'Add to Cart') {
            button.addEventListener('click', function(e) {
                e.preventDefault()
                const badge = document.querySelector('.navbar .badge')
                let count = parseInt(badge.textContent)
                badge.textContent = count + 1
                
                // Show success message
                const toast = document.createElement('div')
                toast.className = 'position-fixed bottom-0 end-0 p-3'
                toast.style.zIndex = '11'
                toast.innerHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-success text-white">
                            <strong class="me-auto">Success</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            Item added to your cart!
                        </div>
                    </div>
                `
                document.body.appendChild(toast)
                
                // Remove toast after 3 seconds
                setTimeout(() => {
                    toast.remove()
                }, 3000)
            })
        }
    })
})