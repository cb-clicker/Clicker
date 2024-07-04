let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let cherruCount = parseInt(localStorage.getItem('cherruCount')) || 0;
let avatarPrice = parseInt(localStorage.getItem('avatarPrice')) || 1000;
let clickIncrement = parseInt(localStorage.getItem('clickIncrement')) || 1;

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

clickCountDisplay.textContent = clickCount;
cherruCountDisplay.textContent = cherruCount;
avatarPriceDisplay.textContent = avatarPrice;

clickAvatar.addEventListener('click', () => {
    clickCount += clickIncrement;
    clickCountDisplay.textContent = clickCount;
    localStorage.setItem('clickCount', clickCount);
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
        clickIncrement += 1;  // Увеличиваем клики на 1
        avatarPrice += 1000;
        avatarPriceDisplay.textContent = avatarPrice;
        cherruCountDisplay.textContent = cherruCount;
        localStorage.setItem('cherruCount', cherruCount);
        localStorage.setItem('avatarPrice', avatarPrice);
        localStorage.setItem('clickIncrement', clickIncrement);
    }
});

exchangeActionButton.addEventListener('click', () => {
    if (clickCount >= 10) {
        clickCount -= 10;
        cherruCount += 1;
        clickCountDisplay.textContent = clickCount;
        cherruCountDisplay.textContent = cherruCount;
        localStorage.setItem('clickCount', clickCount);
        localStorage.setItem('cherruCount', cherruCount);
    }
});

exchangeAllButton.addEventListener('click', () => {
    const exchangeableCherrus = Math.floor(clickCount / 10);
    if (exchangeableCherrus > 0) {
        clickCount -= exchangeableCherrus * 10;
        cherruCount += exchangeableCherrus;
        clickCountDisplay.textContent = clickCount;
        cherruCountDisplay.textContent = cherruCount;
        localStorage.setItem('clickCount', clickCount);
        localStorage.setItem('cherruCount', cherruCount);
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
