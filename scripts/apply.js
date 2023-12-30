
// listeners
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === "refreshOpponentsRating") {
            hideOppenentsRatingChange();
            hideOppenentsRatingAfterChange();
        } else if (request.message === "refreshYourRating") {
            hideYourRatingChange();
            hideYourRatingAfterChange();
        } else if (request.message === "refreshAutoStartNewGame") {
            setAutoStartNewGame();
        }
    }
);

document.addEventListener('keydown', (event) => {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var key = event.key;
        if (key == 'y') {
            chrome.storage.local.get("hideYourRatingKey").then((value) => {
                chrome.storage.local.set({ hideYourRatingKey: !value.hideYourRatingKey }).then(() => {
                    hideYourRatingChange();
                    hideYourRatingAfterChange();
                });
            });
        } else if (key == 'o') {
            chrome.storage.local.get("hideOpponentsRatingKey").then((value) => {
                chrome.storage.local.set({ hideOpponentsRatingKey: !value.hideOpponentsRatingKey }).then(() => {
                    hideOppenentsRatingChange();
                    hideOppenentsRatingAfterChange();
                });
            });
        } else if (key == 'a') {
            chrome.storage.local.get("hideAutoStartNewGameKey").then((value) => {
                chrome.storage.local.set({ hideAutoStartNewGameKey: !value.hideAutoStartNewGameKey }).then(() => {
                    setAutoStartNewGame();
                });
            });
        }
    }
});
// listeners

// hide opponent rating
var opponentTimeout = setTimeout(hideOppenentsRatingChange, 20);
var opponentAfterTimeout = setTimeout(hideOppenentsRatingAfterChange, 20);
var opponentChatTimeout = undefined;

function hideOppenentsRatingChange() {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var opponent = document.getElementById("board-layout-player-top");
        var opponentRating = opponent.getElementsByClassName("user-tagline-rating")[0];
        var opponentName = opponent.getElementsByClassName("user-tagline-username")[0];
        if (opponentRating == undefined) {
            clearTimeout(opponentTimeout);
            opponentTimeout = setTimeout(hideOppenentsRatingChange, 20);
        } else {
            chrome.storage.local.get("hideOpponentsRatingKey").then((value) => {
                console.log("Retrieved hide opponents rating setting: " + value.hideOpponentsRatingKey);
                console.log("Opponent rating (" + opponentName.innerText + "): " + opponentRating.innerText);
                if (value.hideOpponentsRatingKey) {
                    opponentRating.style.display = "none";
                } else {
                    opponentRating.style.display = "inherit";
                }
                opponentChatRatingChange(opponentName, value);
            });
        }
    }
}

function hideOppenentsRatingAfterChange() {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var opponent = document.getElementById("board-layout-player-top");
        var opponentAfterRating = opponent.getElementsByClassName("rating-score-rating")[0];
        var opponentName = opponent.getElementsByClassName("user-tagline-username")[0];
        if (opponentAfterRating == undefined) {
            clearTimeout(opponentAfterTimeout);
            opponentAfterTimeout = setTimeout(hideOppenentsRatingAfterChange, 20);
        } else {
            chrome.storage.local.get("hideOpponentsRatingKey").then((value) => {
                console.log("Retrieved hide opponents rating setting: " + value.hideOpponentsRatingKey);
                console.log("Opponent rating (" + opponentName.innerText + "): " + opponentAfterRating.innerText);
                if (value.hideOpponentsRatingKey) {
                    opponentAfterRating.style.display = "none";
                } else {
                    opponentAfterRating.style.display = "inherit";
                }
                opponentChatRatingChange(opponentName, value);
            });
        }
    }
}

function opponentChatRatingChange(opponentName, value) {
    var chatRatings = document.getElementsByClassName("user-rating");
    if (chatRatings.length == 0) {
        clearTimeout(opponentChatTimeout);
        opponentChatTimeout = setTimeout(function () {
            opponentChatRatingChange(opponentName, value);
        }, 20)
    } else {
        for (var i = 0; i < chatRatings.length; i++) {
            var userRating = chatRatings[i];
            var parentElement = userRating.parentElement;
            for (var j = 0; j < parentElement.childElementCount; j++) {
                var child = parentElement.children[j];
                if (child.innerText == opponentName.innerText) {
                    try {
                        var nextElement = parentElement.children[j + 1];
                        if (nextElement.innerText.startsWith('(') &&
                            nextElement.innerText.endsWith(')')) {
                            if (value.hideOpponentsRatingKey) {
                                nextElement.style.display = "none";
                            } else {
                                nextElement.style.display = "inherit";
                            }
                        }
                    } catch { }
                }
            }
        }
    }
}
// hide opponent rating

