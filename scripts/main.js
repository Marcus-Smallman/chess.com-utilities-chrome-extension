// hide opponents rating
var hideOpponentsRating = document
    .getElementById("hideOpponentsRating");

getHideOpponentsRatingValue(hideOpponentsRating);
hideOpponentsRating
    .addEventListener('change', function () {
        hideOppenentsRatingChange();
    });

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
        chrome.tabs.sendMessage(tab.id, { message: "refreshOpponentsRating" });
    });
}
// hide opponents rating

// hide your rating
var hideYourRating = document
    .getElementById("hideYourRating");

getHideYourRatingValue(hideYourRating);
hideYourRating
    .addEventListener('change', function () {
        hideYourRatingChange();
    });

function getHideYourRatingValue(element) {
    chrome.storage.local.get("hideYourRatingKey").then((value) => {
        console.log("Retrieved hide your rating: " + value.hideYourRatingKey);
        if (value.hideYourRatingKey == null || value.hideYourRatingKey == undefined) {
            chrome.storage.local.set({ hideYourRatingKey: true }).then(() => {
                element.checked = true;
            });
        } else {
            element.checked = value.hideYourRatingKey;
        }
    });
}

function hideYourRatingChange() {
    const value = document.getElementById("hideYourRating").checked
    console.log("Hide your rating: " + value)

    chrome.storage.local.set({ hideYourRatingKey: value });

    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
        chrome.tabs.sendMessage(tab.id, { message: "refreshYourRating" });
    });
}
// hide your rating

// hide auto start new game
var hideAutoStartNewGame = document
    .getElementById("hideAutoStartNewGame");

getHideAutoStartNewGameValue(hideAutoStartNewGame);
hideAutoStartNewGame
    .addEventListener('change', function () {
        hideAutoStartNewGameChange();
    });

function getHideAutoStartNewGameValue(element) {
    chrome.storage.local.get("hideAutoStartNewGameKey").then((value) => {
        console.log("Retrieved auto start new game: " + value.hideAutoStartNewGameKey);
        if (value.hideAutoStartNewGameKey == null || value.hideAutoStartNewGameKey == undefined) {
            chrome.storage.local.set({ hideAutoStartNewGameKey: true }).then(() => {
                element.checked = true;
            });
        } else {
            element.checked = value.hideAutoStartNewGameKey;
        }
    });
}

function hideAutoStartNewGameChange() {
    const value = document.getElementById("hideAutoStartNewGame").checked
    console.log("Hide auto start new game: " + value)

    chrome.storage.local.set({ hideAutoStartNewGameKey: value });

    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab]) => {
        chrome.tabs.sendMessage(tab.id, { message: "refreshAutoStartNewGame" });
    });
}
// hide auto start new game