// Инициализация переменных
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let cherruCount = parseInt(localStorage.getItem('cherruCount')) || 0;
let avatarPrice = parseInt(localStorage.getItem('avatarPrice')) || 1000;
let clickIncrement = parseInt(localStorage.getItem('clickIncrement')) || 1;
let autoClickerInterval = null;
let autoClickerIntervalTime = parseInt(localStorage.getItem('autoClickerIntervalTime')) || 1000; // Интервал автокликера

// Элементы интерфейса (оставьте существующие)
// ...

// Покупка автокликера
autoClickerButton?.addEventListener('click', () => {
    if (cherruCount >= 100) {
        cherruCount -= 100;
        startAutoClicker();
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
    }, autoClickerIntervalTime); // Интервал, сохраненный в localStorage
}

// Запуск при загрузке страницы
updateDisplay();
startAutoClicker(); // Запуск автокликера при загрузке

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('cherruCount', cherruCount);
    localStorage.setItem('avatarPrice', avatarPrice);
    localStorage.setItem('clickIncrement', clickIncrement);
    localStorage.setItem('autoClickerIntervalTime', autoClickerIntervalTime); // Сохраняем интервал автокликера
}

// Теперь клики и интервал автокликера будут сохраняться! Удачи в разработке!
