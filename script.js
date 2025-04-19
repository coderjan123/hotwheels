let cookies = 0;
let upgradecookies = 1;
let Fabriken = 0;
let Fabrikenpreis = 100;
let Cookiecounter = 0;
let buy_multiplier = 1;
let temporärer_Fabrikenpreis = 0;
let fabrikenpreiszähler = 0;
let current_fabriken_price = 0;
let unlocked_mutliverse = false;
let multiplier = 1;







function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}







class Upgrade {
    constructor(name, price,price_growth, cookies_per_second,menge,id ,mengen_zähler_id, preiszähler , current_price){
    const upgradeContainer = document.getElementById("Upgrades");
    const boxcontainer = document.getElementById("boxcontainer");
    table = document.getElementById("table");
    this.name = name;
    this.price = price;
    this.price_growth = price_growth;
    this.cookies_per_second = cookies_per_second;
    this.id = id;
    this.preiszähler = price;
    this.current_price = current_price;
    this.mengen_zähler_id = mengen_zähler_id;
    this.menge = menge;


    this.name_backup = name;
    this.price_backup = price;
    this.price_growth_backup = price_growth;
    this.cookies_per_second_backup = cookies_per_second;
    this.id_backup = id;
    this.preiszähler_backup = price;
    this.current_price_backup = current_price;
    this.mengen_zähler_id_backup = mengen_zähler_id;
    this.menge_backup = menge;




    this.button = this.createButton();

    this.tabellen_zeile = document.createElement("tr");
    this.tabellen_zeile.id = this.id + "_row";
    table.appendChild(this.tabellen_zeile);

    this.name_für_tabelle = this.name_für_tabelle();
    this.objekt_zähler = this.createobjekt_zähler();
    document.getElementById("Upgrade_button_container").appendChild(this.button);
    this.tabellen_zeile.appendChild(this.name_für_tabelle);
    this.tabellen_zeile.appendChild(this.objekt_zähler);
    }



    createButton() {
        const btn = document.createElement("button");
        btn.innerText = "Kaufe "+ buy_multiplier +"x "+ " ??? "+" für " + Math.round(this.price) + " cookies"
        btn.className = "Upgrade_Button";
        btn.id = this.id;
    
        btn.addEventListener("click", () => this.Buying());
        
        btn.disabled = true;
        return btn;
      }
    createobjekt_zähler() {
        const counter = document.createElement("td");
        counter.innerText = this.menge;
        counter.className = "table_content";

        counter.id = this.mengen_zähler_id;

        return counter;
      }
      name_für_tabelle() {
        const name_für_tabelle = document.createElement("td");
        name_für_tabelle.innerText = this.name;
        name_für_tabelle.className = "table_content";
        name_für_tabelle.id = this.mengen_zähler_id + "_name";
        return name_für_tabelle;

        return counter;
      }
      reset_it_all() {
        console.log("Resetting all upgrades");
        this.name = this.name_backup;
        this.price = this.price_backup;
        this.price_growth = this.price_growth_backup;
        this.cookies_per_second = this.cookies_per_second_backup;
        this.id = this.id_backup;
        this.preiszähler = this.preiszähler_backup;
        this.current_price = this.current_price_backup;
        this.mengen_zähler_id = this.mengen_zähler_id_backup;
        this.menge = this.menge_backup;
        const button = document.getElementById(this.id);
        button.innerText = "Kaufe "+ buy_multiplier +"x "+ this.name +" für " + Math.round(this.price) + " cookies";
       
        document.getElementById(this.mengen_zähler_id).innerText = this.menge;
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
    if (Cookie_ammount < 0) {
      cookies += Cookie_ammount;
    } else {
      cookies += Math.round(Cookie_ammount * multiplier);
    }
      document.getElementById('cookie-count').innerText = cookies;
      Cookiecounter += Cookie_ammount;
      if (Cookiecounter > 10000 && !unlocked_mutliverse) {
        Update_multiverse();
      }
    
}
    
   
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
function Update_multiverse() {
  console.log("Multiverse unlocked");
  unlocked_mutliverse = true;
  const img = document.getElementById("multiverse");
  if (img.src.includes("image.png")) {
    img.src = "image2.png";
  };
  


}
let multiverse_btn = document.getElementById("multiverse");
multiverse_btn.addEventListener("click", () => {
  if (unlocked_mutliverse == true) {
    Do_multiversething();
  }
});

function Do_multiversething() {
  document.getElementById("cookie-count").innerText = 0; 
  oma.reset_it_all();
  fabrik.reset_it_all();
  cursor.reset_it_all();
  fabrik.menge = 0;
  cursor.menge = 0;
  cookies = 0;
  multiplier += getRandomFloat(0.2, 2);
  document.getElementById("Multiplier").innerText = multiplier;
  unlocked_mutliverse = false;
  const img = document.getElementById("multiverse");
  if (img.src.includes("image2.png")) {
    img.src = "image.png";
  };

}
// Starte den Intervall-Timer
setInterval(cookies_passiv, 5000);



// Pseudo-Code:
// 5 sekunden Timer Starten
// für diese Zeit Cookies zu variable hinzufügen
// danach anzeigen , timer reseten