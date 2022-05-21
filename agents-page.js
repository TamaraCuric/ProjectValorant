
async function fetchAgentsJSON(){
    const response = await fetch('https://valorant-api.com/v1/agents');
    const agents = await response.json()
    return agents.data;
}

function agentSortAbilities(agent){
    let tempAgent = structuredClone(agent);
    let counter = 0
    for(counter = 0; counter < 4; counter++)
    {
        if(tempAgent.abilities[counter].slot == 'Ability1')
        agent.abilities[0] = tempAgent.abilities[counter]
        
        if(tempAgent.abilities[counter].slot == 'Ability2')
        agent.abilities[1] = tempAgent.abilities[counter]
    
        if(tempAgent.abilities[counter].slot == 'Grenade')
        agent.abilities[2] = tempAgent.abilities[counter]
    
        if(tempAgent.abilities[counter].slot == 'Ultimate')
        agent.abilities[3] = tempAgent.abilities[counter]
    }
}

function updateElementTextValue(elementId, newTextValue){
    let agentName = document.getElementById(elementId);
    let text = document.createTextNode(newTextValue);
    agentName.appendChild(text);
}

function replaceElementTextValue(elementId, newTextValue){
    let abilityDescriptionElement = document.getElementById(elementId);
    let text = document.createTextNode(newTextValue);
    abilityDescriptionElement.innerHTML ='';
    abilityDescriptionElement.appendChild(text);
}

function updateElementImageSource(elementId, imgSource){
    let _img = document.getElementById(elementId);
    let newImage = new Image;
    newImage.onload = function() {
        _img.src = this.src;
    }
    newImage.src = imgSource;    
}


function agentDescription(agent){
    updateElementTextValue('agentName', agent.displayName)
    updateElementTextValue('agentRole', "Class - " + agent.role.displayName )
    updateElementImageSource('roleIcon', agent.role.displayIcon)
}

function loadAbilityIcons(agent){
    for(i = 0; i < 4; i++){
        updateElementImageSource('ability'+(i+1), agent.abilities[i].displayIcon)
    }
}

function abilityDescription(agent, abilityId){
    replaceElementTextValue('abilityDescription', agent.abilities[abilityId - 1].description)
    replaceElementTextValue('abilityName', agent.abilities[abilityId - 1].displayName)
}


function agentBackstory(agent){
    updateElementTextValue('agentBackstory', agent.description)
}

function removeButtonsSelectedClass(){
    let collection = document.getElementsByClassName("abilityIcon");
    for (let i = 0; i < collection.length; i++) {
        if(collection[i].classList.contains("selected"))
        {
            collection[i].classList.remove("selected");
        }
    }
}

var agent = 'placeholder'

fetchAgentsJSON().then( agents => {
    agent = agents[3];
    agentSortAbilities(agent)
    updateElementImageSource('id1', agent.fullPortraitV2)
    agentDescription(agent)
    loadAbilityIcons(agent)
    abilityDescription(agent, 1)
    agentBackstory(agent)
    showAbility(1)
});



var button1 = document.getElementById('ability1');
var button2 = document.getElementById('ability2');
var button3 = document.getElementById('ability3');
var button4 = document.getElementById('ability4');


function showAbility(abilityId){
    let videoElem = document.getElementById('abilityVidShowcase');
    videoElem.src = "Resources/" + agent.displayName.toLowerCase() +abilityId +  '.mp4';
    videoElem.load();
    abilityDescription(agent, abilityId)
}

button1.addEventListener("click", function(){
    removeButtonsSelectedClass()
    button1.classList.add("selected")
    showAbility(1)    
})


button2.addEventListener("click", function(){
    removeButtonsSelectedClass()
    button2.classList.add("selected")
    showAbility(2)    
})

button3.addEventListener("click", function(){
    removeButtonsSelectedClass()
    button3.classList.add("selected")

    showAbility(3)    
})

button4.addEventListener("click", function(){
    removeButtonsSelectedClass()
    button4.classList.add("selected")

    showAbility(4)    
})
