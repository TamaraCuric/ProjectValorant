var mq = window.matchMedia("(max-width: 1100px)")

var searchBtn = document.getElementById('search-btn');
var foundAgents = []
var currentPage = 1

const mediaQuery = window.matchMedia("(max-width: 931px)");
var navLinks = document.querySelectorAll(".move-right-navs a");
var dropdowns = document.getElementsByClassName("dropdown-content");
var cardholder = document.getElementById("cardholder");


fetchAgentsJSON().then(agents => {
    agents = removeDuplicateSova(agents)
    populateDropdownMenu(agents);
    foundAgents = agents;
    sortAgentsByAlphabet(agents)
    searchBtn.onclick = function() {
        deleteCards();
        removePager()
        let categories = getActiveSearchParams()
        let searchWord = getSearchWord()
        foundAgents = searchAgents(categories, searchWord, agents)
        createCards(foundAgents)
        createPager(foundAgents.length)
    }
    createCards(agents);
    createPager(agents.length)
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



























function sortAgentsByAlphabet(agents){
    agents.sort((a, b) => a.displayName.localeCompare(b.displayName))
}

function removeDuplicateSova(agents){
    return agents.filter(agent=>{return agent.isPlayableCharacter==true})
}

function filterAgentsByRole(role, agents){
    return agents.filter(agent=>{
        return agent.role.displayName == role
    })
}

function searchAgents(categories, searchWord, agents){
    let searchableAgents = []
    if(categories.length != 0){
        categories.forEach(category=>{
            searchableAgents = searchableAgents.concat(filterAgentsByRole(category, agents))
        })
    }
    else
        searchableAgents = agents
    return searchForAgentByName(searchWord, searchableAgents)
}

function searchForAgentByName(searchWord, agents){
    return agents.filter(agent=>{
        return agent.displayName.toLowerCase().includes(searchWord.toLowerCase())
    })
}

async function fetchAgentsJSON() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const agents = await response.json()
    return agents.data;
}
function getSearchWord(){
    var inputs = document.getElementById("text-input");
    return inputs.value

}

function getActiveSearchParams(){
    var inputs = document.getElementsByTagName("input");
    var idsOfChecked = []
    var categories = []
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox" && inputs[i].checked == true) {
            idsOfChecked.push(inputs[i].id)
        }  
    }
    idsOfChecked.forEach(id=>{
        let label = document.getElementById(id+"-label");
        categories.push(label.innerHTML)
    })
    return categories;

}

function deleteCards(){
    let allAgentCards = document.getElementsByClassName("agent-card");
    for(var i = allAgentCards.length - 1; i >= 0; i--) {
        allAgentCards[i].remove();
    }
}

function setPagerActive(linkNumber){
    let pagerLinks = document.getElementsByClassName("pager-link");
    for(var i = 0; i < pagerLinks.length ; i++) {
        pagerLinks[i].classList.remove('active')
    }
    pagerLinks[linkNumber].classList.add('active')

}

function removePager(){
    let pager = document.getElementsByClassName('pager-link');
    for(var i = pager.length - 1; i >= 0; i--) {
        pager[i].remove();
    }
}

function createPager(agentCount){
    let pagerContainer = document.getElementById('pager')
    let numberOfPages = Math.ceil(agentCount/4)
    let anchorLeft = document.createElement("a");
    anchorLeft.innerHTML = "&laquo;";
    anchorLeft.classList.add("pager-link")
    anchorLeft.onclick = function(){
        if(currentPage != 1){
            currentPage--
            deleteCards();
            createCards(foundAgents.slice((currentPage-1)*4, (currentPage-1+4)*4))
            setPagerActive(currentPage)
        }
    }
    pagerContainer.appendChild(anchorLeft)
    for(let i = 1; i <= numberOfPages; i++ ){
        let anchor = document.createElement("a");
        anchor.innerHTML = i;
        anchor.classList.add("pager-link")
        if(i==1) anchor.classList.add("active")
        anchor.onclick = function(){
            currentPage = i;
            deleteCards();
            createCards(foundAgents.slice((currentPage-1)*4, (currentPage-1+4)*4))
            setPagerActive(currentPage)
        }
        pagerContainer.appendChild(anchor)
    }
    let anchorRight = document.createElement("a");
    anchorRight.innerHTML = "&raquo;";
    anchorRight.classList.add("pager-link")
    anchorRight.onclick = function(){
        if(currentPage != numberOfPages){
            currentPage++
            deleteCards();
            createCards(foundAgents.slice((currentPage-1)*4, (currentPage-1+4)*4))
            setPagerActive(currentPage)
        }
    }
    pagerContainer.appendChild(anchorRight)
}

function createCards(agents) {
    let leftColumn = document.getElementsByClassName('column')[0];
    let rightColumn = document.getElementsByClassName('column')[1];
    for(let cardCounter = 0; cardCounter < agents.length; cardCounter++ ){
        let agent = agents[cardCounter] 
        if(cardCounter == 4)
            break
        let card = document.createElement('div');
        card.onclick = function () {
            location.href = "/agents-page.html?agentName=" + agent.displayName.toLowerCase();
        };
        card.classList.add('agent-card')
        card.id = 'card' + cardCounter

        let agentImg = document.createElement('img');
        agentImg.src = agent.bustPortrait;
        agentImg.classList.add("agent-picture");

        let agentName = document.createElement('h2');
        agentName.classList.add('agent-name')
        agentName.innerHTML = agent.displayName

        let abilityIcons = document.createElement('div');
        abilityIcons.classList.add('abilityButtons');
        for (let i = 0; i < 4; i++) {
            let icon = document.createElement('img');
            icon.classList.add('abilityIcon');
            icon.id = 'ability' + (i + 1);
            icon.src = agent.abilities[i].displayIcon;
            abilityIcons.appendChild(icon);
        }
        card.appendChild(agentImg);
        card.appendChild(agentName);
        card.appendChild(abilityIcons);
        if (mq.matches) {
            if (cardCounter == 0 || cardCounter == 1)
                leftColumn.appendChild(card)
            else
                rightColumn.appendChild(card)
        }
        else {
            if (cardCounter == 0 || cardCounter == 2)
                leftColumn.appendChild(card)
            else
                rightColumn.appendChild(card)
        }
    };
}