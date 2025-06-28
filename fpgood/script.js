// Global variables
let bikesData = {};
let comparisonList = [];
let currentCity = 'mumbai';
let currentCategory = 'commuter';

// Mock bike data
const bikeDatabase = {
    commuter: [
        {
            id: 'honda-sp125',
            name: 'Honda SP 125',
            brand: 'honda',
            price: '₹92,678 - 1,00,000',
            image: 'https://cdn.bikedekho.com/processedimages/honda/sp125/source/sp1256789ead2971d1.jpg?tr=w-360',
            specs: {
                engine: '124.7 cc',
                mileage: '65 kmpl',
                power: '10.9 PS'
            },
            badge: 'new',
            category: 'commuter',
            type: 'bike'
        },
        {
            id: 'hero-splendor-plus',
            name: 'Hero Splendor Plus',
            brand: 'hero',
            price: '₹77,176 - 80,176',
            image: 'https://cdn.bikedekho.com/processedimages/hero-motocorp/hero-motocorp-splendor/source/hero-motocorp-splendor6594efca3fa93.jpg?tr=w-360',
            specs: {
                engine: '97.2 cc',
                mileage: '80 kmpl',
                power: '8.02 PS'
            },
            badge: 'bestseller',
            category: 'commuter',
            type: 'bike'
        },
        {
            id: 'tvs-raider',
            name: 'TVS Raider',
            brand: 'tvs',
            price: '₹87,010 - 1,02,000',
            image: 'https://cdn.bikedekho.com/processedimages/tvs/raider/source/raider681da83932141.jpg?tr=w-360',
            specs: {
                engine: '124.8 cc',
                mileage: '67 kmpl',
                power: '11.38 PS'
            },
            badge: 'trending',
            category: 'commuter',
            type: 'bike'
        },
        {
            id: 'bajaj-pulsar-150',
            name: 'Bajaj Pulsar 150',
            brand: 'bajaj',
            price: '₹1,08,000 - 1,15,000',
            image: 'https://cdn.bikedekho.com/processedimages/bajaj/bajaj-pulsar-150/source/bajaj-pulsar-150683044ac179cc.jpg?imwidth=400&impolicy=resize',
            specs: {
                engine: '149.5 cc',
                mileage: '50 kmpl',
                power: '14 PS'
            },
            badge: '',
            category: 'commuter',
            type: 'bike'
        }
    ],
    sports: [
        {
            id: 'yamaha-r15-v4',
            name: 'Yamaha YZF R15 V4',
            brand: 'yamaha',
            price: '₹1,77,000 - 1,85,000',
            image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=360&h=220',
            specs: {
                engine: '155 cc',
                mileage: '45 kmpl',
                power: '18.4 PS'
            },
            badge: 'trending',
            category: 'sports',
            type: 'bike'
        },
        {
            id: 'ktm-rc-200',
            name: 'KTM RC 200',
            brand: 'ktm',
            price: '₹2,14,000 - 2,20,000',
            image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=360&h=220',
            specs: {
                engine: '199.5 cc',
                mileage: '35 kmpl',
                power: '25.8 PS'
            },
            badge: 'bestseller',
            category: 'sports',
            type: 'bike'
        }
    ],
    scooters: [
        {
            id: 'honda-activa-6g',
            name: 'Honda Activa 6G',
            brand: 'honda',
            price: '₹76,684 - 81,084',
            image: 'https://cdn.bikedekho.com/processedimages/honda/activa-6g/source/activa-6g65e80a97062a4.jpg?tr=w-360',
            specs: {
                engine: '109.51 cc',
                mileage: '60 kmpl',
                power: '7.68 PS'
            },
            badge: 'bestseller',
            category: 'scooter',
            type: 'scooter'
        },
        {
            id: 'suzuki-access-125',
            name: 'Suzuki Access 125',
            brand: 'suzuki',
            price: '₹81,700 - 90,500',
            image: 'https://cdn.bikedekho.com/processedimages/suzuki/2025-access-125/source/2025-access-125681da5489661f.jpg?tr=w-360',
            specs: {
                engine: '124 cc',
                mileage: '64 kmpl',
                power: '8.7 PS'
            },
            badge: '',
            category: 'scooter',
            type: 'scooter'
        },
        {
            id: 'yamaha-aerox-155',
            name: 'Yamaha Aerox 155',
            brand: 'yamaha',
            price: '₹1,44,000 - 1,47,000',
            image: 'https://cdn.bikedekho.com/processedimages/yamaha/aerox-155/640X309/aerox-155619b81ba77454.jpg?tr=w-360',
            specs: {
                engine: '155 cc',
                mileage: '45 kmpl',
                power: '15 PS'
            },
            badge: 'new',
            category: 'scooter',
            type: 'scooter'
        },
        {
            id: 'tvs-jupiter',
            name: 'TVS Jupiter',
            brand: 'tvs',
            price: '₹73,400 - 81,300',
            image: 'https://cdn.bikedekho.com/processedimages/tvs/jupiter/640X309/jupiter67c6a7c63f754.jpg?tr=w-320',
            specs: {
                engine: '109.7 cc',
                mileage: '62 kmpl',
                power: '7.47 PS'
            },
            badge: '',
            category: 'scooter',
            type: 'scooter'
        }
    ],
    electric: [
        {
            id: 'ather-450x',
            name: 'Ather 450X',
            brand: 'ather',
            price: '₹1,46,000 - 1,50,000',
            image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=360&h=220',
            specs: {
                engine: 'Electric',
                mileage: '146 km range',
                power: '8.58 PS'
            },
            badge: 'trending',
            category: 'electric',
            type: 'scooter'
        },
        {
            id: 'ola-s1-pro',
            name: 'Ola S1 Pro',
            brand: 'ola',
            price: '₹1,30,000 - 1,40,000',
            image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=360&h=220',
            specs: {
                engine: 'Electric',
                mileage: '181 km range',
                power: '11 PS'
            },
            badge: 'bestseller',
            category: 'electric',
            type: 'scooter'
        }
    ]
};

