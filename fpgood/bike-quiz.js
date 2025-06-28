// Bike Quiz page specific JavaScript

let currentQuestionIndex = 0;
let quizAnswers = {};
let quizQuestions = [];

// Quiz questions data
const quizQuestionsData = [
    {
        id: 'usage',
        title: 'What will you primarily use your bike for?',
        options: [
            {
                id: 'daily-commute',
                icon: 'fas fa-briefcase',
                title: 'Daily Commuting',
                description: 'Office, college, daily travel'
            },
            {
                id: 'weekend-rides',
                icon: 'fas fa-mountain',
                title: 'Weekend Rides',
                description: 'Leisure trips, touring'
            },
            {
                id: 'sports-racing',
                icon: 'fas fa-flag-checkered',
                title: 'Sports & Racing',
                description: 'Track days, performance riding'
            },
            {
                id: 'mixed-usage',
                icon: 'fas fa-road',
                title: 'Mixed Usage',
                description: 'Combination of all above'
            }
        ]
    },
    {
        id: 'budget',
        title: 'What is your budget range?',
        options: [
            {
                id: 'under-1-lakh',
                icon: 'fas fa-coins',
                title: 'Under ₹1 Lakh',
                description: 'Budget-friendly options'
            },
            {
                id: '1-2-lakh',
                icon: 'fas fa-money-bill-wave',
                title: '₹1 - 2 Lakh',
                description: 'Mid-range bikes'
            },
            {
                id: '2-5-lakh',
                icon: 'fas fa-credit-card',
                title: '₹2 - 5 Lakh',
                description: 'Premium segment'
            },
            {
                id: 'above-5-lakh',
                icon: 'fas fa-gem',
                title: 'Above ₹5 Lakh',
                description: 'Luxury & superbikes'
            }
        ]
    },
    {
        id: 'experience',
        title: 'What is your riding experience?',
        options: [
            {
                id: 'beginner',
                icon: 'fas fa-seedling',
                title: 'Beginner',
                description: 'New to riding'
            },
            {
                id: 'intermediate',
                icon: 'fas fa-user',
                title: 'Intermediate',
                description: '1-3 years experience'
            },
            {
                id: 'experienced',
                icon: 'fas fa-user-graduate',
                title: 'Experienced',
                description: '3+ years experience'
            },
            {
                id: 'expert',
                icon: 'fas fa-crown',
                title: 'Expert',
                description: 'Professional level'
            }
        ]
    },
    {
        id: 'terrain',
        title: 'What type of roads do you mostly ride on?',
        options: [
            {
                id: 'city-roads',
                icon: 'fas fa-city',
                title: 'City Roads',
                description: 'Urban, traffic-heavy areas'
            },
            {
                id: 'highways',
                icon: 'fas fa-road',
                title: 'Highways',
                description: 'Long distance, high speed'
            },
            {
                id: 'mixed-terrain',
                icon: 'fas fa-map',
                title: 'Mixed Terrain',
                description: 'City + highway combination'
            },
            {
                id: 'off-road',
                icon: 'fas fa-mountain',
                title: 'Off-road',
                description: 'Adventure, rough terrain'
            }
        ]
    },
    {
        id: 'fuel-priority',
        title: 'How important is fuel efficiency to you?',
        options: [
            {
                id: 'very-important',
                icon: 'fas fa-leaf',
                title: 'Very Important',
                description: 'Top priority for savings'
            },
            {
                id: 'important',
                icon: 'fas fa-balance-scale',
                title: 'Important',
                description: 'Balance of efficiency & performance'
            },
            {
                id: 'not-important',
                icon: 'fas fa-tachometer-alt',
                title: 'Not Important',
                description: 'Performance over efficiency'
            }
        ]
    },
    {
        id: 'bike-type',
        title: 'What type of bike interests you most?',
        options: [
            {
                id: 'scooter',
                icon: 'fas fa-motorcycle',
                title: 'Scooter',
                description: 'Automatic, easy to ride'
            },
            {
                id: 'commuter',
                icon: 'fas fa-bicycle',
                title: 'Commuter Bike',
                description: 'Practical, fuel efficient'
            },
            {
                id: 'sports',
                icon: 'fas fa-rocket',
                title: 'Sports Bike',
                description: 'High performance, speed'
            },
            {
                id: 'cruiser',
                icon: 'fas fa-route',
                title: 'Cruiser',
                description: 'Comfortable, touring'
            }
        ]
    },
    {
        id: 'features',
        title: 'Which features are most important to you?',
        options: [
            {
                id: 'basic-features',
                icon: 'fas fa-cog',
                title: 'Basic Features',
                description: 'Simple, reliable functionality'
            },
            {
                id: 'comfort-features',
                icon: 'fas fa-couch',
                title: 'Comfort Features',
                description: 'Comfortable seating, smooth ride'
            },
            {
                id: 'tech-features',
                icon: 'fas fa-mobile-alt',
                title: 'Technology Features',
                description: 'Digital display, connectivity'
            },
            {
                id: 'safety-features',
                icon: 'fas fa-shield-alt',
                title: 'Safety Features',
                description: 'ABS, advanced braking'
            }
        ]
    },
    {
        id: 'brand-preference',
        title: 'Do you have any brand preference?',
        options: [
            {
                id: 'indian-brands',
                icon: 'fas fa-flag',
                title: 'Indian Brands',
                description: 'Hero, Bajaj, TVS'
            },
            {
                id: 'japanese-brands',
                icon: 'fas fa-torii-gate',
                title: 'Japanese Brands',
                description: 'Honda, Yamaha, Suzuki'
            },
            {
                id: 'european-brands',
                icon: 'fas fa-crown',
                title: 'European Brands',
                description: 'KTM, BMW, Triumph'
            },
            {
                id: 'no-preference',
                icon: 'fas fa-globe',
                title: 'No Preference',
                description: 'Open to all brands'
            }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

function initializeQuiz() {
    quizQuestions = quizQuestionsData;
    currentQuestionIndex = 0;
    quizAnswers = {};
    
    displayCurrentQuestion();
    updateProgress();
}

function displayCurrentQuestion() {
    const quizCard = document.getElementById('quiz-card');
    const question = quizQuestions[currentQuestionIndex];
    
    if (!question) {
        showQuizResults();
        return;
    }
    
    quizCard.innerHTML = `
        <h2 class="question-title">${question.title}</h2>
        <div class="question-options">
            ${question.options.map(option => `
                <div class="option-card" data-option-id="${option.id}">
                    <div class="option-icon">
                        <i class="${option.icon}"></i>
                    </div>
                    <h3 class="option-title">${option.title}</h3>
                    <p class="option-description">${option.description}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add click listeners to options
    const optionCards = quizCard.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            selectOption(card);
        });
    });
    
    updateNavigationButtons();
}

