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
            panel.classList.add('animate-[fadeIn_0.3s_ease-out]');
        } else {
            panel.classList.add('hidden');
            panel.classList.remove('animate-[fadeIn_0.3s_ease-out]');
        }
    }
}


// ==========================================
// 5. EXTENSIVE BREMEN STREETS DATABASE & SUGGESTIONS LOGIC
// ==========================================

// Database of real popular Bremen streets and their official Wohnlage
const BREMEN_STREETS_DATABASE = [
    // === Einfache Wohnlage ===
    { name: "Gröpelinger Heerstraße", wohnlage: "einfach" },
    { name: "Lindenhofstraße", wohnlage: "einfach" },
    { name: "Teneverstraße", wohnlage: "einfach" },
    { name: "Pfälzer Straße", wohnlage: "einfach" },
    { name: "Oslebshauser Heerstraße", wohnlage: "einfach" },
    { name: "Blumenthaler Straße", wohnlage: "einfach" },
    { name: "Lüssumer Straße", wohnlage: "einfach" },
    { name: "Neuwieder Straße", wohnlage: "einfach" },
    { name: "Grazer Straße", wohnlage: "einfach" },
    { name: "Blockdieker Weg", wohnlage: "einfach" },
    { name: "Koblenzer Straße", wohnlage: "einfach" },
    { name: "Schweizer Eck", wohnlage: "einfach" },
    { name: "Donaustraße", wohnlage: "einfach" },
    { name: "Blomberger Straße", wohnlage: "einfach" },
    { name: "Wulsdorfer Straße", wohnlage: "einfach" },
    { name: "Kobusstraße", wohnlage: "einfach" },
    { name: "Huchtinger Heerstraße", wohnlage: "einfach" },
    { name: "Osterholzer Heerstraße", wohnlage: "einfach" },
    { name: "Kattenturmer Heerstraße", wohnlage: "einfach" },
    { name: "Kattenescher Weg", wohnlage: "einfach" },
    { name: "Arster Heerstraße", wohnlage: "einfach" },
    { name: "Schiffbauerweg", wohnlage: "einfach" },
    { name: "Neu-Wilsen", wohnlage: "einfach" },
    { name: "Hoppenbank", wohnlage: "einfach" },
    { name: "Liegnitzer Straße", wohnlage: "einfach" },
    { name: "Stapelfeldtstraße", wohnlage: "einfach" },
    { name: "Heerereystraße", wohnlage: "einfach" },
    { name: "Bürgermeister-Koschnick-Straße", wohnlage: "einfach" },
    { name: "Mittelshuchtingstraße", wohnlage: "einfach" },
    { name: "Amersfoorter Straße", wohnlage: "einfach" },
    { name: "Waller Heerstraße", wohnlage: "einfach" },

    // === Normale Wohnlage ===
    { name: "Kornstraße", wohnlage: "normal" },
    { name: "Pappelstraße", wohnlage: "normal" },
    { name: "Gastfeldstraße", wohnlage: "normal" },
    { name: "Steffensweg", wohnlage: "normal" },
    { name: "Findorffstraße", wohnlage: "normal" },
    { name: "Hemmstraße", wohnlage: "normal" },
    { name: "Admiralstraße", wohnlage: "normal" },
    { name: "Woltmershauser Straße", wohnlage: "normal" },
    { name: "Hastedter Heerstraße", wohnlage: "normal" },
    { name: "Stresemannstraße", wohnlage: "normal" },
    { name: "Sebaldsbrücker Heerstraße", wohnlage: "normal" },
    { name: "In der Vahr", wohnlage: "normal" },
    { name: "Vegesacker Heerstraße", wohnlage: "normal" },
    { name: "Gerhard-Rohlfs-Straße", wohnlage: "normal" },
    { name: "Reeder-Bischoff-Straße", wohnlage: "normal" },
    { name: "Rotenburger Straße", wohnlage: "normal" },
    { name: "Langemarckstraße", wohnlage: "normal" },
    { name: "Westerstraße", wohnlage: "normal" },
    { name: "Osterstraße", wohnlage: "normal" },
    { name: "Rheinstraße", wohnlage: "normal" },
    { name: "Hastedter Osterdeich", wohnlage: "normal" },
    { name: "Buntentorsteinweg", wohnlage: "normal" },
    { name: "Huckelrieder Weg", wohnlage: "normal" },
    { name: "Arberger Heerstraße", wohnlage: "normal" },
    { name: "Mahndorfer Heerstraße", wohnlage: "normal" },
    { name: "Habenhauser Landstraße", wohnlage: "normal" },
    { name: "Burglesumer Straße", wohnlage: "normal" },
    { name: "Grohner Straße", wohnlage: "normal" },
    { name: "Aumunder Heerstraße", wohnlage: "normal" },
    { name: "Farger Straße", wohnlage: "normal" },
    { name: "Lankener Straße", wohnlage: "normal" },
    { name: "Humboldtstraße", wohnlage: "normal" },
    { name: "Schleifmühle", wohnlage: "normal" },
    { name: "Waller Ring", wohnlage: "normal" },
    { name: "Neustadtswall", wohnlage: "normal" },
    { name: "Utbremenstraße", wohnlage: "normal" },
    { name: "Hansestraße", wohnlage: "normal" },
    { name: "Doventorsdeich", wohnlage: "normal" },
    { name: "Neukirchstraße", wohnlage: "normal" },
    { name: "Münchener Straße", wohnlage: "normal" },

    // === Gute Wohnlage ===
    { name: "Schwachhauser Heerstraße", wohnlage: "gut" },
    { name: "Parkallee", wohnlage: "gut" },
    { name: "Marcusallee", wohnlage: "gut" },
    { name: "Wachmannstraße", wohnlage: "gut" },
    { name: "H.-H.-Meier-Allee", wohnlage: "gut" },
    { name: "Contrescarpe", wohnlage: "gut" },
    { name: "Am Wall", wohnlage: "gut" },
    { name: "Fedelhören", wohnlage: "gut" },
    { name: "Osterdeich", wohnlage: "gut" },
    { name: "Altenwall", wohnlage: "gut" },
    { name: "Teerhof", wohnlage: "gut" },
    { name: "Auf der Muggenburg", wohnlage: "gut" },
    { name: "Konsul-Smidt-Straße", wohnlage: "gut" },
    { name: "Borgfelder Heerstraße", wohnlage: "gut" },
    { name: "Oberneulander Landstraße", wohnlage: "gut" },
    { name: "Rockwinkeler Landstraße", wohnlage: "gut" },
    { name: "Riensberger Straße", wohnlage: "gut" },
    { name: "Spittastraße", wohnlage: "gut" },
    { name: "Sögestraße", wohnlage: "gut" },
    { name: "Obernstraße", wohnlage: "gut" },
    { name: "Hutfilterstraße", wohnlage: "gut" },
    { name: "Schoppensteel", wohnlage: "gut" },
    { name: "Böttcherstraße", wohnlage: "gut" },
    { name: "Schnoor", wohnlage: "gut" },
    { name: "Lehester Deich", wohnlage: "gut" },
    { name: "Barkhofpassage", wohnlage: "gut" },
    { name: "Getekamp", wohnlage: "gut" },
    { name: "Peterswerderstraße", wohnlage: "gut" },
    { name: "Werderstraße", wohnlage: "gut" },
    { name: "Schönebecker Straße", wohnlage: "gut" },
    { name: "Schubertstraße", wohnlage: "gut" },
    { name: "Franziuseck", wohnlage: "gut" },
    { name: "Kaufmannstraße", wohnlage: "gut" },
    { name: "Kaiser-Friedrich-Straße", wohnlage: "gut" },
    { name: "Hansaallee", wohnlage: "gut" }
];

