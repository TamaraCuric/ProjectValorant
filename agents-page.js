
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



function agentDescription(agent){
    updateElementTextValue('agentName', agent.displayName)
    // let agentName = document.getElementById('agentName');
    // let text = document.createTextNode(agent.displayName);
    // agentName.appendChild(text);

    updateElementTextValue('agentRole', "Class - " + agent.role.displayName )
    // let agentRole = document.getElementById('agentRole');
    // text = document.createTextNode("Class - " + agent.role.displayName);
    // agentRole.appendChild(text);

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

function abilityDescription(agent, abilityId){
    let abilityDescriptionElement = document.getElementById("abilityDescription");
    let text = document.createTextNode(agent.abilities[abilityId - 1].description);
    abilityDescriptionElement.innerHTML ='';
    abilityDescriptionElement.appendChild(text);
    
    let abilityNameElement = document.getElementById("abilityName");
    let titleName = document.createTextNode(agent.abilities[abilityId - 1].displayName);
    abilityNameElement.innerHTML ='';
    abilityNameElement.appendChild(titleName);
}


function agentBackstory(agent){
    let agentBackstory = document.getElementById("agentBackstory");
    let text = document.createTextNode(agent.description);
    agentBackstory.appendChild(text);
}

function removeButtonsSelectedClass(){
    let collection = document.getElementsByClassName("abilityIcon");
    for (let i = 0; i < collection.length; i++) {
        console.log(collection[i].classList.contains("selected"))
        if(collection[i].classList.contains("selected"))
        {
            console.log('found class')
            collection[i].classList.remove("selected");
        }
    }
}

var agent = 'placeholder'

fetchAgentsJSON().then( agents => {
    agent = agents[3];
     agentSortAbilities(agent)
    console.log(agent)
    let imageSrc = agent.fullPortraitV2
    let _img = document.getElementById('id1');
    let newImg = new Image;
    newImg.onload = function() {
        _img.src = this.src;
    }
    newImg.src = imageSrc;
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
