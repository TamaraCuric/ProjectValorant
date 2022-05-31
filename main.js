"use strict";

const carousel = document.querySelector(".carouselSlides");
const card = carousel.querySelector(".card");
const leftButton = document.querySelector(".slideLeft");
const rightButton = document.querySelector(".slideRight");
const carouselWidth = carousel.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card);
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
const slide = document.querySelector("#slide0");
const mediaQuerySlider = window.matchMedia("(max-width: 920px)");/////////

document.onkeydown = checkKey;
var agentsList;
var offset = 0;
var offsetSmall = 0;


fetchAgentsJSON().then((agents) => {
  agentsList = agents;
  let agentNames = getAgentNamesFromAgentList(agentsList);
  let agentPics = getAgentPicFromList(agentsList);

  //There are 2 Sovas so we need to make a set with unique values
  let agentNamesUnique = new Set(agentNames);
  let agentPicsUnique = agentPics.filter((pic) => pic !== null).slice(1, 9);

  agentNamesUnique.forEach((agent) => {
    const dropdown = document.getElementById("agentsDrop");
    let anchor = document.createElement("a");
    anchor.innerHTML = agent;
    dropdown.appendChild(anchor);
  });

  var agentNamesSlide = Array.from(agentNamesUnique).slice(1, 9);

  cloningCards(agentNamesSlide, agentPicsUnique);

  const cardCount = carousel.querySelectorAll(".card").length;
  const maxX = -(
    (cardCount / 3) * carouselWidth +
    cardMarginRight * (cardCount / 3) -
    carouselWidth -
    cardMarginRight
  );
 
  const maxXSmall =  -(
    cardCount * carouselWidth +
    cardMarginRight * cardCount -
    carouselWidth -
    cardMarginRight
  ); 
  
  
 

  if (mediaQuerySlider.matches) {
    leftButton.addEventListener("click", function () {
      clickLeftButtonSmall();
    });
    rightButton.addEventListener("click", function () {
      clickRightButtonSmall(maxXSmall);
    });
  } else {
    leftButton.addEventListener("click", function () {
      clickLeftButton();
      checkKey(maxX);
    });

    rightButton.addEventListener("click", function () {
      clickRightButton(maxX);
      checkKey(maxX);
    });
  }
});

let navLinks = [];
navLinks = document.getElementsByClassName("move-right-navs");
let allTextContent = navLinks[0].textContent.split("\n");
let actualTextValues = [];

allTextContent.forEach((line) => {
  if (line.trim() != "") actualTextValues.push(line.trim());
});
actualTextValues.pop();

const mediaQuery = window.matchMedia("(max-width: 931px)");




if (mediaQuery.matches) {
  actualTextValues.forEach((value) => {
    addNavElements(value);
  });
}

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


const activePage = window.location.pathname;
const headerLinks = document
  .querySelectorAll("#navList li a")
  .forEach((link) => {
    if (link.href.includes(activePage)) {
      link.classList.add("active");
    }
  });



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
function clickLeftButtonSmall () {
    if (offsetSmall !== 0) {
        offsetSmall += carouselWidth + cardMarginRight;
    } else {
        offsetSmall = -6856;
    }
    carousel.style.transform = `translateX(${offsetSmall}px)`;
}

function clickRightButtonSmall (maxXSmall) {
    if (offsetSmall !== maxXSmall) {
        offsetSmall -= carouselWidth + cardMarginRight;
    }  else {
        offsetSmall = 0;
    }  
    carousel.style.transform = `translateX(${offsetSmall}px)`; 
}

function clickLeftButton() {
  if (offset !== 0) {
    offset += carouselWidth + cardMarginRight;
  } else {
      offset = -1748;
  }
  carousel.style.transform = `translateX(${offset}px)`;
}

function clickRightButton(maxX) {
  if (offset !== maxX) {
    offset -= carouselWidth + cardMarginRight;
  } else {
      offset = 0;
  }
  carousel.style.transform = `translateX(${offset}px)`;
}

//funkcija ne radi kako treba za desno keystroke
function checkKey(e, maxX) {
  e = e || window.event;
  if (e.keyCode === 37) {
    clickLeftButton();
  } else if (e.keyCode === 39) {
    clickRightButton(maxX);
  }
}

function cloningCards(agentNamesSlide, agentPicsUnique) {
    for (let i = 0; i < agentNamesSlide.length; i++) {
      var clone = slide.cloneNode(true);
      clone.id = `slide${i + 1}`;
      clone.getElementsByClassName(
        "card__title"
      )[0].innerHTML = `${agentNamesSlide[i]}`;
      clone.style.cssText = 'background-image: linear-gradient(to bottom, transparent,#211E27), url('+agentPicsUnique[i]+');'
      slide.after(clone);
    }
  }

