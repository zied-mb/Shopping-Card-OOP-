    // Class to represent a product
    class Product {
      constructor(id, name, price, picture) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.picture = picture;
      }
    }

    // Class to represent a shopping cart item
    class ShoppingCartItem {
      constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
      }

      // Method to calculate the total price for this item
      getTotalPrice() {
        return this.product.price * this.quantity;
      }
    }

    // Class to represent the shopping cart
    class ShoppingCart {
      constructor() {
        this.items = [];
      }

      // Method to add a product to the cart
      addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.items.push(new ShoppingCartItem(product));
        }
        this.displayCart();
      }

      // Method to remove an item from the cart
      removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
      }

      // Method to calculate the total cost of items in the cart
      getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
      }

      // Method to display the cart items in the UI
      displayCart() {
        const cartItemsList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        cartItemsList.innerHTML = '';
        this.items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.product.name} x ${item.quantity} = $${item.getTotalPrice()}`;
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.onclick = () => this.removeItem(item.product.id);
          li.appendChild(removeButton);
          cartItemsList.appendChild(li);
        });

        cartTotal.textContent = `Total: $${this.getTotal()}`;
      }
    }

    // Create product instances
    const products = [
      new Product(1, 'AirPods Max', 549, 'AirPods Max.jpg'),
      new Product(2, 'AirPods 4', 199, 'AirPods 4.jpg'),
      new Product(3, 'iPhone 16 Pro', 1199, 'iphone_16pro.png')
    ];

    // Create an instance of the shopping cart
    const cart = new ShoppingCart();

    // Function to add a product to the cart
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        cart.addItem(product);
      }
    }