(function () {
  "use strict";

  var data; // 用來儲存讀取後的資料

  WinJS.UI.Pages.define("/pages/home/home.html", {

    // 當頁面載入後執行
    ready: function (element, options) {

      // 讀取頁面上的 list view 控制項
      var listView = element.querySelector('.forumslist').winControl;
      // 指定此頁面的參考 -- 為了讓 callback 函式能綁定
      var thisPage = this;

      // 讀取論壇列表的資料，URL 可以修改成網路上的 URL
      WinJS.xhr({ url: 'Data/forum_list.txt' })
        .then(function (response) { // 讀取成功後執行

          // 讀取的內容是一個 json 格式的資料，用 JSON.parse 變成 javascript object
          data = JSON.parse(response.responseText);

          // 把頁面標題修改成 data.title
          element.querySelector('.pagetitle').innerHTML = data.title;

          // 產生一個 list 容器，用來將資料呈現在 list view 控制項
          var listContainer = new WinJS.Binding.List();

          // 將 data.forums 陣列中的資料一筆筆塞進 list container 裡
          data.forums.forEach(function (forum) {
            listContainer.push(forum);
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

    _itemInvokedCallback: function (e) {
      // 使用 navigate 元件切換頁面，然後把 forum key 傳回去以便讀取
      WinJS.Navigation.navigate('/pages/forum/forum.html',
        {
          index: data.forums[e.detail.itemIndex].key
        });
    }

  });

})();