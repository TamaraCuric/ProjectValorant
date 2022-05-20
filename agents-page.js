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
});
