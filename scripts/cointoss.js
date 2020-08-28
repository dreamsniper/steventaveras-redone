/*jslint browser: true, devel: true, maxlen: 100, todo: true*/
var body,
    nav,
    script,
    html,
    heads = 0,
    tails = 0,
    accordionButton,
    accordionButtonDiv,
    index,
    allAccordionClosed,
    openDivPosition,
    i,
    a,
    ul,
    coin,
    coinImage,
    headCoin,
    headCoinImage,
    tailCoin,
    tailCoinImage,
    startButton,
    welcomeScreen,
    gameScreen,
    backButton,
    endScreen,
    retry,
    user,
    userNamePrompt,
    headButton,
    tailButton,
    flipButton,
    coinAnimation,
    side,
    eventL,
    flipMenu,
    results,
    headsCount,
    text,
    tailsCount,
    h2Element;

//function to insert main img and coins to divs
function insertImages() {
    'use strict';

    coinImage.src = '../images/coin.png';
    coin.appendChild(coinImage);
    headCoinImage.src = '../images/head-coin.png';
    headCoin.appendChild(headCoinImage);
    tailCoinImage.src = '../images/tail-coin.png';
    tailCoin.appendChild(tailCoinImage);
}

//This function hides and shows the accordion buttons
function toggle() {
    'use strict';

    for (index = 0; index < accordionButton.length; index += 1) {

        if (0 === this.compareDocumentPosition(accordionButton[index])) {
            break;
        }
    }
    if (allAccordionClosed) {

        //assign index to new variable
        openDivPosition = index;

        //change the style to block can also be done with classes
        accordionButtonDiv[index].style.display = 'block';

        //accordions no longer all closed
        allAccordionClosed = false;

    } else {

        if (index === openDivPosition) {

            accordionButtonDiv[index].style.display = 'none';

            allAccordionClosed = true;

        } else {
            accordionButtonDiv[openDivPosition].style.display = 'none';

            accordionButtonDiv[index].style.display = 'block';

            openDivPosition = index;
        }
    }
}

//opens start screen
function start() {
    'use strict';
    userName();
    welcomeScreen.style.display = 'none';
    endScreen.style.display = 'none';
    gameScreen.style.display = 'block';

}

//goes back to welcome screen
function back() {
    'use strict';

    welcomeScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    endScreen.style.display = 'none';
    reset();
}

//prompts user for a name
function userName() {
    'use strict';
    user = prompt('please enter your name');

    if (user === '') {

        do {
            user = prompt('please enter a name to continue forward');
        } while (user === '');

    } else {
        userNamePrompt.innerHTML = '<h1>Lets Play ' + user + ', Good Luck!!</h1>';
    }
}

//function to select heads
function selectHead() {
    'use strict';

    //display flip menu
    flipMenu.style.display = 'block';
    h2Element.innerHTML = 'You Chose Heads!';
    //display choice
    flipMenu.appendChild(h2Element);
}

//function to select tails
function selectTail() {
    'use strict';

    //display flip menu
    flipMenu.style.display = 'block';
    h2Element.innerHTML = 'You Chose Tails!';
    //display choice
    flipMenu.appendChild(h2Element);
}

//produces a number between 1 and zro and animates a coin
function flipCoin() {
    'use strict';

    //random number between 1 and zero
    side = Math.round(Math.random());

    //represents head
    if (side === 0) {

        showHeadAnimation();

    } else {


        showTailAnimation();
    }
}

function showHeadAnimation() {
    text[0] = '<img class="animated flip" src="../images/head-coin.png"/>';
    coinAnimation.innerHTML = text[0];

    heads += 1;
    results.innerHTML = '<h3>You got Heads</h3>';
    headsCount.innerHTML = '<h1> Number of heads: ' + heads + '</h1>';
}

function showTailAnimation() {
    text[1] = '<img class="animated flip" src="../images/tail-coin.png"/>';
    coinAnimation.innerHTML = text[1];

    tails += 1;
    results.innerHTML = '<h3>You got Tails!</h3>';
    tailsCount.innerHTML = '<h1> Number of Tails: ' + tails + '</h1>';
}

//Function to reset
function reset() {
    heads = 0;
    tails = 0;
}

//assign body
body = document.body;

//initialize and call main coin images
coin = document.getElementById('coin');
coinImage = document.createElement('img');
headCoin = document.getElementById('head-coin');
headCoinImage = document.createElement('img');
tailCoin = document.getElementById('tail-coin');
tailCoinImage = document.createElement('img');
insertImages();

//assign accordion buttons and div
accordionButton = document.querySelectorAll('h2');
accordionButtonDiv = document.querySelectorAll('h2 + div');
allAccordionClosed = true;

//add eventListeners to accordion buttons
for (eventL = 0; eventL < accordionButton.length; eventL += 1) {
    accordionButton[eventL].addEventListener('click', toggle, false);
}

//initialize  screens
welcomeScreen = document.getElementsByClassName('welcome-screen')[0];
gameScreen = document.getElementsByClassName('game-screen')[0];
endScreen = document.getElementsByClassName('end-screen')[0];

//initialize start button and add listener
startButton = document.getElementsByClassName('start-button')[0];
startButton.addEventListener('click', start, false);

//initialize back button and add listener
backButton = document.getElementsByClassName('back-button')[0];
backButton.addEventListener('click', back, false);

//initialize retry button and add listener
retry = document.getElementsByClassName('try-again')[0];
retry.addEventListener('click', start, false);

//initialize username prompt div and buttons
userNamePrompt = document.getElementById('username-prompt');
headButton = document.getElementById('head-button');
tailButton = document.getElementById('tail-button');
flipButton = document.getElementById('flip-button');


//add listeners
headButton.addEventListener('click', selectHead, false);
tailButton.addEventListener('click', selectTail, false);
flipButton.addEventListener('click', flipCoin, false);
flipMenu = document.getElementsByClassName('flip-menu')[0];

//coin animation
coinAnimation = document.getElementsByClassName('coin-animation')[0];
results = document.getElementsByClassName('results')[0];
text = [];
h2Element = document.createElement('h2');
headsCount = document.getElementById('heads-count');
tailsCount = document.getElementById('tails-count');