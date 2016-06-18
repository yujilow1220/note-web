function noteViewModel() {
  var self = this;
  self.tag = ko.observable();
  self.posts = ko.observableArray([]);
  self.posts();
}

ko.applyBindings(new noteViewModel());


// functions

function getPost(start, tag){

}
