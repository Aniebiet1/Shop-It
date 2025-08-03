// Component Generators
class Components {
    static createProductCard(product) {
        const discountBadge = product.discount ? 
            `<div class="discount">-${product.discount}%</div>` : '';
        
        const originalPrice = product.originalPrice ? 
            `<span class="original-price">${Utils.formatPrice(product.originalPrice)}</span>` : '';

        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image" 
                     onerror="Utils.handleImageError(this)">
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${Utils.generateStars(product.rating)}
                        </div>
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${Utils.formatPrice(product.price)}</span>
                        ${originalPrice}
                        ${discountBadge}
                    </div>
                </div>
            </div>
        `;
    }

    static createCategoryCard(category) {
        return `
            <div class="category-card" data-category="${category.slug}">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </div>
        `;
    }

    static createCartItem(item, product) {
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <img src="${product.images[0]}" alt="${product.name}" class="cart-item-image"
                     onerror="Utils.handleImageError(this)">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <div class="cart-item-brand">${product.brand}</div>
                    ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
                    ${item.color ? `<div class="cart-item-color">Color: ${item.color}</div>` : ''}
                    <div class="cart-item-price">${Utils.formatPrice(product.price)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-quantity-controls">
                        <button class="cart-quantity-btn" data-action="decrease">-</button>
                        <span class="cart-quantity-display">${item.quantity}</span>
                        <button class="cart-quantity-btn" data-action="increase">+</button>
                    </div>
                    <button class="remove-item-btn" data-action="remove">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19,6V20a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6M8,6V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2V6"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    static createProductDetail(product) {
        const thumbnails = product.images.map((image, index) => 
            `<img src="${image}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                  data-index="${index}" onerror="Utils.handleImageError(this)">`
        ).join('');

        const sizeOptions = product.sizes.map(size => 
            `<button class="size-option" data-size="${size}">${size}</button>`
        ).join('');

        const colorOptions = product.colors.map(color => 
            `<button class="color-option" data-color="${color}" style="background-color: ${this.getColorValue(color)}" title="${color}"></button>`
        ).join('');

        const ratingBars = [5, 4, 3, 2, 1].map(rating => {
            const percentage = Math.random() * 100; // Simulated data
            return `
                <div class="rating-bar">
                    <span>${rating}</span>
                    <div class="bar">
                        <div class="bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span>${Math.floor(percentage)}%</span>
                </div>
            `;
        }).join('');

