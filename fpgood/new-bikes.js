// New Bikes page specific JavaScript

let allBikes = [];
let filteredBikes = [];
let currentPage = 1;
const bikesPerPage = 12;

// Wait for DOM and main script to load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for script.js to fully load
    setTimeout(initializeNewBikesPage, 100);
});

function initializeNewBikesPage() {
    // Check if bikeDatabase is available from script.js
    if (typeof bikeDatabase === 'undefined') {
        console.error('bikeDatabase not found. Retrying...');
        setTimeout(initializeNewBikesPage, 500);
        return;
    }
    
    loadExtendedBikeData();
    setupFilters();
    setupViewToggle();
    setupPagination();
    displayBikes();
    updateResultsCount();
    checkURLParameters();
}

function loadExtendedBikeData() {
    // Get all bikes from the main database
    const mainBikes = Object.values(bikeDatabase).flat();
    
    // Extended bike database with proper image URLs
    const additionalBikes = [
        {
            id: 'royal-enfield-classic-350',
            name: 'Royal Enfield Classic 350',
            brand: 'royal-enfield',
            price: '₹1,93,000 - 2,20,000',
            image: 'https://cdn.bikedekho.com/processedimages/royal-enfield/classic-350/source/classic-35065dc33e0a41d5.jpg?tr=w-360',
            specs: {
                engine: '349 cc',
                mileage: '41 kmpl',
                power: '20.2 PS'
            },
            badge: 'bestseller',
            category: 'cruiser',
            type: 'bike'
        },
        {
            id: 'kawasaki-ninja-300',
            name: 'Kawasaki Ninja 300',
            brand: 'kawasaki',
            price: '₹3,18,000 - 3,25,000',
            image: 'https://cdn.bikedekho.com/processedimages/kawasaki/ninja-300/source/ninja-300681da9f6cdb39f.jpg?tr=w-360',
            specs: {
                engine: '296 cc',
                mileage: '32 kmpl',
                power: '39 PS'
            },
            badge: 'premium',
            category: 'sports',
            type: 'bike'
        },
        {
            id: 'hero-xpulse-200',
            name: 'Hero XPulse 200',
            brand: 'hero',
            price: '₹1,38,000 - 1,42,000',
            image: 'https://cdn.bikedekho.com/processedimages/hero-motocorp/xpulse-200/source/xpulse-20065dc33f4912f0.jpg?tr=w-360',
            specs: {
                engine: '199.6 cc',
                mileage: '40 kmpl',
                power: '17.8 PS'
            },
            badge: 'adventure',
            category: 'adventure',
            type: 'bike'
        },
        {
            id: 'ktm-duke-390',
            name: 'KTM Duke 390',
            brand: 'ktm',
            price: '₹2,87,000 - 3,00,000',
            image: 'https://cdn.bikedekho.com/processedimages/ktm/390-duke/source/390-duke681da9a36c6e7.jpg?tr=w-360',
            specs: {
                engine: '373.2 cc',
                mileage: '25 kmpl',
                power: '43.5 PS'
            },
            badge: 'trending',
            category: 'sports',
            type: 'bike'
        },
        {
            id: 'bajaj-dominar-400',
            name: 'Bajaj Dominar 400',
            brand: 'bajaj',
            price: '₹2,17,000 - 2,30,000',
            image: 'https://cdn.bikedekho.com/processedimages/bajaj/dominar-400/source/dominar-400681da98e61b19.jpg?tr=w-360',
            specs: {
                engine: '373.3 cc',
                mileage: '27 kmpl',
                power: '40 PS'
            },
            badge: 'new',
            category: 'adventure',
            type: 'bike'
        },
        {
            id: 'yamaha-mt-15',
            name: 'Yamaha MT-15',
            brand: 'yamaha',
            price: '₹1,68,000 - 1,75,000',
            image: 'https://cdn.bikedekho.com/processedimages/yamaha/mt-15/source/mt-15681da9c15e6ca.jpg?tr=w-360',
            specs: {
                engine: '155 cc',
                mileage: '45 kmpl',
                power: '18.4 PS'
            },
            badge: 'bestseller',
            category: 'sports',
            type: 'bike'
        },
        {
            id: 'honda-cb-hornet-2.0',
            name: 'Honda CB Hornet 2.0',
            brand: 'honda',
            price: '₹1,26,000 - 1,30,000',
            image: 'https://cdn.bikedekho.com/processedimages/honda/cb-hornet-160r/source/cb-hornet-160r681da8339c93e.jpg?tr=w-360',
            specs: {
                engine: '184.4 cc',
                mileage: '50 kmpl',
                power: '17.26 PS'
            },
            badge: 'new',
            category: 'commuter',
            type: 'bike'
        },
        {
            id: 'tvs-apache-rtr-160',
            name: 'TVS Apache RTR 160',
            brand: 'tvs',
            price: '₹1,15,000 - 1,25,000',
            image: 'https://cdn.bikedekho.com/processedimages/tvs/apache-rtr-160/source/apache-rtr-160681da9d0c7e47.jpg?tr=w-360',
            specs: {
                engine: '159.7 cc',
                mileage: '45 kmpl',
                power: '15.8 PS'
            },
            badge: 'trending',
            category: 'sports',
            type: 'bike'
        },
        {
            id: 'royal-enfield-himalayan',
            name: 'Royal Enfield Himalayan',
            brand: 'royal-enfield',
            price: '₹2,15,000 - 2,25,000',
            image: 'https://cdn.bikedekho.com/processedimages/royal-enfield/himalayan/source/himalayan681da96d3c4e6.jpg?tr=w-360',
            specs: {
                engine: '411 cc',
                mileage: '30 kmpl',
                power: '24.3 PS'
            },
            badge: 'adventure',
            category: 'adventure',
            type: 'bike'
        },
        {
            id: 'honda-cb350rs',
            name: 'Honda CB350RS',
            brand: 'honda',
            price: '₹1,96,000 - 2,05,000',
            image: 'https://cdn.bikedekho.com/processedimages/honda/cb350rs/source/cb350rs681da834a72e0.jpg?tr=w-360',
            specs: {
                engine: '348.36 cc',
                mileage: '38 kmpl',
                power: '21.07 PS'
            },
            badge: 'new',
            category: 'cruiser',
            type: 'bike'
        },
        {
            id: 'suzuki-gixxer-250',
            name: 'Suzuki Gixxer 250',
            brand: 'suzuki',
            price: '₹1,70,000 - 1,80,000',
            image: 'https://cdn.bikedekho.com/processedimages/suzuki/gixxer-250/source/gixxer-250681da9ba7e7bb.jpg?tr=w-360',
            specs: {
                engine: '249 cc',
                mileage: '40 kmpl',
                power: '26.5 PS'
            },
            badge: 'trending',
            category: 'sports',
            type: 'bike'
        },
        {
            id: 'bajaj-avenger-cruise-220',
            name: 'Bajaj Avenger Cruise 220',
            brand: 'bajaj',
            price: '₹1,27,000 - 1,35,000',
            image: 'https://cdn.bikedekho.com/processedimages/bajaj/avenger-cruise-220/source/avenger-cruise-220681da98b9e4f8.jpg?tr=w-360',
            specs: {
                engine: '220 cc',
                mileage: '35 kmpl',
                power: '19 PS'
            },
            badge: 'bestseller',
            category: 'cruiser',
            type: 'bike'
        }
    ];
    
    // Combine main bikes with additional bikes
    allBikes = [...mainBikes, ...additionalBikes];
    filteredBikes = [...allBikes];
}

function setupFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
}

function setupViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            toggleView(view);
        });
    });
}

function setupPagination() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayBikes();
                updatePagination();
                scrollToResults();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredBikes.length / bikesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayBikes();
                updatePagination();
                scrollToResults();
            }
        });
    }
}

function applyFilters() {
    const brandFilter = document.getElementById('brand-filter')?.value;
    const priceFilter = document.getElementById('price-filter')?.value;
    const categoryFilter = document.getElementById('category-filter')?.value;
    const engineFilter = document.getElementById('engine-filter')?.value;
    const sortFilter = document.getElementById('sort-filter')?.value;
    
    filteredBikes = allBikes.filter(bike => {
        // Brand filter
        if (brandFilter && bike.brand !== brandFilter) return false;
        
        // Category filter
        if (categoryFilter && bike.category !== categoryFilter) return false;
        
        // Price filter
        if (priceFilter) {
            const priceRange = priceFilter.split('-');
            const bikePrice = extractPrice(bike.price);
            
            if (priceFilter === '1000000+') {
                if (bikePrice < 1000000) return false;
            } else {
                const minPrice = parseInt(priceRange[0]);
                const maxPrice = parseInt(priceRange[1]);
                if (bikePrice < minPrice || bikePrice > maxPrice) return false;
            }
        }
        
        // Engine filter
        if (engineFilter) {
            const engineSize = extractEngineSize(bike.specs.engine);
            const engineRange = engineFilter.split('-');
            
            if (engineFilter === '800+') {
                if (engineSize < 800) return false;
            } else {
                const minEngine = parseInt(engineRange[0]);
                const maxEngine = parseInt(engineRange[1]);
                if (engineSize < minEngine || engineSize > maxEngine) return false;
            }
        }
        
        return true;
    });
    
    // Apply sorting
    if (sortFilter) {
        sortBikes(sortFilter);
    }
    
    currentPage = 1;
    displayBikes();
    updateResultsCount();
    updatePagination();
}

