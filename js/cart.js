// Cart Management
class Cart {
    constructor() {
        this.updateCartCount();
    }

    updateCartCount() {
        const count = db.getCartItemCount();
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    addToCart(productId, quantity = 1, size = null, color = null) {
        const product = db.getProduct(productId);
        if (!product) {
            Utils.showNotification('Product not found', 'error');
            return;
        }

        db.addToCart(productId, quantity, size, color);
        this.updateCartCount();
        Utils.showNotification(`${product.name} added to cart!`, 'success');
    }

    removeFromCart(itemId) {
        db.removeFromCart(itemId);
        this.updateCartCount();
        this.renderCart();
        Utils.showNotification('Item removed from cart', 'success');
    }

    updateQuantity(itemId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(itemId);
            return;
        }

        db.updateCartItem(itemId, quantity);
        this.updateCartCount();
        this.renderCart();
    }

    renderCart() {
        const cartContent = document.getElementById('cartContent');
        if (!cartContent) return;

        const cart = db.getCart();
        const products = db.getProducts();

        if (cart.length === 0) {
            cartContent.innerHTML = Components.createEmptyCart();
            return;
        }

        const cartItems = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            return product ? Components.createCartItem(item, product) : '';
        }).join('');

        const cartSummary = Components.createCartSummary(cart, products);

        cartContent.innerHTML = `
            <div class="cart-items">
                ${cartItems}
            </div>
            ${cartSummary}
        `;

        this.attachCartEventListeners();
    }

    attachCartEventListeners() {
        // Quantity controls
        document.querySelectorAll('.cart-quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.dataset.itemId);
                const quantityDisplay = cartItem.querySelector('.cart-quantity-display');
                let currentQuantity = parseInt(quantityDisplay.textContent);

                if (action === 'increase') {
                    currentQuantity++;
                } else if (action === 'decrease') {
                    currentQuantity--;
                }

                this.updateQuantity(itemId, currentQuantity);
            });
        });

        // Remove item buttons
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const itemId = parseInt(cartItem.dataset.itemId);
                this.removeFromCart(itemId);
            });
        });
    }

    clearCart() {
        db.clearCart();
        this.updateCartCount();
        this.renderCart();
        Utils.showNotification('Cart cleared', 'success');
    }

    getCartTotal() {
        return db.getCartTotal();
    }

    getCartItems() {
        return db.getCart();
    }
}

// Create global cart instance
window.cart = new Cart();