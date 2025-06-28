// Bike Details page specific JavaScript

let currentBike = null;
let currentImageIndex = 0;
let bikeImages = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeBikeDetailsPage();
});

function initializeBikeDetailsPage() {
    loadBikeDetails();
    setupImageGallery();
    setupTabs();
    setupVariantSelection();
    setupSimilarBikes();
}

function loadBikeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get('id');
    
    if (!bikeId) {
        showToast('Bike not found', 'error');
        setTimeout(() => {
            window.location.href = 'new-bikes.html';
        }, 2000);
        return;
    }
    
    // Find bike in database
    currentBike = findBikeById(bikeId);
    
    if (!currentBike) {
        showToast('Bike not found', 'error');
        setTimeout(() => {
            window.location.href = 'new-bikes.html';
        }, 2000);
        return;
    }
    
    displayBikeDetails();
}

function findBikeById(bikeId) {
    // Search in all categories
    for (const category of Object.values(bikeDatabase)) {
        const bike = category.find(b => b.id === bikeId);
        if (bike) return bike;
    }
    return null;
}

function displayBikeDetails() {
    if (!currentBike) return;
    
    // Update page title and breadcrumb
    document.title = `${currentBike.name} - Price, Specifications & Reviews | BikeDekho`;
    document.getElementById('bike-breadcrumb').textContent = currentBike.name;
    
    // Update bike details
    document.getElementById('bike-title').textContent = currentBike.name;
    document.getElementById('bike-price').textContent = currentBike.price;
    document.getElementById('main-bike-image').src = currentBike.image;
    document.getElementById('main-bike-image').alt = currentBike.name;
    
    // Update specifications
    document.getElementById('engine-spec').textContent = currentBike.specs.engine;
    document.getElementById('mileage-spec').textContent = currentBike.specs.mileage;
    document.getElementById('power-spec').textContent = currentBike.specs.power;
    document.getElementById('weight-spec').textContent = '142 kg'; // Default weight
    
    // Setup image gallery
    bikeImages = [
        currentBike.image,
        currentBike.image, // Duplicate for demo
        currentBike.image,
        currentBike.image
    ];
    
    updateImageGallery();
}

function setupImageGallery() {
    const prevBtn = document.querySelector('.image-control.prev');
    const nextBtn = document.querySelector('.image-control.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + bikeImages.length) % bikeImages.length;
            updateMainImage();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % bikeImages.length;
            updateMainImage();
        });
    }
    
    // Thumbnail clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.thumbnail')) {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const clickedIndex = Array.from(thumbnails).indexOf(e.target.closest('.thumbnail'));
            currentImageIndex = clickedIndex;
            updateMainImage();
            updateThumbnails();
        }
    });
}