// hide your rating
var yourTimeout = setTimeout(hideYourRatingChange, 20);
var yourAfterTimeout = setTimeout(hideYourRatingAfterChange, 20);
var yourChatTimeout = undefined;

function hideYourRatingChange() {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var you = document.getElementById("board-layout-player-bottom");
        var yourRating = you.getElementsByClassName("user-tagline-rating")[0];
        var yourName = you.getElementsByClassName("user-tagline-username")[0];
        if (yourRating == undefined) {
            clearTimeout(yourTimeout);
            yourTimeout = setTimeout(hideYourRatingChange, 20);
        } else {
            chrome.storage.local.get("hideYourRatingKey").then((value) => {
                console.log("Retrieved hide your rating setting: " + value.hideYourRatingKey);
                console.log("Your rating (" + yourName.innerText + "): " + yourRating.innerText);
                if (value.hideYourRatingKey) {
                    yourRating.style.display = "none";
                } else {
                    yourRating.style.display = "inherit";
                }
                yourChatRatingChange(yourName, value);
            });
        }
    }
}

function hideYourRatingAfterChange() {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var you = document.getElementById("board-layout-player-bottom");
        var yourAfterRating = you.getElementsByClassName("rating-score-rating")[0];
        var yourName = you.getElementsByClassName("user-tagline-username")[0];
        if (yourAfterRating == undefined) {
            clearTimeout(yourAfterTimeout);
            yourAfterTimeout = setTimeout(hideYourRatingAfterChange, 20);
        } else {
            chrome.storage.local.get("hideYourRatingKey").then((value) => {
                console.log("Retrieved hide your rating setting: " + value.hideYourRatingKey);
                console.log("Your rating (" + yourName.innerText + "): " + yourAfterRating.innerText);
                if (value.hideYourRatingKey) {
                    yourAfterRating.style.display = "none";
                } else {
                    yourAfterRating.style.display = "inherit";
                }
                yourChatRatingChange(yourName, value);
            });
        }
    }
}

function yourChatRatingChange(yourName, value) {
    var chatRatings = document.getElementsByClassName("user-rating");
    if (chatRatings.length == 0) {
        clearTimeout(yourChatTimeout);
        yourChatTimeout = setTimeout(function () {
            yourChatRatingChange(yourName, value);
        }, 20)
    } else {
        for (var i = 0; i < chatRatings.length; i++) {
            var userRating = chatRatings[i];
            var parentElement = userRating.parentElement;
            for (var j = 0; j < parentElement.childElementCount; j++) {
                var child = parentElement.children[j];
                if (child.innerText == yourName.innerText) {
                    try {
                        var nextElement = parentElement.children[j + 1];
                        if (nextElement.innerText.startsWith('(') &&
                            nextElement.innerText.endsWith(')')) {
                            if (value.hideYourRatingKey) {
                                nextElement.style.display = "none";
                            } else {
                                nextElement.style.display = "inherit";
                            }
                        }
                    } catch { }
                }
            }
        }
    }
}
// hide your rating

// auto start new game
var autoStartNewGameTimeout = setTimeout(setAutoStartNewGameChange, 20);

function setAutoStartNewGameChange() {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var sidebar = document.getElementById("board-layout-sidebar");
        var newGameButtons = sidebar.getElementsByClassName("new-game-buttons-component")[0];
        if (newGameButtons == undefined) {
            clearTimeout(autoStartNewGameTimeout);
            autoStartNewGameTimeout = setTimeout(setAutoStartNewGameChange, 20);
        } else {
            chrome.storage.local.get("hideAutoStartNewGameKey").then((value) => {
                console.log("Retrieved auto start new game setting: " + value.hideAutoStartNewGameKey);
                if (value.hideAutoStartNewGameKey) {
                    newGameButtons.children[0].click();
                }
            });
        }
    }
}
// auto start new game