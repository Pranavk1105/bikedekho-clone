// Cost Calculator page specific JavaScript

let calculationResults = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeCostCalculator();
});

function initializeCostCalculator() {
    setupCalculatorForm();
    setupFormValidation();
}

function setupCalculatorForm() {
    const calculateBtn = document.querySelector('.calculate-cost-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateOwnershipCost);
    }
    
    // Add input event listeners for real-time validation
    const inputs = document.querySelectorAll('#bike-price-calc, #fuel-efficiency, #monthly-distance, #fuel-price');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
    });
}

function setupFormValidation() {
    const form = document.querySelector('.calculator-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateOwnershipCost();
        });
    }
}

function validateInput(e) {
    const input = e.target;
    const value = parseFloat(input.value);
    
    // Remove any existing error styling
    input.classList.remove('error');
    
    // Validate based on input type
    if (input.id === 'bike-price-calc' && (value < 10000 || value > 10000000)) {
        input.classList.add('error');
    } else if (input.id === 'fuel-efficiency' && (value < 10 || value > 100)) {
        input.classList.add('error');
    } else if (input.id === 'monthly-distance' && (value < 100 || value > 10000)) {
        input.classList.add('error');
    } else if (input.id === 'fuel-price' && (value < 50 || value > 200)) {
        input.classList.add('error');
    }
}

function calculateOwnershipCost() {
    // Get input values
    const bikePrice = parseFloat(document.getElementById('bike-price-calc').value) || 0;
    const fuelEfficiency = parseFloat(document.getElementById('fuel-efficiency').value) || 0;
    const monthlyDistance = parseFloat(document.getElementById('monthly-distance').value) || 0;
    const fuelPrice = parseFloat(document.getElementById('fuel-price').value) || 0;
    const ownershipPeriod = parseFloat(document.getElementById('ownership-period').value) || 0;
    const insuranceType = document.getElementById('insurance-type').value;
    const cityType = document.getElementById('city-type').value;
    
    // Validate inputs
    if (!validateInputs(bikePrice, fuelEfficiency, monthlyDistance, fuelPrice, ownershipPeriod)) {
        return;
    }
    
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        
        // Calculate costs
        const results = performCostCalculation(
            bikePrice, fuelEfficiency, monthlyDistance, 
            fuelPrice, ownershipPeriod, insuranceType, cityType
        );
        
        calculationResults = results;
        displayResults(results);
        
        showToast('Cost calculation completed!', 'success');
    }, 1500);
}

function validateInputs(bikePrice, fuelEfficiency, monthlyDistance, fuelPrice, ownershipPeriod) {
    if (bikePrice <= 0) {
        showToast('Please enter a valid bike price', 'error');
        return false;
    }
    
    if (fuelEfficiency <= 0) {
        showToast('Please enter a valid fuel efficiency', 'error');
        return false;
    }
    
    if (monthlyDistance <= 0) {
        showToast('Please enter a valid monthly distance', 'error');
        return false;
    }
    
    if (fuelPrice <= 0) {
        showToast('Please enter a valid fuel price', 'error');
        return false;
    }
    
    if (ownershipPeriod <= 0) {
        showToast('Please select an ownership period', 'error');
        return false;
    }
    
    return true;
}

function performCostCalculation(bikePrice, fuelEfficiency, monthlyDistance, fuelPrice, ownershipPeriod, insuranceType, cityType) {
    const totalMonths = ownershipPeriod * 12;
    const totalDistance = monthlyDistance * totalMonths;
    
    // Calculate individual costs
    const purchaseCost = bikePrice;
    
    // Fuel cost calculation
    const totalFuelNeeded = totalDistance / fuelEfficiency;
    const fuelCost = totalFuelNeeded * fuelPrice;
    
    // Insurance cost calculation
    const annualInsuranceCost = calculateInsuranceCost(bikePrice, insuranceType);
    const insuranceCost = annualInsuranceCost * ownershipPeriod;
    
    // Maintenance cost calculation
    const maintenanceCost = calculateMaintenanceCost(bikePrice, totalDistance, cityType);
    
    // Registration and tax calculation
    const registrationCost = calculateRegistrationCost(bikePrice, cityType);
    
    // Depreciation calculation
    const depreciationCost = calculateDepreciation(bikePrice, ownershipPeriod);
    
    // Total cost calculation
    const totalCost = purchaseCost + fuelCost + insuranceCost + maintenanceCost + registrationCost - depreciationCost;
    const monthlyCost = totalCost / totalMonths;
    
    return {
        totalCost,
        monthlyCost,
        breakdown: {
            purchase: purchaseCost,
            fuel: fuelCost,
            insurance: insuranceCost,
            maintenance: maintenanceCost,
            registration: registrationCost,
            depreciation: depreciationCost
        },
        details: {
            totalDistance,
            totalFuelNeeded: totalFuelNeeded.toFixed(2),
            ownershipPeriod,
            monthlyDistance
        }
    };
}

function calculateInsuranceCost(bikePrice, insuranceType) {
    const baseRate = insuranceType === 'comprehensive' ? 0.03 : 0.015;
    return bikePrice * baseRate;
}

