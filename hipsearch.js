(function($) {
  $.fn.addSearch = function (options) {
    // $.extend(options, defaults);
    var $searchBox = $('<input type="text" id="searchbox" />').appendTo('body');
    $searchBox.bind('change, keyup',function() {
      if (this.value) {
        $('.icon').not('[class*="' + this.value + '"]').hide();
        $('.icon[class*="' + this.value + '"]').show();
      } else {
        $('.icon').show();
      }
    })
    .bind('blur, focusout', function(e){
      window.setTimeout(function() {
        $searchBox.focus();
      }, 200);
    })
    .bind('keyup', function(e){
      if (e.which == 27) {
        // Clear the search box when the user has pressed the escape key.
        this.value='';
        $('.icon').show();
      }
    })
    .focus();
  };
}(jQuery));
