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
        console.log(pull.score);
        scoreElm.innerHTML = parseInt(pull.score);
        chrome.action.setBadgeText({ text: pull.score.toString() });
    });
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
        updateVisualName();
    });
}

function checkForGoal(num){
    if(num == 10){
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

document.body.addEventListener("mousedown",(event)=>{
    countUp();
});

function startUp(){
    storageCheck();
    changeCatchers();
}

startUp();