let cookies = 0;
let upgradecookies = 1;
let Fabriken = 0;
let Fabrikenpreis = 100;
let Cookiecounter = 0;
let buy_multiplier = 1;
let temporärer_Fabrikenpreis = 0;
let fabrikenpreiszähler = 0;
let current_price = 0;
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('click', () => {
      boxes.forEach(b => b.classList.remove('active')); // Alle deaktivieren
      box.classList.add('active'); // Nur die geklickte aktivieren
      buy_multiplier = parseInt(box.id, 10);
      console.log(buy_multiplier);
      updateFabrikenPreis();
    });
  });

function updateFabrikenPreis() {
    fabrikenpreiszähler = 0
    current_price = 100
    for (let i = 0; i < Fabriken + buy_multiplier; i++) {
        fabrikenpreiszähler += current_price;
        current_price *= 1.2;
    document.getElementById("Fabrikkaufen").innerText = "Kaufe "+ buy_multiplier +"x fabrik für " + fabrikenpreiszähler + " cookies";
}}
function EarnCookies(Cookie_ammount) {
    cookies += Cookie_ammount;
    document.getElementById('cookie-count').innerText = cookies;
    Cookiecounter += Cookie_ammount;
    
};
document.getElementById('cookie').onclick = function() {
    EarnCookies(upgradecookies);
    document.getElementById('cookie-count').innerText = cookies;
    
};
document.getElementById('Upgrade').onclick = function() {
    if (cookies >= 1 * buy_multiplier) {
        upgradecookies += buy_multiplier;
        EarnCookies(-1 * buy_multiplier);
    }
};
document.getElementById('Fabrikkaufen').onclick = function() {
    if (cookies >= fabrikenpreiszähler
    ) {
        Fabriken += buy_multiplier;
        EarnCookies(-fabrikenpreiszähler);
        document.getElementById("Fabrikencount").innerText = Fabriken;
        Fabrikenpreis = current_price *= 1.2;
        updateFabrikenPreis();
    }
};
setInterval(cookies_passiv, 5000);
function cookies_passiv() {
    for (let i = 0; i < Fabriken; i++) {
        EarnCookies(1000);
        
    }
    
}
setInterval(() => {
    document.getElementById('Final_cookie_counter').innerText = "Cookies pro Sekunde: " + Cookiecounter / 5;
    Cookiecounter = 0;
}, 5000);


// Starte den Intervall-Timer
setInterval(cookies_passiv, 5000);



// Pseudo-Code:
// 5 sekunden Timer Starten
// für diese Zeit Cookies zu variable hinzufügen
// danach anzeigen , timer reseten