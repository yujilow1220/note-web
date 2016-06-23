var converter = new showdown.Converter();

function noteViewModel() {
  var self = this;
  /* -----------observable-------------- */
  self.tag = ko.observable();
  self.posts = ko.observableArray([]);
  self.tagArea = ko.observable();
  self.clickedCards = ko.computed(function(){
    return self.posts().filter(hasClickedElements);
  })
  self.isClicked = ko.computed(function(){
    return self.clickedCards().length > 0;
  })
  self.onClickCard = function(data,event,index){
    //build a click flag
<<<<<<< HEAD
    //need to chenge observables in posts:observableArray
    self.posts()[self.posts().indexOf(data)].clicked(!data.clicked())
=======
    self.posts()[self.posts().indexOf(data)].clicked(!data.clicked());
>>>>>>> 3df385591f6d112dc3a315d31a1ce47c2a474c8d
  }

/* -----------observable-------------- */

  getPost(0,"root", function(data){
    self.posts(convertPost(data));
  });
}

ko.applyBindings(new noteViewModel());


// functions

function getPost(start, tag, callback){
  $.ajax({
    url:"http://localhost:3000/post?_start="+start+"&tag="+tag+"&_sort=postedAt&_order=DESC",
    type:"GET"
  }).done(function(data){
    callback(data);
  });
}

function convertPost(data){
  return data.map(function(e){
    e.text = converter.makeHtml(e.text);
    e.postedAt = formatDate(new Date(e.postedAt), 'YYYY-MM-DD  hh:mm');
    e.clicked = ko.observable(false);
    return e;
  });
}

/* filter */


function hasClickedElements(e){
  return e.clicked() === true;
}

/*

http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0

*/
/**
 * 日付をフォーマットする
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
var formatDate = function (date, format) {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};

function deleteElement(array, element){
  var index = array.indexOf(element);
  array = array.slice(index-1,index);
  return array;
}
