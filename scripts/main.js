// hide opponents rating
var hideOpponentsRating = document
    .getElementById("hideOpponentsRating");

getHideOpponentsRatingValue(hideOpponentsRating);
hideOpponentsRating
    .addEventListener('change', function () {
        hideOppenentsRatingChange();
    })

function getHideOpponentsRatingValue(element) {
    chrome.storage.local.get("hideOpponentsRatingKey").then((value) => {
        console.log("Retrieved hide opponents rating: " + value.hideOpponentsRatingKey);
        if (value.hideOpponentsRatingKey == null || value.hideOpponentsRatingKey == undefined) {
            chrome.storage.local.set({ hideOpponentsRatingKey: true }).then(() => {
                element.checked = true;
            });
        } else {
            element.checked = value.hideOpponentsRatingKey;
        }
    });
}

function hideOppenentsRatingChange() {
    const value = document.getElementById("hideOpponentsRating").checked
    console.log("Hide opponents rating: " + value)

    chrome.storage.local.set({ hideOpponentsRatingKey: value });

    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
        chrome.tabs.sendMessage(tab.id, { message: "refresh" });
    });
}
//hide opponents rating