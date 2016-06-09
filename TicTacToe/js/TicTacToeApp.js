var TicTacToeApp = angular.module("TicTacToeApp", ["ui.bootstrap"]);

TicTacToeApp.controller("mainController", function ($scope) {

    // Array of marker images
    $scope.Images = ["img/blank.png", "img/cross.png", "img/nought.png", "img/cross_win.png", "img/nought_win.png"];

    // Associate markers with numbers
    const Markers = {
        BLANK: 0,
        CROSS: 1,
        NOUGHT: 2,
        CROSS_WIN: 3,
        NOUGHT_WIN: 4
    };

    // Board is a 2D array with cells indexed by [Row][Col]:
    // [0][0] [0][1] [0][2]
    // [1][0] [1][1] [1][2]
    // [2][0] [2][1] [2][2]
    // Cells can contain BLANK, CROSS, NOUGHT, CROSS_WIN or NOUGHT_WIN
    $scope.Board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    // ActivePlayer can be either CROSS or NOUGHT
    var ActivePlayer = Markers.CROSS;

    // Counter for the number of placed markers (number from 0 to 9)
    var PlacedMarkers = 0;

    // Indicator for the game being over or not
    var GameOver = false;



    // Function to clear everything and make a new game
    $scope.NewGame = function () {

        // Clear variables
        $scope.Board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        PlacedMarkers = 0;
        GameOver = false;

        // Set ActivePlayer to CROSS
        ActivePlayer = Markers.CROSS;
        $scope.Message = "X starts";

    }
    $scope.NewGame(); // Run the function to create a new game



    // Function executed when a cell is clicked
    $scope.ClickCell = function (Row, Col) {

        // Put ActivePlayer's marker in cell.
        // But only if game is not over and field is empty.
        // Otherwise return.
        if (GameOver == false && $scope.Board[Row][Col] == Markers.BLANK) {
            $scope.Board[Row][Col] = ActivePlayer;
            PlacedMarkers++;
        }
        else
            return;

        // Check for victory
        if (CheckForVictory()) {

            GameOver = true;

            if (ActivePlayer == Markers.CROSS)
                $scope.Message = "X wins!";
            else
                $scope.Message = "O wins!";

            return;
        }

        // Check for draw: If 9 markers are placed the game is a draw (as victory has already been checked for)
        if (PlacedMarkers == 9) {
            GameOver = true;
            $scope.Message = "Draw";
            return;
        }

        // Change ActivePlayer
        if (ActivePlayer == Markers.CROSS) {
            ActivePlayer = Markers.NOUGHT;
            $scope.Message = "O's turn";
        }
        else {
            ActivePlayer = Markers.CROSS;
            $scope.Message = "X's turn";
        }

    }



    // Function to check for victory for ActivePlayer. Return true or false.
    function CheckForVictory() {

        // Loop over rows and check them for victory
        for (var Row = 0; Row <= 2; Row++) {
            if (Check3Cells(Row, 0, Row, 1, Row, 2))
                return true;
        }

        // Loop over columns and check them for victory
        for (var Col = 0; Col <= 2; Col++) {
            if (Check3Cells(0, Col, 1, Col, 2, Col))
                return true;
        }

        // Check diagonal (top left to bottom right) for victory
        if (Check3Cells(0, 0, 1, 1, 2, 2))
            return true;

        // Check diagonal (bottom left to top right) for victory
        if (Check3Cells(2, 0, 1, 1, 0, 2))
            return true;

        // Return false: If this line is reached there is no victory
        return false;
    }



    // Function to check if 3 cells [RowA][ColA], [RowB][ColB] and [RowC][ColC] are all taken by ActivePlayer.
    // Return true if so, otherwise false.
    function Check3Cells(RowA, ColA, RowB, ColB, RowC, ColC) {

        // Check if all cells are taken by ActivePlayer
        if ($scope.Board[RowA][ColA] == ActivePlayer &&
            $scope.Board[RowB][ColB] == ActivePlayer &&
            $scope.Board[RowC][ColC] == ActivePlayer) {

            // Place victory image (either CROSS_WIN or NOUGHT_WIN) in cells and return true
            $scope.Board[RowA][ColA] += 2;
            $scope.Board[RowB][ColB] += 2;
            $scope.Board[RowC][ColC] += 2;
            return true;

        }
        else
            return false;

    }


});