let clickCount = 0;
let cherruCount = 0;
let avatarPrice = 1000;

const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const shopButton = document.getElementById('shop-button');
const exchangeButton = document.getElementById('exchange-button');
const shopInterface = document.getElementById('shop');
const exchangeInterface = document.getElementById('exchange');
const buyAvatarButton = document.getElementById('buy-avatar');
const avatarPriceDisplay = document.getElementById('avatar-price');

clickButton.addEventListener('click', () => {
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
    if (clickCount >= avatarPrice) {
        clickCount -= avatarPrice;
        clickButton.dataset.clicks = (parseInt(clickButton.dataset.clicks) || 1) + 1;
        avatarPrice += 1000;
        avatarPriceDisplay.textContent = avatarPrice;
        clickCountDisplay.textContent = clickCount;
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