// Brand-model mapping
const brandModels = {
    honda: ['Activa 6G', 'SP 125', 'Shine', 'CB Hornet 2.0', 'Gold Wing'],
    yamaha: ['YZF R15 V4', 'MT-15', 'FZ-S V3', 'Fascino 125', 'Aerox 155'],
    bajaj: ['Pulsar 150', 'Pulsar 220F', 'Avenger Cruise 220', 'CT 110', 'Dominar 400'],
    tvs: ['Raider', 'Apache RTR 160', 'Jupiter', 'Star City Plus', 'Ntorq 125'],
    hero: ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Xtreme 160R', 'Maestro Edge 110'],
    'royal-enfield': ['Classic 350', 'Bullet 350', 'Interceptor 650', 'Continental GT 650', 'Himalayan'],
    ktm: ['Duke 200', 'RC 200', 'Duke 250', 'RC 390', 'Adventure 250'],
    kawasaki: ['Ninja 300', 'Z650', 'Versys 650', 'W175', 'Z900'],
    suzuki: ['Access 125', 'Burgman Street', 'Gixxer', 'Intruder', 'Hayabusa']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadBikesData();
    setupSearch();
    setupTabs();
    checkLocationHash();
}

function setupEventListeners() {
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
        });
    }
    
    // Modal close
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            close.closest('.modal').classList.remove('active');
        });
    });
    
    // City selector
    const cityOptions = document.querySelectorAll('.city-option');
    cityOptions.forEach(option => {
        option.addEventListener('click', () => {
            const city = option.dataset.city;
            selectCity(city);
        });
    });
    
    // Wishlist functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn')) {
            e.preventDefault();
            toggleWishlist(e.target.closest('.bike-card'));
        }
        
        if (e.target.closest('.compare-btn')) {
            e.preventDefault();
            toggleComparison(e.target.closest('.bike-card'));
        }
        
        if (e.target.closest('.bike-card')) {
            const bikeCard = e.target.closest('.bike-card');
            const bikeId = bikeCard.dataset.bikeId;
            if (bikeId && !e.target.closest('button')) {
                showBikeDetails(bikeId);
            }
        }
    });
    
    // Search suggestions
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('focus', showSearchSuggestions);
        searchInput.addEventListener('blur', hideSearchSuggestions);
    }
    
    // Brand selection change
    const brandSelect = document.getElementById('brand-select');
    if (brandSelect) {
        brandSelect.addEventListener('change', updateModelSelect);
    }
    
    // Intersection Observer for animations
    setupScrollAnimations();
}