        return `
            <div class="product-detail-content">
                <div class="product-images">
                    <img src="${product.images[0]}" alt="${product.name}" class="main-image" id="mainImage"
                         onerror="Utils.handleImageError(this)">
                    <div class="image-thumbnails">
                        ${thumbnails}
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-brand-detail">${product.brand}</div>
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-rating-detail">
                        <div class="rating-score">${product.rating}</div>
                        <div class="stars">
                            ${Utils.generateStars(product.rating)}
                        </div>
                        <div class="rating-bars">
                            ${ratingBars}
                        </div>
                        <div class="reviews-count">${product.reviews} reviews</div>
                    </div>
                    <div class="product-price-detail">
                        <span class="current-price-detail">${Utils.formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price-detail">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                        ${product.discount ? `<div class="discount-detail">-${product.discount}%</div>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-options">
                        ${product.sizes.length > 0 ? `
                            <div class="option-group">
                                <label class="option-label">Size</label>
                                <div class="size-options">
                                    ${sizeOptions}
                                </div>
                            </div>
                        ` : ''}
                        ${product.colors.length > 0 ? `
                            <div class="option-group">
                                <label class="option-label">Color</label>
                                <div class="color-options">
                                    ${colorOptions}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="quantity-selector">
                        <span class="quantity-label">Quantity</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-action="decrease">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="10" id="quantityInput">
                            <button class="quantity-btn" data-action="increase">+</button>
                        </div>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" id="addToCartBtn">Add to Cart</button>
                        <button class="wishlist-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static createEmptyCart() {
        return `
            <div class="empty-cart">
                <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
                <button class="btn btn-primary" onclick="app.showPage('home')">Continue Shopping</button>
            </div>
        `;
    }

    static createCartSummary(cart, products) {
        const subtotal = cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);

        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        return `
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${Utils.formatPrice(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'Free' : Utils.formatPrice(shipping)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax</span>
                    <span>${Utils.formatPrice(tax)}</span>
                </div>
                <div class="summary-row">
                    <span>Total</span>
                    <span>${Utils.formatPrice(total)}</span>
                </div>
                <button class="checkout-btn" onclick="app.showPage('checkout')">Proceed to Checkout</button>
            </div>
        `;
    }

    static createCheckoutForm() {
        return `
            <div class="checkout-form">
                <div class="checkout-left">
                    <div class="checkout-section">
                        <h3>Shipping Address</h3>
                        <form id="checkoutForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">First Name</label>
                                    <input type="text" id="firstName" name="firstName" required>
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" id="address" name="address" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" id="city" name="city" required>
                                </div>
                                <div class="form-group">
                                    <label for="state">State</label>
                                    <select id="state" name="state" required>
                                        <option value="">Select State</option>
                                        <option value="CA">California</option>
                                        <option value="NY">New York</option>
                                        <option value="TX">Texas</option>
                                        <option value="FL">Florida</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="zipCode">ZIP Code</label>
                                    <input type="text" id="zipCode" name="zipCode" required>
                                </div>
                                <div class="form-group">
                                    <label for="country">Country</label>
                                    <select id="country" name="country" required>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="checkout-section">
                        <h3>Payment Method</h3>
                        <div class="payment-methods">
                            <div class="payment-method selected" data-method="card">
                                <div class="payment-method-icon">💳</div>
                                <div>Credit Card</div>
                            </div>
                            <div class="payment-method" data-method="paypal">
                                <div class="payment-method-icon">🅿️</div>
                                <div>PayPal</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required>
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" placeholder="123" required>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="checkout-right">
                    <div class="order-summary" id="checkoutSummary">
                        <!-- Summary will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        `;
    }

    static createAccountContent(user) {
        return `
            <div class="account-profile">
                <div class="profile-avatar">
                    ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}">` : user.name.charAt(0).toUpperCase()}
                </div>
                <h2 class="profile-name">${user.name}</h2>
                <p class="profile-email">${user.email}</p>
                <button class="btn btn-secondary" onclick="auth.logout()">Logout</button>
            </div>
            
            <div class="account-menu">
                <a href="#" class="account-menu-item" onclick="app.showOrders()">
                    <div class="menu-item-left">
                        <svg class="menu-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 4H18a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2H8"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                        <span class="menu-item-text">My Orders</span>
                    </div>
                    <svg class="menu-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </a>
                
                <a href="#" class="account-menu-item">
                    <div class="menu-item-left">
                        <svg class="menu-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span class="menu-item-text">Profile Settings</span>
                    </div>
                    <svg class="menu-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </a>
                
                <a href="#" class="account-menu-item">
                    <div class="menu-item-left">
                        <svg class="menu-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12L11 14L15 10"></path>
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path>
                        </svg>
                        <span class="menu-item-text">Preferences</span>
                    </div>
                    <svg class="menu-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </a>
                
                <a href="#" class="account-menu-item">
                    <div class="menu-item-left">
                        <svg class="menu-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82L20.94 18a2 2 0 0 1 0 2.83L19.77 22a2 2 0 0 1-2.83 0L15.82 20.73a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V23a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V21.18a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33L3 21.17a2 2 0 0 1-2.83 0L.17 20a2 2 0 0 1 0-2.83L1.27 15.82a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H0a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2H1.18a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L1.17 3a2 2 0 0 1 0-2.83L2.34.17a2 2 0 0 1 2.83 0L6.35 1.27a1.65 1.65 0 0 0 1.82.33H8.17a1.65 1.65 0 0 0 1-1.51V0a2 2 0 0 1 2-2H13a2 2 0 0 1 2 2V1.18a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33L19 1.17a2 2 0 0 1 2.83 0L22.83 2.34a2 2 0 0 1 0 2.83L21.73 6.35a1.65 1.65 0 0 0-.33 1.82V8.17a1.65 1.65 0 0 0 1.51 1H24a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H22.82a1.65 1.65 0 0 0-1.51 1Z"></path>
                        </svg>
                        <span class="menu-item-text">Settings</span>
                    </div>
                    <svg class="menu-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </a>
            </div>
        `;
    }

    static createAuthForm(type = 'login') {
        const isLogin = type === 'login';
        return `
            <div class="auth-form">
                <h2>${isLogin ? 'Login' : 'Sign Up'}</h2>
                <form id="authForm">
                    ${!isLogin ? `
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                    ` : ''}
                    <div class="form-group">
                        <label for="authEmail">Email</label>
                        <input type="email" id="authEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="authPassword">Password</label>
                        <input type="password" id="authPassword" name="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        ${isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div class="auth-toggle">
                    ${isLogin ? 
                        `Don't have an account? <a href="#" onclick="auth.showRegister()">Sign up</a>` :
                        `Already have an account? <a href="#" onclick="auth.showLogin()">Login</a>`
                    }
                </div>
            </div>
        `;
    }

    static getColorValue(colorName) {
        const colorMap = {
            'white': '#ffffff',
            'black': '#000000',
            'gray': '#808080',
            'grey': '#808080',
            'red': '#ff0000',
            'blue': '#0000ff',
            'navy': '#000080',
            'green': '#008000',
            'yellow': '#ffff00',
            'pink': '#ffc0cb',
            'purple': '#800080',
            'orange': '#ffa500',
            'brown': '#a52a2a',
            'beige': '#f5f5dc',
            'gold': '#ffd700',
            'silver': '#c0c0c0',
            'rose gold': '#e8b4b8'
        };
        return colorMap[colorName.toLowerCase()] || Utils.getRandomColor();
    }
}

// Make Components available globally
window.Components = Components;