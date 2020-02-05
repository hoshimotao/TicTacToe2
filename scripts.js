(function ($) {
  let createSelect = function (options) {
    // Create different mode options within a selection
    var object = $ ('<select>');

    options.forEach (option => {
      $ ('<option>').text (option).appendTo (object);
    });

    return object;
  };

  // Reset
  var reset = $ ('.reset');
  reset.on ('click', function (e) {
    location.reload ();
  });

  // Establish X's and O's as array of Strings
  // Establish initial turn
  let getTurnText = (function () {
    let symbols = ['X', 'O'];
    let turn = 0;

    return function () {
      let symbol = symbols[turn];
      turn += 1;
      // Set turn boundary
      if (turn >= symbols.length) {
        turn = 0;
      }
      return symbol;
    };
  }) ();

  // Draw up a game with a button
  let createGameButton = function () {
    return $ ('<button>').addClass ('game-button').click (function () {
      let self = $ (this);
      if (self.text () === '') {
        self.text (getTurnText ());
      }
      let winner = checkWinner ();

      if (winner) {
        alert (winner + ' won!');
      }
    });
  };

  // Set size of game board
  let createGameGrid = function (size) {
    let table = $ ('<table>').addClass ('game-table');

    let row, column;

    for (row = 0; row < size; row += 1) {
      let rowObject = $ ('<tr>');

      for (column = 0; column < size; column += 1) {
        rowObject.append ($ ('<td>').append (createGameButton ()));
      }

      rowObject.appendTo (table);
    }

    return table;
  };

  let readTable = function (table) {
    let array = [];

    table.find ('tr').each (function (index, row) {
      let r = [];

      $ (row).find ('td').each (function (index, column) {
        r.push ($ (column).find ('.game-button').text ());
      });

      array.push (r);
    });

    return array;
  };

  let checkWinner = function () {
    let state = readTable ($ ('.game-table'));

    // Return a winner in either case
    return (
      checkRowWinner (state) ||
      checkColumnWinner (state) ||
      checkDiagonalWinner (state)
    );
  };

  // Check if winner won by row
  let checkRowWinner = function (state) {
    for (let r = 0; r < state.length; r += 1) {
      let first = state[r][0];
      if (first === '') {
        break;
      }
      for (let c = 1; c < state.length; c += 1) {
        if (state[r][c] !== first) {
          break;
        } else if (c === state.length - 1) {
          return first;
        }
      }
    }
  };

  // Check if winner won by column
  let checkColumnWinner = function (state) {
    for (let c = 0; c < state.length; c += 1) {
      let first = state[0][c];
      if (first === '') {
        break;
      }
      for (let r = 1; r < state.length; r += 1) {
        if (state[r][c] !== first) {
          break;
        } else if (r === state.length - 1) {
          return first;
        }
      }
    }
  };

  // Check if winner won by diagonal
  let checkDiagonalWinner = function (state) {
    // initialize state once (top-left)
    let first = state[0][0];
    if (first === '') {
      return;
    }
    for (let i = 1; i < state.length; i += 1) {
      if (state[i][i] !== first) {
        break;
      } else if (i === state.length - 1) {
        return first;
      }
    }

    // initialize state second time (bottom left)
    first = state[state.length - 1][0];
    if (first === '') {
      return;
    }

    for (let i = 1; i < state.length; i += 1) {
      if (state[state.length - 1 - i][i] !== first) {
        break;
      } else if (i === state.length - 1) {
        return first;
      }
    }
  };

  $ (document).ready (function () {
    // Game mode options
    var gridSelect = createSelect (['3 x 3', '4 x 4', '10 x 10']);

    console.log (gridSelect);

    $ ('body')
      .append (
        $ ('<button>').text ('Create Board').click (function () {
          $ ('.game-table').detach ();

          // Select game mode by index
          createGameGrid (
            gridSelect.val ()[0] && gridSelect.val ().slice (0, 2)
          ).appendTo ('body');
        })
      )
      .append (gridSelect);
  });
}) (jQuery);
