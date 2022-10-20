const body = document.querySelector('.body');

//states for save
let size = 4;
let sizeText = size + 'x' + size;
let notBlankTiles = size * size - 1;
let tiles = [];
let blankTileId;
let counter = 0;
let gameOver = false;
let timer = {elapsedTime: 0, isStarted: false};

let bestResults = [];

window.addEventListener('load', initGame);

function initGame() {
    //check est' li dannye v localstorage, esli est' ustanovit' ih, inache new game
    newGame();
    createContainerElements();
}

function createContainerElements() {
    let container = document.createElement('div');
    container.classList.add('container');
    body.append(container);

    const bottomContainer = createBottomContainer();
    container.append(bottomContainer);

    const timeAreaContainer = createTimeAreaContainer();
    container.append(timeAreaContainer);

    const fieldContainer = createFieldContainer();
    container.append(fieldContainer);

    const flameSizeContainer = createFlameSizeContainer();
    container.append(flameSizeContainer);

    const chooseSizesContainer = createChooseSizesContainer();
    container.append(chooseSizesContainer);
}

function shuffleAndRestart() {
    if (timer.isStarted) {
        stopTimer();
    }
    body.innerHTML = '';
    initGame();
}

function createBottomContainer() {
    let bottomContainer = document.createElement('div');
    bottomContainer.classList.add('bottom-container');

    let bottomShuffleAndStart = document.createElement('bottom');
    bottomShuffleAndStart.classList.add('btn');
    bottomShuffleAndStart.textContent = 'Shuffle and start';
    bottomShuffleAndStart.addEventListener("click", () => {
        shuffleAndRestart();
    });


    let bottomStartStop = document.createElement('bottom');
    bottomStartStop.classList.add('btn-stop');
    bottomStartStop.textContent = 'Stop';
    bottomStartStop.addEventListener("click", () => {
        if (!timer.isStarted) {
            startTimer();
        } else {
            stopTimer();
        }
    })

    let bottomSave = document.createElement('bottom');
    bottomSave.classList.add('btn');
    bottomSave.textContent = 'Save';
    // bottomSave.addEventListener('click', () => saveActualGame() );

    let bottomResults = document.createElement('bottom');
    bottomResults.classList.add('btn');
    bottomResults.textContent = 'Results';
    bottomResults.addEventListener('click', () => showBestResult());

    bottomContainer.append(bottomShuffleAndStart);
    bottomContainer.append(bottomStartStop);
    bottomContainer.append(bottomSave);
    bottomContainer.append(bottomResults);
    return bottomContainer;
}

function createTimeAreaContainer() {
    const timeAreaContainer = document.createElement('div');
    timeAreaContainer.classList.add('time-area-container');


    let timeAreaItemFirth = document.createElement('div');
    timeAreaItemFirth.classList.add('time-area-item');

    let timeAreaItemFirthElementOne = document.createElement('div');
    timeAreaItemFirthElementOne.textContent = 'Moves:';

    let timeAreaItemFirthElementTwo = document.createElement('div');
    timeAreaItemFirthElementTwo.classList.add('change-counter');
    timeAreaItemFirthElementTwo.textContent = counter.toString();

    timeAreaItemFirth.append(timeAreaItemFirthElementOne);
    timeAreaItemFirth.append(timeAreaItemFirthElementTwo);

    let timeAreaItemSecond = document.createElement('div');
    timeAreaItemSecond.classList.add('time-area-item');

    let timeAreaItemSecondElementOne = document.createElement('div');
    timeAreaItemSecondElementOne.textContent = 'Time:';

    let timeAreaItemSecondElementTwo = document.createElement('div');
    timeAreaItemSecondElementTwo.classList.add('timer-view')
    timeAreaItemSecondElementTwo.textContent = '00:00';

    timeAreaItemSecond.append(timeAreaItemSecondElementOne);
    timeAreaItemSecond.append(timeAreaItemSecondElementTwo);

    timeAreaContainer.append(timeAreaItemFirth);
    timeAreaContainer.append(timeAreaItemSecond);
    return timeAreaContainer;
}

