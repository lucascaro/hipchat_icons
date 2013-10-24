var localCache = {
    data: {},
    remove: function (url) {
        localCache.data[url] = null;
        delete localCache.data[url];
        localStorage.localCacheData = JSON.stringify(localCache.data);
    },
    exist: function (url) {
        return localCache.data.hasOwnProperty(url) && localCache.data[url] !== null;
    },
    get: function (url) {
        console.log('Getting in cache for url ' + url);
        return localCache.data[url];
    },
    set: function (url, cachedData, callback) {
        localCache.remove(url);
        localCache.data[url] = cachedData;
        if ($.isFunction(callback)) callback(cachedData);
        localStorage.localCacheData = JSON.stringify(localCache.data);
    }
};
localCache.data = JSON.parse(localStorage.localCacheData);
console.log('hip');
jQuery(function($) {
console.log('hip2');
  var $body = $('body');
  var $ulist = $('<ul id="icon-list"></ul>');
  $ulist.appendTo($body);
  token = 'EaXpdhlh3obWK6cqJOwmWsRNL0WNKNb2qOu3SPZI';
  api_base = 'https://api.hipchat.com/v2/';
  var icons = [];
  var first = api_base + 'emoticon?auth_token=' + token;
  function getNext(next) {
    $.ajax({
      url: next,
      cache: true,
      // beforeSend: function() {
      //   if (localCache.exist(next)) {
      //     parseResponse(localCache.get(next));
      //     return false;
      //   }
      //   return true;
      // },
      complete: function (jqXHR) {
        if(jqXHR.status == 200) {
          localCache.set(next,jqXHR.responseJSON);
          parseResponse(jqXHR.responseJSON);
        } else {
          console.log(jqXHR);
        }

      }
    });
  }

  function parseResponse(data) {
    console.log(data);
      icons = icons.concat(data.items);
      if (data.links.next != undefined) {
        next = data.links.next + "&auth_token=" + token;
        getNext(next);
      } else {
        // We got them all.
        allSet();
      }
  }
  function parseIconResponse(data) {
    console.log(data);
    $('#icon-' + data.id).prepend($('<img src="' + data.url.replace('/emoticons','/emoticons/') + '"/>'))
  }
  function allSet() {
    console.log(icons.length);
    console.log(icons);
    for (i in icons) {
      var $li = $('<li id="icon-' + icons[i].id + '" class="icon icon-name-' + icons[i].shortcut + '">(' + icons[i].shortcut + ')</li>');
      (function(i) {
        $li.click(function() {
            window.prompt ("Copy to clipboard: Ctrl+C, Enter", '(' + icons[i].shortcut + ')');
        });
      }(i));
      var thisUrl = icons[i].links.self + "?auth_token=" + token;
      $li.appendTo($ulist);
      $.ajax({
        url: thisUrl,
        cache: true,
        beforeSend: function() {
          if (localCache.exist(this.url)) {
            parseIconResponse(localCache.get(this.url));
            return false;
          }
          return true;
        },
        complete: function(jqXHR) {
          if(jqXHR.status == 200) {
            localCache.set(this.url,jqXHR.responseJSON);
            parseIconResponse(jqXHR.responseJSON);
          }
        }
      });
    }
    $ulist.addSearch();
  }
  getNext(first);
});
