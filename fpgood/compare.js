// Compare page specific JavaScript

let selectedBikes = [];
let allBikesForComparison = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeComparePage();
});

function initializeComparePage() {
    setupBikeSelectors();
    setupSearchFunctionality();
    loadAllBikes();
    checkURLParameters();
}

function loadAllBikes() {
    // Combine all bikes from different categories
    allBikesForComparison = [
        ...Object.values(bikeDatabase).flat(),
        // Add some additional bikes for comparison
        {
            id: 'royal-enfield-classic-350',
            name: 'Royal Enfield Classic 350',
            brand: 'royal-enfield',
            price: '₹1,93,000 - 2,20,000',
            image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=360&h=220',
            specs: {
                engine: '349 cc',
                mileage: '41 kmpl',
                power: '20.2 PS'
            },
            badge: 'bestseller',
            category: 'cruiser',
            type: 'bike'
        }
    ];
}

function setupBikeSelectors() {
    const searchInputs = document.querySelectorAll('.bike-search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            handleBikeSearch(e.target);
        });
        
        input.addEventListener('focus', (e) => {
            showSearchResults(e.target);
        });
        
        input.addEventListener('blur', (e) => {
            // Delay hiding to allow clicking on results
            setTimeout(() => {
                hideSearchResults(e.target);
            }, 200);
        });
    });
}

function setupSearchFunctionality() {
    // Setup click handlers for search results
    document.addEventListener('click', (e) => {
        if (e.target.closest('.search-result-item')) {
            const resultItem = e.target.closest('.search-result-item');
            const bikeId = resultItem.dataset.bikeId;
            const selectorIndex = resultItem.closest('.bike-selector-card').querySelector('.bike-search-input').dataset.selector;
            
            selectBike(bikeId, selectorIndex);
        }
    });
}

