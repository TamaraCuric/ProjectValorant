"use strict";

const carousel = document.querySelector(".carouselSlides");
const card = carousel.querySelector(".card");
const leftButton = document.querySelector(".slideLeft");
const rightButton = document.querySelector(".slideRight");
const slide = document.querySelector("#slide0");
const carouselWidth = carousel.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card);
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
const mediaQuerySlider = window.matchMedia("(max-width: 920px)");
const modalWindow = document.querySelector("#myModal");
const tiersCardContainer = document.getElementById("tier-container");
const tierCard = document.querySelector(".tier-card");
const tierName = document.querySelector(".tier-name");
const loadMore = document.getElementById("loadMore");
const mediaQuery = window.matchMedia("(max-width: 931px)");
const mediaQuery420 = window.matchMedia("(max-width: 420px)");
const maxTiers = 7;
const loadTiers = 6;
const hiddenClass = "hidden";
var navLinks = document.querySelectorAll(".move-right-navs a");
var dropdowns = document.getElementsByClassName("dropdown-content");
var cardholder = document.getElementById("cardholder");
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

fetchTiersJSON().then((tiers) => {
  makeTierCards(tiers[0].tiers.slice(3, -1));

  var tierCardsArray = Array.from(tiersCardContainer.querySelectorAll(".tier-card"));
  const hiddenTiers = Array.from(document.querySelectorAll(".hidden"));

  tierCardsArray.forEach(function (card, index) {
      if(index > maxTiers - 1) {
          card.classList.add(hiddenClass);
      }
  });
  loadMore.addEventListener("click", function () {
      [].forEach.call(document.querySelectorAll("." + hiddenClass), function (card, index) {
          if(index < loadTiers) {
              card.classList.remove(hiddenClass);
          }
          if (document.querySelectorAll("." + hiddenClass).length === 0) {
              loadMore.style.display = "none";
          }
      })
  })
  
})

activateNavLink();

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

if(mediaQuery.matches) {
    navLinks.forEach(link => {
        let anchor = document.createElement("a");
        anchor.innerHTML = link.innerHTML;
        anchor.href = link.href;
        cardholder.appendChild(anchor);
    })
}

async function fetchAgentsJSON() {
  const response = await fetch("https://valorant-api.com/v1/agents");
  const agents = await response.json();
  return agents.data;
}

async function fetchTiersJSON() {
  const response = await fetch("https://valorant-api.com/v1/competitivetiers");
  const tiers = await response.json();
  return tiers.data;
}

function activateNavLink() {
  const activePage = window.location.pathname;
  document.querySelectorAll("#navList li a").forEach((link) => {
    if (link.href.includes(activePage)) {
      link.classList.add("active");
    }
  });
}

function populateDropdownMenu(agents) {
  agents.forEach((agent) => {
    const dropdown = document.getElementById("agentsDrop");
    let anchor = document.createElement("a");
    anchor.innerHTML = agent.displayName;
    anchor.href = "/agents-page.html?agentName=" + agent.displayName.toLowerCase();
    dropdown.appendChild(anchor); 
  });
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

function makeTierCards(tiers) {
  tiers.forEach(tier => {
      var tierClone = tierCard.cloneNode(true);
      tierClone.getElementsByClassName("tier-name")[0].innerHTML = tier.tierName;
      tierClone.style.cssText = "background-image: url("+tier.largeIcon + ")";
      //   tier.largeIcon
      // if(mediaQuery420.matches) {
      //   tierClone.style.cssText = "flex: 30%;position: relative;background-image: url("+
      //   tier.largeIcon + ");background-color: #dc3d4b;height: 30vh;background-repeat: no-repeat;background-size: 8rem;background-position-y: 2vh;background-position-x: center;border: 3px solid #111;outline: solid 3px #111;outline-offset: -12px;margin: 0.8rem;"
      // }
      // else{
      //   tierClone.style.cssText = "flex: 30%;position: relative;background-image: url("+
      //   tier.largeIcon + ");background-color: #dc3d4b;height: 30vh;background-repeat: no-repeat;background-size: 14rem;background-position-y: 1vh;background-position-x: center;border: 3px solid #111;outline: solid 3px #111;outline-offset: -12px;margin: 0.8rem;"
      // }
      tierCard.after(tierClone);
  })
  let firstRankCard = document.getElementsByClassName("tier-card")[0];
  firstRankCard.style.cssText = "flex: 100%"
}

function openModal(val, agents) {
  for(let i = 0;i < agents.length; i++){
      if(i == val){
          changeModalAgent(agents[i]);
      }
  } 
}

function numOfCardsCreated() {
  return carousel.querySelectorAll(".card").length;
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

function checkKey(e, maxX) {
  if (e.keyCode === 37) {
    moveSlideLeft(maxX);
  } else if (e.keyCode === 39) {
    moveSlideRight(maxX);
  }
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

function calculateMaxXVal(maxX, maxXSmall) {
  let maxXVal = maxX;
  if (mediaQuerySlider.matches)
      maxXVal = maxXSmall;
  return maxXVal;
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
      ");background-color: #211E27;background-position: center;background-size: contain;background-repeat: no-repeat;margin: 8.5vh auto;padding: 2vw;border: 1vw solid #dc3d4b;width: 90vw;height: 90vh;text-align: center;";
      modalWindow.style.display = "block";
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

function closeModal() {
        modalWindow.style.display = "none";
}
