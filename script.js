
const foodMenu = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    category: "burger",
    price: 149,
    rating: 4.8,
    image: "images/burger.jpg",
    description: "A signature beef patty with cheddar cheese, crisp lettuce, vine-ripened tomatoes, and house burger sauce on a toasted brioche bun."
  },
  {
    id: 2,
    name: "Pepperoni Passion Pizza",
    category: "pizza",
    price: 299,
    rating: 4.9,
    image: "images/pizza.jpg",
    description: "Wood-fired crust topped with house marinara, gourmet pepperoni, loaded mozzarella cheese, and fresh oregano leaves."
  },
  {
    id: 3,
    name: "Hyderabadi Chicken Biryani",
    category: "biryani",
    price: 249,
    rating: 4.9,
    image: "images/biryani.jpg",
    description: "Fragrant basmati rice slow-cooked with spiced chicken, saffron, brown onions, and served in a traditional clay pot."
  },
  {
    id: 4,
    name: "Toasted Clubhouse Sandwich",
    category: "sandwich",
    price: 129,
    rating: 4.7,
    image: "images/sandwich.jpg",
    description: "Double-decker style toasted white bread layered with sliced chicken breast, smoked bacon, cheddar, lettuce, and mayo."
  },
  {
    id: 5,
    name: "Gourmet Herbs French Fries",
    category: "fries",
    price: 99,
    rating: 4.6,
    image: "images/fries.jpg",
    description: "Crispy double-cooked golden potatoes tossed with sea salt, ground garlic, fresh rosemary, and served with ketchup."
  },
  {
    id: 6,
    name: "Creamy Tomato Penne Pasta",
    category: "pasta",
    price: 199,
    rating: 4.8,
    image: "images/pasta.jpg",
    description: "Penne pasta cooked al dente in a rich tomato-cream sauce with garlic, fresh basil, and aged grated parmesan cheese."
  },
  {
    id: 7,
    name: "Spicy Volcano Burger",
    category: "burger",
    price: 179,
    rating: 4.7,
    image: "images/burger.jpg",
    description: "Double beef patty layered with jalapeños, pepper jack cheese, crispy onions, and fiery spicy volcano mayo."
  },
  {
    id: 8,
    name: "Margherita Supreme Pizza",
    category: "pizza",
    price: 259,
    rating: 4.8,
    image: "images/pizza.jpg",
    description: "Traditional Italian pizza topped with fresh vine tomatoes, buffalo mozzarella, garden basil, and extra virgin olive oil."
  },
  {
    id: 9,
    name: "Royal Vegetable Biryani",
    category: "biryani",
    price: 219,
    rating: 4.6,
    image: "images/biryani.jpg",
    description: "Aromatic premium basmati rice cooked with fresh seasonal vegetables, cardamoms, cloves, saffron, and fresh coriander."
  },
  {
    id: 10,
    name: "Spicy Garlic Fries",
    category: "fries",
    price: 119,
    rating: 4.5,
    image: "images/fries.jpg",
    description: "Golden fries coated in spicy dry rub seasoning, loaded with minced fried garlic and chopped green chives."
  }
];

let cart = [];
let currentCategory = "all";
let currentSearchQuery = "";

const foodMenuGrid = document.getElementById("food-menu-grid");
const searchInput = document.getElementById("food-search");
const searchBtn = document.getElementById("search-action-btn");
const searchStatusMsg = document.getElementById("search-status-message");
const categoryFiltersContainer = document.getElementById("category-filters-container");
const cartTriggerBtn = document.getElementById("cart-trigger-btn");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const cartCounter = document.getElementById("cart-counter");
const cartDrawerCount = document.getElementById("cart-drawer-count");
const cartDrawerBody = document.getElementById("cart-drawer-body");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDeliveryFee = document.getElementById("cart-delivery-fee");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutSubmitBtn = document.getElementById("checkout-submit-btn");

const checkoutModalOverlay = document.getElementById("checkout-modal-overlay");
const modalCloseActionBtn = document.getElementById("modal-close-action-btn");
const modalSuccessConfirmBtn = document.getElementById("modal-success-confirm-btn");
const modalOrderId = document.getElementById("modal-order-id");
const modalEstTime = document.getElementById("modal-est-time");
const modalTotalPaid = document.getElementById("modal-total-paid");