function calculateMaintenanceCost(bikePrice, totalDistance, cityType) {
    // Base maintenance cost per km
    let costPerKm = 0.5;
    
    // Adjust based on city type
    switch (cityType) {
        case 'metro':
            costPerKm *= 1.3;
            break;
        case 'tier1':
            costPerKm *= 1.1;
            break;
        case 'tier2':
            costPerKm *= 0.9;
            break;
        case 'tier3':
            costPerKm *= 0.8;
            break;
    }
    
    // Adjust based on bike price (premium bikes cost more to maintain)
    if (bikePrice > 300000) {
        costPerKm *= 1.5;
    } else if (bikePrice > 150000) {
        costPerKm *= 1.2;
    }
    
    return totalDistance * costPerKm;
}

function calculateRegistrationCost(bikePrice, cityType) {
    // Base registration cost
    let baseCost = bikePrice * 0.08; // 8% of bike price
    
    // Adjust based on city type
    switch (cityType) {
        case 'metro':
            baseCost *= 1.2;
            break;
        case 'tier1':
            baseCost *= 1.1;
            break;
        case 'tier2':
            baseCost *= 0.95;
            break;
        case 'tier3':
            baseCost *= 0.9;
            break;
    }
    
    return baseCost;
}

function calculateDepreciation(bikePrice, ownershipPeriod) {
    // Depreciation rate: 15% first year, 10% subsequent years
    let depreciatedValue = bikePrice;
    
    for (let year = 1; year <= ownershipPeriod; year++) {
        const depreciationRate = year === 1 ? 0.15 : 0.10;
        depreciatedValue *= (1 - depreciationRate);
    }
    
    return bikePrice - depreciatedValue;
}

function displayResults(results) {
    const resultsContainer = document.getElementById('calculator-results');
    if (!resultsContainer) return;
    
    resultsContainer.style.display = 'block';
    
    // Update summary
    document.getElementById('total-cost').textContent = `₹${Math.round(results.totalCost).toLocaleString()}`;
    document.getElementById('monthly-cost').textContent = `₹${Math.round(results.monthlyCost).toLocaleString()}`;
    
    // Update breakdown
    document.getElementById('purchase-cost').textContent = `₹${Math.round(results.breakdown.purchase).toLocaleString()}`;
    document.getElementById('fuel-cost').textContent = `₹${Math.round(results.breakdown.fuel).toLocaleString()}`;
    document.getElementById('insurance-cost').textContent = `₹${Math.round(results.breakdown.insurance).toLocaleString()}`;
    document.getElementById('maintenance-cost').textContent = `₹${Math.round(results.breakdown.maintenance).toLocaleString()}`;
    document.getElementById('registration-cost').textContent = `₹${Math.round(results.breakdown.registration).toLocaleString()}`;
    document.getElementById('depreciation-cost').textContent = `₹${Math.round(results.breakdown.depreciation).toLocaleString()}`;
    
    // Create cost distribution chart
    createCostChart(results.breakdown);
    
    // Update tips based on results
    updateCostTips(results);
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function createCostChart(breakdown) {
    const canvas = document.getElementById('cost-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Calculate percentages
    const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
    const data = [
        { label: 'Purchase', value: breakdown.purchase, color: '#E74C3C' },
        { label: 'Fuel', value: breakdown.fuel, color: '#3498DB' },
        { label: 'Insurance', value: breakdown.insurance, color: '#2ECC71' },
        { label: 'Maintenance', value: breakdown.maintenance, color: '#F39C12' },
        { label: 'Registration', value: breakdown.registration, color: '#9B59B6' },
        { label: 'Depreciation', value: breakdown.depreciation, color: '#95A5A6' }
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pie chart
    let currentAngle = -Math.PI / 2;
    
    data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

function updateCostTips(results) {
    const tipsList = document.querySelector('.tips-list');
    if (!tipsList) return;
    
    const tips = [];
    
    // Fuel efficiency tip
    if (results.breakdown.fuel > results.totalCost * 0.3) {
        tips.push('Consider a more fuel-efficient bike to reduce fuel costs');
    } else {
        tips.push('Your fuel costs are well optimized');
    }
    
    // Maintenance tip
    if (results.breakdown.maintenance > results.totalCost * 0.2) {
        tips.push('Regular servicing can help reduce long-term maintenance costs');
    } else {
        tips.push('Your maintenance costs are reasonable');
    }
    
    // Insurance tip
    tips.push('Compare insurance quotes annually to get the best rates');
    
    // General tip
    tips.push('Consider buying during festival seasons for better deals');
    
    tipsList.innerHTML = tips.map(tip => `
        <li>
            <i class="fas fa-lightbulb"></i>
            ${tip}
        </li>
    `).join('');
}

// Export functions for global access
window.calculateOwnershipCost = calculateOwnershipCost;

// Add CSS for error styling
const style = document.createElement('style');
style.textContent = `
    .form-group input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .cost-chart canvas {
        max-width: 100%;
        height: auto;
    }
    
    @media (max-width: 768px) {
        .cost-chart canvas {
            width: 300px;
            height: 150px;
        }
    }
`;
document.head.appendChild(style);