const header = document.querySelector('h1');
const container = document.querySelector('.container');
const boxes = document.querySelectorAll(".box");

const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const first = 'X';
const second = 'O';

let firstRes = 0;
let secondRes = 0;

let currentPlayer = first;
let freeBoxes = Array(9).fill(null);


const startGame = () => {
    boxes.forEach((anyBox) => 
        anyBox.addEventListener('click', clickedBox));
}

function clickedBox(i) {
    const id = i.target.id;

    if (!freeBoxes[id]) {
        freeBoxes[id] = currentPlayer;
        i.target.textContent = currentPlayer;

        if (winner() != false) {
            header.textContent = `${currentPlayer} has won!`;
            boxes.forEach((anyBox) => 
                anyBox.removeEventListener('click', clickedBox));
            let retry = document.createElement('button');
            retry.textContent = 'Try again?';
            // retry.setAttribute('type','submit');
            retry.setAttribute(
                'style',
                'position: absolute; align-self: center; font-size: 48px; left: auto; right: auto;bottom: 70px;'
            )

            container.appendChild(retry);
            retry = document.querySelector('button');
            retry.addEventListener('click', function() {
                if (currentPlayer == first) {
                    secondRes++;
                } else if (currentPlayer == second) {
                    firstRes++;
                }
                freeBoxes.fill(null);
                boxes.forEach((anyBox) => 
                    anyBox.textContent = '');
                container.removeChild(retry);
                header.textContent = `X ${firstRes}:${secondRes} O`;
                startGame();
            });
            
        } else if (!freeBoxes.includes(null) && (winner() == false)) {
            header.textContent = `That's a draw!`;
            boxes.forEach((anyBox) => 
                anyBox.removeEventListener('click', clickedBox));
            let retry = document.createElement('button');
            retry.textContent = 'Try again?';
            // retry.setAttribute('type','submit');
            retry.setAttribute(
                'style',
                'position: absolute; align-self: center; font-size: 48px; left: auto; right: auto;bottom: 70px;'
            )
            container.appendChild(retry);
            retry = document.querySelector('button');
            retry.addEventListener('click', function() {
                freeBoxes.fill(null);
                boxes.forEach((anyBox) => 
                    anyBox.textContent = '');
                container.removeChild(retry);
                header.textContent = `X ${firstRes}:${secondRes} O`;
                startGame();
            });
        }

        // if (currentPlayer == first) {
        //     currentPlayer = second;
        // } else if (currentPlayer == second) {
        //     currentPlayer = first;
        // }

        //Much better way:
        currentPlayer = currentPlayer == first ? second : first;
    }
}

function winner() {
    for (const rule of winCombo) {
        let [a, b, c] = rule;
        //REMINDER to myself: 
        //double equal in arrays checks if both are true, not the value inside!
        if (freeBoxes[a] && freeBoxes[a] == freeBoxes[b] && freeBoxes [a] == freeBoxes[c]){
            return [a, b, c];
        }
    }
    return false;
}



startGame();