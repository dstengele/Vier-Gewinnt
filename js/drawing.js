var currentPlayer = "red";
var currentPlayerColor = "circleRed";
var otherPlayerColor = "circleBlue";
var availableRow = 0;

var playFieldArray = new Array(7);
playFieldArray[0] = new Array(6);
playFieldArray[1] = new Array(6);
playFieldArray[2] = new Array(6);
playFieldArray[3] = new Array(6);
playFieldArray[4] = new Array(6);
playFieldArray[5] = new Array(6);
playFieldArray[6] = new Array(6);

initPlayField();

function putChip(column) {
	var selectedCircle;
    availableRow = checkAvailableRow(column);
    if (availableRow === -1) {
        alert("Fehler! Spalte voll!");
        return;
    }
    availableRow++;

	switch(column) {
		case 0:
		selectedCircle = $("div#column1 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(0);
		break;

		case 1:
		selectedCircle = $("div#column2 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(1);
		break;

		case 2:
		selectedCircle = $("div#column3 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(2);
		break;

		case 3:
		selectedCircle = $("div#column4 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(3);
		break;

		case 4:
		selectedCircle = $("div#column5 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(4);
		break;

		case 5:
		selectedCircle = $("div#column6 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(5);
		break;

		case 6:
		selectedCircle = $("div#column7 > div:nth-child(" + availableRow + ")");
		occupyTopmostRow(6);
		break;
	}
    selectedCircle.addClass(currentPlayerColor).removeClass(otherPlayerColor);

    if (checkIfWon()) {
        alert((currentPlayer==="red"?"Rot":"Blau") + " gewinnt!");
        var divs = $("div#playfield div.column")
        divs.prop("onclick", null);
    }
    switchPlayer();

};

function switchPlayer() {
	switch (currentPlayer) {
		case "red":
			currentPlayer = "blue";
			currentPlayerColor = "circleBlue";
			otherPlayerColor = "circleRed";
			break;
		case "blue":
			currentPlayer = "red";
			currentPlayerColor = "circleRed";
			otherPlayerColor = "circleBlue";
			break;
	};
};

function checkAvailableRow(column) {
    for (var i = 5 ; i >= 0 ; i--) {
        if (playFieldArray[column][i] === "white") {
            return i;
        }
    }
    return -1;
};

function occupyTopmostRow (column) {
	playFieldArray[column][checkAvailableRow(column)] = currentPlayer;
	return;
}

function checkIfWon() {
    // Horizontal
    var tempArrayHorizontal = new Array(7);
    for (var row = 0; row <= 5; row++) {                            // Loop over every Row
        for (var col = 0; col <= 6; col++) {
            tempArrayHorizontal[col] = playFieldArray[col][row];    // Add one from every column
        }
        if (checkForFour(tempArrayHorizontal)) {
            return true;
        }
    }

    // Vertikal
    for (var col = 0; col <= 6; col++) {
        if (checkForFour(playFieldArray[col])) {
            return true;
        }
    }

    // Diagonal /
    // Shift Array
    var tempArrayDiagonal1 = playFieldArray.clone();
    for (var i = 0; i <= 6; i++) {
        for (var n = i; n > 0; n--) {
            tempArrayDiagonal1[i].unshift("white");
        }
    }
    var tempArrayDiagonal11 = new Array(7);
    for (var row = 0; row <= 11; row++) {                            // Loop over every Row
        for (var col = 0; col <= 6; col++) {
            tempArrayDiagonal11[col] = tempArrayDiagonal1[col][row];    // Add one from every column
        }
        if (checkForFour(tempArrayDiagonal11)) {
            return true;
        }
    }

    // Diagonal \
    // Shift Array
    var tempArrayDiagonal2 = playFieldArray.clone();
    for (var i = 5; i >= 0; i--) {
        for (var n = i; n < 6; n++) {
            tempArrayDiagonal2[i].unshift("white");
        }
    }
    var tempArrayDiagonal22 = new Array(7);
    for (var row = 0; row <= 11; row++) {                            // Loop over every Row
        for (var col = 0; col <= 6; col++) {
            tempArrayDiagonal22[col] = tempArrayDiagonal2[col][row];    // Add one from every column
        }
        if (checkForFour(tempArrayDiagonal22)) {
            return true;
        }
    }
}

function initPlayField() {
    for (var i = 0; i <= 6; i++) {
        for (var j = 0; j <= 5; j++) {
            playFieldArray[i][j] = "white";
        }
    }
}

function checkForFour(input) {
    var count = 0;

    for (var i = 0; i < input.length; i++) {
        if (input[i] === currentPlayer) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

Object.prototype.clone = function() {
    var newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i == 'clone') continue;
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        } else newObj[i] = this[i]
    } return newObj;
};