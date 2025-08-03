// Simulated Database using localStorage
class Database {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize products if not exists
        if (!localStorage.getItem('products')) {
            const products = [
                {
                    id: 1,
                    name: "Elegant Women's Summer Dress",
                    brand: "Fashionista",
                    price: 89.99,
                    originalPrice: 129.99,
                    discount: 31,
                    category: "women",
                    images: [
                        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500",
                        "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.5,
                    reviews: 125,
                    description: "This stylish summer dress is perfect for any occasion. Made from breathable fabric with a flattering silhouette.",
                    sizes: ["XS", "S", "M", "L", "XL"],
                    colors: ["Beige", "White", "Navy"],
                    featured: true,
                    popular: true
                },
                {
                    id: 2,
                    name: "Cotton T-Shirt",
                    brand: "BasicWear",
                    price: 24.99,
                    originalPrice: 34.99,
                    discount: 29,
                    category: "men",
                    images: [
                        "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.2,
                    reviews: 89,
                    description: "Comfortable cotton t-shirt perfect for everyday wear. Soft fabric and classic fit.",
                    sizes: ["S", "M", "L", "XL", "XXL"],
                    colors: ["White", "Black", "Gray", "Navy"],
                    featured: true,
                    popular: false
                },
                {
                    id: 3,
                    name: "Denim Jeans",
                    brand: "DenimCo",
                    price: 79.99,
                    originalPrice: 99.99,
                    discount: 20,
                    category: "men",
                    images: [
                        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.7,
                    reviews: 203,
                    description: "Premium denim jeans with perfect fit and durability. Classic blue wash.",
                    sizes: ["28", "30", "32", "34", "36", "38"],
                    colors: ["Blue", "Black", "Gray"],
                    featured: true,
                    popular: true
                },
                {
                    id: 4,
                    name: "Leather Boots",
                    brand: "BootCraft",
                    price: 149.99,
                    originalPrice: 199.99,
                    discount: 25,
                    category: "shoes",
                    images: [
                        "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.8,
                    reviews: 156,
                    description: "Handcrafted leather boots with premium materials. Perfect for any season.",
                    sizes: ["7", "8", "9", "10", "11", "12"],
                    colors: ["Brown", "Black"],
                    featured: false,
                    popular: true
                },
                {
                    id: 5,
                    name: "Casual Sneakers",
                    brand: "SportStyle",
                    price: 69.99,
                    originalPrice: 89.99,
                    discount: 22,
                    category: "shoes",
                    images: [
                        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.3,
                    reviews: 92,
                    description: "Comfortable casual sneakers for everyday wear. Lightweight and breathable.",
                    sizes: ["7", "8", "9", "10", "11", "12"],
                    colors: ["White", "Black", "Gray"],
                    featured: true,
                    popular: false
                },
                {
                    id: 6,
                    name: "Women's Blouse",
                    brand: "ElegantWear",
                    price: 54.99,
                    originalPrice: 74.99,
                    discount: 27,
                    category: "women",
                    images: [
                        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.4,
                    reviews: 78,
                    description: "Elegant blouse perfect for office or casual wear. Soft and comfortable fabric.",
                    sizes: ["XS", "S", "M", "L", "XL"],
                    colors: ["White", "Pink", "Blue"],
                    featured: false,
                    popular: true
                },
                {
                    id: 7,
                    name: "Kids T-Shirt",
                    brand: "KidsWear",
                    price: 19.99,
                    originalPrice: 29.99,
                    discount: 33,
                    category: "kids",
                    images: [
                        "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.6,
                    reviews: 45,
                    description: "Fun and colorful t-shirt for kids. Soft cotton material and playful designs.",
                    sizes: ["2T", "3T", "4T", "5T", "6T"],
                    colors: ["Red", "Blue", "Green", "Yellow"],
                    featured: true,
                    popular: false
                },
                {
                    id: 8,
                    name: "Trendy Accessories",
                    brand: "AccessoryHub",
                    price: 29.99,
                    originalPrice: 39.99,
                    discount: 25,
                    category: "accessories",
                    images: [
                        "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500"
                    ],
                    rating: 4.1,
                    reviews: 67,
                    description: "Stylish accessories to complement your outfit. High-quality materials.",
                    sizes: ["One Size"],
                    colors: ["Gold", "Silver", "Rose Gold"],
                    featured: false,
                    popular: true
                }
            ];
            localStorage.setItem('products', JSON.stringify(products));
        }

        // Initialize categories if not exists
        if (!localStorage.getItem('categories')) {
            const categories = [
                {
                    id: 1,
                    name: "Men",
                    slug: "men",
                    description: "Stylish clothing for men",
                    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500"
                },
                {
                    id: 2,
                    name: "Women",
                    slug: "women",
                    description: "Elegant fashion for women",
                    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500"
                },
                {
                    id: 3,
                    name: "Kids",
                    slug: "kids",
                    description: "Fun clothes for children",
                    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500"
                },
                {
                    id: 4,
                    name: "Shoes",
                    slug: "shoes",
                    description: "Comfortable footwear",
                    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500"
                },
                {
                    id: 5,
                    name: "Accessories",
                    slug: "accessories",
                    description: "Complete your look",
                    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500"
                }
            ];
            localStorage.setItem('categories', JSON.stringify(categories));
        }

        // Initialize users if not exists
        if (!localStorage.getItem('users')) {
            const users = [
                {
                    id: 1,
                    name: "Sophie Carter",
                    email: "sophie@example.com",
                    password: "password123",
                    avatar: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=100"
                }
            ];
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Initialize cart if not exists
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        // Initialize orders if not exists
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }

        // Initialize current user if not exists
        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', JSON.stringify(null));
        }
    }

    // Products
    getProducts() {
        return JSON.parse(localStorage.getItem('products') || '[]');
    }

    getProduct(id) {
        const products = this.getProducts();
        return products.find(product => product.id === parseInt(id));
    }

    getFeaturedProducts() {
        const products = this.getProducts();
        return products.filter(product => product.featured);
    }

    getPopularProducts() {
        const products = this.getProducts();
        return products.filter(product => product.popular);
    }

    getProductsByCategory(category) {
        const products = this.getProducts();
        return products.filter(product => product.category === category);
    }

    searchProducts(query) {
        const products = this.getProducts();
        const searchTerm = query.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Categories
    getCategories() {
        return JSON.parse(localStorage.getItem('categories') || '[]');
    }

    getCategory(slug) {
        const categories = this.getCategories();
        return categories.find(category => category.slug === slug);
    }

    // Cart
    getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    addToCart(productId, quantity = 1, size = null, color = null) {
        const cart = this.getCart();
        const existingItem = cart.find(item => 
            item.productId === productId && 
            item.size === size && 
            item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: Date.now(),
                productId,
                quantity,
                size,
                color,
                addedAt: new Date().toISOString()
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    }

    updateCartItem(itemId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        return cart;
    }

    removeFromCart(itemId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
    }

    clearCart() {
        localStorage.setItem('cart', JSON.stringify([]));
        return [];
    }

    getCartTotal() {
        const cart = this.getCart();
        const products = this.getProducts();
        
        return cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    getCartItemCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Users
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }
        return null;
    }

    register(name, email, password) {
        const users = this.getUsers();
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return null; // User already exists
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            avatar: null
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return newUser;
    }

    logout() {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }

    // Orders
    getOrders() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return [];
        
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders.filter(order => order.userId === currentUser.id);
    }

    createOrder(orderData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return null;

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            id: Date.now(),
            userId: currentUser.id,
            items: this.getCart(),
            total: this.getCartTotal(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            ...orderData
        };

        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        this.clearCart();
        return newOrder;
    }
}

// Create global database instance
window.db = new Database();