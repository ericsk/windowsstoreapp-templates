(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/post/post.html", {
    ready: function (element, options) {
      var postId = options.postId;

      var listView = element.querySelector('.post-comments').winControl;

      WinJS.xhr({ url: 'Data/post_' + postId + '.txt' })
        .then(function (response) {
          var data = JSON.parse(response.responseText);

          element.querySelector('.pagetitle').textContent = data.title;

          element.querySelector('.post-content').innerHTML = toStaticHTML(data.body);

          var listContainer = new WinJS.Binding.List();

          data.comments.forEach(function (comment) {
            listContainer.push(comment);
          });

          listView.itemDataSource = listContainer.dataSource;
          listView.itemTemplate = element.querySelector('.itemtemplate');
        });
    }
  });
})();
