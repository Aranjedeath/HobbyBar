var IR_BeforeHooks = {
  
    isLoggedIn: function() {
    	
        if (!(Meteor.loggingIn() || Meteor.user())) {
          this.redirect('/');
            bootbox.alert("<h3>Please sign in to continue</h3>", function() {
          });
           this.stop();
        }
    }

    // add more before hooks here
}

// (Global) Before hooks for any route
Router.before(IR_BeforeHooks.isLoggedIn,{except: ['contact','home','notFound']});


Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  after: function () {
        Session.set('hash', this.params.hash);
    },
});




Router.map(function() {                          
  this.route('home', {path: '/'});            
  this.route('home');
  this.route('contact');
  this.route('test');
  this.route('editpost');
  this.route('pagepost');

  this.route('loading');
  

  this.route('user', {
  path: '/user/:userid',
  waitOn:function(){
            var hobbylist=Meteor.subscribe("hobbylist");

             postlist=Meteor.subscribe("userposts",this.params.userid);
             post=Meteor.subscribe("posthobby",0);
        video=Meteor.subscribe("videohobby",0);
             videolist=Meteor.subscribe("uservideos",this.params.userid);
            return [hobbylist,postlist,videolist,post,video];

        },
  data: function (){
    userid=this.params.userid;
     }  });

  this.route('admin', {
  path: '/admin/:userid',
  waitOn:function(){
            var hobbylist=Meteor.subscribe("hobbylist");

             postlist=Meteor.subscribe("userposts",this.params.userid);
             post=Meteor.subscribe("posthobby",0);
        video=Meteor.subscribe("videohobby",0);
             videolist=Meteor.subscribe("uservideos",this.params.userid);
            return [hobbylist,postlist,videolist,post,video];

        },
  data: function (){
    userid=this.params.userid;
     }  });


  this.route('hobbyedit', {
  path: '/admin/:userid/hobbyedit',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    return 1; }  });



  this.route('newpost', {
  path: '/:hobbyname/newpost',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });

  



  



  this.route('newvideopost', {
  path: '/:hobbyname/newvideopost',
  waitOn:function(){
            return Meteor.subscribe("hobbylist");
        },
  data: function (){
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname}); }  });



  this.route('displaypost', {
  path: '/Posts/:postid',
  waitOn:function(){
            postid=this.params.postid;
            postdetails=Meteor.subscribe("displaypost",postid);
            commentdetails=Meteor.subscribe('getcomments',postid);
            return [postdetails,commentdetails];
        },
  data: function (){
    var hobbyid;
    var hobby;
    Posts.find().forEach(function(myDoc) {hobbyid=myDoc.hobbyid}); 
    Hobbies.find({hobbyid:hobbyid}).forEach( function(myDoc) {hobby=myDoc.name} );
    hobbyname=hobby;
    return Posts.findOne(); }  });

  this.route('displayvideo', {
  path: '/VideoPost/:videoid',
  waitOn:function(){
            videoid=this.params.videoid;
            videodetails=Meteor.subscribe("displayvideo",videoid);
            commentdetails=Meteor.subscribe('getvidcomments',videoid);
            return [videodetails,commentdetails];
        },
  data: function (){
    var hobbyid;
    var hobby;
    var urler;

    Videoposts.find().forEach(function(myDoc) {hobbyid=myDoc.hobbyid});
    Videoposts.find().forEach(function(myDoc) {urler=myDoc.url}); 
    Hobbies.find({hobbyid:hobbyid}).forEach( function(myDoc) {hobby=myDoc.name} );
    hobbyname=hobby;
    url=urler;
    return Videoposts.findOne(); }  });

 





  this.route('editpost', {
  path: '/Posts/:postid/Editpost',
  waitOn:function(){
            postid=this.params.postid;
            postdetails=Meteor.subscribe("displaypost",postid);
            return [postdetails];
        },
  data: function (){
   
    return Posts.findOne(); }  });

  

  


  this.route('hobbymain', {
  path: '/:hobbyname/main',
  waitOn:function(){
    
    postssuscribed=Meteor.subscribe('getposts', this.params.hobbyname,0);
    videopostssuscribed=Meteor.subscribe('getvideoposts', this.params.hobbyname,0);
    return [Meteor.subscribe('hobbylist')];
        },
  data: function (){
     pageno=0;
    vpageno=0;
    postcount=0;
    videocount=0;
    hobbyname  = this.params.hobbyname;
    return Hobbies.findOne({name: hobbyname});
     }  });


  

  this.route('notFound', {
  path: '*'
});

})

