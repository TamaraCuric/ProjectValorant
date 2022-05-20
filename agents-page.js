async function fetchAgentsJSON(){
    const response = await fetch('https://valorant-api.com/v1/agents');
    const agents = await response.json()
    return agents.data;
}

fetchAgentsJSON().then( agents => {
    let imageSrc = agents[4].fullPortraitV2
    var _img = document.getElementById('id1');
    var newImg = new Image;
    newImg.onload = function() {
        _img.src = this.src;
    }
    newImg.src = imageSrc;
    agentDescription(agents[4])
    loadAbilityIcons(agents[4])
    abilityDescription(agents[4])
    agentBackStory(agents[4])
});

function agentDescription(agent){
    var agentName = document.getElementById('agentName');
    var text = document.createTextNode(agent.displayName);
    agentName.appendChild(text);
    // roleIcon, agentRole
    var agentRole = document.getElementById('agentRole');
    var text = document.createTextNode(agent.role.displayName);
    agentName.appendChild(text);

    let imageSrc = agent.role.displayIcon
    let _img = document.getElementById('roleIcon');
    let newImage = new Image;
    newImage.onload = function() {
        _img.src = this.src;
    }
    newImage.src = imageSrc;

}

function loadAbilityIcons(agent){
    for(i = 0; i < 4; i++){
        let imageSrc = agent.abilities[i].displayIcon
        let _img = document.getElementById('ability'+(i+1));
        let newImage = new Image;
        newImage.onload = function() {
            _img.src = this.src;
        }
        newImage.src = imageSrc;
    }
}

function abilityDescription(agent){
    var abilityDescriptionElement = document.getElementById("abilityDescription");
    var text = document.createTextNode(agent.abilities[0].description);
    abilityDescriptionElement.appendChild(text);

    var abilityNameElement = document.getElementById("abilityName");
    var titleName = document.createTextNode(agent.abilities[0].displayName);
    abilityNameElement.appendChild(titleName);
}
