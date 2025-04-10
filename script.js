let cookies = 0;
let upgradecookies = 1;
let Fabriken = 0;
let Fabrikenpreis = 100;
let Cookiecounter = 0;
let buy_multiplier = 1;
let temporärer_Fabrikenpreis = 0;
let fabrikenpreiszähler = 0;
let current_fabriken_price = 0;















class Upgrade {
    constructor(name, price,price_growth, cookies_per_second,menge,id ,mengen_zähler_id, preiszähler , current_price){
    const upgradeContainer = document.getElementById("Upgrades");
    this.name = name;
    this.price = price;
    this.price_growth = price_growth;
    this.cookies_per_second = cookies_per_second;
    this.id = id;
    this.preiszähler = price;
    this.current_price = current_price;
    this.mengen_zähler_id = mengen_zähler_id;
    this.menge = menge;
    this.button = this.createButton();
    upgradeContainer.appendChild(this.button);
    }


    createButton() {
        const btn = document.createElement("button");
        btn.innerText = "Kaufe "+ buy_multiplier +"x "+ this.name +" für " + Math.round(this.price) + " cookies"
        btn.className = "Upgrade_Button";
        btn.id = this.id;
    
        btn.addEventListener("click", () => this.Buying());
        
        return btn;
      }

   
      PriceUpdate() {    
        this.preiszähler = 0;
        this.current_price = this.price; // Reset to base price
    
        // Calculate the current price based on how many items have already been purchased
        for (let i = 0; i < this.menge; i++) {
            this.current_price *= this.price_growth;
        }
    
        // Calculate the total cost of buying the selected number of items
        let temp_price = this.current_price;
        for (let i = 0; i < buy_multiplier; i++) {
            this.preiszähler += temp_price;
            temp_price *= this.price_growth;
        }
    
        // Update the button text to reflect the new price
        document.getElementById(this.id).innerText = 
            "Kaufe " + buy_multiplier + "x " + this.name + " für " + Math.round(this.preiszähler) + " cookies";
    }
    Buying(){
    playClickSound();
    if (cookies >= Math.round(this.preiszähler)
    ) {
        this.menge += buy_multiplier;
        EarnCookies(-Math.round(this.preiszähler));
        document.getElementById(this.mengen_zähler_id).innerText = this.menge;
        //this.price = this.current_price *= 1.2;
        this.PriceUpdate();

    }
  }















}
const cursor = new Upgrade("Cursor", 1,1.4,0,0,"Cursorkaufen","Cursor_count",0,15);
const oma = new Upgrade("Oma",10,1.2,10,0,"Omakaufen","Oma_count",0,5);
const fabrik = new Upgrade("Fabrik",100,1.2,50,0,"Fabrikkaufen","Fabrikencount",0,100);



































const clickSoundSrc = "keyboard-sound-satisfying-304411.wav";
const boxes = document.querySelectorAll('.box');
    // Bei jedem Klick eine NEUE Instanz erzeugen!
    function playClickSound() {
        // Bei jedem Klick eine NEUE Instanz erzeugen!
        const sound = new Audio(clickSoundSrc);
        sound.volume = 1;
        sound.play().catch((e) => {
          console.warn("Sound konnte nicht abgespielt werden:", e);
        });
      }
boxes.forEach(box => {
    box.addEventListener('click', () => {
        playClickSound();
      boxes.forEach(b => b.classList.remove('active')); // Alle deaktivieren
      box.classList.add('active'); // Nur die geklickte aktivieren
      buy_multiplier = parseInt(box.id, 10);
      console.log(buy_multiplier);
      fabrik.PriceUpdate();
      oma.PriceUpdate();
      cursor.PriceUpdate();
    });
  });
  document.getElementById("1").classList.add('active'); // Standardmäßig die erste Box aktivieren


function EarnCookies(Cookie_ammount) {
    cookies += Cookie_ammount;
    document.getElementById('cookie-count').innerText = cookies;
    Cookiecounter += Cookie_ammount;
    
};
document.getElementById('cookie').onclick = function() {
    playClickSound();
    EarnCookies(cursor.menge + 1);
};

function cookies_passiv() {
    for (let i = 0; i < fabrik.menge; i++) {
        EarnCookies(1000);
    }

    for (let i = 0; i < oma.menge; i++) {
        EarnCookies(10);
    }
}



// Starte den Intervall-Timer
setInterval(cookies_passiv, 5000);



// Pseudo-Code:
// 5 sekunden Timer Starten
// für diese Zeit Cookies zu variable hinzufügen
// danach anzeigen , timer reseten