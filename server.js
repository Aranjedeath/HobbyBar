


if (Meteor.isServer) {

  Meteor.methods({
  incrementcount: function (userId) {
    console.log('Here');
    Meteor.users.update({
      _id: userId
    }, {
      $inc: {
        
        'count' : 1

      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  addhobby: function (hobbyid) {
    
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $addToSet: {
        
        suscribed : hobbyid

      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  removehobby: function (hobbyid) {
    
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $pull: {
        
        suscribed : hobbyid

      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  addpost: function (hobbyid,topic,data) {

           showChartopic=30;
            var c = topic.substr(0, showChartopic);
            var stopic = c + '...';
            showChardata=70;
            var c = data.substr(0, showChardata);
            var sdata = c + '...';
           
       
          
    Posts.insert({hobbyid:hobbyid,data:data,stopic:stopic,sdata:sdata,topic:topic,userid:Meteor.userId(),likes:1,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
     

    

  },
  updatepost:function(postid,topic,data)
  {
     showChartopic=30;
            var c = topic.substr(0, showChartopic);
            var stopic = c + '...';
            showChardata=70;
            var c = data.substr(0, showChardata);
            var sdata = c + '...';
    Posts.update({_id:postid},{$set:{topic:topic,data:data,sdata:sdata,stopic:stopic}});
  },
  deletepost:function(postid){
    Posts.remove({_id:postid});
    //remove the corresponding comments
  },
  addusername:function(username,userid){
    Meteor.users.update({_id:userid},{$set:{'profile.username':username}});
  },
  deletevideo:function(videoid){
    Videoposts.remove({_id:videoid});
    //remove the corresponding comments
  },
  addvideopost: function (hobbyid,topic,url,picurl) {
    showChartopic=30;
            var c = topic.substr(0, showChartopic);
            var stopic = c + '...';
    Videoposts.insert({hobbyid:hobbyid,url:url,stopic:stopic,picurl:picurl,topic:topic,userid:Meteor.userId(),likes:1,likeusers:[Meteor.userId()],timestamp:new Date(),timeval:((new Date).valueOf())});
  },
  unlike: function (postid,userid) {
      Posts.update({
      _id: postid
    }, {
      $pull:{likeusers:userid},
      $inc:{likes:-1}
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
      },
      unlike1: function (commentid,userid) {
      Comments.update({
      _id: commentid
    }, {
      $pull:{likeusers:userid},
      $inc:{likes:-1}
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
      },
      unlikevideocomment: function (commentid,userid) {
      Videocomments.update({
      _id: commentid
    }, {
      $pull:{likeusers:userid},
      $inc:{likes:-1}
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
      },
  unlikevideo: function (postid,userid) {
      Videoposts.update({
      _id: postid
    }, {
      $pull:{likeusers:userid},
      $inc:{likes:-1}
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
      },
  like: function (postid,userid) { 
    Posts.update({
      _id: postid
    }, {
      
      $addToSet: {likeusers:userid},
      $set: { timestamp:new Date()},
      $set: {timeval:((new Date).valueOf())},
      $inc:{likes:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
    var id;
    Posts.find({_id:postid}).forEach(function(myDoc) {id=myDoc.userid});
    if(Notifier.find({userid:id,postid:postid,post:true,like:true}).count()==0)
    {

       Notifier.insert({userid:id,postid:postid,post:true,comment:false,like:true,tag:false,unchecked:1,checked:0,lastliked:Meteor.userId(),timestamp:((new Date).valueOf())});
    }
    else
    {
      Notifier.update({
      _id: id,postid:postid
    }, {
      
      $set: {lastliked:userid},
      $set: {timeval:((new Date).valueOf())},
      $inc:{unchecked:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
    }




  },
  like1 :function(commentid,userid){     // Roshni
    Comments.update({
      _id:commentid},{
        $addToSet:{likeusers:userid},
        $set: {timestamp:new Date()},
        $set: {timeval: ((new Date).valueOf())},
        $inc: {likes:1}
      },function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  likevideocomment :function(commentid,userid){     // Roshni
    Videocomments.update({
      _id:commentid},{
        $addToSet:{likeusers:userid},
        $set: {timestamp:new Date()},
        $set: {timeval: ((new Date).valueOf())},
        $inc: {likes:1}
      },function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  likevideo: function (postid,userid) { 
    Videoposts.update({
      _id: postid
    }, {
      
      $addToSet: {likeusers:userid},
      $set: { timestamp:new Date()},
      $set: {timeval:((new Date).valueOf())},
      $inc:{likes:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
    var id;
    Videoposts.find({_id:postid}).forEach(function(myDoc) {id=myDoc.userid});
    if(Notifier.find({userid:id,postid:postid,post:false,like:true}).count()==0)
    {

       Notifier.insert({userid:id,postid:postid,post:false,comment:false,like:true,tag:false,unchecked:1,checked:0,lastliked:Meteor.userId(),timestamp:((new Date).valueOf())});
    }
    else
    {
      Notifier.update({
      _id: id,postid:postid
    }, {
      
      $set: {lastliked:userid},
      $set: {timeval:((new Date).valueOf())},
      $inc:{unchecked:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    }); 

   }
 },


  addcomment: function(postid,comment,usertags){    
  var pic=0;
  var pictwitter=0;   
  
  Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {pic=myDoc.profile.picture});
  /* Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {pictwitter=myDoc.services.twitter.profile_image_url});
   if(pic==undefined)
     pic=pictwitter;*/
                  // please check ----Roshni
        //    comment=      comment.replace(/@([^ ]+)/g, '<a href="/user/$1"><b>@$1</b></a>');


  
Comments.insert({postid:postid,comment:comment,userid:Meteor.userId(),pic:pic,likes:0,likeusers:[],timestamp:new Date(),timeval:((new Date).valueOf()),usertags:usertags});
    
    var id;
    Posts.find({_id:postid}).forEach(function(myDoc) {id=myDoc.userid});
    if(Notifier.find({userid:id,postid:postid,post:true,comment:true}).count()==0)
    {

       Notifier.insert({userid:id,postid:postid,post:true,comment:true,like:false,tag:false,unchecked:1,checked:0,lastliked:null,timestamp:((new Date).valueOf())});
    }
    else
    {
      Notifier.update({
      _id: id,postid:postid
    }, {
      
      
      $set: {timeval:((new Date).valueOf())},
      $inc:{unchecked:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
    }
  },
   addvidcomment: function(videoid,comment,usertags){    
  var pic=0;
  var pictwitter=0;

   Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {pic=myDoc.profile.picture});
  /*Meteor.users.find({_id:Meteor.userId()}).forEach(function(myDoc) {pictwitter=myDoc.services.twitter.profile_image_url});
   if(pic==undefined)
     pic=pictwitter;*/
                  // please check ----Roshni

Videocomments.insert({videoid:videoid,comment:comment,userid:Meteor.userId(),pic:pic,likes:0,likeusers:[],timestamp:new Date(),timeval:((new Date).valueOf()),usertags:usertags});
  
    var id;
    Videoposts.find({_id:postid}).forEach(function(myDoc) {id=myDoc.userid});
    if(Notifier.find({userid:id,postid:postid,post:false,comment:true}).count()==0)
    {

       Notifier.insert({userid:id,postid:postid,post:false,comment:true,like:false,tag:false,unchecked:1,checked:0,lastliked:null,timestamp:((new Date).valueOf())});
    }
    else
    {
      Notifier.update({
      _id: id,postid:postid
    }, {
      
      
      $set: {timeval:((new Date).valueOf())},
      $inc:{unchecked:1}
      
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
    }








  },
  getpostpages: function (hobbyname) { 
    
    var hobbyid;
    Hobbies.find({name:hobbyname}).forEach(function(myDoc) {hobbyid=myDoc.hobbyid});
     return Math.ceil(Posts.find({hobbyid:hobbyid}).count()/8);
  },
  getvideopages: function (hobbyname) { 
    
    var hobbyid;
    Hobbies.find({name:hobbyname}).forEach(function(myDoc) {hobbyid=myDoc.hobbyid});
     return Math.ceil(Videoposts.find({hobbyid:hobbyid}).count()/8);
  },
});

Meteor.publish("users",function(){
   return Meteor.users.find();
});

Meteor.publish("posthobby",function(hobbyid){
   return Posts.find({hobbyid:hobbyid},{sort:{likes: -1}});
});

Meteor.publish("videohobby",function(hobbyid){
   return Videoposts.find({hobbyid:hobbyid},{sort:{likes: -1}});
});

Meteor.publish("userposts",function(userid){
   return Posts.find({userid:userid});
});
Meteor.publish("uservideos",function(userid){
   return Videoposts.find({userid:userid});
});



Meteor.publish("postcount",function(){
   var pages=Posts.count();
   return Math.ceil(pages/8);
});

Meteor.publish("videocount",function(){
   var pages=Videoposts.count();
   return Math.ceil(pages/8);
});


 Meteor.publish("getposts",function(hobbyname,pageNumber){
    var raceCursor = Hobbies.find({name:hobbyname});
var races = raceCursor.fetch();
 var hobbyid;
for (var i=0; i<races.length; i++) {
    console.log( races[i].raceName );
    hobbyid=races[i].hobbyid;
}
    var returnCursor=Posts.find({hobbyid:hobbyid},{sort:{timeval: -1},limit:8,skip:(pageNumber*8)});
    return returnCursor;
 });

 Meteor.publish("getvideoposts",function(hobbyname,pageNumber){
    var raceCursor = Hobbies.find({name:hobbyname});
var races = raceCursor.fetch();
 var hobbyid;
for (var i=0; i<races.length; i++) {
    console.log( races[i].raceName );
    hobbyid=races[i].hobbyid;
}
    var returnCursor=Videoposts.find({hobbyid:hobbyid},{sort:{timeval: -1},limit:8,skip:(pageNumber*8)});
    return returnCursor;
 });




 Meteor.publish("getcomments",function(postid){      //  Roshni

    var data=Comments.find({postid:postid},{sort:{timeval: -1}});
    return data;
 });

 Meteor.publish("getvidcomments",function(videoid){      //  Roshni

    var data=Videocomments.find({videoid:videoid},{sort:{timeval: -1}});
    return data;
 });


 Meteor.publish("hobbies", function () {
  return Hobbies.find();
});

 Meteor.publish("displaypost", function (postid) {
  return Posts.find({_id:postid});
});
 Meteor.publish("displayvideo", function (videoid) {
  return Videoposts.find({_id:videoid});
});


 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'count':1}});
  } else {
    this.ready();
  }
});

  Meteor.publish("hobbylist", function() {
    if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'suscribed':1}});
  } else {
    this.ready();
  }
});
  Accounts.onCreateUser(function (options, user) {
     
  

    if (user.services.google !== undefined) {
      var accessToken = user.services.google.accessToken,
            result,
            profile;

        result = Meteor.http.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {"User-Agent": "Meteor/1.0"},

            params: {
                access_token: accessToken
            }
        });

        if (result.error)
            throw result.error;

        profile = _.pick(result.data,
            "name",
            "given_name",
            "family_name",
            "profile",
            "picture",
            "email",
            "email_verified",
            "birthdate",
            "gender",
            "locale",
            "hd");

        user.profile = profile;
        user.profile.username=null;

        user.suscribed=[];
        user.count= 0;
        return user;
  }
else if (user.services.facebook !== undefined) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
        
    }
    user.suscribed=[];
     user.profile.username=null;
    user.count= 0;
    return user;
}
else if (user.services.twitter !== undefined) {
    if (options.profile) {
        user.profile = options.profile;
    }
    user.profile.picture=user.services.twitter.profile_image_url;
    user.profile.email=user.services.twitter.email;
    user.suscribed=[];
    user.profile.username=null;
    user.count= 0;
    return user;
}
    
});

}
