/**
 * ============================================================================
 * NEXORA – SMART SHOPPING STORE
 * Core Interactive JavaScript Engine (script.js)
 * Features:
 *   - 12 Curated Multi-Category Products
 *   - Real-time Product Search & Highlighting
 *   - Category Filtering & Smooth Section Transitions
 *   - Multi-Criteria Sorting (Price, Rating, Featured)
 *   - Slide-over Shopping Cart Drawer with Persistent LocalStorage
 *   - Dynamic Quantity Adjustment & Instant Subtotal / Tax / Free Shipping
 *   - Promo Code Validation (NEXORA50 - 50% OFF)
 *   - Quick View Product Modal Dialog
 *   - Interactive Toast Notification Feedback System
 *   - Live Promotional Flash Sale Countdown Timer
 *   - Responsive Mobile Navigation Drawer & Backdrop Handling
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. PRODUCT CATALOG DATA REPOSITORY
  // At least 8 items required; 12 curated products provided across 4 categories.
  // ==========================================================================
  const PRODUCTS_DATA = [
    {
      id: 'prod-01',
      name: 'AuraSound Pro ANC Wireless Headphones',
      category: 'electronics',
      price: 189.99,
      originalPrice: 249.99,
      discountPercent: 24,
      rating: 4.9,
      reviewCount: 128,
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Studio-grade hybrid Active Noise Cancellation, custom 40mm beryllium drivers, 45-hour battery life, and plush memory-foam ear cushions.'
    },
    {
      id: 'prod-02',
      name: 'PulseTrack Ultra AMOLED Smartwatch',
      category: 'electronics',
      price: 129.50,
      originalPrice: 169.00,
      discountPercent: 23,
      rating: 4.8,
      reviewCount: 95,
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      description: 'High-definition always-on AMOLED display with precision SpO2, sleep scoring, 5ATM water resistance, and 12-day battery endurance.'
    },
    {
      id: 'prod-03',
      name: 'HyperCharge 65W GaN Multi-Port Charger',
      category: 'electronics',
      price: 39.99,
      originalPrice: 55.00,
      discountPercent: 27,
      rating: 4.7,
      reviewCount: 214,
      badge: 'Hot Deal',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
      description: 'Ultra-compact Gallium Nitride (GaN III) fast wall charger with dual USB-C PD 3.0 ports and folding US/EU travel prongs.'
    },
    {
      id: 'prod-04',
      name: 'Urban Minimalist All-Weather Jacket',
      category: 'fashion',
      price: 89.00,
      originalPrice: 120.00,
      discountPercent: 25,
      rating: 4.8,
      reviewCount: 64,
      badge: 'Trending',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
      description: 'Engineered three-layer waterproof breathable shell with magnetic storm closures, storm hood, and concealed fleece security pockets.'
    },
    {
      id: 'prod-05',
      name: 'AeroKnit Breathable Cloud Running Shoes',
      category: 'fashion',
      price: 74.99,
      originalPrice: 110.00,
      discountPercent: 32,
      rating: 4.9,
      reviewCount: 182,
      badge: 'Top Rated',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      description: 'Dynamic responsive cushioning with recycled PrimeKnit upper for featherweight energy return and all-day joint support.'
    },
    {
      id: 'prod-06',
      name: 'Tailored Merino Wool Thermal Overshirt',
      category: 'fashion',
      price: 68.00,
      originalPrice: 95.00,
      discountPercent: 28,
      rating: 4.6,
      reviewCount: 49,
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      description: '100% ethically sourced Australian Merino wool woven for naturally antibacterial warmth, anti-wrinkle drape, and timeless casual style.'
    },
    {
      id: 'prod-07',
      name: 'Voyager Anti-Theft Expandable Backpack',
      category: 'accessories',
      price: 59.99,
      originalPrice: 79.99,
      discountPercent: 25,
      rating: 4.9,
      reviewCount: 310,
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
      description: 'TSA-friendly checkpoint design with hidden RFID blocking pocket, 16-inch padded laptop compartment, and external USB pass-through.'
    },
    {
      id: 'prod-08',
      name: 'AeroFlight Polarized Alloy Aviators',
      category: 'accessories',
      price: 45.00,
      originalPrice: 65.00,
      discountPercent: 30,
      rating: 4.7,
      reviewCount: 88,
      badge: 'Classic',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
      description: 'Japanese TAC 9-layer polarized lenses offering 100% UV400 defense encased in aerospace magnesium-aluminum featherweight frames.'
    },
    {
      id: 'prod-09',
      name: 'Handcrafted Heritage Slim Bifold Wallet',
      category: 'accessories',
      price: 34.50,
      originalPrice: 49.00,
      discountPercent: 29,
      rating: 4.8,
      reviewCount: 142,
      badge: 'Handmade',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
      description: 'Vegetable-tanned full-grain top layer Italian leather featuring 8 card slots, quick-pull access, and built-in RFID shielding.'
    },
    {
      id: 'prod-10',
      name: 'Artisan Ceramic Pour-Over Coffee Brewer',
      category: 'home-living',
      price: 42.00,
      originalPrice: 60.00,
      discountPercent: 30,
      rating: 4.9,
      reviewCount: 76,
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
      description: 'Double-walled matte ceramic carafe with precision spiral extraction ribs and reusable fine stainless micro-mesh filter.'
    },
    {
      id: 'prod-11',
      name: 'AromaZen Ultrasonic Ambient Diffuser',
      category: 'home-living',
      price: 36.00,
      originalPrice: 52.00,
      discountPercent: 30,
      rating: 4.7,
      reviewCount: 119,
      badge: 'Eco Living',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
      description: 'Whisper-quiet ultrasonic cool mist generator with natural beech wood grain finish and warm circadian rhythm LED mood lighting.'
    },
    {
      id: 'prod-12',
      name: 'ErgoComfort Memory Foam Lumbar Support',
      category: 'home-living',
      price: 29.99,
      originalPrice: 45.00,
      discountPercent: 33,
      rating: 4.6,
      reviewCount: 93,
      badge: 'Ergonomic',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      description: 'Orthopedic high-density molded memory foam pillow with breathable 3D air mesh cover and adjustable dual straps for work chairs.'
    }
  ];

  // SVG Fallback placeholder in case an external image fails to load
  const SVG_FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f1f5f9%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23cbd5e1%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22url(%23g)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%2364748b%22%3ENEXORA%20Product%3C%2Ftext%3E%3C%2Fsvg%3E";

  // ==========================================================================
  // 2. APPLICATION STATE
  // ==========================================================================
  const state = {
    cart: [],
    activeFilter: 'all',
    searchQuery: '',
    sortBy: 'featured',
    appliedCoupon: null, // e.g. { code: 'NEXORA50', discountRate: 0.5 }
    freeShippingThreshold: 50.00
  };

  // ==========================================================================
  // 3. DOM ELEMENT REFERENCES
  // ==========================================================================
  const DOM = {
    // Navigation & Search
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    mobileSearchInput: document.getElementById('mobileSearchInput'),
    mobileSearchBtn: document.getElementById('mobileSearchBtn'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    mobileDrawerClose: document.getElementById('mobileDrawerClose'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),

    // Products Section
    productsContainer: document.getElementById('productsContainer'),
    filterPills: document.querySelectorAll('.filter-pill'),
    sortSelect: document.getElementById('sortSelect'),
    filterStatusBar: document.getElementById('filterStatusBar'),
    filterStatusText: document.getElementById('filterStatusText'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    clearAllFiltersBtn: document.getElementById('clearAllFiltersBtn'),
    noResultsBox: document.getElementById('noResultsBox'),

    // Categories
    categoryCards: document.querySelectorAll('.category-card'),

    // Cart Drawer
    cartOpenBtn: document.getElementById('cartOpenBtn'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartBackdrop: document.getElementById('cartBackdrop'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    navCartTotal: document.getElementById('navCartTotal'),
    cartDrawerItemsCount: document.getElementById('cartDrawerItemsCount'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartDrawerFooter: document.getElementById('cartDrawerFooter'),
    shippingProgressMsg: document.getElementById('shippingProgressMsg'),
    shippingBarFill: document.getElementById('shippingBarFill'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    discountLine: document.getElementById('discountLine'),
    cartDiscount: document.getElementById('cartDiscount'),
    cartShipping: document.getElementById('cartShipping'),
    cartTotal: document.getElementById('cartTotal'),
    cartCouponInput: document.getElementById('cartCouponInput'),
    applyCouponBtn: document.getElementById('applyCouponBtn'),
    couponAppliedBadge: document.getElementById('couponAppliedBadge'),
    removeCouponBtn: document.getElementById('removeCouponBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    clearCartBtn: document.getElementById('clearCartBtn'),
    startShoppingBtn: document.getElementById('startShoppingBtn'),

    // Promotional & Flash Sale
    hoursVal: document.getElementById('hoursVal'),
    minsVal: document.getElementById('minsVal'),
    secsVal: document.getElementById('secsVal'),
    copyCouponBtn: document.getElementById('copyCouponBtn'),
    couponCode: document.getElementById('couponCode'),
    copyCouponText: document.getElementById('copyCouponText'),

    // Modals
    quickViewModal: document.getElementById('quickViewModal'),
    modalContent: document.getElementById('modalContent'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    checkoutSuccessModal: document.getElementById('checkoutSuccessModal'),
    continueShoppingBtn: document.getElementById('continueShoppingBtn'),
    mockOrderNumber: document.getElementById('mockOrderNumber'),
    mockOrderTotal: document.getElementById('mockOrderTotal'),

    // Newsletter & Footer
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail'),
    currentYearSpan: document.getElementById('currentYear'),
    toastContainer: document.getElementById('toastContainer')
  };

  // ==========================================================================
  // 4. STORAGE HELPERS
  // ==========================================================
  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('nexora_cart_items');
      if (saved) {
        state.cart = JSON.parse(saved);
      }
      const savedCoupon = localStorage.getItem('nexora_applied_coupon');
      if (savedCoupon) {
        state.appliedCoupon = JSON.parse(savedCoupon);
      }
    } catch (e) {
      console.warn('LocalStorage error while retrieving cart:', e);
      state.cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('nexora_cart_items', JSON.stringify(state.cart));
      if (state.appliedCoupon) {
        localStorage.setItem('nexora_applied_coupon', JSON.stringify(state.appliedCoupon));
      } else {
        localStorage.removeItem('nexora_applied_coupon');
      }
    } catch (e) {
      console.warn('LocalStorage error while saving cart:', e);
    }
  }

  // ==========================================================================
  // 5. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(title, message, type = 'success') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast-card toast-${type}`;
    
    let icon = '🛒';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚡';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${escapeHTML(title)}</div>
        <div class="toast-msg">${escapeHTML(message)}</div>
      </div>
    `;

    DOM.toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remove after 3.2 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          DOM.toastContainer.removeChild(toast);
        }
      }, 400);
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================================================
  // 6. PRODUCT RENDERING & FILTERING
  // ==========================================================================
  function getFilteredProducts() {
    let list = [...PRODUCTS_DATA];

    // Filter by Category
    if (state.activeFilter !== 'all') {
      list = list.filter(item => item.category === state.activeFilter);
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (state.sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep initial curated order
        break;
    }

    return list;
  }

  function renderProducts() {
    if (!DOM.productsContainer) return;

    const products = getFilteredProducts();

    // Check empty state
    if (products.length === 0) {
      DOM.productsContainer.innerHTML = '';
      if (DOM.noResultsBox) DOM.noResultsBox.style.display = 'block';
      updateFilterStatusBar(0);
      return;
    }

    if (DOM.noResultsBox) DOM.noResultsBox.style.display = 'none';

    // Build cards HTML using CSS Flexbox
    const cardsHTML = products.map(product => {
      const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');
      const isInCart = state.cart.some(item => item.id === product.id);

      return `
        <article class="product-card" data-product-id="${product.id}" role="listitem">
          <!-- Product Media Box with image & badges -->
          <div class="product-image-box">
            ${product.badge ? `<span class="card-badge-tag">${escapeHTML(product.badge)}</span>` : ''}
            <span class="card-category-tag">${escapeHTML(product.category.replace('-', ' '))}</span>
            
            <img 
              src="${escapeHTML(product.image)}" 
              alt="${escapeHTML(product.name)}" 
              class="product-img"
              loading="lazy"
              onerror="this.onerror=null; this.src='${SVG_FALLBACK_IMAGE}';"
            >

            <!-- Quick View Action Overlay -->
            <div class="product-card-overlay">
              <button type="button" class="quick-view-btn" data-action="quickview" data-product-id="${product.id}" aria-label="Quick preview for ${escapeHTML(product.name)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Quick View
              </button>
            </div>
          </div>

          <!-- Product Details Body (Flexbox column with flex-grow: 1) -->
          <div class="product-details">
            <div class="product-info-top">
              <div class="product-rating-row">
                <span class="star-rating" aria-label="Rating ${product.rating} out of 5 stars">${stars}</span>
                <span class="rating-count">(${product.reviewCount})</span>
              </div>
              <h3 class="product-title" title="${escapeHTML(product.name)}">${escapeHTML(product.name)}</h3>
              <p class="product-description-snippet">${escapeHTML(product.description)}</p>
            </div>

            <!-- Price and Add to Cart Footer (Flexbox) -->
            <div class="product-card-footer">
              <div class="product-price-row">
                <div class="price-group">
                  <span class="current-price">$${product.price.toFixed(2)}</span>
                  ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                ${product.discountPercent ? `<span class="discount-percentage">-${product.discountPercent}%</span>` : ''}
              </div>

              <button 
                type="button" 
                class="add-to-cart-btn ${isInCart ? 'added' : ''}" 
                data-action="add-to-cart" 
                data-product-id="${product.id}"
                aria-label="Add ${escapeHTML(product.name)} to shopping cart"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>${isInCart ? 'Added to Bag ✓' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    DOM.productsContainer.innerHTML = cardsHTML;
    updateFilterStatusBar(products.length);
  }

  function updateFilterStatusBar(count) {
    if (!DOM.filterStatusBar) return;

    const isFiltered = state.activeFilter !== 'all' || state.searchQuery.trim() !== '';

    if (isFiltered) {
      DOM.filterStatusBar.style.display = 'flex';
      let message = `Showing <strong>${count}</strong> product${count === 1 ? '' : 's'}`;
      if (state.activeFilter !== 'all') {
        message += ` in category <em>"${state.activeFilter.replace('-', ' ')}"</em>`;
      }
      if (state.searchQuery.trim() !== '') {
        message += ` matching <em>"${state.searchQuery.trim()}"</em>`;
      }
      if (DOM.filterStatusText) DOM.filterStatusText.innerHTML = message;
    } else {
      DOM.filterStatusBar.style.display = 'none';
    }
  }

  // ==========================================================================
  // 7. SHOPPING CART OPERATIONS
  // ==========================================================================
  function addToCart(productId, quantityToAdd = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantityToAdd;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantityToAdd
      });
    }

    saveCartToStorage();
    updateCartUI();
    renderProducts(); // Update "Added to Bag ✓" state on cards

    // Animate badge
    if (DOM.cartCountBadge) {
      DOM.cartCountBadge.classList.remove('bump');
      void DOM.cartCountBadge.offsetWidth; // Trigger reflow
      DOM.cartCountBadge.classList.add('bump');
    }

    showToast('Added to Cart!', `${product.name} is now in your shopping bag.`, 'success');
  }

  function updateCartItemQuantity(productId, delta) {
    const itemIndex = state.cart.findIndex(i => i.id === productId);
    if (itemIndex === -1) return;

    const newQty = state.cart[itemIndex].quantity + delta;

    if (newQty <= 0) {
      removeCartItem(productId);
    } else {
      state.cart[itemIndex].quantity = newQty;
      saveCartToStorage();
      updateCartUI();
    }
  }

  function removeCartItem(productId) {
    const removedItem = state.cart.find(i => i.id === productId);
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCartToStorage();
    updateCartUI();
    renderProducts();

    if (removedItem) {
      showToast('Item Removed', `Removed ${removedItem.name} from your bag.`, 'info');
    }
  }

  function clearCart() {
    if (state.cart.length === 0) return;
    state.cart = [];
    state.appliedCoupon = null;
    saveCartToStorage();
    updateCartUI();
    renderProducts();
    showToast('Cart Cleared', 'All items have been removed from your shopping bag.', 'info');
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 1. Badge & Nav Counter
    if (DOM.cartCountBadge) DOM.cartCountBadge.textContent = totalItems;
    if (DOM.navCartTotal) DOM.navCartTotal.textContent = `$${subtotal.toFixed(2)}`;
    if (DOM.cartDrawerItemsCount) {
      DOM.cartDrawerItemsCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
    }

    // 2. Empty or Filled State
    if (state.cart.length === 0) {
      if (DOM.cartEmptyState) DOM.cartEmptyState.classList.add('active');
      if (DOM.cartItemsList) DOM.cartItemsList.innerHTML = '';
      if (DOM.cartDrawerFooter) DOM.cartDrawerFooter.style.display = 'none';
      if (DOM.shippingBarFill) DOM.shippingBarFill.style.width = '0%';
      if (DOM.shippingProgressMsg) {
        DOM.shippingProgressMsg.innerHTML = `Add $${state.freeShippingThreshold.toFixed(2)} more to qualify for <strong>FREE Shipping</strong>!`;
      }
      return;
    }

    if (DOM.cartEmptyState) DOM.cartEmptyState.classList.remove('active');
    if (DOM.cartDrawerFooter) DOM.cartDrawerFooter.style.display = 'flex';

    // 3. Render Cart Items List
    if (DOM.cartItemsList) {
      DOM.cartItemsList.innerHTML = state.cart.map(item => `
        <article class="cart-item-card" data-cart-id="${item.id}" role="listitem">
          <div class="cart-item-img-wrap">
            <img 
              src="${escapeHTML(item.image)}" 
              alt="${escapeHTML(item.name)}" 
              class="cart-item-img"
              onerror="this.onerror=null; this.src='${SVG_FALLBACK_IMAGE}';"
            >
          </div>

          <div class="cart-item-meta">
            <h4 class="cart-item-title" title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>

            <div class="cart-item-controls">
              <div class="qty-control-group">
                <button type="button" class="qty-btn" data-action="decrease-qty" data-product-id="${item.id}" aria-label="Decrease quantity of ${escapeHTML(item.name)}">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button type="button" class="qty-btn" data-action="increase-qty" data-product-id="${item.id}" aria-label="Increase quantity of ${escapeHTML(item.name)}">+</button>
              </div>

              <button type="button" class="remove-item-btn" data-action="remove-item" data-product-id="${item.id}" aria-label="Remove ${escapeHTML(item.name)} from cart">
                Remove
              </button>
            </div>
          </div>
        </article>
      `).join('');
    }

    // 4. Calculations: Discount, Shipping, Total
    let discountAmount = 0;
    if (state.appliedCoupon) {
      discountAmount = subtotal * state.appliedCoupon.discountRate;
      if (DOM.discountLine) DOM.discountLine.style.display = 'flex';
      if (DOM.cartDiscount) DOM.cartDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
      if (DOM.couponAppliedBadge) DOM.couponAppliedBadge.style.display = 'flex';
    } else {
      if (DOM.discountLine) DOM.discountLine.style.display = 'none';
      if (DOM.couponAppliedBadge) DOM.couponAppliedBadge.style.display = 'none';
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const isFreeShipping = discountedSubtotal >= state.freeShippingThreshold;
    const shippingFee = isFreeShipping ? 0.00 : 9.99;
    const grandTotal = discountedSubtotal + (subtotal > 0 ? shippingFee : 0);

    // Free shipping progress bar
    const progressPercent = Math.min(100, (discountedSubtotal / state.freeShippingThreshold) * 100);
    if (DOM.shippingBarFill) DOM.shippingBarFill.style.width = `${progressPercent}%`;

    if (DOM.shippingProgressMsg) {
      if (isFreeShipping) {
        DOM.shippingProgressMsg.innerHTML = `🎉 Congratulations! You have unlocked <strong>FREE Shipping</strong>!`;
      } else {
        const remaining = (state.freeShippingThreshold - discountedSubtotal).toFixed(2);
        DOM.shippingProgressMsg.innerHTML = `Add <strong>$${remaining}</strong> more to qualify for <strong>FREE Shipping</strong>!`;
      }
    }

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (DOM.cartShipping) {
      DOM.cartShipping.textContent = isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`;
      if (isFreeShipping) {
        DOM.cartShipping.classList.add('text-success');
      } else {
        DOM.cartShipping.classList.remove('text-success');
      }
    }
    if (DOM.cartTotal) DOM.cartTotal.textContent = `$${grandTotal.toFixed(2)}`;
  }

  // ==========================================================================
  // 8. DRAWER & MODAL CONTROLS
  // ==========================================================================
  function openCartDrawer() {
    if (!DOM.cartDrawer || !DOM.cartBackdrop) return;
    DOM.cartDrawer.classList.add('open');
    DOM.cartBackdrop.classList.add('active');
    DOM.cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeCartDrawer() {
    if (!DOM.cartDrawer || !DOM.cartBackdrop) return;
    DOM.cartDrawer.classList.remove('open');
    DOM.cartBackdrop.classList.remove('active');
    DOM.cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (!DOM.mobileDrawer || !DOM.drawerOverlay) return;
    const isOpen = DOM.mobileDrawer.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    DOM.mobileDrawer.classList.add('open');
    DOM.drawerOverlay.classList.add('active');
    DOM.mobileMenuToggle.classList.add('active');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    DOM.mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    DOM.mobileDrawer.classList.remove('open');
    DOM.drawerOverlay.classList.remove('active');
    DOM.mobileMenuToggle.classList.remove('active');
    DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    DOM.mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // 9. QUICK VIEW PRODUCT MODAL
  // ==========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !DOM.quickViewModal || !DOM.modalContent) return;

    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');

    DOM.modalContent.innerHTML = `
      <div class="modal-media-col">
        <img 
          src="${escapeHTML(product.image)}" 
          alt="${escapeHTML(product.name)}" 
          class="modal-img"
          onerror="this.onerror=null; this.src='${SVG_FALLBACK_IMAGE}';"
        >
      </div>
      <div class="modal-info-col">
        <div>
          <span class="badge badge-accent" style="margin-bottom: 12px;">${escapeHTML(product.category.toUpperCase())}</span>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">${escapeHTML(product.name)}</h2>
          <div class="product-rating-row" style="margin-bottom: 16px;">
            <span class="star-rating">${stars}</span>
            <span class="rating-count" style="font-size: 0.875rem;">${product.rating} / 5.0 (${product.reviewCount} customer reviews)</span>
          </div>

          <div class="product-price-row" style="margin-bottom: 16px;">
            <div class="price-group">
              <span class="current-price" style="font-size: 1.6rem;">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="original-price" style="font-size: 1.1rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            ${product.discountPercent ? `<span class="discount-percentage">SAVE ${product.discountPercent}%</span>` : ''}
          </div>

          <p style="color: #64748b; font-size: 0.9375rem; line-height: 1.6; margin-bottom: 24px;">
            ${escapeHTML(product.description)}
          </p>
        </div>

        <div>
          <button 
            type="button" 
            class="btn btn-primary btn-block" 
            id="modalAddToCartBtn" 
            data-product-id="${product.id}"
            style="padding: 14px 20px; font-size: 1rem;"
          >
            <span>Add to Cart • $${product.price.toFixed(2)}</span>
          </button>
        </div>
      </div>
    `;

    DOM.quickViewModal.classList.add('open');
    DOM.quickViewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook modal add to cart button
    const modalBtn = document.getElementById('modalAddToCartBtn');
    if (modalBtn) {
      modalBtn.addEventListener('click', () => {
        addToCart(product.id, 1);
        closeQuickView();
        openCartDrawer();
      });
    }
  }

  function closeQuickView() {
    if (!DOM.quickViewModal) return;
    DOM.quickViewModal.classList.remove('open');
    DOM.quickViewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // 10. PROMOTIONAL COUNTDOWN TIMER (Live Ticking Clock)
  // ==========================================================================
  function initCountdownTimer() {
    // Set target to midnight or 18 hours in the future
    let remainingSeconds = 18 * 3600 + 45 * 60 + 32;

    function tick() {
      if (remainingSeconds <= 0) {
        remainingSeconds = 24 * 3600; // Reset for continuous demo display
      } else {
        remainingSeconds--;
      }

      const h = Math.floor(remainingSeconds / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;

      if (DOM.hoursVal) DOM.hoursVal.textContent = String(h).padStart(2, '0');
      if (DOM.minsVal) DOM.minsVal.textContent = String(m).padStart(2, '0');
      if (DOM.secsVal) DOM.secsVal.textContent = String(s).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
  }

  // ==========================================================================
  // 11. EVENT LISTENERS SETUP
  // ==========================================================================
  function attachEventListeners() {
    // --- Live Search ---
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderProducts();
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        if (DOM.searchInput) DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        renderProducts();
        if (DOM.searchInput) DOM.searchInput.focus();
      });
    }

    // Mobile Search Input
    if (DOM.mobileSearchBtn && DOM.mobileSearchInput) {
      const handleMobileSearch = () => {
        const query = DOM.mobileSearchInput.value.trim();
        state.searchQuery = query;
        if (DOM.searchInput) DOM.searchInput.value = query;
        closeMobileMenu();
        renderProducts();

        const productsEl = document.getElementById('products');
        if (productsEl) {
          productsEl.scrollIntoView({ behavior: 'smooth' });
        }
      };

      DOM.mobileSearchBtn.addEventListener('click', handleMobileSearch);
      DOM.mobileSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleMobileSearch();
        }
      });
    }

    // --- Category Filter Tabs ---
    DOM.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.filterPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        state.activeFilter = pill.getAttribute('data-filter') || 'all';
        renderProducts();
      });
    });

    // --- Category Cards Clickable Filter ---
    DOM.categoryCards.forEach(card => {
      const handleCategoryClick = () => {
        const cat = card.getAttribute('data-category');
        if (!cat) return;

        state.activeFilter = cat;

        // Sync pill buttons
        DOM.filterPills.forEach(p => {
          if (p.getAttribute('data-filter') === cat) {
            p.classList.add('active');
            p.setAttribute('aria-selected', 'true');
          } else {
            p.classList.remove('active');
            p.setAttribute('aria-selected', 'false');
          }
        });

        renderProducts();

        // Smooth scroll to products section
        const productsEl = document.getElementById('products');
        if (productsEl) {
          productsEl.scrollIntoView({ behavior: 'smooth' });
        }

        showToast('Category Selected', `Filtering products by ${cat.replace('-', ' ')}.`, 'info');
      };

      card.addEventListener('click', handleCategoryClick);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCategoryClick();
        }
      });
    });

    // --- Sorting Select ---
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // --- Reset Filters Buttons ---
    const resetFilters = () => {
      state.activeFilter = 'all';
      state.searchQuery = '';
      if (DOM.searchInput) DOM.searchInput.value = '';
      if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';

      DOM.filterPills.forEach(p => {
        if (p.getAttribute('data-filter') === 'all') {
          p.classList.add('active');
          p.setAttribute('aria-selected', 'true');
        } else {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        }
      });

      renderProducts();
      showToast('Filters Cleared', 'Displaying all available products.', 'info');
    };

    if (DOM.resetFiltersBtn) DOM.resetFiltersBtn.addEventListener('click', resetFilters);
    if (DOM.clearAllFiltersBtn) DOM.clearAllFiltersBtn.addEventListener('click', resetFilters);

    // --- Product Grid Delegated Events (Add to Cart / Quick View) ---
    if (DOM.productsContainer) {
      DOM.productsContainer.addEventListener('click', (e) => {
        const addBtn = e.target.closest('[data-action="add-to-cart"]');
        if (addBtn) {
          e.preventDefault();
          const prodId = addBtn.getAttribute('data-product-id');
          addToCart(prodId, 1);
          return;
        }

        const quickBtn = e.target.closest('[data-action="quickview"]');
        if (quickBtn) {
          e.preventDefault();
          const prodId = quickBtn.getAttribute('data-product-id');
          openQuickView(prodId);
          return;
        }
      });
    }

    // --- Cart Drawer Item Delegated Events (Qty Increment/Decrement/Remove) ---
    if (DOM.cartItemsList) {
      DOM.cartItemsList.addEventListener('click', (e) => {
        const decBtn = e.target.closest('[data-action="decrease-qty"]');
        if (decBtn) {
          const prodId = decBtn.getAttribute('data-product-id');
          updateCartItemQuantity(prodId, -1);
          return;
        }

        const incBtn = e.target.closest('[data-action="increase-qty"]');
        if (incBtn) {
          const prodId = incBtn.getAttribute('data-product-id');
          updateCartItemQuantity(prodId, 1);
          return;
        }

        const remBtn = e.target.closest('[data-action="remove-item"]');
        if (remBtn) {
          const prodId = remBtn.getAttribute('data-product-id');
          removeCartItem(prodId);
          return;
        }
      });
    }

    // --- Cart Open / Close Handlers ---
    if (DOM.cartOpenBtn) DOM.cartOpenBtn.addEventListener('click', openCartDrawer);
    if (DOM.cartCloseBtn) DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
    if (DOM.cartBackdrop) DOM.cartBackdrop.addEventListener('click', closeCartDrawer);
    if (DOM.startShoppingBtn) {
      DOM.startShoppingBtn.addEventListener('click', () => {
        closeCartDrawer();
      });
    }
    if (DOM.clearCartBtn) DOM.clearCartBtn.addEventListener('click', clearCart);

    // --- Mobile Menu Open / Close ---
    if (DOM.mobileMenuToggle) DOM.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    if (DOM.mobileDrawerClose) DOM.mobileDrawerClose.addEventListener('click', closeMobileMenu);
    if (DOM.drawerOverlay) DOM.drawerOverlay.addEventListener('click', closeMobileMenu);

    // Auto-close mobile drawer when any link is clicked
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // --- Coupon Code Logic ---
    if (DOM.copyCouponBtn && DOM.couponCode) {
      DOM.copyCouponBtn.addEventListener('click', () => {
        const code = DOM.couponCode.textContent.trim();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(() => {
            if (DOM.copyCouponText) DOM.copyCouponText.textContent = 'Copied!';
            showToast('Coupon Copied!', `Code "${code}" copied to clipboard. Apply it in your cart!`, 'success');
            setTimeout(() => {
              if (DOM.copyCouponText) DOM.copyCouponText.textContent = 'Copy';
            }, 2000);
          }).catch(() => {
            promptCouponCopy(code);
          });
        } else {
          promptCouponCopy(code);
        }
      });
    }

    function promptCouponCopy(code) {
      if (DOM.cartCouponInput) {
        DOM.cartCouponInput.value = code;
        openCartDrawer();
        showToast('Coupon Ready', `Applied "${code}" in your cart coupon field.`, 'info');
      }
    }

    if (DOM.applyCouponBtn && DOM.cartCouponInput) {
      DOM.applyCouponBtn.addEventListener('click', () => {
        const val = DOM.cartCouponInput.value.trim().toUpperCase();
        if (!val) {
          showToast('Coupon Code Missing', 'Please enter a promo code first.', 'warning');
          return;
        }

        if (val === 'NEXORA50') {
          state.appliedCoupon = { code: 'NEXORA50', discountRate: 0.5 };
          saveCartToStorage();
          updateCartUI();
          showToast('Coupon Applied!', '50% discount has been applied to your subtotal!', 'success');
        } else if (val === 'SAVE10') {
          state.appliedCoupon = { code: 'SAVE10', discountRate: 0.1 };
          saveCartToStorage();
          updateCartUI();
          showToast('Coupon Applied!', '10% discount applied!', 'success');
        } else {
          showToast('Invalid Coupon', 'The code you entered is not valid or expired.', 'warning');
        }
      });
    }

    if (DOM.removeCouponBtn) {
      DOM.removeCouponBtn.addEventListener('click', () => {
        state.appliedCoupon = null;
        if (DOM.cartCouponInput) DOM.cartCouponInput.value = '';
        saveCartToStorage();
        updateCartUI();
        showToast('Coupon Removed', 'Discount code removed from cart.', 'info');
      });
    }

    // --- Checkout Simulation ---
    if (DOM.checkoutBtn) {
      DOM.checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) return;

        const subtotal = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
        let discount = state.appliedCoupon ? (subtotal * state.appliedCoupon.discountRate) : 0;
        let finalTotal = Math.max(0, subtotal - discount);
        if (finalTotal < state.freeShippingThreshold) {
          finalTotal += 9.99;
        }

        const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
        if (DOM.mockOrderNumber) DOM.mockOrderNumber.textContent = randomOrderNum;
        if (DOM.mockOrderTotal) DOM.mockOrderTotal.textContent = `$${finalTotal.toFixed(2)}`;

        // Clear cart
        state.cart = [];
        state.appliedCoupon = null;
        saveCartToStorage();
        updateCartUI();
        renderProducts();

        closeCartDrawer();

        if (DOM.checkoutSuccessModal) {
          DOM.checkoutSuccessModal.classList.add('open');
          DOM.checkoutSuccessModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    if (DOM.continueShoppingBtn && DOM.checkoutSuccessModal) {
      DOM.continueShoppingBtn.addEventListener('click', () => {
        DOM.checkoutSuccessModal.classList.remove('open');
        DOM.checkoutSuccessModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    }

    // --- Modal Close Buttons ---
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeQuickView);
    if (DOM.quickViewModal) {
      DOM.quickViewModal.addEventListener('click', (e) => {
        if (e.target === DOM.quickViewModal) {
          closeQuickView();
        }
      });
    }

    // --- Escape key listener for all drawers and modals ---
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeMobileMenu();
        closeQuickView();
        if (DOM.checkoutSuccessModal) {
          DOM.checkoutSuccessModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });

    // --- Newsletter Form Validation ---
    if (DOM.newsletterForm && DOM.newsletterEmail) {
      DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = DOM.newsletterEmail.value.trim();

        if (!email || !email.includes('@') || !email.includes('.')) {
          showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
          DOM.newsletterEmail.focus();
          return;
        }

        showToast('Subscribed!', `Welcome to NEXORA Club. VIP promos will be sent to ${email}.`, 'success');
        DOM.newsletterEmail.value = '';
      });
    }

    // --- Active Link Observer on Scroll ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          DOM.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Dynamic Current Year in Footer
    if (DOM.currentYearSpan) {
      DOM.currentYearSpan.textContent = new Date().getFullYear();
    }
  }

  // ==========================================================================
  // 12. INITIALIZATION LIFECYCLE
  // ==========================================================================
  function init() {
    loadCartFromStorage();
    renderProducts();
    updateCartUI();
    initCountdownTimer();
    attachEventListeners();

    console.info('🚀 NEXORA Commercial Store initialized with CSS Flexbox Layout.');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
