(function($) {
  $.fn.addSearch = function (options) {
    // $.extend(options, defaults);
    var $searchBox = $('<input type="text" id="searchbox" />').appendTo('body');
    $searchBox.bind('change keyup',function() {
      console.log($(this.value));
      if (this.value) {
        $('.icon').not('[class*="' + this.value + '"]').hide();
        $('.icon[class*="' + this.value + '"]').show();
      } else {
        $('.icon').show();
      }
    })
    .bind('blur, focusout', function(e){
      window.setTimeout(function() {$(e.target).focus()}, 100);
    })
    .focus();
  };
}(jQuery));
