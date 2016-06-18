function noteViewModel() {
  var self = this;
  self.tag = ko.observable();
  self.posts = ko.observableArray([]);
  self.posts();
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
    e.text = marked(e.text);
    e.postedAt = new Date(e.postedAt);
    return e;
  });
}
