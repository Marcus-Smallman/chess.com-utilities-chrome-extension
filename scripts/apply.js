
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === "refresh") {
            hideOppenentsRatingChange();
        }
    }
);

document.addEventListener('keydown', (event) => {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var key = event.key;
        if (key == 'h') {
            chrome.storage.local.get("hideOpponentsRatingKey").then((value) => {
                chrome.storage.local.set({ hideOpponentsRatingKey: !value.hideOpponentsRatingKey }).then(() => {
                    hideOppenentsRatingChange();
                });
            });
        }
    }
});

var timeout = setTimeout(hideOppenentsRatingChange, 20);
var chattimeout = undefined;

function hideOppenentsRatingChange() {
    const path = window.location.pathname;
    if (path.startsWith("/game/live")) {
        var opponent = document.getElementById("board-layout-player-top");
        var opponentRating = opponent.getElementsByClassName("user-tagline-rating")[0];
        var opponentName = opponent.getElementsByClassName("user-tagline-username")[0];
        if (opponentRating == undefined) {
            clearTimeout(timeout)
            timeout = setTimeout(hideOppenentsRatingChange, 20)
        } else {
            chrome.storage.local.get("hideOpponentsRatingKey").then((value) => {
                console.log("Retrieved hide opponents rating setting: " + value.hideOpponentsRatingKey);
                console.log("Opponent rating: " + opponentRating.innerText);
                if (value.hideOpponentsRatingKey) {
                    opponentRating.style.display = "none";
                } else {
                    opponentRating.style.display = "inherit";
                }

                chatRatingChange(opponentName, value);
            });
        }
    }
}

function chatRatingChange(opponentName, value) {
    var chatRatings = document.getElementsByClassName("user-rating");
    if (chatRatings.length == 0) {
        clearTimeout(chattimeout);
        chattimeout = setTimeout(function () {
            chatRatingChange(opponentName, value);
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