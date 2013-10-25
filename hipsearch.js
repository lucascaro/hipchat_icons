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
    .focus();
  };
}(jQuery));
