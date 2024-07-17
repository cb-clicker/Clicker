// Инициализация переменных
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let cherruCount = parseInt(localStorage.getItem('cherruCount')) || 0;
let avatarPrice = parseInt(localStorage.getItem('avatarPrice')) || 1000;
let clickIncrement = parseInt(localStorage.getItem('clickIncrement')) || 1;
let autoClickerInterval = null; // Для автокликера

// Элементы интерфейса
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
const autoClickerButton = document.getElementById('auto-clicker-button'); // Кнопка автокликера

// Обновление отображения
function updateDisplay() {
    clickCountDisplay.textContent = clickCount;
    cherruCountDisplay.textContent = cherruCount;
    avatarPriceDisplay.textContent = avatarPrice;
}

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('cherruCount', cherruCount);
    localStorage.setItem('avatarPrice', avatarPrice);
    localStorage.setItem('clickIncrement', clickIncrement);
}

// Обработчик клика по аватару
clickAvatar?.addEventListener('click', () => {
    clickCount += clickIncrement;
    updateDisplay();
    saveData();
});

// Покупка аватара
buyAvatarButton?.addEventListener('click', () => {
    if (cherruCount >= avatarPrice) {
        cherruCount -= avatarPrice;
        clickIncrement += 1;
        avatarPrice += 1000;
        updateDisplay();
        saveData();
    }
});

// Обмен кликов на черры
exchangeActionButton?.addEventListener('click', () => {
    if (clickCount >= 10) {
        clickCount -= 10;
        cherruCount += 1;
        updateDisplay();
        saveData();
    }
});

// Обмен всех кликов на черры
exchangeAllButton?.addEventListener('click', () => {
    const exchangeableCherrus = Math.floor(clickCount / 10);
    if (exchangeableCherrus > 0) {
        clickCount -= exchangeableCherrus * 10;
        cherruCount += exchangeableCherrus;
        updateDisplay();
        saveData();
    }
});

// Покупка автокликера
autoClickerButton?.addEventListener('click', () => {
    if (cherruCount >= 100) {
        cherruCount -= 100;
        startAutoClicker(); // Запуск автокликера
        updateDisplay();
        saveData();
    }
});

// Автокликер
function startAutoClicker() {
    autoClickerInterval = setInterval(() => {
        clickCount += 1;
        updateDisplay();
        saveData();
    }, 1000); // Каждую секунду
}

// Запуск при загрузке страницы
updateDisplay();
startAutoClicker(); // Запуск автокликера при загрузке

// Твоя игра теперь еще интереснее! Удачи в развитии!
