// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    // gives u where the row started 
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    //boolean for specific row
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //select the row as each individual row as arr
      const currentRow = this.get(rowIndex);
      //keep track of count
      let count = 0;
      //loop through the row
      for (let i = 0; i < currentRow.length; i++) {
        //if any of the elements in the row is equal to one (aka theres a conflict), increment count
        if (currentRow[i] === 1) {
          count += 1;
        } 
      }
      //if theres more than one piece on the chessboard then there is a conflict 
      return count > 1;
    },

    //boolean for entire board
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // console.log(this);
      const board = this.rows();
      // console.log('I am rows', rows);
      //loop through the rows
      for (let i = 0; i < board.length; i += 1) {
        // debugger;
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let count = 0;
      const board = this.rows();
      // const columns = [];
      // for (let y = 0; y < board.length; y += 1) {
      //   const temp = [];
      //   for (let x = 0; x < board.length; x += 1) {
      //     temp.push(board[x][y]);
      //   }
      //   columns.push(temp);
      // }
      // const column = columns[colIndex];
      //Checking for a specific column
      for (let i = 0; i < board.length; i++) {
        if (board[i][colIndex] === 1) {
          count++;
        }
      }
      return count > 1;
    },
    
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      const board = this.rows();
      for (let i = 0; i < board.length; i += 1) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
      // return false; // fixme
    },
 


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      const board = this.rows();
      let count = 0;
      let col = majorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < board.length; i++) {
        if (board[i][col]) {
          count++;
        }
        col++;
      }
      return count > 1;
    },

    // _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
    //   return colIndex - rowIndex;
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      const board = this.rows();
      for (let i = -2; i < board.length; i += 1) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      const board = this.rows();
      let count = 0;
      let col = minorDiagonalColumnIndexAtFirstRow;
      // for (let row = board.length - 1; row >= 0; row -= 1) {
      for (let row = 0; row < board.length; row += 1) {
        if (board[row][col]) {
          count += 1;
        }
        col -= 1;
      }
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      const board = this.rows();
      for (let i = 0; i < board.length + 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
