"use strict";

const carousel = document.querySelector(".carouselSlides");
const card = carousel.querySelector(".card");
const leftButton = document.querySelector(".slideLeft");
const rightButton = document.querySelector(".slideRight");
const slide = document.querySelector("#slide0");
const modalOriginal = document.querySelector("#modal0");

const carouselWidth = carousel.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card);
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
const mediaQuerySlider = window.matchMedia("(max-width: 920px)");

const mediaQuery = window.matchMedia("(max-width: 931px)");

const openModalWindow = document.querySelector(".morebtn");
const modalWindow = document.querySelector("#myModal");
const modalWindSidemenu = document.querySelector("#sidemenu-modal");
const closeModalWindow = document.getElementsByClassName("closeModal");

const weaponName1 = document.getElementById("weapon1");
const weaponPrice1 = document.getElementById("price1");
const weaponType1 = document.getElementById("wtype1");
const weaponImage1 = document.getElementById("wimg1");
const weaponName2 = document.getElementById("weapon2");
const weaponPrice2 = document.getElementById("price2");
const weaponType2 = document.getElementById("wtype2");
const weaponImage2 = document.getElementById("wimg2");

const sidemenuModalWindow = document.getElementById("sidemenu-modal");
const weapon1Sidecard = document.getElementById("sidemenu-card-1");
const weapon2Sidecard = document.getElementById("sidemenu-card-2");
const modalSidecardTitle = document.getElementsByClassName("modal-weapon-title");
const modalSidecardType = document.getElementsByClassName("modal-weapon-type");
const modalSidecardPrice = document.getElementsByClassName("modal-weapon-price");
const modalSidecardImage = document.getElementsByClassName("weaponIMG");

var offset = 0;
var offsetSmall = 0;
var maxPrice = 0;
var expensiveWeapon = '';
var weaponType = '';
var weaponImage = '';

fetchAgentsJSON().then((agents) => {
  agents = agents.filter((agent) => agent.isPlayableCharacter == true);
  populateDropdownMenu(agents);
  cloningCards(agents.slice(1, 9));
  settingOnClickValueOfCards (agents);
  sliderMoveEvents();
});

fetchWeaponsJSON().then((weapons) => {
    maxPriceWeapon (weapons);
    sidemenuWeapon1();
    openModalForWeapon1(weapons);
    bestRifle (weapons);
    sidemenuWeapon2();
    openModalForWeapon2(weapons);
});

fetchTiersJSON().then((tiers) => {


})

activateNavLink();

var dropdowns = document.getElementsByClassName("dropdown-content");
var navLinks = document.querySelectorAll(".move-right-navs a");
var cardholder = document.getElementById("cardholder");

if(mediaQuery.matches) {
    navLinks.forEach(link => {
        let anchor = document.createElement("a");
        anchor.innerHTML = link.innerHTML;
        anchor.href = link.href;
        cardholder.appendChild(anchor);
    })
}


