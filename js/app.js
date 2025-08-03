// Main Application
class App {
    constructor() {
        this.currentPage = 'home';
        this.currentProduct = null;
        this.currentFilter = 'all';
        this.searchQuery = '';
        
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.loadHomePage();
        this.handleRouting();
    }

    attachEventListeners() {
        // Navigation
        document.getElementById('menuBtn').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.add('active');
        });

        document.getElementById('closeMenu').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('active');
        });

        document.getElementById('cartBtn').addEventListener('click', () => {
            this.showPage('cart');
        });

        document.getElementById('userBtn').addEventListener('click', () => {
            this.showPage('account');
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', Utils.debounce((e) => {
            this.searchQuery = e.target.value;
            this.performSearch();
        }, 300));

        // Back buttons
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showPage('home');
        });

        document.getElementById('cartBackBtn').addEventListener('click', () => {
            this.showPage('home');
        });

        document.getElementById('checkoutBackBtn').addEventListener('click', () => {
            this.showPage('cart');
        });

        document.getElementById('accountBackBtn').addEventListener('click', () => {
            this.showPage('home');
        });

        // Mobile menu navigation
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                const category = e.target.dataset.category;
                
                document.getElementById('mobileMenu').classList.remove('active');
                
                if (page) {
                    this.showPage(page);
                } else if (category) {
                    this.filterProducts(category);
                }
            });
        });

        // Filter tabs
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tab')) {
                document.querySelectorAll('.filter-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.loadFeaturedProducts();
            }
        });

        // Product cards
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.dataset.productId);
                this.showProduct(productId);
            }
        });

        // Category cards
        document.addEventListener('click', (e) => {
            const categoryCard = e.target.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.dataset.category;
                this.filterProducts(category);
            }
        });
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageName}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;

            // Load page content
            switch (pageName) {
                case 'home':
                    this.loadHomePage();
                    break;
                case 'cart':
                    cart.renderCart();
                    break;
                case 'checkout':
                    this.loadCheckoutPage();
                    break;
                case 'account':
                    this.loadAccountPage();
                    break;
            }

            Utils.scrollToTop();
        }
    }

    showProduct(productId) {
        const product = db.getProduct(productId);
        if (!product) return;

        this.currentProduct = product;
        const productDetail = document.getElementById('productDetail');
        productDetail.innerHTML = Components.createProductDetail(product);

        this.attachProductEventListeners();
        this.showPage('product');
    }

    attachProductEventListeners() {
        // Image thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const mainImage = document.getElementById('mainImage');
                mainImage.src = this.currentProduct.images[index];
                
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Size options
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        // Color options
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        // Quantity controls
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const quantityInput = document.getElementById('quantityInput');
                let quantity = parseInt(quantityInput.value);

                if (action === 'increase' && quantity < 10) {
                    quantity++;
                } else if (action === 'decrease' && quantity > 1) {
                    quantity--;
                }

                quantityInput.value = quantity;
            });
        });

        // Add to cart
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantityInput').value);
            const selectedSize = document.querySelector('.size-option.selected')?.dataset.size || null;
            const selectedColor = document.querySelector('.color-option.selected')?.dataset.color || null;

            cart.addToCart(this.currentProduct.id, quantity, selectedSize, selectedColor);
        });
    }

    loadHomePage() {
        this.loadCategories();
        this.loadFeaturedProducts();
        this.loadPopularProducts();
        this.loadTopDeals();
    }

    loadCategories() {
        const categories = db.getCategories();
        const categoriesGrid = document.getElementById('categoriesGrid');
        
        if (categoriesGrid) {
            categoriesGrid.innerHTML = categories.map(category => 
                Components.createCategoryCard(category)
            ).join('');
        }
    }

    loadFeaturedProducts() {
        let products = db.getFeaturedProducts();
        
        if (this.currentFilter !== 'all') {
            products = products.filter(product => product.category === this.currentFilter);
        }

        const featuredProducts = document.getElementById('featuredProducts');
        if (featuredProducts) {
            featuredProducts.innerHTML = products.map(product => 
                Components.createProductCard(product)
            ).join('');
        }
    }

    loadPopularProducts() {
        const products = db.getPopularProducts();
        const popularProducts = document.getElementById('popularProducts');
        
        if (popularProducts) {
            popularProducts.innerHTML = products.map(product => 
                Components.createProductCard(product)
            ).join('');
        }
    }

    loadTopDeals() {
        const topDeals = document.getElementById('topDeals');
        if (topDeals) {
            topDeals.innerHTML = `
                <div class="deal-card">
                    <div class="deal-badge">Up to 50% OFF</div>
                    <h3 class="deal-title">Summer Sale</h3>
                    <p class="deal-description">Get amazing discounts on summer collection</p>
                    <button class="deal-btn" onclick="app.filterProducts('women')">Shop Now</button>
                </div>
                <div class="deal-card">
                    <div class="deal-badge">Buy 2 Get 1</div>
                    <h3 class="deal-title">Special Offer</h3>
                    <p class="deal-description">Mix and match your favorite items</p>
                    <button class="deal-btn" onclick="app.filterProducts('men')">Shop Now</button>
                </div>
            `;
        }
    }

    filterProducts(category) {
        this.currentFilter = category;
        
        // Update active filter tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === category) {
                tab.classList.add('active');
            }
        });

        this.loadFeaturedProducts();
        this.showPage('home');
    }

    performSearch() {
        if (!this.searchQuery.trim()) {
            this.loadFeaturedProducts();
            return;
        }

        const results = db.searchProducts(this.searchQuery);
        const featuredProducts = document.getElementById('featuredProducts');
        
        if (featuredProducts) {
            if (results.length === 0) {
                featuredProducts.innerHTML = `
                    <div class="text-center" style="grid-column: 1 / -1; padding: 60px 20px;">
                        <h3>No products found</h3>
                        <p>Try searching with different keywords</p>
                    </div>
                `;
            } else {
                featuredProducts.innerHTML = results.map(product => 
                    Components.createProductCard(product)
                ).join('');
            }
        }
    }

    loadCheckoutPage() {
        if (!auth.requireAuth()) return;

        const checkoutContent = document.getElementById('checkoutContent');
        if (checkoutContent) {
            checkoutContent.innerHTML = Components.createCheckoutForm();
            this.loadCheckoutSummary();
            this.attachCheckoutEventListeners();
        }
    }

    loadCheckoutSummary() {
        const cart = db.getCart();
        const products = db.getProducts();
        const checkoutSummary = document.getElementById('checkoutSummary');
        
        if (checkoutSummary) {
            checkoutSummary.innerHTML = Components.createCartSummary(cart, products);
            
            // Replace checkout button with place order button
            const checkoutBtn = checkoutSummary.querySelector('.checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.textContent = 'Place Order';
                checkoutBtn.className = 'place-order-btn';
                checkoutBtn.onclick = () => this.placeOrder();
            }
        }
    }

    attachCheckoutEventListeners() {
        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', (e) => {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        // Form validation
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.placeOrder();
            });
        }
    }

    placeOrder() {
        const form = document.getElementById('checkoutForm');
        const formData = new FormData(form);
        
        // Basic validation
        const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                Utils.showNotification(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
                return;
            }
        }

        // Create order
        const orderData = {
            shippingAddress: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipCode: formData.get('zipCode'),
                country: formData.get('country')
            },
            paymentMethod: document.querySelector('.payment-method.selected').dataset.method
        };

        Utils.showLoading();
        
        // Simulate API call
        setTimeout(() => {
            const order = db.createOrder(orderData);
            Utils.hideLoading();
            
            if (order) {
                Utils.showNotification('Order placed successfully!', 'success');
                cart.updateCartCount();
                this.showPage('account');
            } else {
                Utils.showNotification('Failed to place order', 'error');
            }
        }, 2000);
    }

    loadAccountPage() {
        const accountContent = document.getElementById('accountContent');
        
        if (auth.isLoggedIn()) {
            const user = auth.getCurrentUser();
            accountContent.innerHTML = Components.createAccountContent(user);
        } else {
            auth.showLogin();
        }
    }

    showOrders() {
        if (!auth.requireAuth()) return;

        const orders = db.getOrders();
        const accountContent = document.getElementById('accountContent');
        
        if (orders.length === 0) {
            accountContent.innerHTML = `
                <div class="text-center" style="padding: 60px 20px;">
                    <h3>No orders yet</h3>
                    <p>Start shopping to see your orders here</p>
                    <button class="btn btn-primary" onclick="app.showPage('home')">Start Shopping</button>
                </div>
            `;
        } else {
            const ordersHTML = orders.map(order => `
                <div class="order-card" style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4>Order #${order.id}</h4>
                        <span class="order-status" style="padding: 5px 15px; border-radius: 20px; background: #28a745; color: white; font-size: 12px; text-transform: uppercase;">${order.status}</span>
                    </div>
                    <p style="color: #666; margin-bottom: 10px;">Placed on ${Utils.formatDate(order.createdAt)}</p>
                    <p style="font-weight: 600; font-size: 18px;">Total: ${Utils.formatPrice(order.total)}</p>
                </div>
            `).join('');
            
            accountContent.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-secondary" onclick="app.loadAccountPage()">← Back to Account</button>
                </div>
                <h3 style="margin-bottom: 30px;">My Orders</h3>
                ${ordersHTML}
            `;
        }
    }

    handleRouting() {
        // Simple hash-based routing
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                const [page, id] = hash.split('/');
                if (page === 'product' && id) {
                    this.showProduct(parseInt(id));
                } else if (page) {
                    this.showPage(page);
                }
            }
        });

        // Handle initial route
        const hash = window.location.hash.slice(1);
        if (hash) {
            const [page, id] = hash.split('/');
            if (page === 'product' && id) {
                this.showProduct(parseInt(id));
            } else if (page) {
                this.showPage(page);
            }
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh cart count when page becomes visible
        cart.updateCartCount();
    }
});