function loadBikesData() {
    bikesData = bikeDatabase;
    displayBikes(currentCategory);
    displayScooters();
}

function displayBikes(category) {
    const grid = document.getElementById('spotlight-bikes-grid');
    if (!grid) return;
    
    const bikes = bikesData[category] || [];
    
    grid.innerHTML = bikes.map(bike => createBikeCard(bike)).join('');
}

function displayScooters() {
    const grid = document.getElementById('scooters-grid');
    if (!grid) return;
    
    const scooters = bikesData.scooters || [];
    
    grid.innerHTML = scooters.map(scooter => createBikeCard(scooter)).join('');
}

function createBikeCard(bike) {
    const badgeHtml = bike.badge ? `<div class="bike-badge ${bike.badge}">${bike.badge}</div>` : '';
    
    return `
        <div class="bike-card" data-bike-id="${bike.id}">
            <div class="bike-image">
                <img src="${bike.image}" alt="${bike.name}" loading="lazy">
                ${badgeHtml}
                <button class="wishlist-btn">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="bike-card-info">
                <h3 class="bike-card-name">${bike.name}</h3>
                <p class="bike-price">${bike.price}*</p>
                <div class="bike-specs">
                    <span class="spec">${bike.specs.engine}</span>
                    <span class="spec">${bike.specs.mileage}</span>
                    <span class="spec">${bike.specs.power}</span>
                </div>
                <div class="bike-actions">
                    <button class="offer-btn">View Offers</button>
                    <button class="compare-btn">
                        <i class="fas fa-plus"></i>
                        Compare
                    </button>
                </div>
            </div>
        </div>
    `;
}

function setupTabs() {
    const tabs = document.querySelectorAll('.spotlight-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update category and display bikes
            currentCategory = tab.dataset.category;
            displayBikes(currentCategory);
        });
    });
    
    // Bike type tabs
    const bikeTypeTabs = document.querySelectorAll('.tab-btn');
    bikeTypeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            bikeTypeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const brand = document.getElementById('brand-select')?.value;
    const model = document.getElementById('model-select')?.value;
    const searchTerm = document.querySelector('.search-input')?.value;
    
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        
        if (brand || model || searchTerm) {
            // Redirect to search results page
            const params = new URLSearchParams();
            if (brand) params.append('brand', brand);
            if (model) params.append('model', model);
            if (searchTerm) params.append('q', searchTerm);
            
            window.location.href = `new-bikes.html?${params.toString()}`;
        } else {
            showToast('Please select a brand or enter a search term', 'warning');
        }
    }, 1000);
}

function updateModelSelect() {
    const brandSelect = document.getElementById('brand-select');
    const modelSelect = document.getElementById('model-select');
    
    if (!brandSelect || !modelSelect) return;
    
    const selectedBrand = brandSelect.value;
    const models = brandModels[selectedBrand] || [];
    
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    models.forEach(model => {
        modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
    });
}

function handleSearchInput(e) {
    const value = e.target.value;
    if (value.length > 2) {
        // Show search suggestions based on input
        showSearchSuggestions();
    }
}

function showSearchSuggestions() {
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
        suggestions.style.opacity = '1';
        suggestions.style.visibility = 'visible';
        suggestions.style.transform = 'translateY(0)';
    }
}

function hideSearchSuggestions() {
    setTimeout(() => {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.style.opacity = '0';
            suggestions.style.visibility = 'hidden';
            suggestions.style.transform = 'translateY(-10px)';
        }
    }, 200);
}

function selectCity(city) {
    currentCity = city;
    const citySelector = document.querySelector('.city-selector span');
    if (citySelector) {
        citySelector.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    }
    showToast(`City changed to ${city.charAt(0).toUpperCase() + city.slice(1)}`, 'success');
}