function selectOption(selectedCard) {
    const question = quizQuestions[currentQuestionIndex];
    const optionId = selectedCard.dataset.optionId;
    
    // Remove selection from all options
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => card.classList.remove('selected'));
    
    // Add selection to clicked option
    selectedCard.classList.add('selected');
    
    // Store answer
    quizAnswers[question.id] = optionId;
    
    // Enable next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
        updateProgress();
    } else {
        showQuizResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (currentQuestionSpan) {
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
    }
    
    if (totalQuestionsSpan) {
        totalQuestionsSpan.textContent = quizQuestions.length;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (nextBtn) {
        const hasAnswer = quizQuestions[currentQuestionIndex].id in quizAnswers;
        nextBtn.disabled = !hasAnswer;
        
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.innerHTML = 'Show Results <i class="fas fa-flag-checkered"></i>';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }
}

function showQuizResults() {
    const quizContainer = document.querySelector('.quiz-container');
    const quizResults = document.getElementById('quiz-results');
    
    if (quizContainer) {
        quizContainer.style.display = 'none';
    }
    
    if (quizResults) {
        quizResults.style.display = 'block';
    }
    
    // Generate recommendations based on answers
    const recommendations = generateRecommendations();
    displayRecommendations(recommendations);
}

function generateRecommendations() {
    const recommendations = [];
    
    // Simple recommendation logic based on answers
    const usage = quizAnswers.usage;
    const budget = quizAnswers.budget;
    const experience = quizAnswers.experience;
    const bikeType = quizAnswers['bike-type'];
    
    // Get bikes from database based on preferences
    let candidateBikes = [];
    
    // Add bikes based on type preference
    if (bikeType === 'scooter') {
        candidateBikes = [...bikeDatabase.scooters];
    } else if (bikeType === 'sports') {
        candidateBikes = [...bikeDatabase.sports];
    } else if (bikeType === 'commuter') {
        candidateBikes = [...bikeDatabase.commuter];
    } else {
        // Mix of all types
        candidateBikes = [
            ...bikeDatabase.commuter.slice(0, 2),
            ...bikeDatabase.sports.slice(0, 1),
            ...bikeDatabase.scooters.slice(0, 1)
        ];
    }
    
    // Filter by budget (simplified)
    candidateBikes = candidateBikes.filter(bike => {
        const price = extractPrice(bike.price);
        
        switch (budget) {
            case 'under-1-lakh':
                return price < 100000;
            case '1-2-lakh':
                return price >= 100000 && price < 200000;
            case '2-5-lakh':
                return price >= 200000 && price < 500000;
            case 'above-5-lakh':
                return price >= 500000;
            default:
                return true;
        }
    });
    
    // If no bikes match budget, show some default recommendations
    if (candidateBikes.length === 0) {
        candidateBikes = [
            bikeDatabase.commuter[0],
            bikeDatabase.scooters[0],
            bikeDatabase.sports[0]
        ].filter(Boolean);
    }
    
    // Limit to top 3 recommendations
    return candidateBikes.slice(0, 3).map((bike, index) => ({
        ...bike,
        matchPercentage: 95 - (index * 5), // Simulated match percentage
        reasons: generateMatchReasons(bike, quizAnswers)
    }));
}

function generateMatchReasons(bike, answers) {
    const reasons = [];
    
    if (answers.usage === 'daily-commute' && bike.category === 'commuter') {
        reasons.push('Perfect for daily commuting');
    }
    
    if (answers['fuel-priority'] === 'very-important') {
        const mileage = extractMileage(bike.specs.mileage);
        if (mileage > 50) {
            reasons.push('Excellent fuel efficiency');
        }
    }
    
    if (answers.experience === 'beginner' && (bike.category === 'commuter' || bike.category === 'scooter')) {
        reasons.push('Beginner-friendly');
    }
    
    if (answers['bike-type'] === bike.category) {
        reasons.push('Matches your preferred bike type');
    }
    
    if (reasons.length === 0) {
        reasons.push('Good overall value', 'Reliable performance');
    }
    
    return reasons.slice(0, 3); // Limit to 3 reasons
}

function displayRecommendations(recommendations) {
    const recommendedBikesContainer = document.getElementById('recommended-bikes');
    
    if (!recommendedBikesContainer) return;
    
    recommendedBikesContainer.innerHTML = recommendations.map((bike, index) => `
        <div class="bike-card recommended-bike" data-bike-id="${bike.id}">
            <div class="recommendation-badge">
                <span class="match-percentage">${bike.matchPercentage}% Match</span>
                <span class="recommendation-rank">#${index + 1} Recommended</span>
            </div>
            <div class="bike-image">
                <img src="${bike.image}" alt="${bike.name}" loading="lazy">
                ${bike.badge ? `<div class="bike-badge ${bike.badge}">${bike.badge}</div>` : ''}
            </div>
            <div class="bike-card-info">
                <h3 class="bike-card-name">${bike.name}</h3>
                <p class="bike-price">${bike.price}*</p>
                <div class="bike-specs">
                    <span class="spec">${bike.specs.engine}</span>
                    <span class="spec">${bike.specs.mileage}</span>
                    <span class="spec">${bike.specs.power}</span>
                </div>
                <div class="match-reasons">
                    <h4>Why this bike?</h4>
                    <ul>
                        ${bike.reasons.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
                <div class="bike-actions">
                    <button class="offer-btn" onclick="showBikeDetails('${bike.id}')">View Details</button>
                    <button class="compare-btn">
                        <i class="fas fa-plus"></i>
                        Compare
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    quizAnswers = {};
    
    const quizContainer = document.querySelector('.quiz-container');
    const quizResults = document.getElementById('quiz-results');
    
    if (quizContainer) {
        quizContainer.style.display = 'block';
    }
    
    if (quizResults) {
        quizResults.style.display = 'none';
    }
    
    displayCurrentQuestion();
    updateProgress();
}

function extractPrice(priceString) {
    const numbers = priceString.match(/[\d,]+/g);
    if (numbers && numbers.length > 0) {
        return parseInt(numbers[0].replace(/,/g, ''));
    }
    return 0;
}

function extractMileage(mileageString) {
    const match = mileageString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Export functions for global access
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.restartQuiz = restartQuiz;

// Add CSS for quiz-specific styles
const style = document.createElement('style');
style.textContent = `
    .recommended-bike {
        position: relative;
        border: 2px solid #E74C3C;
        background: linear-gradient(135deg, #fef2f2, #ffffff);
    }
    
    .recommendation-badge {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        color: white;
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        z-index: 10;
    }
    
    .match-percentage {
        font-size: 14px;
    }
    
    .recommendation-rank {
        font-size: 11px;
        opacity: 0.9;
    }
    
    .recommended-bike .bike-image {
        margin-top: 32px;
    }
    
    .match-reasons {
        margin: 16px 0;
        padding: 16px;
        background: #f0fdf4;
        border-radius: 8px;
        border-left: 4px solid #10b981;
    }
    
    .match-reasons h4 {
        font-size: 14px;
        font-weight: 600;
        color: #065f46;
        margin-bottom: 8px;
    }
    
    .match-reasons ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .match-reasons li {
        font-size: 13px;
        color: #047857;
        margin-bottom: 4px;
        position: relative;
        padding-left: 16px;
    }
    
    .match-reasons li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #10b981;
        font-weight: bold;
    }
`;
document.head.appendChild(style);