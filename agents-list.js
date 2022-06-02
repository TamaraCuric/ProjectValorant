fetchAgentsJSON().then(agents =>{
    // sort agent by name
    // take first 4
    // create 2/2 cards
    // calc number of pagers (agents->length/4) 
    createCards(agents.slice(-4));

});

async function fetchAgentsJSON() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const agents = await response.json()
    return agents.data;
}

function createCards(agents){
    agents.forEach(agent=>{
        let container = document.getElementsByClassName('container')[0];

        let card = document.createElement('div');
        card.classList.add('agent-card')
        card.id = 'card'+ 3

        let agentImg = document.createElement('img');
        agentImg.src = agent.bustPortrait;
        agentImg.classList.add("agent-picture");

        let agentName = document.createElement('h2');
        agentName.classList.add('agent-name')
        agentName.innerHTML = agent.displayName

        let abilityIcons = document.createElement('div');
        abilityIcons.classList.add('abilityButtons');
        for(let i=0; i < 4; i++){
            let icon = document.createElement('img');
            icon.classList.add('abilityIcon');
            icon.id = 'ability'+(i+1);
            icon.src = agent.abilities[i].displayIcon;
            abilityIcons.appendChild(icon);
        }

        card.appendChild(agentImg);
        card.appendChild(agentName);
        card.appendChild(abilityIcons);

        container.appendChild(card);
        
    })
}