// ==========================================
// 1. HEADER SCROLL EFFECT
// ==========================================
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('shadow-lg', 'py-1');
        header.classList.remove('py-0');
    } else {
        header.classList.remove('shadow-lg', 'py-1');
    }
});


// ==========================================
// 2. MOBILE MENU HAMBURGER LOGIC
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        mobileMenu.classList.add('hidden');
        burgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        mobileMenu.classList.remove('hidden');
        burgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        burgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});


// ==========================================
// 3. ACCORDION LOGIC FOR FORDERUNGEN
// ==========================================
function toggleAccordion(button) {
    const accordionItem = button.parentElement;
    const content = button.nextElementSibling;
    const arrow = button.querySelector('svg');
    const container = document.getElementById('forderungen-container');
    
    // Close other open accordions
    const allItems = container.querySelectorAll('[data-accordion]');
    allItems.forEach(item => {
        if (item !== accordionItem) {
            item.setAttribute('data-accordion', 'close');
            const otherContent = item.querySelector('div');
            otherContent.style.maxHeight = null;
            const otherArrow = item.querySelector('button svg');
            if (otherArrow) otherArrow.classList.remove('rotate-180');
        }
    });

    // Toggle current
    const isClosed = accordionItem.getAttribute('data-accordion') === 'close';
    if (isClosed) {
        accordionItem.setAttribute('data-accordion', 'open');
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.classList.add('rotate-180');
    } else {
        accordionItem.setAttribute('data-accordion', 'close');
        content.style.maxHeight = null;
        arrow.classList.remove('rotate-180');
    }
}


// ==========================================
// 4. TAB CONTROLLER FOR HINTERGRÜNDE
// ==========================================
function switchTab(button, tabId) {
    const tabList = button.parentElement;
    const allButtons = tabList.querySelectorAll('button');
    const contentPanel = document.getElementById('tab-content-panel');
    const allPanels = contentPanel.children;

    // Reset buttons
    allButtons.forEach(btn => {
        btn.classList.remove('active-tab');
        btn.classList.add('text-slate-500');
    });

    // Set active button
    button.classList.add('active-tab');
    button.classList.remove('text-slate-500');

    // Show panel
    for (let panel of allPanels) {
        if (panel.id === tabId) {
            panel.classList.remove('hidden');
            // Add a small fade-in animation
            panel.classList.add('animate-[fadeIn_0.3s_ease-out]');
        } else {
            panel.classList.add('hidden');
            panel.classList.remove('animate-[fadeIn_0.3s_ease-out]');
        }
    }
}


// ==========================================
// 5. INTERAKTIVER MIET-CHECK CALCULATOR
// ==========================================
function calculateRent() {
    const comparisonInput = document.getElementById('comparison-rent');
    const flatSizeInput = document.getElementById('flat-size');
    const actualRentInput = document.getElementById('actual-rent');
    
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultOutput = document.getElementById('result-output');
    
    const comparisonVal = parseFloat(comparisonInput.value);
    const flatSizeVal = parseFloat(flatSizeInput.value);
    const actualRentVal = parseFloat(actualRentInput.value);

    // Form Validation
    if (isNaN(comparisonVal) || isNaN(flatSizeVal) || isNaN(actualRentVal) || comparisonVal <= 0 || flatSizeVal <= 0 || actualRentVal <= 0) {
        alert("Bitte füllen Sie alle Felder mit gültigen Zahlen über Null aus.");
        return;
    }

    // Calculations
    const actualRentPerSqm = actualRentVal / flatSizeVal;
    const allowedRentTotal = comparisonVal * flatSizeVal;
    const percentageDifference = ((actualRentPerSqm - comparisonVal) / comparisonVal) * 100;
    
    // Elements to update
    const resultBadge = document.getElementById('result-badge');
    const actualRentSqmSpan = document.getElementById('actual-rent-per-sqm');
    const allowedRentTotalSpan = document.getElementById('allowed-rent-total');
    const excessPercentage = document.getElementById('excess-percentage');
    const excessContainer = document.getElementById('excess-container');
    const resultDescription = document.getElementById('result-description');
    const excessLabel = document.getElementById('excess-label');

    // Update numbers
    actualRentSqmSpan.innerText = actualRentPerSqm.toFixed(2);
    allowedRentTotalSpan.innerText = allowedRentTotal.toFixed(2) + " €";
    
    // Reset classes
    resultBadge.className = "inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider";
    excessPercentage.className = "text-xl font-bold";

    // Check legality levels
    if (percentageDifference > 50) {
        // MIETWUCHER
        resultBadge.innerText = "🚨 Verdacht auf Mietwucher";
        resultBadge.classList.add('bg-red-900/50', 'text-red-300');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} % über Limit`;
        excessPercentage.classList.add('text-red-500');
        excessLabel.innerText = "Überschreitung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `<strong>Achtung:</strong> Ihre Miete liegt mehr als 50% über der Vergleichsmiete. Nach § 291 StGB liegt hier ein <strong>strafbarer Mietwucher</strong> nahe. Wir empfehlen dringend, eine offizielle Mieterberatung aufzusuchen.`;
    } 
    else if (percentageDifference > 20) {
        // MIETPREISÜBERHÖHUNG
        resultBadge.innerText = "⚠️ Mietpreisüberhöhung";
        resultBadge.classList.add('bg-yellow-900/50', 'text-yellow-300');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} % über Limit`;
        excessPercentage.classList.add('text-yellow-500');
        excessLabel.innerText = "Überschreitung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `<strong>Hinweis:</strong> Ihre Miete liegt über 20% über der Vergleichsmiete. Dies stellt nach § 5 Wirtschaftsstrafgesetz eine <strong>Ordnungswidrigkeit</strong> dar. Melden Sie diesen Fall bei der Taskforce Wohnen!`;
    } 
    else if (percentageDifference > 0) {
        // Geringfügig erhöht
        resultBadge.innerText = "⚠️ Leicht erhöht";
        resultBadge.classList.add('bg-orange-900/30', 'text-orange-300');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} %`;
        excessPercentage.classList.add('text-orange-400');
        excessLabel.innerText = "Erhöhung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `Ihre Miete ist zwar höher als der Durchschnitt, liegt jedoch noch unter der gesetzlichen Toleranzgrenze von 20%. Beobachten Sie künftige Mieterhöhungen aufmerksam.`;
    } 
    else {
        // Legal
        resultBadge.innerText = "✅ Miete im gesetzlichen Rahmen";
        resultBadge.classList.add('bg-emerald-950', 'text-emerald-400');
        if (percentageDifference === 0) {
            excessPercentage.innerText = "Punktlandung (0%)";
            excessPercentage.classList.add('text-emerald-400');
        } else {
            excessPercentage.innerText = `${percentageDifference.toFixed(1)} % günstiger`;
            excessPercentage.classList.add('text-emerald-400');
        }
        excessLabel.innerText = "Ersparnis:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `Herzlichen Glückwunsch! Ihre Miete entspricht den Richtwerten des Mietspiegels oder liegt sogar darunter. Sie zahlen einen fairen Preis.`;
    }

    // Toggle visibility
    resultPlaceholder.classList.add('hidden');
    resultOutput.classList.remove('hidden');
    
    // Smooth scroll result into view on mobile
    if (window.innerWidth < 768) {
        document.getElementById('mietcheck-result-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
