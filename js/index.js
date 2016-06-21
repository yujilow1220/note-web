var converter = new showdown.Converter();

function noteViewModel() {
  var self = this;
  self.tag = ko.observable();
  self.posts = ko.observableArray([]);
  self.clickedCards = ko.observableArray([]);
  self.onClickCard = function(data,event){
    if(self.clickedCards().indexOf(data.id) === -1)self.clickedCards().push(data.id);
    else self.clickedCards(deleteElement(self.clickedCards()));
  }
  getPost(0,"root", function(data){
    self.posts(convertPost(data));
  });
}

ko.applyBindings(new noteViewModel());


// functions

function getPost(start, tag, callback){
  $.ajax({
    url:"http://localhost:3000/post?_start="+start+"&tag="+tag,
    type:"GET"
  }).done(function(data){
    console.log(data[0])
    callback(data);
  });
}

function convertPost(data){
  return data.map(function(e){
    e.text = converter.makeHtml(e.text);
    e.postedAt = formatDate(new Date(e.postedAt), 'YYYY-MM-DD  hh:mm');
    return e;
  });
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