function createFieldContainer() {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('field-container');

    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        const itemField = document.createElement('div');
        itemField.classList.add('item-field');
        itemField.id = i.toString();
        itemField.addEventListener('click', event => moveTiles(event))
        if (tile) {
            itemField.textContent = tile;
        }
        fieldContainer.append(itemField);
    }

    return fieldContainer;
}

function changeElementsTails(clickedElement, tileId) {
    let blankTile = document.getElementById(blankTileId);
    blankTile.textContent = clickedElement.textContent;
    clickedElement.textContent = null;
    blankTileId = tileId;
}

function changeArrayTiles(clickedElement, clickedTileId) {
    let clickedElementValue = clickedElement.textContent;
    tiles.splice(blankTileId, 1, clickedElementValue);
    tiles.splice(clickedTileId, 1, null);
}

function moveTiles(event) {
    let clickedElement = event.target;
    let clickedTileId = +clickedElement.id;
    let allowedIndexes = getAllowedIndexes(blankTileId);
    if (!gameOver && allowedIndexes.includes(clickedTileId)) {
        changeArrayTiles(clickedElement, clickedTileId);
        changeElementsTails(clickedElement, clickedTileId);
        increaseCounter();
        checkSolved();
        processGameOver();

        if (!timer.isStarted) {
            startTimer();
        }
    }

}

function getAllowedIndexes(blankPos) {
    let arrFindId = [];

    let left = blankPos - 1;
    if (left >= 0 && blankPos % size !== 0) {
        arrFindId.push(left);
    }

    let right = blankPos + 1;
    if (right < tiles.length && right % size !== 0) {
        arrFindId.push(right);
    }

    let top = blankPos - size;
    if (top >= 0) {
        arrFindId.push(top);
    }

    let down = blankPos + size;
    if (down < tiles.length) {
        arrFindId.push(down);
    }

    return arrFindId;
}

function createFlameSizeContainer() {
    const flameSizeContainer = document.createElement('div');
    flameSizeContainer.classList.add('flame-size-container');

    const frameSize = document.createElement('div');
    frameSize.textContent = 'Frame size:';

    const frameSizeNow = document.createElement('div');
    frameSizeNow.textContent = sizeText;

    flameSizeContainer.append(frameSize);
    flameSizeContainer.append(frameSizeNow);

    return flameSizeContainer;
}

function changeSize(newSize) {
    size = newSize;
    sizeText = size + 'x' + size;
    shuffleAndRestart()
}

function createChooseSizesContainer() {
    const chooseSizesContainer = document.createElement('div');
    chooseSizesContainer.classList.add('choose-sizes-container');

    const otherSizes = document.createElement('div');
    otherSizes.textContent = 'Other sizes:';

    const chooseSizeGame3x3 = document.createElement('div');
    chooseSizeGame3x3.classList.add('size-game');
    chooseSizeGame3x3.textContent = '3x3';
    chooseSizeGame3x3.addEventListener("click", () => changeSize(3));

    const chooseSizeGame4x4 = document.createElement('div');
    chooseSizeGame4x4.classList.add('size-game');
    chooseSizeGame4x4.textContent = '4x4';
    chooseSizeGame4x4.addEventListener("click", () => changeSize(4));

    const chooseSizeGame5x5 = document.createElement('div');
    chooseSizeGame5x5.classList.add('size-game');
    chooseSizeGame5x5.textContent = '5x5';
    chooseSizeGame5x5.addEventListener("click", () => changeSize(5));

    const chooseSizeGame6x6 = document.createElement('div');
    chooseSizeGame6x6.classList.add('size-game');
    chooseSizeGame6x6.textContent = '6x6';
    chooseSizeGame6x6.addEventListener("click", () => changeSize(6));

    const chooseSizeGame7x7 = document.createElement('div');
    chooseSizeGame7x7.classList.add('size-game');
    chooseSizeGame7x7.textContent = '7x7';
    chooseSizeGame7x7.addEventListener("click", () => changeSize(7));

    const chooseSizeGame8x8 = document.createElement('div');
    chooseSizeGame8x8.classList.add('size-game');
    chooseSizeGame8x8.textContent = '8x8';
    chooseSizeGame8x8.addEventListener("click", () => changeSize(8));

    chooseSizesContainer.append(otherSizes);
    chooseSizesContainer.append(chooseSizeGame3x3);
    chooseSizesContainer.append(chooseSizeGame4x4);
    chooseSizesContainer.append(chooseSizeGame5x5);
    chooseSizesContainer.append(chooseSizeGame6x6);
    chooseSizesContainer.append(chooseSizeGame7x7);
    chooseSizesContainer.append(chooseSizeGame8x8);

    return chooseSizesContainer;
}