// Original dictionary for robust substring/pattern fallbacks
const BREMEN_STREETS_FALLBACKS = {
    "gropelinger": "einfach",
    "gropelingen": "einfach",
    "tenever": "einfach",
    "vahr": "einfach",
    "blockdiek": "einfach",
    "huchting": "einfach",
    "blumenthal": "einfach",
    "oslebshausen": "einfach",
    "oslebshaus": "einfach",
    "osterholz": "einfach",
    "kattenturm": "einfach",
    "kattenesch": "einfach",
    "arsten": "einfach",
    "luessum": "einfach",
    "lussum": "einfach",
    "lindenhof": "einfach",
    "schiffbauer": "einfach",
    "donaustra": "einfach",
    "blomberger": "einfach",
    "neu-wilsen": "einfach",
    "wulsdorf": "einfach",
    "leher": "einfach",
    "teneverstr": "einfach",
    "kobusstra": "einfach",

    "neustadt": "normal",
    "findorff": "normal",
    "walle": "normal",
    "woltmershausen": "normal",
    "woltmershaus": "normal",
    "hemelingen": "normal",
    "hastedt": "normal",
    "vegack": "normal",
    "vegesack": "normal",
    "lesum": "normal",
    "utbremen": "normal",
    "buntentor": "normal",
    "huckelriede": "normal",
    "sebaldsbrueck": "normal",
    "sebaldsbruck": "normal",
    "arbergen": "normal",
    "mahndorf": "normal",
    "habhausen": "normal",
    "burglesum": "normal",
    "grohn": "normal",
    "aumund": "normal",
    "farge": "normal",
    "lankener": "normal",
    "kornstra": "normal",
    "pappelstra": "normal",
    "gastfeld": "normal",
    "steffensweg": "normal",
    "humboldt": "normal",
    "schleifmuehle": "normal",
    "schleifmuhle": "normal",
    "waller": "normal",
    "findorffstr": "normal",
    "neustadts": "normal",
    "rheinstr": "normal",
    "westerstr": "normal",
    "langemarckstr": "normal",

    "schwachhauser": "gut",
    "schwachhausen": "gut",
    "parkallee": "gut",
    "am wall": "gut",
    "ostertor": "gut",
    "steintor": "gut",
    "viertel": "gut",
    "horn-lehe": "gut",
    "lehester": "gut",
    "oberneuland": "gut",
    "borgfeld": "gut",
    "riensberg": "gut",
    "barkhof": "gut",
    "gete": "gut",
    "peterswerder": "gut",
    "werdersee": "gut",
    "teerhof": "gut",
    "uberseestadt": "gut",
    "überseestadt": "gut",
    "mitte": "gut",
    "altstadt": "gut",
    "schoenebeck": "gut",
    "schonebeck": "gut",
    "spitta": "gut",
    "contrescarpe": "gut",
    "osterdeich": "gut",
    "hansaallee": "gut",
    "marcusallee": "gut",
    "wachmann": "gut",
    "herdentor": "gut",
    "fedelhoeren": "gut"
};

