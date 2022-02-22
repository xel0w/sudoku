const plateauEl = document.querySelector("#plateau");
let hasWon = false;
const sudoku = [
    [1, 0, 6, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 8, 2, 0, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 0, 8, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 1],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 1, 0, 0, 6, 0],
    [0, 4, 0, 0, 0, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
console.log(sudoku);
console.log(sudoku.reduce)

function isRowOk(value, rowNumber, sudoku) {
    for (let i = 0 ; i < 9 ; i++) {
        if (sudoku[rowNumber][i] == value) {
            alert("Il y a un probleme dans la ligne");
            return false;           
        }
    }
};

function isColumnOk(value, columnNumber, sudoku) {
    for (let i = 0 ; i< 9 ; i++) {
        if (sudoku[i][columnNumber] == value) {
            alert("Il y a un probleme dans la colonne");
            return false;
        }
    }
};

function isSquareOk(value, rowNumber, columnNumber, sudoku) {
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
            if (sudoku[Math.floor(rowNumber/3)*3 + i][Math.floor(columnNumber/3)*3 + j] == value) {
                alert("Il y a un probleme dans le carré");
                return false;
            }
        }
    }
};

function checkIfWon (sudoku) {
    if (sudoku[0].concat(sudoku[1]).concat(sudoku[2]).concat(sudoku[3]).concat(sudoku[4]).concat(sudoku[5]).concat(sudoku[6]).concat(sudoku[7]).concat(sudoku[8]).includes(0)) {
        console.log("keep up the good work");
    } else {
        alert("You Win");
    }
};

function checkValue(value, rowNumber, columnNumber, sudoku) {
    if (isRowOk(value, rowNumber, sudoku) == false ||
        isColumnOk(value, columnNumber, sudoku) == false ||
        isSquareOk(value, rowNumber, columnNumber, sudoku) == false) {
        return false;
    } else {
        return true;
    }
};

sudoku.forEach((row, rowNumber) => {
    row.forEach((column, columnNumber) => {
        if (column === 0) {
            const caseEl = document.createElement("input");
            caseEl.classList.add("box");
            caseEl.type = "number";
            caseEl.min = "1";
            caseEl.max = "9";
            plateauEl.append(caseEl);
            caseEl.addEventListener("keyup", function(event) {
                if(caseEl.value < 1 || caseEl.value > 9) {
                    caseEl.value = "";
                    column = "";
                    alert("Inserez un chiffre entre 1 et 9");
                };
                if(event.key === "Enter") {
                    if (checkValue(caseEl.value, rowNumber, columnNumber, sudoku) == true) {
                        sudoku[rowNumber][columnNumber] = parseInt(caseEl.value);
                        checkIfWon();
                        
                    } else {
                        caseEl.value = "";
                        sudoku[rowNumber][columnNumber] = 0;
                    };
                    checkIfWon (sudoku)
                };
            });
        } else {
            const caseEl = document.createElement("div");
            caseEl.classList.add("box");
            caseEl.classList.add("readonly");
            caseEl.innerText = column;
            plateauEl.append(caseEl);         
        };
    });
});