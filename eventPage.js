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