// Normalization function to strip accents, lower-case, and handle common formats
function normalizeText(text) {
    if (!text) return "";
    return text.toLowerCase()
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ß/g, 'ss')
        .replace(/e-str/g, 'er str')
        .replace(/e\s+str/g, 'er str')
        .replace(/\bstr\b/g, 'strasse')
        .replace(/\bstr\./g, 'strasse')
        .trim();
}

function selectStreet(name, wohnlage) {
    const input = document.getElementById('street-input');
    const badge = document.getElementById('detection-badge');
    const select = document.getElementById('wohnlage-select');
    const selectContainer = document.getElementById('wohnlage-select-container');
    const suggestionsList = document.getElementById('suggestions-list');

    input.value = name;
    select.value = wohnlage;
    
    // Hide manual select
    selectContainer.classList.add('hidden');
    
    // Render beautiful badge
    const title = wohnlage === 'einfach' ? 'Einfache Wohnlage' : wohnlage === 'normal' ? 'Normale Wohnlage' : 'Gute Wohnlage';
    const colorClass = wohnlage === 'einfach' ? 'bg-amber-50 text-amber-800 border-amber-200' : wohnlage === 'normal' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200';
    
    badge.innerHTML = `
        <div class="p-3 rounded-xl border ${colorClass} text-xs font-semibold space-y-1">
            <div class="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <svg class="w-3.5 h-3.5 animate-[bounce_1.5s_infinite]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Adresse zugeordnet
            </div>
            <div>${title} (${name})</div>
        </div>
    `;
    badge.classList.remove('hidden');
    suggestionsList.classList.add('hidden');
}