function sortBikes(sortType) {
    switch (sortType) {
        case 'price-low':
            filteredBikes.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
            break;
        case 'price-high':
            filteredBikes.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
            break;
        case 'mileage':
            filteredBikes.sort((a, b) => extractMileage(b.specs.mileage) - extractMileage(a.specs.mileage));
            break;
        case 'power':
            filteredBikes.sort((a, b) => extractPower(b.specs.power) - extractPower(a.specs.power));
            break;
        case 'latest':
            filteredBikes.sort((a, b) => {
                const aIsNew = a.badge === 'new' || a.badge === 'latest';
                const bIsNew = b.badge === 'new' || b.badge === 'latest';
                return bIsNew - aIsNew;
            });
            break;
        default:
            // Popularity - keep original order
            break;
    }
}

function extractPrice(priceString) {
    const numbers = priceString.match(/[\d,]+/g);
    if (numbers && numbers.length > 0) {
        return parseInt(numbers[0].replace(/,/g, ''));
    }
    return 0;
}

function extractEngineSize(engineString) {
    const match = engineString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

function extractMileage(mileageString) {
    const match = mileageString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

function extractPower(powerString) {
    const match = powerString.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
}

function displayBikes() {
    const grid = document.getElementById('bikes-results');
    if (!grid) return;
    
    showLoadingState(grid);
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * bikesPerPage;
        const endIndex = startIndex + bikesPerPage;
        const bikesToShow = filteredBikes.slice(startIndex, endIndex);
        
        if (bikesToShow.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No bikes found</h3>
                    <p>Try adjusting your filters to see more results</p>
                    <button class="clear-filters-btn" onclick="clearAllFilters()">Clear All Filters</button>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = bikesToShow.map(bike => createNewBikeCard(bike)).join('');
        
        // Add scroll animations
        const bikeCards = grid.querySelectorAll('.bike-card');
        bikeCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
            
            // Trigger animation
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
        
        // Setup card interactions
        setupCardInteractions();
    }, 300);
}

function showLoadingState(grid) {
    grid.innerHTML = Array(bikesPerPage).fill().map(() => `
        <div class="bike-card loading-shimmer">
            <div class="bike-image" style="height: 220px; background: #f0f0f0;"></div>
            <div class="bike-card-info">
                <div style="height: 20px; background: #f0f0f0; margin-bottom: 8px; border-radius: 4px;"></div>
                <div style="height: 16px; background: #f0f0f0; margin-bottom: 12px; border-radius: 4px; width: 60%;"></div>
                <div style="height: 40px; background: #f0f0f0; margin-bottom: 16px; border-radius: 4px;"></div>
                <div style="height: 36px; background: #f0f0f0; border-radius: 4px;"></div>
            </div>
        </div>
    `).join('');
}

function createNewBikeCard(bike) {
    const badgeHtml = bike.badge ? `<div class="bike-badge ${bike.badge}">${bike.badge}</div>` : '';
    
    return `
        <div class="bike-card" data-bike-id="${bike.id}">
            <div class="bike-image">
                <img src="${bike.image}" alt="${bike.name}" loading="lazy" onerror="this.src='https://images.pexels.com/photos/163407/bike-wheel-tire-bike-wheel-163407.jpeg?auto=compress&cs=tinysrgb&w=360&h=220'">
                ${badgeHtml}
                <button class="wishlist-btn" onclick="toggleWishlist(this.closest('.bike-card'))">
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
                    <button class="offer-btn" onclick="viewBikeOffers('${bike.id}')">View Offers</button>
                    <button class="compare-btn" onclick="toggleComparison(this.closest('.bike-card'))">
                        <i class="fas fa-plus"></i>
                        Compare
                    </button>
                </div>
            </div>
        </div>
    `;
}

function setupCardInteractions() {
    // Handle bike card clicks
    document.querySelectorAll('.bike-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on buttons
            if (e.target.closest('button')) return;
            
            const bikeId = card.dataset.bikeId;
            if (bikeId) {
                showBikeDetails(bikeId);
            }
        });
    });
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.textContent = filteredBikes.length;
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredBikes.length / bikesPerPage);
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Update pagination numbers
    const paginationNumbers = document.querySelector('.pagination-numbers');
    if (paginationNumbers && totalPages > 1) {
        let numbersHTML = '';
        
        // Show page numbers
        for (let i = 1; i <= Math.min(totalPages, 5); i++) {
            numbersHTML += `<button class="pagination-number ${currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
        
        if (totalPages > 5) {
            numbersHTML += '<span class="pagination-dots">...</span>';
            numbersHTML += `<button class="pagination-number ${currentPage === totalPages ? 'active' : ''}" onclick="goToPage(${totalPages})">${totalPages}</button>`;
        }
        
        paginationNumbers.innerHTML = numbersHTML;
    }
}

function goToPage(page) {
    currentPage = page;
    displayBikes();
    updatePagination();
    scrollToResults();
}

function scrollToResults() {
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleView(view) {
    const grid = document.getElementById('bikes-results');
    if (!grid) return;
    
    if (view === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}

function clearAllFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.value = '';
    });
    
    filteredBikes = [...allBikes];
    currentPage = 1;
    displayBikes();
    updateResultsCount();
    updatePagination();
    
    if (typeof showToast === 'function') {
        showToast('All filters cleared', 'info');
    }
}

function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const brand = urlParams.get('brand');
    const model = urlParams.get('model');
    const query = urlParams.get('q');
    
    if (brand) {
        const brandFilter = document.getElementById('brand-filter');
        if (brandFilter) {
            brandFilter.value = brand;
        }
    }
    
    if (query) {
        // Filter bikes based on search query
        filteredBikes = allBikes.filter(bike => 
            bike.name.toLowerCase().includes(query.toLowerCase()) ||
            bike.brand.toLowerCase().includes(query.toLowerCase())
        );
        currentPage = 1;
        displayBikes();
        updateResultsCount();
        updatePagination();
    } else if (brand) {
        applyFilters();
    }
}

// Helper functions that might be called from other scripts
function viewBikeOffers(bikeId) {
    if (typeof showToast === 'function') {
        showToast('Viewing offers for selected bike', 'info');
    }
    // Add offer modal or redirect logic here
}

function showBikeDetails(bikeId) {
    if (typeof showLoadingOverlay === 'function') {
        showLoadingOverlay();
    }
    
    setTimeout(() => {
        if (typeof hideLoadingOverlay === 'function') {
            hideLoadingOverlay();
        }
        // Redirect to bike details page
        window.location.href = `bike-details.html?id=${bikeId}`;
    }, 800);
}

// Export functions for global access
window.goToPage = goToPage;
window.clearAllFilters = clearAllFilters;
window.viewBikeOffers = viewBikeOffers;
window.showBikeDetails = showBikeDetails;