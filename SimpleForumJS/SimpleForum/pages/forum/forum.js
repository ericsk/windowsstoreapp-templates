// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
  "use strict";

  var data; // 儲存讀取後的資料

  WinJS.UI.Pages.define("/pages/forum/forum.html", {

    // 頁面載入後執行
    ready: function (element, options) {
      var key = options.index; // 從 home 透過 navigate 元件傳過來的資料

      // 指定此頁面的參考 -- 為了讓 callback 函式能綁定
      var thisPage = this;

      // listView
      var listView = element.querySelector('.postslist').winControl;

      // 讀取討論區資料
      WinJS.xhr({url: "Data/forum_" + key + ".txt"})
        .then(function (response) {

          // 將讀取的資料解析成 javascript object
          data = JSON.parse(response.responseText);

          // 填入討論區基本資料
          element.querySelector('.pagetitle').textContent = data.title;
          element.querySelector('.detail-image').src = data.thumb;
          element.querySelector('.detail-description').textContent = data.description;

          // 使用 list 容器裝 posts
          var listContainer = new WinJS.Binding.List();
          data.posts.forEach(function (post) {
            listContainer.push(post);
          });

          // 設定 listView 的 itemDataSource 指向容器
          listView.itemDataSource = listContainer.dataSource;
          // 設定 listView 的 template，用 home.html 中的 DOM
          listView.itemTemplate = element.querySelector('.itemtemplate');
          // 設定 listView 的 item 被點擊時的操作，這裡將它帶到 Forum 頁面
          // callback function 需要綁定頁面參考
          listView.oniteminvoked = thisPage._itemInvokedCallback.bind(thisPage);
          // 設定 listView 用的 layout engine
          listView.layout = new WinJS.UI.GridLayout();
        });

    },

    // 點擊文章後的 callback function，切換至單一討論的頁面
    _itemInvokedCallback: function (e) {
      WinJS.Navigation.navigate('/pages/post/post.html',
        {
          postId: data.posts[e.detail.itemIndex].id
        });
    }

  });
})();