window.onmouseover = function (event) {
  if (
    !event.target.matches(".dropbtn") &&
    !event.target.matches(".dropdown-content") &&
    !event.target.matches(".dropdown-content a")
  ) {
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// if(mediaQuery.matches){
//     let fbPage = document.getElementById("fb-page");
//     fbPage.setAttribute("data-width", "90");
// }













//////////////////////////////////////////////////////////




////////////////// FUNKCIJE ///////////////////////////

async function fetchAgentsJSON() {
  const response = await fetch("https://valorant-api.com/v1/agents");
  const agents = await response.json();
  return agents.data;
}

async function fetchWeaponsJSON() {
    const response = await fetch("https://valorant-api.com/v1/weapons");
    const weapons = await response.json();
    return weapons.data;
}

async function fetchTiersJSON() {
    const response = await fetch("https://valorant-api.com/v1/competitivetiers");
    const tiers = await response.json();
    return tiers.data;
}

function agentsDropFunc() {
  document.getElementById("agentsDrop").classList.toggle("show");
}

function openSidebar() {
        document.getElementById("mySidebar").style.width = "40vw";
}


function closeSidebar() {
  document.getElementById("mySidebar").style.width = "0";
}


function moveSlideLeft(maxXVal) {
  if (offset !== 0) {
    offset += carouselWidth + cardMarginRight;
  } else {
    offset = maxXVal;
  }
  carousel.style.transform = `translateX(${offset}px)`;
}

function moveSlideRight(maxXVal) {
  if (offset !== maxXVal) {
    offset -= carouselWidth + cardMarginRight;
  } else {
    offset = 0;
  }
  carousel.style.transform = `translateX(${offset}px)`;
}

function checkKey(e, maxX) {
  if (e.keyCode === 37) {
    moveSlideLeft(maxX);
  } else if (e.keyCode === 39) {
    moveSlideRight(maxX);
  }
}

function cloningCards(agents) {
  for (let i = 0; i < agents.length; i++) {
    var clone = slide.cloneNode(true);
    clone.id = `slide${i + 1}`;
    let setValue = clone.getElementsByClassName("morebtn");
    setValue[0].value = `${i + 1}`;
    clone.getElementsByClassName(
      "card__title"
    )[0].innerHTML = `${agents[i].displayName}`;
    clone.style.cssText =
      "background-image: linear-gradient(to bottom, transparent,#211E27), url(" +
      agents[i].bustPortrait +
      ");";
    slide.after(clone);
  }
}

function settingOnClickValueOfCards (agents) {
    const morebtn = document.getElementsByClassName("morebtn");
    Array.from(morebtn).forEach(button => {
        button.onclick = function (){openModal(button.value, agents)};
    })
}

function getAllNavElementTitles() {
  let navLinks = document.getElementsByClassName("move-right-navs");
  let allTextContentFromNavLinksContainer = navLinks[0].textContent.split("\n");
  let navTitles = [];

  allTextContentFromNavLinksContainer.forEach((line) => {
    if (line.trim() != "") navTitles.push(line.trim());
  });
  //last line catches icon as well so we pop it off
  navTitles.pop();
  return navTitles;
}

function activateNavLink() {
  const activePage = window.location.pathname;
  document.querySelectorAll("#navList li a").forEach((link) => {
    if (link.href.includes(activePage)) {
      link.classList.add("active");
    }
  });
}

function numOfCardsCreated() {
  return carousel.querySelectorAll(".card").length;
}

function populateDropdownMenu(agents) {
  agents.forEach((agent) => {
    const dropdown = document.getElementById("agentsDrop");
    let anchor = document.createElement("a");
    anchor.innerHTML = agent.displayName;
    dropdown.appendChild(anchor);
  });
}

function maxXCooridante(cardCount) {
  return -(
    (cardCount / 3) * carouselWidth +
    cardMarginRight * (cardCount / 3) -
    carouselWidth -
    cardMarginRight
  );
}

function maxXSmallCoordinate(cardCount) {
  return -(
    cardCount * carouselWidth +
    cardMarginRight * cardCount -
    carouselWidth -
    cardMarginRight
  );
}

function sliderMoveEvents() {
    const cardCount = numOfCardsCreated();
    const maxX = maxXCooridante(cardCount);
    const maxXSmall = maxXSmallCoordinate(cardCount);
    document.addEventListener("keydown", (event) => {
        checkKey(event, maxX);
    });

    leftButton.addEventListener("click", function () {
        moveSlideLeft(calculateMaxXVal(maxX, maxXSmall));
    });

    rightButton.addEventListener("click", function () {
        moveSlideRight(calculateMaxXVal(maxX, maxXSmall));
    });

    setInterval(function () {
        moveSlideRight(calculateMaxXVal(maxX, maxXSmall));
    }, 3000);
}

function calculateMaxXVal(maxX, maxXSmall) {
    let maxXVal = maxX;
    if (mediaQuerySlider.matches)
        maxXVal = maxXSmall;
    return maxXVal;
}

function closeModal() {
        modalWindow.style.display = "none";
}
function closeModalSidemenu() { 
    modalWindSidemenu.style.display = "none";
}

function openModal(val, agents) {
    for(let i = 0;i < agents.length; i++){
        if(i == val){
            changeModalAgent(agents[i]);
        }
    } 
}

function changeModalAgent(agent) {
    document.getElementsByClassName(
        "modal-title"
      )[0].innerHTML = `${agent.displayName}`;
      document.getElementsByClassName(
        "role-pic"
      )[0].src = `${agent.role.displayIcon}`;
      document.getElementsByClassName(
        "ability1"
      )[0].src = `${agent.abilities[0].displayIcon}`;
      document.getElementsByClassName(
        "ability2"
      )[0].src = `${agent.abilities[1].displayIcon}`;
      document.getElementsByClassName(
        "ability3"
      )[0].src = `${agent.abilities[2].displayIcon}`;
      document.getElementsByClassName(
        "ability4"
      )[0].src = `${agent.abilities[3].displayIcon}`;
      document.querySelector(".modal-content").style.cssText =
        "background-image: linear-gradient(to bottom, transparent,#211E27), url(" +
        agent.bustPortrait +
        ");background-color: #211E27;background-position: center;background-size: 85vw;background-repeat: no-repeat;margin: 8.5vh auto;padding: 2vw;border: 1vw solid #dc3d4b;width: 90vw;height: 90vh;text-align: center;";
        modalWindow.style.display = "block";
}

function maxPriceWeapon (weapons) {
    weapons.forEach(weapon => {
        if (weapon.shopData !== null){
            if (weapon.shopData.cost !== null  && weapon.shopData.cost > maxPrice ) {
                weaponData(weapon);
            }
        }  
    })
    return (maxPrice, expensiveWeapon, weaponType, weaponImage);
}

function weaponData(weapon) {
    maxPrice = weapon.shopData.cost;
    expensiveWeapon = weapon.displayName;
    weaponType = weapon.shopData.category;
    weaponImage = weapon.displayIcon;
}

function bestRifle(weapons) {
    weapons.forEach((weapon) => {
      if (weapon.shopData !== null) {
        if (weapon.shopData.category === "Rifles") {
          if(weapon.shopData.cost >= 2900 && weapon.weaponStats.firstBulletAccuracy > 0.2){
              weaponData(weapon);
          }
        }
      }
    });
    return (maxPrice, expensiveWeapon, weaponType, weaponImage);
  }

  function sidemenuWeapon2() {
    weaponName2.innerHTML = expensiveWeapon;
    weaponPrice2.innerHTML = new Intl.NumberFormat().format(maxPrice);
    weaponType2.innerHTML = weaponType;
    weaponImage2.src = weaponImage;
}

function sidemenuWeapon1() {
    weaponName1.innerHTML = expensiveWeapon;
    weaponPrice1.innerHTML = new Intl.NumberFormat().format(maxPrice);
    weaponType1.innerHTML = weaponType;
    weaponImage1.src = weaponImage;
}

function openModalForWeapon1(weapons) {
    weapon1Sidecard.addEventListener("click", function () {
        maxPriceWeapon(weapons);
        settingSidemenuModalValues();
    });
}

function openModalForWeapon2(weapons) {
    weapon2Sidecard.addEventListener("click", function () {
        bestRifle(weapons);
        settingSidemenuModalValues();
    });
}


function settingSidemenuModalValues() {
    modalSidecardTitle[0].innerHTML = expensiveWeapon;
    modalSidecardPrice[0].innerHTML = new Intl.NumberFormat().format(maxPrice);
    modalSidecardType[0].innerHTML = weaponType;
    modalSidecardImage[0].src = weaponImage;
    sidemenuModalWindow.style.display = "block";
}