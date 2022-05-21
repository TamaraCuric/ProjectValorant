"use strict";
var agentsList;

fetchAgentsJSON().then((agents) => {
  agentsList = agents;
  iHaveAgentsLoaded(agentsList);
  let agentNames = getAgentNamesFromAgentList(agentsList);
  console.log(agentNames);

  let agentNamesUnique = new Set(agentNames);

  agentNamesUnique.forEach(agent => {
    const dropdown = document.getElementById("agentsDrop");
    let anchor = document.createElement("a");
    anchor.innerHTML = agent;
    dropdown.appendChild(anchor);
  });
});

function getAgentNamesFromAgentList(agentList) {
  return agentsList.map((agent) => agent.displayName);
}

function iHaveAgentsLoaded(agents) {
  console.log(agents);
}

async function fetchAgentsJSON() {
  const response = await fetch("https://valorant-api.com/v1/agents");
  const agents = await response.json();
  return agents.data;
}

// Header active-----------------------------------------------------

function avtiveNavElement(e) {
  if (document.querySelector("#navList a.active") !== null) {
    document.querySelector("#navList a.active").classList.remove("active");
  }
  e.target.className = "active";
}

//Dripdown agents-------------------------------------------------------

/* When the user hovers over the button,
toggle between hiding and showing the dropdown content */
function agentsDropFunc() {
  document.getElementById("agentsDrop").classList.toggle("show");
}

//   Close the dropdown menu if the user clicks outside of it
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
