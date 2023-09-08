var contextMenuItem = {
    "id": "Fwend",
    "title": "use as name",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "Fwend" && clickData.selectionText){
        if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String){
            chrome.storage.sync.set({"name": clickData.selectionText });
        }
    }
});

function countDown(){
    chrome.storage.sync.get('score',function(pull){
        setScore(parseInt(pull.score) - 1);
    });
}

function setScore(num){
    chrome.storage.sync.set({"score": num });
}

function scoreToTime(score){
    let minutes = Math.floor(score/60);
    let seconds = Math.floor(score-(minutes*60));
    console.log(minutes, seconds);
    let stringTime ="";
    if(seconds < 10){
        stringTime = minutes.toString() + ":" + "0" + seconds.toString();
    }else{
        stringTime = minutes.toString() + ":" + seconds.toString();
    }
    return stringTime;
}

function updateVisualScore(){
    chrome.storage.sync.get('score',function(pull){
        updateBadgeVisual(scoreToTime(pull.score));
    });
}

function updateBadgeVisual(updatedText){
    chrome.action.setBadgeBackgroundColor({ color: [0,0,0,50] });
    chrome.action.setBadgeText({ text: updatedText});
}


function timerLoop(){
    countDown();
    updateVisualScore();
    setTimeout(() => {
        timerLoop();
    }, 1000);
}


timerLoop();