function detectWohnlage(streetText) {
    const badge = document.getElementById('detection-badge');
    const select = document.getElementById('wohnlage-select');
    const selectContainer = document.getElementById('wohnlage-select-container');
    const suggestionsList = document.getElementById('suggestions-list');
    
    if (!streetText || streetText.trim().length < 2) {
        badge.classList.add('hidden');
        selectContainer.classList.remove('hidden');
        suggestionsList.classList.add('hidden');
        return;
    }

    const normalizedInput = normalizeText(streetText);

    // 1. FILTER SUGGESTIONS FROM DATABASE
    const matches = BREMEN_STREETS_DATABASE.filter(item => {
        const normName = normalizeText(item.name);
        return normName.includes(normalizedInput);
    });

    // Sort: Prefix matches first, then alphabetically
    matches.sort((a, b) => {
        const aNorm = normalizeText(a.name);
        const bNorm = normalizeText(b.name);
        const aStarts = aNorm.startsWith(normalizedInput);
        const bStarts = bNorm.startsWith(normalizedInput);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
    });

    const topMatches = matches.slice(0, 6);

    if (topMatches.length > 0) {
        suggestionsList.innerHTML = '';
        topMatches.forEach(match => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'w-full px-4 py-3 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-between text-sm sm:text-base cursor-pointer border-0 bg-transparent focus:outline-none focus:bg-slate-50';
            
            const badgeLabel = match.wohnlage === 'einfach' ? 'Einfach' : match.wohnlage === 'normal' ? 'Normal' : 'Gut';
            const badgeColor = match.wohnlage === 'einfach' ? 'bg-amber-50 text-amber-700 border-amber-200' : match.wohnlage === 'normal' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
            
            item.innerHTML = `
                <span class="text-slate-800 font-medium">${match.name}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${badgeColor}">${badgeLabel}</span>
            `;
            
            item.addEventListener('click', () => {
                selectStreet(match.name, match.wohnlage);
            });
            
            suggestionsList.appendChild(item);
        });
        suggestionsList.classList.remove('hidden');
    } else {
        suggestionsList.classList.add('hidden');
    }

    // 2. FALLBACK PATTERN DETECTION (Runs on active typing for direct/fuzzy matches)
    let detectedWohnlage = null;
    
    // Check if there is an exact match in the database
    const exactMatch = BREMEN_STREETS_DATABASE.find(item => normalizeText(item.name) === normalizedInput);
    if (exactMatch) {
        detectedWohnlage = exactMatch.wohnlage;
    } else {
        // Fallback to fuzzy substring checks in BREMEN_STREETS_FALLBACKS
        for (let key in BREMEN_STREETS_FALLBACKS) {
            if (normalizedInput.includes(key)) {
                detectedWohnlage = BREMEN_STREETS_FALLBACKS[key];
                break;
            }
        }
    }

    if (detectedWohnlage) {
        select.value = detectedWohnlage;
        selectContainer.classList.add('hidden');
        
        const title = detectedWohnlage === 'einfach' ? 'Einfache Wohnlage' : detectedWohnlage === 'normal' ? 'Normale Wohnlage' : 'Gute Wohnlage';
        const colorClass = detectedWohnlage === 'einfach' ? 'bg-amber-50 text-amber-800 border-amber-200' : detectedWohnlage === 'normal' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200';
        
        badge.innerHTML = `
            <div class="p-3 rounded-xl border ${colorClass} text-xs font-semibold space-y-1">
                <div class="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                    <svg class="w-3.5 h-3.5 animate-[bounce_1.5s_infinite]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                    Adresse automatisch zugeordnet
                </div>
                <div>${title} (${streetText})</div>
            </div>
        `;
        badge.classList.remove('hidden');
    } else {
        // Only hide the badge and show select if we do not have an active suggestion
        selectContainer.classList.remove('hidden');
        badge.classList.add('hidden');
    }
}

// Close suggestions dropdown when clicking outside
document.addEventListener('click', (e) => {
    const input = document.getElementById('street-input');
    const suggestionsList = document.getElementById('suggestions-list');
    
    if (input && suggestionsList) {
        if (e.target !== input && !suggestionsList.contains(e.target)) {
            suggestionsList.classList.add('hidden');
        }
    }
});

// Hide dropdown on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const suggestionsList = document.getElementById('suggestions-list');
        if (suggestionsList) {
            suggestionsList.classList.add('hidden');
        }
    }
});


