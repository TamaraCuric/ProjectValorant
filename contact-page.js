const mediaQuery = window.matchMedia("(max-width: 931px)");
var navLinks = document.querySelectorAll(".move-right-navs a");
var dropdowns = document.getElementsByClassName("dropdown-content");
var cardholder = document.getElementById("cardholder");

fetchAgentsJSON().then((agents) => {
    agents = agents.filter((agent) => agent.isPlayableCharacter == true);
    populateDropdownMenu(agents);
});

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

function populateDropdownMenu(agents) {
    agents.forEach((agent) => {
      const dropdown = document.getElementById("agentsDrop");
      let anchor = document.createElement("a");
      anchor.innerHTML = agent.displayName;
      anchor.href = "/agents-page.html?agentName=" + agent.displayName.toLowerCase();
      dropdown.appendChild(anchor); 
    });
}

function activateNavLink() {
    const activePage = window.location.pathname;
    document.querySelectorAll("#navList li a").forEach((link) => {
      if (link.href.includes(activePage)) {
        link.classList.add("active");
      }
    });
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