function toggleWishlist(bikeCard) {
    const wishlistBtn = bikeCard.querySelector('.wishlist-btn i');
    const wishlistCount = document.querySelector('.wishlist-count');
    
    if (wishlistBtn.classList.contains('far')) {
        wishlistBtn.classList.remove('far');
        wishlistBtn.classList.add('fas');
        wishlistBtn.style.color = '#E74C3C';
        
        let count = parseInt(wishlistCount.textContent) + 1;
        wishlistCount.textContent = count;
        wishlistCount.style.display = 'block';
        
        showToast('Added to wishlist', 'success');
    } else {
        wishlistBtn.classList.remove('fas');
        wishlistBtn.classList.add('far');
        wishlistBtn.style.color = '';
        
        let count = Math.max(0, parseInt(wishlistCount.textContent) - 1);
        wishlistCount.textContent = count;
        if (count === 0) {
            wishlistCount.style.display = 'none';
        }
        
        showToast('Removed from wishlist', 'info');
    }
}

function toggleComparison(bikeCard) {
    const bikeId = bikeCard.dataset.bikeId;
    const bikeName = bikeCard.querySelector('.bike-card-name').textContent;
    
    const existingIndex = comparisonList.findIndex(item => item.id === bikeId);
    
    if (existingIndex > -1) {
        comparisonList.splice(existingIndex, 1);
        showToast('Removed from comparison', 'info');
    } else {
        if (comparisonList.length >= 3) {
            showToast('You can compare maximum 3 bikes', 'warning');
            return;
        }
        comparisonList.push({ id: bikeId, name: bikeName });
        showToast('Added to comparison', 'success');
    }
    
    updateComparisonBar();
}

function updateComparisonBar() {
    const comparisonBar = document.getElementById('comparison-bar');
    const comparisonCount = document.querySelector('.comparison-count');
    const comparisonBikes = document.querySelector('.comparison-bikes');
    
    if (comparisonList.length > 0) {
        comparisonBar.classList.add('show');
        comparisonCount.textContent = `${comparisonList.length} bikes selected`;
        
        comparisonBikes.innerHTML = comparisonList.map(bike => `
            <div class="comparison-bike-item">
                ${bike.name}
                <button class="comparison-bike-remove" onclick="removeFromComparison('${bike.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    } else {
        comparisonBar.classList.remove('show');
    }
}

function removeFromComparison(bikeId) {
    const index = comparisonList.findIndex(item => item.id === bikeId);
    if (index > -1) {
        comparisonList.splice(index, 1);
        updateComparisonBar();
        showToast('Removed from comparison', 'info');
    }
}

function clearComparison() {
    comparisonList = [];
    updateComparisonBar();
    showToast('Comparison cleared', 'info');
}

function showBikeDetails(bikeId) {
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        window.location.href = `bike-details.html?id=${bikeId}`;
    }, 800);
}

function openEMIModal() {
    const modal = document.getElementById('emi-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function calculateEMI() {
    const bikePrice = parseFloat(document.getElementById('bike-price').value) || 0;
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const tenure = parseFloat(document.getElementById('loan-tenure').value) || 0;
    
    if (bikePrice <= 0 || tenure <= 0 || interestRate <= 0) {
        showToast('Please fill all fields with valid values', 'error');
        return;
    }
    
    const loanAmount = bikePrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;
    
    const resultDiv = document.getElementById('emi-result');
    resultDiv.style.display = 'block';
    
    document.querySelector('.emi-amount').textContent = `₹${Math.round(emi).toLocaleString()}`;
    document.querySelector('.total-interest').textContent = `₹${Math.round(totalInterest).toLocaleString()}`;
    document.querySelector('.total-amount').textContent = `₹${Math.round(totalAmount + downPayment).toLocaleString()}`;
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconMap[type]}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Manual close
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

function showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.bike-card, .quick-action-card, .feature-card, .brand-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function checkLocationHash() {
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
}

// Bike Quiz Functions
function startBikeQuiz() {
    window.location.href = 'bike-quiz.html';
}

function calculateOwnershipCost() {
    window.location.href = 'cost-calculator.html';
}

// Export functions for global access
window.showBikeDetails = showBikeDetails;
window.openEMIModal = openEMIModal;
window.calculateEMI = calculateEMI;
window.clearComparison = clearComparison;
window.removeFromComparison = removeFromComparison;
window.startBikeQuiz = startBikeQuiz;
window.calculateOwnershipCost = calculateOwnershipCost;
window.performSearch = performSearch;

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.src;
            img.classList.add('loaded');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);