// ==========================================
// 6. DETAILED BREMEN MIET-CHECK LOGIC
// ==========================================
function checkBremenRent() {
    const wohnlageSelect = document.getElementById('wohnlage-select');
    const baujahrSelect = document.getElementById('baujahr-select');
    const flatSizeInput = document.getElementById('flat-size-input');
    const actualKaltmieteInput = document.getElementById('actual-kaltmiete');
    
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultOutput = document.getElementById('result-output');

    // Read value from dropdown (even if disabled)
    const wohnlage = wohnlageSelect.value;
    const baujahr = baujahrSelect.value;
    const flatSize = parseFloat(flatSizeInput.value);
    const actualKaltmiete = parseFloat(actualKaltmieteInput.value);

    // Form validation
    if (!wohnlage) {
        alert("Bitte wählen oder ermitteln Sie die Wohnlage Ihrer Straße in Schritt 1.");
        return;
    }
    if (isNaN(flatSize) || flatSize <= 0) {
        alert("Bitte geben Sie eine gültige Wohnfläche in m² an (Schritt 2).");
        return;
    }
    if (isNaN(actualKaltmiete) || actualKaltmiete <= 0) {
        alert("Bitte geben Sie Ihre monatliche Nettokaltmiete in € an (Schritt 4).");
        return;
    }

    // --- STEP 2: Basis-Nettokaltmiete aus Bremen Mietspiegeltabelle ---
    let basismiete = 7.50; // Standardfall Normal

    if (baujahr === "alt") { // Bis 1918
        if (wohnlage === "einfach") basismiete = 6.20;
        else if (wohnlage === "normal") basismiete = 7.50;
        else if (wohnlage === "gut") basismiete = 9.20;
    } 
    else if (baujahr === "nachkrieg") { // 1949-1969
        if (wohnlage === "einfach") basismiete = 5.80;
        else if (wohnlage === "normal") basismiete = 6.80;
        else if (wohnlage === "gut") basismiete = 8.00;
    } 
    else if (baujahr === "modern") { // 1970-1990
        if (wohnlage === "einfach") basismiete = 6.50;
        else if (wohnlage === "normal") basismiete = 7.50;
        else if (wohnlage === "gut") basismiete = 8.80;
    } 
    else if (baujahr === "neu") { // 1991-2010
        if (wohnlage === "einfach") basismiete = 7.50;
        else if (wohnlage === "normal") basismiete = 8.80;
        else if (wohnlage === "gut") basismiete = 10.50;
    } 
    else if (baujahr === "neubau") { // Nach 2010
        if (wohnlage === "einfach") basismiete = 9.00;
        else if (wohnlage === "normal") basismiete = 10.50;
        else if (wohnlage === "gut") basismiete = 12.50;
    }

    // Flat size scaling (Small apartments have higher per sqm rates)
    if (flatSize < 40) {
        basismiete *= 1.10; // +10%
    } else if (flatSize > 85) {
        basismiete *= 0.95; // -5%
    }

    // --- STEP 3: Zu- und Abschläge (Ausstattung) ---
    let extraSqmCharge = 0.00;
    
    // Zuschläge (+0.40 € pro m² pro Merkmal)
    if (document.getElementById('feature-kitchen').checked) extraSqmCharge += 0.40;
    if (document.getElementById('feature-bath').checked) extraSqmCharge += 0.40;
    if (document.getElementById('feature-balcony').checked) extraSqmCharge += 0.40;
    if (document.getElementById('feature-energy').checked) extraSqmCharge += 0.40;

    // Abschläge (-0.40 € pro m² pro Merkmal)
    if (document.getElementById('feature-no-barrier').checked) extraSqmCharge -= 0.40;
    if (document.getElementById('feature-noisy').checked) extraSqmCharge -= 0.40;

    // Final Computed Comparison Rent (ortsübliche Vergleichsmiete)
    const computedComparisonRent = basismiete + extraSqmCharge;
    const allowedRentSqmBremse = computedComparisonRent * 1.10; // Mietpreisbremse (+10% limit)
    const allowedRentTotalBremse = allowedRentSqmBremse * flatSize;
    
    const actualRentPerSqm = actualKaltmiete / flatSize;
    const percentageDifference = ((actualRentPerSqm - computedComparisonRent) / computedComparisonRent) * 100;

    // --- RENDER RESULTS ---
    const resultBadge = document.getElementById('result-badge');
    const actualRentSqmSpan = document.getElementById('actual-rent-per-sqm');
    const computedCompRentSpan = document.getElementById('computed-comparison-rent');
    const allowedRentTotalSpan = document.getElementById('allowed-rent-total');
    const excessPercentage = document.getElementById('excess-percentage');
    const excessContainer = document.getElementById('excess-container');
    const resultDescription = document.getElementById('result-description');
    const excessLabel = document.getElementById('excess-label');

    // Values rendering
    actualRentSqmSpan.innerText = actualRentPerSqm.toFixed(2);
    computedCompRentSpan.innerText = computedComparisonRent.toFixed(2);
    allowedRentTotalSpan.innerText = allowedRentTotalBremse.toFixed(2);

    // Reset styles
    resultBadge.className = "inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider";
    excessPercentage.className = "text-xl font-bold";

    if (percentageDifference > 50) {
        // MIETWUCHER (§ 291 StGB)
        resultBadge.innerText = "🚨 Verdacht auf Mietwucher";
        resultBadge.classList.add('bg-red-950', 'text-red-400', 'border', 'border-red-800/30');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} % über Richtwert`;
        excessPercentage.classList.add('text-red-500');
        excessLabel.innerText = "Überschreitung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `<strong>Achtung:</strong> Ihre Miete liegt <strong>${percentageDifference.toFixed(1)}% über der ortsüblichen Vergleichsmiete</strong>. Nach § 291 StGB liegt hier der Verdacht auf **Mietwucher** nahe. Dies ist ein Straftatbestand. Suchen Sie sofort eine Rechtsberatung auf!`;
    } 
    else if (percentageDifference > 20) {
        // MIETPREISÜBERHÖHUNG (§ 5 WiStG)
        resultBadge.innerText = "⚠️ Mietpreisüberhöhung";
        resultBadge.classList.add('bg-yellow-950', 'text-yellow-400', 'border', 'border-yellow-800/30');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} % über Richtwert`;
        excessPercentage.classList.add('text-yellow-500');
        excessLabel.innerText = "Überschreitung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `<strong>Hinweis:</strong> Ihre Miete überschreitet die ortsübliche Vergleichsmiete um <strong>${percentageDifference.toFixed(1)}%</strong>. Da dies über dem 20%-Limit liegt, liegt eine Ordnungswidrigkeit nach <strong>§ 5 WiStG</strong> nahe. Sie sollten aktiv werden!`;
    } 
    else if (percentageDifference > 10) {
        // MIETPREISBREMSE VERSTOẞ (+10% limit)
        resultBadge.innerText = "🛑 Mietpreisbremse verletzt";
        resultBadge.classList.add('bg-orange-950', 'text-orange-400', 'border', 'border-orange-800/30');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} % über Richtwert`;
        excessPercentage.classList.add('text-orange-500');
        excessLabel.innerText = "Überschreitung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `<strong>Achtung:</strong> Ihre Miete liegt <strong>${percentageDifference.toFixed(1)}% über dem Durchschnitt</strong>. In Bremen gilt die **Mietpreisbremse**: Bei Neuverträgen darf die Miete maximal 10% über dem Wert liegen. Ihre Miete überschreitet diese Grenze!`;
    } 
    else if (percentageDifference > 0) {
        // Geringfügig erhöht aber im Toleranzbereich
        resultBadge.innerText = "⚠️ Leicht erhöht";
        resultBadge.classList.add('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700/50');
        excessPercentage.innerText = `+${percentageDifference.toFixed(1)} %`;
        excessPercentage.classList.add('text-amber-400');
        excessLabel.innerText = "Erhöhung:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `Ihre Miete liegt <strong>${percentageDifference.toFixed(1)}%</strong> über dem Durchschnittswert. Dies ist bei laufenden Altverträgen rechtlich zulässig, solange keine Mietpreisbremse greift und die Kappungsgrenze eingehalten wird.`;
    } 
    else {
        // Fair / Günstig
        resultBadge.innerText = "✅ Miete im fairen Bereich";
        resultBadge.classList.add('bg-emerald-950', 'text-emerald-400', 'border', 'border-emerald-800/30');
        const absDiff = Math.abs(percentageDifference);
        excessPercentage.innerText = `-${absDiff.toFixed(1)} % günstiger`;
        excessPercentage.classList.add('text-emerald-400');
        excessLabel.innerText = "Ersparnis:";
        excessContainer.classList.remove('hidden');
        resultDescription.innerHTML = `Hervorragend! Ihre Kaltmiete liegt um <strong>${absDiff.toFixed(1)}% unter der errechneten Vergleichsmiete</strong>. Sie bezahlen eine faire Miete nach dem Bremer Mietspiegel.`;
    }

    // Toggle panels
    resultPlaceholder.classList.add('hidden');
    resultOutput.classList.remove('hidden');
    
    // Smooth scroll result on mobile
    if (window.innerWidth < 768) {
        document.getElementById('mietcheck-result-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