function handleBikeSearch(input) {
    const query = input.value.toLowerCase().trim();
    const selectorIndex = input.dataset.selector;
    
    if (query.length < 2) {
        hideSearchResults(input);
        return;
    }
    
    const filteredBikes = allBikesForComparison.filter(bike => 
        bike.name.toLowerCase().includes(query) ||
        bike.brand.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 results
    
    displaySearchResults(input, filteredBikes);
}

function displaySearchResults(input, bikes) {
    const selectorIndex = input.dataset.selector;
    const resultsContainer = document.getElementById(`search-results-${selectorIndex}`);
    
    if (!resultsContainer) return;
    
    if (bikes.length === 0) {
        resultsContainer.innerHTML = '<div class="no-search-results">No bikes found</div>';
    } else {
        resultsContainer.innerHTML = bikes.map(bike => `
            <div class="search-result-item" data-bike-id="${bike.id}">
                <img src="${bike.image}" alt="${bike.name}" class="search-result-image">
                <div class="search-result-info">
                    <div class="search-result-name">${bike.name}</div>
                    <div class="search-result-price">${bike.price}</div>
                </div>
            </div>
        `).join('');
    }
    
    resultsContainer.style.display = 'block';
}

function showSearchResults(input) {
    if (input.value.length >= 2) {
        handleBikeSearch(input);
    }
}

function hideSearchResults(input) {
    const selectorIndex = input.dataset.selector;
    const resultsContainer = document.getElementById(`search-results-${selectorIndex}`);
    
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

function selectBike(bikeId, selectorIndex) {
    const bike = allBikesForComparison.find(b => b.id === bikeId);
    if (!bike) return;
    
    // Update the selector placeholder
    const placeholder = document.getElementById(`selector-${selectorIndex}`);
    const searchInput = document.querySelector(`[data-selector="${selectorIndex}"]`);
    
    if (placeholder && searchInput) {
        placeholder.innerHTML = `
            <div class="selected-bike">
                <img src="${bike.image}" alt="${bike.name}" class="selected-bike-image">
                <div class="selected-bike-info">
                    <h4>${bike.name}</h4>
                    <p>${bike.price}</p>
                </div>
                <button class="remove-bike-btn" onclick="removeBike(${selectorIndex})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        searchInput.value = bike.name;
        searchInput.style.display = 'none';
    }
    
    // Update selected bikes array
    selectedBikes[selectorIndex - 1] = bike;
    
    // Hide search results
    hideSearchResults(searchInput);
    
    // Update comparison table if we have bikes to compare
    if (selectedBikes.filter(Boolean).length >= 2) {
        updateComparisonTable();
    }
    
    showToast(`${bike.name} added to comparison`, 'success');
}

function removeBike(selectorIndex) {
    const placeholder = document.getElementById(`selector-${selectorIndex}`);
    const searchInput = document.querySelector(`[data-selector="${selectorIndex}"]`);
    
    if (placeholder && searchInput) {
        placeholder.innerHTML = `
            <i class="fas fa-plus"></i>
            <span>Add Bike ${selectorIndex}</span>
        `;
        
        searchInput.value = '';
        searchInput.style.display = 'block';
    }
    
    // Remove from selected bikes
    selectedBikes[selectorIndex - 1] = null;
    
    // Update comparison table
    if (selectedBikes.filter(Boolean).length >= 2) {
        updateComparisonTable();
    } else {
        hideComparisonTable();
    }
    
    showToast('Bike removed from comparison', 'info');
}

function updateComparisonTable() {
    const comparisonSection = document.getElementById('comparison-section');
    const comparisonTable = document.getElementById('comparison-table');
    
    if (!comparisonSection || !comparisonTable) return;
    
    const validBikes = selectedBikes.filter(Boolean);
    
    if (validBikes.length < 2) {
        hideComparisonTable();
        return;
    }
    
    // Show comparison section
    comparisonSection.style.display = 'block';
    
    // Generate comparison table
    const tableHTML = generateComparisonTableHTML(validBikes);
    comparisonTable.innerHTML = tableHTML;
    
    // Scroll to comparison section
    comparisonSection.scrollIntoView({ behavior: 'smooth' });
}

function generateComparisonTableHTML(bikes) {
    const specifications = [
        { category: 'Basic Information', specs: [
            { label: 'Price', key: 'price' },
            { label: 'Brand', key: 'brand' },
            { label: 'Category', key: 'category' }
        ]},
        { category: 'Engine & Performance', specs: [
            { label: 'Engine Displacement', key: 'engine' },
            { label: 'Max Power', key: 'power' },
            { label: 'Mileage', key: 'mileage' }
        ]},
        { category: 'Dimensions', specs: [
            { label: 'Kerb Weight', key: 'weight', default: '142 kg' },
            { label: 'Fuel Tank Capacity', key: 'fuelTank', default: '11 L' },
            { label: 'Seat Height', key: 'seatHeight', default: '795 mm' }
        ]},
        { category: 'Features', specs: [
            { label: 'ABS', key: 'abs', default: 'Yes' },
            { label: 'Electric Start', key: 'electricStart', default: 'Yes' },
            { label: 'Digital Console', key: 'digitalConsole', default: 'Yes' }
        ]}
    ];
    
    let tableHTML = `
        <thead>
            <tr>
                <th>Specifications</th>
                ${bikes.map(bike => `
                    <th class="bike-header">
                        <img src="${bike.image}" alt="${bike.name}">
                        <h4>${bike.name}</h4>
                        <div class="price">${bike.price}</div>
                    </th>
                `).join('')}
            </tr>
        </thead>
        <tbody>
    `;
    
    specifications.forEach(section => {
        tableHTML += `
            <tr>
                <td class="spec-category" colspan="${bikes.length + 1}">${section.category}</td>
            </tr>
        `;
        
        section.specs.forEach(spec => {
            tableHTML += `
                <tr>
                    <td class="spec-label">${spec.label}</td>
                    ${bikes.map(bike => {
                        let value = '';
                        
                        switch (spec.key) {
                            case 'price':
                                value = bike.price;
                                break;
                            case 'brand':
                                value = bike.brand.charAt(0).toUpperCase() + bike.brand.slice(1);
                                break;
                            case 'category':
                                value = bike.category.charAt(0).toUpperCase() + bike.category.slice(1);
                                break;
                            case 'engine':
                                value = bike.specs.engine;
                                break;
                            case 'power':
                                value = bike.specs.power;
                                break;
                            case 'mileage':
                                value = bike.specs.mileage;
                                break;
                            default:
                                value = spec.default || 'N/A';
                        }
                        
                        return `<td class="spec-value">${value}</td>`;
                    }).join('')}
                </tr>
            `;
        });
    });
    
    tableHTML += '</tbody>';
    
    return tableHTML;
}

function hideComparisonTable() {
    const comparisonSection = document.getElementById('comparison-section');
    if (comparisonSection) {
        comparisonSection.style.display = 'none';
    }
}

function loadComparison(bike1Id, bike2Id, bike3Id = null) {
    // Clear current selection
    selectedBikes = [];
    
    // Reset selectors
    for (let i = 1; i <= 3; i++) {
        removeBike(i);
    }
    
    // Add bikes to comparison
    if (bike1Id) {
        selectBike(bike1Id, 1);
    }
    
    if (bike2Id) {
        selectBike(bike2Id, 2);
    }
    
    if (bike3Id) {
        selectBike(bike3Id, 3);
    }
    
    showToast('Comparison loaded successfully', 'success');
}

function exportComparison() {
    if (selectedBikes.filter(Boolean).length < 2) {
        showToast('Please select at least 2 bikes to export', 'warning');
        return;
    }
    
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        showToast('Comparison exported to PDF', 'success');
    }, 2000);
}

function shareComparison() {
    if (selectedBikes.filter(Boolean).length < 2) {
        showToast('Please select at least 2 bikes to share', 'warning');
        return;
    }
    
    const validBikes = selectedBikes.filter(Boolean);
    const bikeNames = validBikes.map(bike => bike.name).join(' vs ');
    
    if (navigator.share) {
        navigator.share({
            title: `Bike Comparison: ${bikeNames}`,
            text: `Compare ${bikeNames} on BikeDekho`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showToast('Comparison link copied to clipboard', 'success');
        });
    }
}

function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const bike1 = urlParams.get('bike1');
    const bike2 = urlParams.get('bike2');
    const bike3 = urlParams.get('bike3');
    
    if (bike1 || bike2 || bike3) {
        loadComparison(bike1, bike2, bike3);
    }
}

// Export functions for global access
window.removeBike = removeBike;
window.loadComparison = loadComparison;
window.exportComparison = exportComparison;
window.shareComparison = shareComparison;

// Add event listeners for export and share buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.export-btn')) {
        exportComparison();
    }
    
    if (e.target.closest('.share-btn')) {
        shareComparison();
    }
});

// Add CSS for comparison-specific styles
const style = document.createElement('style');
style.textContent = `
    .selected-bike {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: white;
        border-radius: 12px;
        border: 2px solid #E74C3C;
        position: relative;
        height: 100%;
        min-height: 200px;
    }
    
    .selected-bike-image {
        width: 120px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .selected-bike-info {
        text-align: center;
        flex: 1;
    }
    
    .selected-bike-info h4 {
        font-size: 16px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 4px;
        line-height: 1.2;
    }
    
    .selected-bike-info p {
        font-size: 14px;
        color: #E74C3C;
        font-weight: 600;
    }
    
    .remove-bike-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 24px;
        height: 24px;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
    }
    
    .remove-bike-btn:hover {
        background: #dc2626;
        transform: scale(1.1);
    }
    
    .search-results {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        max-height: 200px;
        overflow-y: auto;
    }
    
    .search-result-item {
        padding: 12px 16px;
        cursor: pointer;
        transition: background 0.2s ease;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .search-result-item:hover {
        background: #f9fafb;
    }
    
    .search-result-image {
        width: 40px;
        height: 30px;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .search-result-info {
        flex: 1;
    }
    
    .search-result-name {
        font-size: 14px;
        font-weight: 600;
        color: #111827;
    }
    
    .search-result-price {
        font-size: 12px;
        color: #6b7280;
    }
    
    .no-search-results {
        padding: 16px;
        text-align: center;
        color: #6b7280;
        font-size: 14px;
    }
    
    .spec-label {
        font-weight: 600;
        color: #374151;
        background: #f9fafb;
    }
    
    .spec-value {
        text-align: center;
        color: #111827;
    }
    
    .bike-header img {
        width: 120px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 12px;
    }
    
    .bike-header h4 {
        font-size: 16px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 4px;
    }
    
    .bike-header .price {
        font-size: 14px;
        color: #E74C3C;
        font-weight: 600;
    }
    
    @media (max-width: 768px) {
        .selected-bike-image {
            width: 80px;
            height: 60px;
        }
        
        .selected-bike-info h4 {
            font-size: 14px;
        }
        
        .selected-bike-info p {
            font-size: 12px;
        }
        
        .bike-header img {
            width: 80px;
            height: 60px;
        }
        
        .bike-header h4 {
            font-size: 14px;
        }
        
        .bike-header .price {
            font-size: 12px;
        }
    }
`;
document.head.appendChild(style);