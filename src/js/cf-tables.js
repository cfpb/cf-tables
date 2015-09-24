
/**
 * cf-tables
 * https://github.com/cfpb/cf-tables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

( function( $ ) {
  'use strict';

  var SortableTable = function( table, options ) {
    var defaults = {
          sortType: '',
          index:    0,
          sign:     1
        },
    // settings is defaults combined with user options
    settings = {},
    rows = [],
    $table = $( table ),
    $headercells = $( table ).find( '.sortable' );

    /**
     * Initializes the SortableTable
     * @param { object } options - Customizble options object
     */
    function _init( options ) {
      settings = $.extend( {}, defaults, options );
      _clickHandler();
    };

    /**
       * Sorting function for Array.sort()
       *
       * @param { number } sign - A number where a negative number indicates a
       * reverse sort.
       * @param { sortType } sortType - A string used for options such as integer sorting
       * @returns function - A function to be used by the Array.sort method, where
       * the parameters 'a' and 'b' is each an Array (of Arrays) to be sorted
       */

    function _arraySorter( sign, sortType ) {
      return function( a, b ) {
        // Set a and b to the first Array in each Array-of-Arrays
        a = a[0];
        b = b[0];

        // For integer sort, convert a & b to integers.
        if ( sortType === 'int' ) {
          a = a.parseInt( a );
          b = b.parseInt( b );
        }

        // Sort the values
        if ( a < b ) {
          return sign * -1;
        }
        if ( a > b ) {
          return sign;
        }
        return 0;
      };
    }

    /**
     * Updates internal model of table (rows[])
     * No parameters - uses and updates SortableTable properties.
     */
    function _getRows() {
      // Clear the model
      rows.empty();
      // Find the value in each row of the column we're sorting by,
      // add it to the rows Array
      $table.find( 'tbody tr' ).each( function() {
        // indices count from 0, but nth-child counts from 1
        var child = index + 1,
            key = $( this ).find( 'td:nth-child(' + child + ')' ).text().trim();
        rows.push( [key, $( this )] );
      });
    }

    /**
     * Updates the table in the DOM
     * @param { index } - The index of the column used for sorting
     */
    function _updateTable() {
      // Empty the tbody to prepare for sorted rows
      $table.find( 'tbody' ).empty();

      // Insert sorted rows
      for( var i = 0; i < rows.length; i++ ) {
        $table.find( 'tbody' ).append( rows[i][1] );
      }
    }

    /**
     * Handler for click events on the column header
     * No parameters - uses SortableTable properties, updates the DOM.
     */
    function _clickHandler() {
      $headercells.on( 'click', function() {
        var flag = $( this ).attr( 'data-sort_type' ),
            index = $table.find('tr:first-child').children( 'th, td' ).index( $( this ) );

        _getRows();

        // For reverse sorting, reverse the sign
        if ( $(this).hasClass( 'sorted_up' ) === true ) {
          sign = -1;
        }

        rows.sort( _arraySorter( sign, flag ) );

        _updateTable( index );

      });
    };

    _init( options );

  };

  /**
   * Instatiates the SortableTable
   */
  $.fn.sortableTable = function( options ) {
    return this.each( function() {
      ( options || ( options = {} ) ).$element = $( this );
      // SortableTable.init.call( this, options );
      var scol = new SortableTable( this, options );
    });
  }

  $( document ).ready( function() {
    $( '.table__sortable' ).sortableTable();    
  });


}( window.jQuery ));