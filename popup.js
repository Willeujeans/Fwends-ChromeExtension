let scoreElm = document.getElementById("count");

function setScore(num){
    chrome.storage.sync.set({"score": num }).then(() => {
        updateVisualScore(num);
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
    });
}

function storageCheck(){
    chrome.storage.sync.get('score',function(pull){
        if(pull.score == undefined){
            setScore(0);
        }
        updateVisualScore();
    });
}

document.body.addEventListener("mousedown",(event)=>{
    countUp();
});

storageCheck();