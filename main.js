"use strict";
var agentsList;

fetchAgentsJSON().then((agents) => {
  agentsList = agents;
  let agentNames = getAgentNamesFromAgentList(agentsList);

  //There are 2 Sovas so we need to make a set with unique values
  let agentNamesUnique = new Set(agentNames);

  agentNamesUnique.forEach((agent) => {
    const dropdown = document.getElementById("agentsDrop");
    let anchor = document.createElement("a");
    anchor.innerHTML = agent;
    dropdown.appendChild(anchor);
  });
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
const headerLinks = document.querySelectorAll('#navList li a').forEach(link => {
    if(link.href.includes(activePage)) {
        // console.log(activePage);
        link.classList.add('active');
    }
})




////////////////// FUNKCIJE ///////////////////////////
function getAgentNamesFromAgentList(agentList) {
  return agentsList.map((agent) => agent.displayName);
}

async function fetchAgentsJSON() {
  const response = await fetch("https://valorant-api.com/v1/agents");
  const agents = await response.json();
  return agents.data;
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
  console.log(value);
  let sidebar = document.getElementById("mySidebar");
  let anchor = document.createElement("a");
  anchor.innerHTML = value;
  sidebar.appendChild(anchor);
}

