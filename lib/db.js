var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function(){
  Tag.find({text:'root'},{},function(err,docs){
    if(docs.length === 0){
      var tag = new Tag;
      tag.text = 'root';
      tag.save(function(err,data){
        console.log('root tag created. id = ' + data._id);
        module.exports.root = data;
      });
    }
  });
  console.log('ok');
});
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

var PostSchema = new Schema({
  text: String,
  postedAt: { type: Date, default: Date.now },
  tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

var TagSchema = new Schema({
  text: {type: String, index: { unique: true, dropDups: true }},
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}
});

var Post = mongoose.model('Post', PostSchema);
var Tag = mongoose.model('Tag', TagSchema);

module.exports.Post = Post;
module.exports.Tag = Tag;
