;(function ($) {
  $.deparam =
    $.deparam ||
    function (uri) {
      if (uri === undefined) {
        uri = window.location.pathname
      }

      var value1 = window.location.pathname
      var splitUrl = value1.split('/')
      var finalUrl = splitUrl[2] + '.' + splitUrl[4]
      return finalUrl
    }
})(jQuery)