const mobileNavBtn = document.getElementById("mobile-nav-btn");
const navMenu = document.getElementById("nav-menu");

if (mobileNavBtn && navMenu) {
  mobileNavBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const isOpened = navMenu.classList.contains("active");
    mobileNavBtn.innerHTML = isOpened 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileNavBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

function renderFoodMenu() {
  foodMenuGrid.innerHTML = "";
  
  // Filter foods by Category and Search Query
  const filteredFoods = foodMenu.filter(food => {
    const matchesCategory = currentCategory === "all" || food.category === currentCategory;
    const matchesSearch = food.name.toLowerCase().includes(currentSearchQuery) || 
                          food.description.toLowerCase().includes(currentSearchQuery);
    return matchesCategory && matchesSearch;
  });

 
  if (currentSearchQuery !== "") {
    searchStatusMsg.textContent = `Found ${filteredFoods.length} result(s) for "${currentSearchQuery}"`;
  } else {
    searchStatusMsg.textContent = "";
  }
  if (filteredFoods.length === 0) {
    foodMenuGrid.innerHTML = `
      <div class="empty-menu-container" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--secondary-light);">
        <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 15px;"></i>
        <h3>No dishes match your criteria</h3>
        <p>Try resetting the category filter or searching for something else!</p>
      </div>
    `;
    return;
  }

  filteredFoods.forEach(food => {
    const card = document.createElement("article");
    card.className = "food-card";
    card.setAttribute("data-food-id", food.id);
    
    card.innerHTML = `
      <div class="card-img-container">
        <span class="food-card-badge">${food.category.charAt(0).toUpperCase() + food.category.slice(1)}</span>
        <img src="${food.image}" alt="${food.name}" class="card-img" loading="lazy">
      </div>
      <div class="card-details">
        <div class="card-header-row">
          <div class="food-rating">
            <i class="fa-solid fa-star"></i> ${food.rating.toFixed(1)}
          </div>
        </div>
        <h3 class="food-title">${food.name}</h3>
        <p class="food-desc">${food.description}</p>
        <div class="card-footer-row">
          <div class="food-price"><span>₹</span>${food.price.toFixed(0)}</div>
          <button class="btn-add-cart" aria-label="Add ${food.name} to cart" onclick="addToCart(${food.id})">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    `;
    foodMenuGrid.appendChild(card);
  });
}

if (categoryFiltersContainer) {
  categoryFiltersContainer.addEventListener("click", (e) => {
    const targetButton = e.target.closest(".category-pill");
    if (!targetButton) return;

    // Toggle Active Class
    const allButtons = categoryFiltersContainer.querySelectorAll(".category-pill");
    allButtons.forEach(btn => btn.classList.remove("active"));
    targetButton.classList.add("active");

    // Update Global Category Filter
    currentCategory = targetButton.getAttribute("data-category");
    renderFoodMenu();
  });
}
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value.toLowerCase().trim();
    renderFoodMenu();
  });
}
if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => {
    currentSearchQuery = searchInput.value.toLowerCase().trim();
    renderFoodMenu();
  });
}

if (cartTriggerBtn && cartDrawer && cartDrawerOverlay) {
  cartTriggerBtn.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    cartDrawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  });
}
const closeCart = () => {
  cartDrawer.classList.remove("active");
  cartDrawerOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
};

