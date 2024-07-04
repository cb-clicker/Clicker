let clickCount = 0;
let cherruCount = 0;
let avatarPrice = 1000;

const clickAvatar = document.getElementById('click-avatar');
const clickCountDisplay = document.getElementById('click-count');
const cherruCountDisplay = document.getElementById('cherru-count');
const shopButton = document.getElementById('shop-button');
const exchangeButton = document.getElementById('exchange-button');
const shopInterface = document.getElementById('shop');
const exchangeInterface = document.getElementById('exchange');
const buyAvatarButton = document.getElementById('buy-avatar');
const avatarPriceDisplay = document.getElementById('avatar-price');
const exchangeActionButton = document.getElementById('exchange-button');

clickAvatar.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
});

shopButton.addEventListener('click', () => {
    toggleInterface(shopInterface);
});

exchangeButton.addEventListener('click', () => {
    toggleInterface(exchangeInterface);
});

buyAvatarButton.addEventListener('click', () => {
    if (cherruCount >= avatarPrice) {
        cherruCount -= avatarPrice;
        clickCount += 1;  // Увеличиваем клики на 1
        avatarPrice += 1000;
        avatarPriceDisplay.textContent = avatarPrice;
        cherruCountDisplay.textContent = cherruCount;
    }
});

exchangeActionButton.addEventListener('click', () => {
    if (clickCount >= 10) {
        clickCount -= 10;
        cherruCount += 1;
        clickCountDisplay.textContent = clickCount;
        cherruCountDisplay.textContent = cherruCount;
    }
});

function toggleInterface(interfaceElement) {
    if (interfaceElement.style.display === 'block') {
        interfaceElement.style.display = 'none';
    } else {
        shopInterface.style.display = 'none';
        exchangeInterface.style.display = 'none';
        interfaceElement.style.display = 'block';
    }
}
