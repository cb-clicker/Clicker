let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let cherruCount = parseInt(localStorage.getItem('cherruCount')) || 0;
let avatarPrice = parseInt(localStorage.getItem('avatarPrice')) || 1000;
let clickIncrement = parseInt(localStorage.getItem('clickIncrement')) || 1;
let autoclickerUpgradePrice = parseInt(localStorage.getItem('autoclickerUpgradePrice')) || 100;
let autoclickerInterval = parseInt(localStorage.getItem('autoclickerInterval')) || 60;
let isAutoclickerActive = localStorage.getItem('isAutoclickerActive') === 'true';
let hasAutoclicker = localStorage.getItem('hasAutoclicker') === 'true';
let avatarLevel = parseInt(localStorage.getItem('avatarLevel')) || 1;

const clickAvatar = document.getElementById('click-avatar');
const clickCountDisplay = document.getElementById('click-count');
const cherruCountDisplay = document.getElementById('cherru-count');
const shopButton = document.getElementById('shop-button');
const exchangeButton = document.getElementById('exchange-button');
const shopInterface = document.getElementById('shop');
const exchangeInterface = document.getElementById('exchange');
const buyAvatarButton = document.getElementById('buy-avatar');
const avatarPriceDisplay = document.getElementById('avatar-price');
const exchangeActionButton = document.getElementById('exchange-action-button');
const exchangeAllButton = document.getElementById('exchange-all-button');
const autoclickerUpgradePriceDisplay = document.getElementById('autoclicker-upgrade-price');
const autoclickerIntervalDisplay = document.getElementById('autoclicker-interval');
const autoclickerToggle = document.getElementById('autoclicker-toggle');
const autoclickerStatus = document.getElementById('autoclicker-status');
const autoclickerControls = document.getElementById('autoclicker-controls');
const autoclickerShop = document.getElementById('autoclicker-shop');
const autoclickerUpgrade = document.getElementById('autoclicker-upgrade');
const avatarUpgradeText = document.getElementById('avatar-upgrade-text');
const avatarSoldOut = document.getElementById('avatar-sold-out');

function updateDisplay() {
    clickCountDisplay.textContent = clickCount;
    cherruCountDisplay.textContent = cherruCount;
    avatarPriceDisplay.textContent = avatarPrice;
    autoclickerUpgradePriceDisplay.textContent = autoclickerUpgradePrice;
    autoclickerIntervalDisplay.textContent = autoclickerInterval;
    autoclickerStatus.textContent = isAutoclickerActive ? 'Включен' : 'Выключен';
    
    clickAvatar.src = `images/avatar${avatarLevel}.png`;
    
    if (avatarLevel >= 20) {
        buyAvatarButton.style.display = 'none';
        avatarUpgradeText.classList.add('strikethrough');
        avatarSoldOut.style.display = 'block';
    }
    
    if (hasAutoclicker) {
        autoclickerControls.style.display = 'block';
        autoclickerShop.style.display = 'none';
        autoclickerUpgrade.style.display = 'block';
        
        if (isAutoclickerActive) {
            autoclickerToggle.classList.remove('autoclicker-off');
            autoclickerToggle.classList.add('autoclicker-on');
        } else {
            autoclickerToggle.classList.remove('autoclicker-on');
            autoclickerToggle.classList.add('autoclicker-off');
        }
    } else {
        autoclickerControls.style.display = 'none';
        autoclickerShop.style.display = 'block';
        autoclickerUpgrade.style.display = 'none';
    }
}

function saveData() {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('cherruCount', cherruCount);
    localStorage.setItem('avatarPrice', avatarPrice);
    localStorage.setItem('clickIncrement', clickIncrement);
    localStorage.setItem('autoclickerUpgradePrice', autoclickerUpgradePrice);
    localStorage.setItem('autoclickerInterval', autoclickerInterval);
    localStorage.setItem('isAutoclickerActive', isAutoclickerActive);
    localStorage.setItem('hasAutoclicker', hasAutoclicker);
    localStorage.setItem('avatarLevel', avatarLevel);
}

updateDisplay();

clickAvatar?.addEventListener('click', () => {
    clickCount += clickIncrement;
    updateDisplay();
    saveData();
});

shopButton?.addEventListener('click', () => {
    toggleInterface(shopInterface);
});

exchangeButton?.addEventListener('click', () => {
    toggleInterface(exchangeInterface);
});

buyAvatarButton?.addEventListener('click', () => {
    if (cherruCount >= avatarPrice && avatarLevel < 20) {
        cherruCount -= avatarPrice;
        clickIncrement += 1;
        avatarPrice += 1000;
        avatarLevel += 1;
        updateDisplay();
        saveData();
    }
});

exchangeActionButton?.addEventListener('click', () => {
    if (clickCount >= 10) {
        clickCount -= 10;
        cherruCount += 1;
        updateDisplay();
        saveData();
    }
});

exchangeAllButton?.addEventListener('click', () => {
    const exchangeableCherrus = Math.floor(clickCount / 10);
    if (exchangeableCherrus > 0) {
        clickCount -= exchangeableCherrus * 10;
        cherruCount += exchangeableCherrus;
        updateDisplay();
        saveData();
    }
});

document.getElementById('buy-autoclicker')?.addEventListener('click', () => {
    if (cherruCount >= 5000 && !hasAutoclicker) {
        cherruCount -= 5000;
        hasAutoclicker = true;
        isAutoclickerActive = true;
        updateDisplay();
        saveData();
        startAutoclicker();
    }
});

document.getElementById('upgrade-autoclicker')?.addEventListener('click', () => {
    if (cherruCount >= autoclickerUpgradePrice && autoclickerInterval > 1 && hasAutoclicker) {
        cherruCount -= autoclickerUpgradePrice;
        autoclickerUpgradePrice += 100;
        autoclickerInterval -= 1;
        updateDisplay();
        saveData();
        restartAutoclicker();
    }
});

autoclickerToggle?.addEventListener('click', () => {
    if (hasAutoclicker) {
        isAutoclickerActive = !isAutoclickerActive;
        updateDisplay();
        saveData();
        if (isAutoclickerActive) {
            startAutoclicker();
        } else {
            stopAutoclicker();
        }
    }
});

let autoclickerIntervalId;

function startAutoclicker() {
    if (isAutoclickerActive && hasAutoclicker) {
        autoclickerIntervalId = setInterval(() => {
            clickCount += clickIncrement;
            updateDisplay();
            saveData();
        }, autoclickerInterval * 1000);
    }
}

function stopAutoclicker() {
    clearInterval(autoclickerIntervalId);
}

function restartAutoclicker() {
    stopAutoclicker();
    startAutoclicker();
}

function toggleInterface(interfaceElement) {
    if (interfaceElement) {
        if (interfaceElement.style.display === 'block') {
            interfaceElement.style.display = 'none';
        } else {
            shopInterface.style.display = 'none';
            exchangeInterface.style.display = 'none';
            interfaceElement.style.display = 'block';
        }
    }
}

// Запускаем автокликер при загрузке страницы, если он был активен и куплен
if (isAutoclickerActive && hasAutoclicker) {
    startAutoclicker();
}

updateDisplay();
