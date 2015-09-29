
/**
 * cf-tables
 * https://github.com/cfpb/cf-tables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

( function( $ ) {
  'use strict';

  var SortableTable = function( table, options ) {
    /*  At the moment, there are no default settings, but here's an object
        for their future use! */
    var defaults = {
        },
    // settings is defaults combined with user options
    settings = {},
    // rows is an Array of Arrays, serving as a model of the table
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
      // If the following classes exist, start by sorting those columns.
      $table.find( '.sortable__start-up, .sortable__start-up' ).click();
    }

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

        // For number sort, convert a & b to numbers.
        if ( sortType === 'number' ) {
          a = Number( a.replace(/[^\d.-]/g, '') );
          b = Number( b.replace(/[^\d.-]/g, '') );
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
     * @param { index } - The index of the column used for sorting, which is
     * used as the "key" for rows[] - it is set as the only value in the first
     * array.
     */
    function _getRows( index ) {
      // Clear the model
      rows.length = 0;
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
    function _updateTable( index ) {
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
        var sortType = $( this ).attr( 'data-sort_type' ),
            sign = 1,
            index = $table.find('tr:first-child').children( 'th, td' ).index( $( this ) );

        _getRows( index );

        // Handle .sortable__start-* classes
        if ( $(this).hasClass( 'sortable__start-up' ) === true ) {
          // Simply add the opposing sort class
          $(this).addClass( 'sorted_down' );
        }
        else if ( $(this).hasClass( 'sortable__start-down' ) === true ) {
          // Simply add the opposing sort class
          $(this).addClass( 'sorted_up' );
        }
        $(this).removeClass( 'sortable__start-down sortable__start-up' );

        // For reverse sorting, reverse the sign
        if ( $(this).hasClass( 'sorted_up' ) === true ) {
          sign = -1;
          $( '.sortable' ).removeClass( 'sorted_up sorted_down' );
          $( this ).addClass( 'sorted_down' );
        }
        else {
          $( '.sortable' ).removeClass( 'sorted_up sorted_down' );
          $( this ).addClass( 'sorted_up' );
        }

        // Perform the row sort
        rows.sort( _arraySorter( sign, sortType ) );

        _updateTable( index );

      });
    }

    _init( options );

  };

  /**
   * Instatiates the SortableTable
   */
  $.fn.sortableTable = function( options ) {
    return this.each( function() {
      ( options || ( options = {} ) ).$element = $( this );
      var scol = new SortableTable( this, options );
    });
  };

  $( document ).ready( function() {
    $( '.table__sortable' ).sortableTable();    
  });


}( jQuery ));