var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

const mediaQuery = window.matchMedia("(max-width: 931px)");
var navLinks = document.querySelectorAll(".move-right-navs a");
var dropdowns = document.getElementsByClassName("dropdown-content");
var cardholder = document.getElementById("cardholder");
var agent = 'placeholder'

fetchAgentsJSON().then(agents => {
    agents = agents.filter((agent) => agent.isPlayableCharacter == true);
    loadAgent(agents, qs.agentName)
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

var button1 = document.getElementById('ability1');
var button2 = document.getElementById('ability2');
var button3 = document.getElementById('ability3');
var button4 = document.getElementById('ability4');




button1.addEventListener("click", function () {
    removeButtonsSelectedClass()
    button1.classList.add("selected")
    showAbility(1)
})


button2.addEventListener("click", function () {
    removeButtonsSelectedClass()
    button2.classList.add("selected")
    showAbility(2)
})

button3.addEventListener("click", function () {
    removeButtonsSelectedClass()
    button3.classList.add("selected")

    showAbility(3)
})

button4.addEventListener("click", function () {
    removeButtonsSelectedClass()
    button4.classList.add("selected")

    showAbility(4)
})



async function fetchAgentsJSON() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const agents = await response.json()
    return agents.data;
}

function changeAgentLinkTitle(agent){
    let agentLink = document.getElementById('agent-link')
    agentLink.innerHTML = agent.displayName.toUpperCase()
}

function agentSortAbilities(agent) {
    let tempAgent = structuredClone(agent);
    let counter = 0
    for (counter = 0; counter < 4; counter++) {
        if (tempAgent.abilities[counter].slot == 'Ability1')
            agent.abilities[0] = tempAgent.abilities[counter]

        if (tempAgent.abilities[counter].slot == 'Ability2')
            agent.abilities[1] = tempAgent.abilities[counter]

        if (tempAgent.abilities[counter].slot == 'Grenade')
            agent.abilities[2] = tempAgent.abilities[counter]

        if (tempAgent.abilities[counter].slot == 'Ultimate')
            agent.abilities[3] = tempAgent.abilities[counter]
    }
}

function updateElementTextValue(elementId, newTextValue) {
    let agentName = document.getElementById(elementId);
    let text = document.createTextNode(newTextValue);
    agentName.appendChild(text);
}

function replaceElementTextValue(elementId, newTextValue) {
    let abilityDescriptionElement = document.getElementById(elementId);
    let text = document.createTextNode(newTextValue);
    abilityDescriptionElement.innerHTML = '';
    abilityDescriptionElement.appendChild(text);
}

function updateElementImageSource(elementId, imgSource) {
    let _img = document.getElementById(elementId);
    let newImage = new Image;
    newImage.onload = function () {
        _img.src = this.src;
    }
    newImage.src = imgSource;
}


function agentDescription(agent) {
    updateElementTextValue('agentName', agent.displayName)
    updateElementTextValue('agentRole', "Class - " + agent.role.displayName)
    updateElementImageSource('roleIcon', agent.role.displayIcon)
}

function loadAbilityIcons(agent) {
    for (i = 0; i < 4; i++) {
        updateElementImageSource('ability' + (i + 1), agent.abilities[i].displayIcon)
    }
}

function abilityDescription(agent, abilityId) {
    replaceElementTextValue('abilityDescription', agent.abilities[abilityId - 1].description)
    replaceElementTextValue('abilityName', agent.abilities[abilityId - 1].displayName)
}


function agentBackstory(agent) {
    updateElementTextValue('agentBackstory', agent.description)
}

function removeButtonsSelectedClass() {
    let collection = document.getElementsByClassName("abilityIcon");
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains("selected")) {
            collection[i].classList.remove("selected");
        }
    }
}

function correctAgentByName(agent, agentName){
    return agent.displayName.toLowerCase() === agentName
}


function loadAgent(agents, agentName){
    agent = agents.find((agentInArray)=>correctAgentByName(agentInArray, agentName));
    if(agent == null)
        agent = agents[0]
    agentSortAbilities(agent)
    updateElementImageSource('agentPicture', agent.fullPortraitV2)
    updateElementTextValue('agentNameTitleScreen', agent.displayName)
    agentDescription(agent)
    loadAbilityIcons(agent)
    abilityDescription(agent, 1)
    agentBackstory(agent)
    showAbility(1)
    button1.classList.add('selected');
    changeAgentLinkTitle(agent)
}


function showAbility(abilityId) {
    let videoElem = document.getElementById('abilityVidShowcase');
    videoElem.src = "Resources/" + agent.displayName.toLowerCase().replace('/', '') + abilityId + '.mp4';
    videoElem.load();
    abilityDescription(agent, abilityId)
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
    let link = document.getElementById('agent-link')
    link.classList.add("active");
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
