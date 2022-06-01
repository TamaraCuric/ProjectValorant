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
const closeModalWindow = document.querySelector(".closeModal");

var offset = 0;
var offsetSmall = 0;

fetchAgentsJSON().then((agents) => {
  agents = agents.filter((agent) => agent.isPlayableCharacter == true);
  console.log(agents)
  populateDropdownMenu(agents);
  cloningCards(agents.slice(1, 9));
//   cloningModalWindows(agents.slice(1, 9));
  sliderMoveEvents();
});

if (mediaQuery.matches) {
  let navLinkTitles = getAllNavElementTitles();
  navLinkTitles.forEach((title) => {
    addNavElements(title);
  });
}

activateNavLink();

window.onmouseover = function (event) {
  if (
    !event.target.matches(".dropbtn") &&
    !event.target.matches(".dropdown-content") &&
    !event.target.matches(".dropdown-content a")
  ) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};






    openModal();
    closeModal();





////////////////// FUNKCIJE ///////////////////////////

async function fetchAgentsJSON() {
  const response = await fetch("https://valorant-api.com/v1/agents");
  const agents = await response.json();
  return agents.data;
}

function getAgentPicFromList(agentsList) {
  return agentsList.map((agent) => agent.bustPortrait);
}

function getAgentNamesFromAgentList(agentsList) {
  return agentsList.map((agent) => agent.displayName);
}

function agentsDropFunc() {
  document.getElementById("agentsDrop").classList.toggle("show");
}

function openSidebar() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("sidebarButton").style.marginLeft = "0px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSidebar() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("sidebarButton").style.marginLeft = "0";
}

function addNavElements(value) {
  let sidebar = document.getElementById("mySidebar");
  let anchor = document.createElement("a");
  anchor.innerHTML = value;
  sidebar.appendChild(anchor);
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

//funkcija ne radi kako treba za desno keystroke
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

function cloningModalWindows(agents) {
    for(let i = 0; i < agents.length; i++) {
        var cloneModal = modalOriginal.cloneNode(true);
        cloneModal.id = `modal${i + 1}`;
        cloneModal.getElementsByClassName("modal-title")[0].innerHTML = `${agents[i].displayName}`;
        cloneModal.style.cssText =
          "background-image: linear-gradient(to bottom, transparent,#211E27), url(" +
          agents[i].bustPortrait +
          ");";
      cloneModal.getElementsByClassName("role-pic").src = `${agents[i].role.displayIcon}`;
     

      cloneModal.getElementsByClassName("ability1").src = `${agents[i].abilities[0].displayIcon}`;
      cloneModal.getElementsByClassName("ability2").src = `${agents[i].abilities[1].displayIcon}`;
      cloneModal.getElementsByClassName("ability3").src = `${agents[i].abilities[2].displayIcon}`;
      cloneModal.getElementsByClassName("ability4").src = `${agents[i].abilities[3].displayIcon}`;
      slide.after(cloneModal);
    }
    // openModal();
    // closeModal();
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
    closeModalWindow.addEventListener("click", function () {
        modalWindow.style.display = "none";
    });
}

function openModal() {
    openModalWindow.addEventListener("click", function () {
        modalWindow.style.display = "block";
    });
}