function newGame() {
    resetSettings();
    do {
        resetTilesArray();
        shuffleTilesArray();
    } while (!isSolvable());

    gameOver = false;
}

function resetSettings() {
    notBlankTiles = size * size - 1;
    tiles = [];
    blankTileId = null;
    counter = 0;
    gameOver = false;
    timer = {elapsedTime: 0, isStarted: false}
}

function resetTilesArray() {
    tiles = Array(size * size);
    for (let i = 0; i < notBlankTiles; i++) {
        tiles[i] = i + 1;
    }
    tiles[tiles.length - 1] = null;
    // we set blank cell at the last
    blankTileId = tiles.length - 1;
}

function shuffleTilesArray() {
    for (let i = tiles.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

// Only half permutations o the puzzle are solvable
// Whenever a tile is preceded by a tile with higher value it counts
// as an inversion. In our case, with the blank tile in the solved position,
// the number of inversions must be even for the puzzle to be solvable
function isSolvable() {
    let countInversions = 0;

    for (let i = 0; i < notBlankTiles; i++) {
        for (let j = 0; j < i; j++) {
            if (tiles[j] > tiles[i]) {
                countInversions++;
            }
        }
    }
    countInversions = countInversions + size;
    return countInversions % 2 === 0;
}

function checkSolved() {
    if (tiles[tiles.length - 1] !== null) {
        gameOver = false;
        return;
    }

    for (let i = notBlankTiles - 1; i >= 0; i--) {
        if (tiles[i] !== i + 1) {
            gameOver = false;
            return;
        }
    }
    gameOver = true;
}

function increaseCounter() {
    const changeCounter = document.querySelector('.change-counter');
    counter++;
    changeCounter.textContent = counter.toString();
}

function startTimer() {
    let bottomStartStop = document.querySelector('.btn-stop')
    startWatch();
    bottomStartStop.innerHTML = 'Stop';
    timer.isStarted = true;
}

function stopTimer() {
    let bottomStartStop = document.querySelector('.btn-stop')
    timer.isStarted = false;
    timer.elapsedTime += Date.now() - timer.startTime
    clearInterval(timer.intervalId)
    bottomStartStop.innerHTML = 'Start'
}

function startWatch() {
    timer.startTime = Date.now();
    timer.intervalId = setInterval(() => {
        displayTime()
    }, 100);
}

function displayTime() {
    let timer = document.querySelector('.timer-view');
    timer.textContent = getTimerTime();
}

function getTimerTime() {
    const elapsedTime = Date.now() - timer.startTime + timer.elapsedTime;
    const seconds = parseInt((elapsedTime / 1000) % 60)
    const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
    const leadZeroTime = [minutes, seconds].map(time => time < 10 ? `0${time}` : time)
    return leadZeroTime.join(':');
}

function processGameOver() {
    if (gameOver) {
        let time = getTimerTime();
        saveBestResults(time);
        alert(`Hooray! You solved the puzzle in ${time} and ${counter} moves!`);
    }
}

function showBestResult() {
    let bestResultString = '';

    bestResults.forEach((element, index) => {
        bestResultString += index + 1 + '. steps: ' + element.move + ' time: ' + element.time + ';' + '\n';
    });

    alert(`Best results:\n${bestResultString}`);

}

function saveBestResults(time) {
    let result = {};
    result.move = counter;
    result.time = time;
    bestResults.push(result);
    bestResults.sort((a, b) => {
        if (a.time > b.time) {
            return 1;
        } else if (a.time < b.time) {
            return -1;
        } else {
            if (a.move > b.move) {
                return 1;
            } else if (a.move < b.move) {
                return -1;
            } else {
                return 0;
            }
        }
    })

    if (bestResults.length > 10) {
        bestResults.slice(0, 11);
    }
}