function updateImageGallery() {
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    if (!thumbnailContainer) return;
    
    thumbnailContainer.innerHTML = bikeImages.map((image, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}">
            <img src="${image}" alt="Thumbnail ${index + 1}">
        </div>
    `).join('');
}

function updateMainImage() {
    const mainImage = document.getElementById('main-bike-image');
    if (mainImage && bikeImages[currentImageIndex]) {
        mainImage.src = bikeImages[currentImageIndex];
    }
    updateThumbnails();
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            btn.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

function setupVariantSelection() {
    const variantItems = document.querySelectorAll('.variant-item');
    
    variantItems.forEach(item => {
        item.addEventListener('click', () => {
            variantItems.forEach(v => v.classList.remove('active'));
            item.classList.add('active');
            
            const variantPrice = item.querySelector('.variant-price').textContent;
            document.getElementById('bike-price').textContent = variantPrice;
            
            showToast('Variant selected', 'success');
        });
    });
}

function setupSimilarBikes() {
    const similarBikesContainer = document.getElementById('similar-bikes');
    if (!similarBikesContainer || !currentBike) return;
    
    // Find similar bikes (same category, different models)
    const similarBikes = [];
    for (const category of Object.values(bikeDatabase)) {
        for (const bike of category) {
            if (bike.id !== currentBike.id && bike.category === currentBike.category) {
                similarBikes.push(bike);
            }
        }
    }
    
    // Limit to 4 bikes
    const bikesToShow = similarBikes.slice(0, 4);
    
    similarBikesContainer.innerHTML = bikesToShow.map(bike => createBikeCard(bike)).join('');
}

// Color selection
document.addEventListener('click', (e) => {
    if (e.target.closest('.color-option')) {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => option.classList.remove('active'));
        e.target.closest('.color-option').classList.add('active');
        
        const colorName = e.target.closest('.color-option').querySelector('.color-name').textContent;
        showToast(`${colorName} color selected`, 'success');
    }
});

// Dealer search
function searchDealers() {
    const searchInput = document.querySelector('.dealer-search-input');
    const city = searchInput?.value;
    
    if (!city) {
        showToast('Please enter a city name', 'warning');
        return;
    }
    
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        showToast(`Found dealers in ${city}`, 'success');
        
        // Update dealers list with search results
        const dealersList = document.querySelector('.dealers-list');
        if (dealersList) {
            dealersList.innerHTML = `
                <div class="dealer-item">
                    <div class="dealer-info">
                        <h4>${city} Motors</h4>
                        <p class="dealer-address">123 Main Street, ${city} - 400001</p>
                        <p class="dealer-contact">
                            <i class="fas fa-phone"></i> +91 98765 43210
                        </p>
                    </div>
                    <div class="dealer-actions">
                        <button class="contact-dealer-btn" onclick="contactDealer()">Contact Dealer</button>
                        <button class="get-directions-btn" onclick="getDirections()">Get Directions</button>
                    </div>
                </div>
                <div class="dealer-item">
                    <div class="dealer-info">
                        <h4>Speed Auto ${city}</h4>
                        <p class="dealer-address">456 Park Road, ${city} - 400002</p>
                        <p class="dealer-contact">
                            <i class="fas fa-phone"></i> +91 98765 43211
                        </p>
                    </div>
                    <div class="dealer-actions">
                        <button class="contact-dealer-btn" onclick="contactDealer()">Contact Dealer</button>
                        <button class="get-directions-btn" onclick="getDirections()">Get Directions</button>
                    </div>
                </div>
            `;
        }
    }, 1000);
}

function contactDealer() {
    showToast('Dealer contact information sent to your email', 'success');
}

function getDirections() {
    showToast('Opening directions in maps...', 'info');
}

// Review helpful button
document.addEventListener('click', (e) => {
    if (e.target.closest('.helpful-btn')) {
        const btn = e.target.closest('.helpful-btn');
        const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
        btn.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${currentCount + 1})`;
        btn.style.color = '#E74C3C';
        btn.disabled = true;
        showToast('Thank you for your feedback!', 'success');
    }
});

// Load more reviews
function loadMoreReviews() {
    const reviewsList = document.querySelector('.reviews-list');
    const loadMoreBtn = document.querySelector('.load-more-reviews');
    
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        
        const newReviews = `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <span class="reviewer-name">Amit Singh</span>
                        <span class="review-date">2 weeks ago</span>
                    </div>
                    <div class="review-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                </div>
                <div class="review-content">
                    <p>Great value for money. The bike performs well in city conditions and the fuel efficiency is impressive.</p>
                </div>
                <div class="review-helpful">
                    <button class="helpful-btn">
                        <i class="fas fa-thumbs-up"></i>
                        Helpful (8)
                    </button>
                </div>
            </div>
        `;
        
        reviewsList.insertAdjacentHTML('beforeend', newReviews);
        loadMoreBtn.style.display = 'none';
        showToast('More reviews loaded', 'success');
    }, 1000);
}

// Export functions for global access
window.searchDealers = searchDealers;
window.contactDealer = contactDealer;
window.getDirections = getDirections;
window.loadMoreReviews = loadMoreReviews;

// Update EMI calculator for bike details page
function calculateEMI() {
    const bikePrice = parseFloat(document.getElementById('bike-price-emi').value) || 0;
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

// Auto-populate EMI calculator with current bike price
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (currentBike) {
            const priceInput = document.getElementById('bike-price-emi');
            if (priceInput) {
                const price = extractPrice(currentBike.price);
                priceInput.value = price;
            }
        }
    }, 1000);
});

function extractPrice(priceString) {
    const numbers = priceString.match(/[\d,]+/g);
    if (numbers && numbers.length > 0) {
        return parseInt(numbers[0].replace(/,/g, ''));
    }
    return 150000; // Default price
}