if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
if (cartDrawerOverlay) cartDrawerOverlay.addEventListener("click", closeCart);
window.addToCart = function(foodId) {
  const foodItem = foodMenu.find(item => item.id === foodId);
  if (!foodItem) return;

  const existingCartItem = cart.find(item => item.id === foodId);
  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cart.push({
      ...foodItem,
      quantity: 1
    });
  }
  if (cartCounter) {
    cartCounter.style.animation = "none";
    // Trigger reflow to restart animation
    void cartCounter.offsetWidth;
    cartCounter.style.animation = "cart-badge-pop 0.3s ease";
  }

  updateCartUI();
};
window.removeFromCart = function(foodId) {
  cart = cart.filter(item => item.id !== foodId);
  updateCartUI();
};
window.changeQuantity = function(foodId, change) {
  const cartItem = cart.find(item => item.id === foodId);
  if (!cartItem) return;

  cartItem.quantity += change;
  if (cartItem.quantity <= 0) {
    removeFromCart(foodId);
  } else {
    updateCartUI();
  }
};
function updateCartUI() {
  // Update cart counters
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  if (cartCounter) cartCounter.textContent = totalItems;
  if (cartDrawerCount) cartDrawerCount.textContent = totalItems;
  cartDrawerBody.innerHTML = "";

  if (cart.length === 0) {
    // Show Empty Cart State
    cartDrawerBody.innerHTML = `
      <div class="empty-cart-container">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Your Cart is Empty</h4>
        <p>Browse our gourmet menu and add delicious food to your cart.</p>
      </div>
    `;
    
    if (cartSubtotal) cartSubtotal.textContent = "₹0";
    if (cartDeliveryFee) cartDeliveryFee.textContent = "₹0";
    if (cartTotalPrice) cartTotalPrice.textContent = "₹0";
    return;
  }
  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-thumb">
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <div class="item-price">₹${(item.price * item.quantity).toFixed(0)}</div>
        <div class="qty-control">
          <button class="qty-btn" aria-label="Decrease quantity" onclick="changeQuantity(${item.id}, -1)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" aria-label="Increase quantity" onclick="changeQuantity(${item.id}, 1)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="item-remove-btn" aria-label="Remove ${item.name} from cart" onclick="removeFromCart(${item.id})">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    cartDrawerBody.appendChild(itemElement);
  });

  // Calculate pricing
  const subtotalVal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  
  // Free delivery above ₹499, else ₹40
  const isFreeDelivery = subtotalVal >= 499;
  const deliveryCharge = isFreeDelivery ? 0 : 40;
  const totalVal = subtotalVal + deliveryCharge;

  // Render summaries
  if (cartSubtotal) cartSubtotal.textContent = `₹${subtotalVal.toFixed(0)}`;
  
  if (cartDeliveryFee) {
    if (isFreeDelivery) {
      cartDeliveryFee.textContent = "FREE";
      cartDeliveryFee.className = "summary-val text-green";
    } else {
      cartDeliveryFee.textContent = `₹${deliveryCharge.toFixed(0)}`;
      cartDeliveryFee.className = "summary-val";
    }
  }

  if (cartTotalPrice) cartTotalPrice.textContent = `₹${totalVal.toFixed(0)}`;
}

if (checkoutSubmitBtn) {
  checkoutSubmitBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add food items to proceed.");
      return;
    }
    // Close the cart drawer
    closeCart();

    const orderNum = "BE-" + Math.floor(10000 + Math.random() * 90000);
    const estMinutes = 20 + Math.floor(Math.random() * 20); // 20 - 40 min range
    const totalPaidVal = cartTotalPrice ? cartTotalPrice.textContent : "₹0";

    // Set modal text contents
    if (modalOrderId) modalOrderId.textContent = `#${orderNum}`;
    if (modalEstTime) modalEstTime.textContent = `${estMinutes} minutes`;
    if (modalTotalPaid) modalTotalPaid.textContent = totalPaidVal;

    // Show order success modal
    if (checkoutModalOverlay) {
      checkoutModalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
    cart = [];
    updateCartUI();
  });
}
const closeModal = () => {
  if (checkoutModalOverlay) {
    checkoutModalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
};

if (modalCloseActionBtn) modalCloseActionBtn.addEventListener("click", closeModal);
if (modalSuccessConfirmBtn) modalSuccessConfirmBtn.addEventListener("click", closeModal);
if (checkoutModalOverlay) {
  checkoutModalOverlay.addEventListener("click", (e) => {
    // If clicking directly on the overlay backdrop
    if (e.target === checkoutModalOverlay) {
      closeModal();
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderFoodMenu();
  updateCartUI();
});
