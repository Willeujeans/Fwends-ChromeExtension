let scoreElm = document.getElementById("count");

function setName(name){
    chrome.storage.sync.set({"name": name });
}

function updateVisualName(){
    chrome.storage.sync.get('name',function(pull){
        document.getElementById("name").innerHTML = pull.name;
    });
}

function setScore(num){
    chrome.storage.sync.set({"score": num }).then(() => {
        updateVisualScore();
        checkForGoal(num);
    });
}

function countUp(){
    chrome.storage.sync.get('score',function(pull){
        setScore(parseInt(pull.score) + 1);
    });
}


function updateVisualScore(){
    chrome.storage.sync.get('score',function(pull){
        scoreElm.innerHTML = scoreToTime(parseInt(pull.score));
        updateBadgeVisual(scoreToTime(pull.score));
    });
}

function updateBadgeVisual(updatedText){
    chrome.action.setBadgeBackgroundColor({ color: [0,0,0,50] });
    chrome.action.setBadgeText({ text: updatedText});
}

function storageCheck(){
    chrome.storage.sync.get('score',function(pull){
        if(pull.score == undefined){
            setScore(0);
        }
        updateVisualScore();
    });
    chrome.storage.sync.get('name',function(pull){
        if(pull.name == undefined){
            setName("Dave");
        }
        updateVisualName();
    });
}

function changeCatchers(){
    chrome.storage.onChanged.addListener(function(){
            updateVisualScore();
            updateVisualName();
    });
}

function checkForGoal(num){
    if(num == 1010){
        var message = "Thats a whole " + num + " clicks!";
        sendMessage("NICE!", message);
    }
}

function sendMessage(title, message){
    var notifOptions = {
        type:"basic",
        iconUrl: "icon48.png",
        title: title,
        message: message
    };
    chrome.notifications.create("messageNotif", notifOptions);
}

document.getElementById("buttonClicker").addEventListener("mousedown",(event)=>{
    countUp();
});

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

function startUp(){
    storageCheck();
    changeCatchers();
}

startUp();