Hobbies = new Meteor.Collection("hobbies");
Posts =new Meteor.Collection("posts");
Videoposts=new Meteor.Collection("videoposts");
Comments=new Meteor.Collection("comments");
Videocomments=new Meteor.Collection("videocomments");

Admin=new Meteor.Collection("admindb");
Words = new Meteor.Collection(null);
['2g1c','2 girls 1 cup','acrotomophilia','anal','anilingus','anus','arsehole','ass','asshole','assmunch','auto erotic','autoerotic','babeland','baby batter','ball gag','ball gravy','ball kicking','ball licking','ball sack','ball sucking','bangbros','bareback','barely legal','barenaked','bastardo','bastinado','bbw','bdsm','beaver cleaver','beaver lips','bestiality','bi curious','big black','big breasts','big knockers','big tits','bimbos','birdlock','bitch','black cock','blonde action','blonde on blonde action','blow j','blow your l','blue waffle','blumpkin','bollocks','bondage','boner','boob','boobs','booty call','brown showers','brunette action','bukkake','bulldyke','bullet vibe','bung hole','bunghole','busty','butt','buttcheeks','butthole','camel toe','camgirl','camslut','camwhore','carpet muncher','carpetmuncher','chocolate rosebuds','circlejerk','cleveland steamer','clit','clitoris','clover clamps','clusterfuck','cock','cocks','coprolagnia','coprophilia','cornhole','cum','cumming','cunnilingus','cunt','darkie','date rape','daterape','deep throat','deepthroat','dick','dildo','dirty pillows','dirty sanchez','doggie style','doggiestyle','doggy style','doggystyle','dog style','dolcett','domination','dominatrix','dommes','donkey punch','double dong','double penetration','dp action','eat my ass','ecchi','ejaculation','erotic','erotism','escort','ethical slut','eunuch','faggot','fecal','felch','fellatio','feltch','female squirting','femdom','figging','fingering','fisting','foot fetish','footjob','frotting','fuck','fuck buttons','fudge packer','fudgepacker','futanari','gang bang','gay sex','genitals','giant cock','girl on','girl on top','girls gone wild','goatcx','goatse','gokkun','golden shower','goodpoop','goo girl','goregasm','grope','group sex','g-spot','guro','hand job','handjob','hard core','hardcore','hentai','homoerotic','honkey','hooker','hot chick','how to kill','how to murder','huge fat','humping','incest','intercourse','jack off','jail bait','jailbait','jerk off','jigaboo','jiggaboo','jiggerboo','jizz','juggs','kike','kinbaku','kinkster','kinky','knobbing','leather restraint','leather straight jacket','lemon party','lolita','lovemaking','make me come','male squirting','masturbate','menage a trois','milf','missionary position','motherfucker','mound of venus','mr hands','muff diver','muffdiving','nambla','nawashi','negro','neonazi','nigga','nigger','nig nog','nimphomania','nipple','nipples','nsfw images','nude','nudity','nympho','nymphomania','octopussy','omorashi','one cup two girls','one guy one jar','orgasm','orgy','paedophile','panties','panty','pedobear','pedophile','pegging','penis','phone sex','piece of shit','pissing','piss pig','pisspig','playboy','pleasure chest','pole smoker','ponyplay','poof','poop chute','poopchute','porn','porno','pornography','prince albert piercing','pthc','pubes','pussy','queaf','raghead','raging boner','rape','raping','rapist','rectum','reverse cowgirl','rimjob','rimming','rosy palm','rosy palm and her 5 sisters','rusty trombone','sadism','scat','schlong','scissoring','semen','sex','sexo','sexy','shaved beaver','shaved pussy','shemale','shibari','shit','shota','shrimping','slanteye','slut','s&m','smut','snatch','snowballing','sodomize','sodomy','spic','spooge','spread legs','strap on','strapon','strappado','strip club','style doggy','suck','sucks','suicide girls','sultry women','swastika','swinger','tainted love','taste my','tea bagging','threesome','throating','tied up','tight white','tit','tits','titties','titty','tongue in a','topless','tosser','towelhead','tranny','tribadism','tub girl','tubgirl','tushy','twat','twink','twinkie','two girls one cup','undressing','upskirt','urethra play','urophilia','vagina','venus mound','vibrator','violet blue','violet wand','vorarephilia','voyeur','vulva','wank','wetback','wet dream','white power','women rapping','wrapping men','wrinkled starfish','xx','xxx','yaoi','yellow showers','yiffy','zoophilia'].forEach(function (word) {
  Words.insert({type: word})
});






if (Meteor.isClient) {
 
   Meteor.startup(function () {
    
  });

   
   
   Meteor.methods({
     showsignin: function () {
    var boxContentString ="Please sign in to continue";
   boxer=bootbox.dialog(boxContentString);
  }
});






Template.hobbymain.rendered = function() {
   
   



    $("html,body").animate({scrollTop: 0},500);
  

  

    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: $("html,body").animate({scrollTop: 0},500);
        break;

        case 39: // right
        break;

        /*case 40:  $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');
        break;*/

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    postcount=-1;
    videocount=-1;
    if(hobbyname!=undefined)
    {
      
      
      Meteor.call('getpostpages',hobbyname, function(err, data) {
  if (err)
     console.log(err);
   postcount=data;
    if(postcount==0)
     {
        $('#posts').hide();
      }
      else
      {
        $('#posts').show();
      }
      
   });
      Meteor.call('getvideopages',hobbyname, function(err, data) {
  if (err)
    console.log(err);
    videocount=data;
    if(videocount==0)
     {
        $('#videoposts').hide();
      }
      else
      {
        $('#videoposts').show();
      }

   });

  }
    
}

Template.header.settings = {
  position: 'bottom',
  limit: 5,  // more than 20, to emphasize matches outside strings *starting* with the filter
  rules: [
  {
    token: '',
    collection: Meteor.users,  // Meteor.Collection object means client-side collection
    field: 'profile.name',
    // set to true to search anywhere in the field, which cannot use an index.
    // 'ba' will match 'bar' and 'baz' first, then 'abacus'
    template: Template.details,
    callback: function(doc) { window.location = '/user/'+doc._id;}
    }
  ]
};



Template.contact.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
}

Template.user.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  count=0;
  countall=0;
  if(userid!=Meteor.userId())
  {
    $('.holo').hide();
  }
  $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
    if(userid!=undefined)
  {
    $('#dropdown').hide();
    $('#dropdownall').hide();
  }

}

Template.user.helpers({
    diffuser: function() {
         if(this.userid!=undefined)
         {
         return (this.userid==Meteor.userId());
       }
    },

    name: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.name});
           return name;
    },
    timestamp: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.createdAt});
           return name;
    },
    imagesrc: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.picture});
           return name;
    },
    imagetwitter: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.services.twitter.profile_image_url});
           return name;
    },
    email: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.email});
           return name;
    },

    filterpost: function() {
      
      return Posts.find();

    },
    filtervideopost: function() {

      return Videoposts.find();
         
    },
    
    subscribed: function() {


       var subscribed;
       Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {subscribed=myDoc.suscribed});
       if(subscribed!=undefined)
       {


       return  Hobbies.find({hobbyid:{$in:subscribed}});
       
     }
    },
    all: function() {
       
       return  Hobbies.find();
    },
    
    
    


  });
  
 Template.user.events({
  "click #profile": function(e, tmpl) {
    $('#profilecontent').show();
       $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
     $('#hobbycontent').hide();
       },

  "click .hobbypage": function(e, tmpl) {
        postlist.stop();
        videolist.stop();
        post.stop();
        video.stop();
        post=Meteor.subscribe("posthobby",this.hobbyid);
        video=Meteor.subscribe("videohobby",this.hobbyid);
        $('#hobbycontent').show();
       $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
     $('#profilecontent').hide();

       },

  "click #drop": function(e, tmpl) {
       if((count%2)==0)
       {
         $('#dropdown').show();
        count++;
       }
       else
       {
         $('#dropdown').hide();
        count--;
       }
       },
  "click #dropall": function(e, tmpl) {
       if((countall%2)==0)
       {
         $('#dropdownall').show();
        countall++;
       }
       else
       {
         $('#dropdownall').hide();
        countall--;
       }
       },
  "click #feedback": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').show();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
       },
  "click #posts": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').hide();
   $('#postcontent').show();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();

        postlist.stop();
        videolist.stop();
        post.stop();
        video.stop();
        postlist=Meteor.subscribe("userposts",this.userid);
        videolist=Meteor.subscribe("uservideos",this.userid);

       },
    "click #comments": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').show();
    $('#hobbycontent').hide();
       }, 

   });




//Admin Template
Template.admin.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  count=0;
  countall=0;
  if(userid!=Meteor.userId())
  {
    $('.holo').hide();
  }
  $('#feedbackcontent').hide();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
    if(userid!=undefined)
  {
    $('#dropdown').hide();
    $('#dropdownall').hide();
  }

}

Template.admin.helpers({
    diffuser: function() {
         if(this.userid!=undefined)
         {
         return (this.userid==Meteor.userId());
       }
    },

    name: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.name});
           return name;
    },
    timestamp: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.createdAt});
           return name;
    },
    imagesrc: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.picture});
           return name;
    },
    imagetwitter: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.services.twitter.profile_image_url});
           return name;
    },
    email: function() {
         var name;
           Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {name=myDoc.profile.email});
           return name;
    },

    filterpost: function() {
      
      return Posts.find();

    },
    filtervideopost: function() {

      return Videoposts.find();
         
    },
    
    subscribed: function() {


       var subscribed;
       Meteor.users.find({_id:this.userid}).forEach(function(myDoc) {subscribed=myDoc.suscribed});
       if(subscribed!=undefined)
       {


       return  Hobbies.find({hobbyid:{$in:subscribed}});
       
     }
    },
    all: function() {
       
       return  Hobbies.find();
    },
    
    
    


  });

 Template.admin.events({
  "click #profile": function(e, tmpl) {
      $('#profilecontent').show();
      $('#feedbackcontent').hide();
      $('#postcontent').hide();
      $('#commentcontent').hide();
      $('#hobbycontent').hide();
    },

  "click .hobbypage": function(e, tmpl) {
        postlist.stop();
        videolist.stop();
        post.stop();
        video.stop();
        post=Meteor.subscribe("posthobby",this.hobbyid);
        video=Meteor.subscribe("videohobby",this.hobbyid);
        $('#hobbycontent').show();
        $('#feedbackcontent').hide();
        $('#postcontent').hide();
        $('#commentcontent').hide();
        $('#profilecontent').hide();

       },

   "click #addhobby": function(e, tmpl) {
      window.location = '/admin/'+Meteor.userId()+'/hobbyedit';
    },

  "click #drop": function(e, tmpl) {
       if((count%2)==0)
       {
         $('#dropdown').show();
        count++;
       }
       else
       {
         $('#dropdown').hide();
        count--;
       }
       },
  "click #dropall": function(e, tmpl) {
       if((countall%2)==0)
       {
         $('#dropdownall').show();
        countall++;
       }
       else
       {
         $('#dropdownall').hide();
        countall--;
       }
       },
  "click #feedback": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').show();
   $('#postcontent').hide();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();
       },
  "click #posts": function(e, tmpl) {
    $('#profilecontent').hide();
       $('#feedbackcontent').hide();
   $('#postcontent').show();
    $('#commentcontent').hide();
    $('#hobbycontent').hide();

        postlist.stop();
        videolist.stop();
        post.stop();
        video.stop();
        postlist=Meteor.subscribe("userposts",this.userid);
        videolist=Meteor.subscribe("uservideos",this.userid);

       },
    "click #comments": function(e, tmpl) {
     $('#profilecontent').hide();
     $('#feedbackcontent').hide();
     $('#postcontent').hide();
     $('#commentcontent').show();
     $('#hobbycontent').hide();
       }, 

     "click #addnewhobby": function(e, tmpl){
      $('#profilecontent').hide();
      $('#feedbackcontent').hide();
      $('#postcontent').hide();
      $('#commentcontent').hide();
      $('#hobbycontent').hide();

     },

       //Deleting the post by the admin
    "click #deletepost": function(e, tmpl) {
      $('#postcontent').remove();
      $('#commentcontent').remove();
      Meteor.call('deletepost',this.postid);
    }

      //Dynamically adding a hobby on screen by the admin
      /*"click #addhobby": function(e, tmpl) {
        Meteor.call('addhobby',this.hobbyid);
      }*/
       
   });




Template.admin.admindb = function() {
  return Admin.find();
}

Template.displaypost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);


}

Template.displayvideo.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  
  var example = Popcorn.youtube(
           '#video',url );
 
         // add a footnote at 2 seconds, and remove it at 6 seconds
         example.footnote({
           start: 2,
           end: 6,
           text: "Pop!",
           target: "footnotediv"
         });
  

}

Template.editpost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);

}


 Template.header.events({
    'click #signin' : function () {
      var boxContentString =$('#modal-content').html();
    bootbox.dialog({message: boxContentString});


    


    
   }
   
  });


Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});

 
 Meteor.subscribe("userData");
 Meteor.subscribe("hobbies");
 Meteor.subscribe("users");
 


  Template.hobbymain.events({
  "click #suscribe": function(e, tmpl) {
    Meteor.call('addhobby',this.hobbyid);
       },
  "click #previous": function(e, tmpl) {
            if(pageno!=0)
            {
            pageno=pageno-1;
            postssuscribed.stop();
            postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
            }
            else
            {
              bootbox.alert("<h3>Already on the first page!!</h3>", function() {
          });
              
            }
          
         
         
         
       },
  "click #next": function(e, tmpl) {
    
        if((pageno+1)<postcount)
      {
       pageno=pageno+1; 
       postssuscribed.stop();
       postssuscribed=Meteor.subscribe('getposts',hobbyname,pageno);
       }
       else
       { 
         bootbox.alert("<h3>No more pages to show!!</h3>", function() {
          });
          
       }
       },
  "click #vprevious": function(e, tmpl) {
         

         if(vpageno!=0)
         {
            vpageno=vpageno-1;
            videopostssuscribed.stop();
            videopostssuscribed=Meteor.subscribe('getvideoposts',hobbyname,vpageno);
         }
         else
            {
             bootbox.alert("<h3>Already on the first page!!</h3>", function() {
          });
            }
         
         
         
       },
  "click #vnext": function(e, tmpl) {
       
       if((vpageno+1)<videocount)
      {
       vpageno=vpageno+1;
       
       videopostssuscribed.stop();
       videopostssuscribed=Meteor.subscribe('getvideoposts',hobbyname,vpageno);
       }
       else
       {
          bootbox.alert("<h3>No more pages to show!!</h3>", function() {
          });
          
       }
       },




  "click #unsuscribe": function(e, tmpl) {
     
     
    Meteor.call('removehobby',this.hobbyid);
       },
  "click #navigator": function(e, tmpl){
         $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');

          
        },

    

   });


 Template.newvideopost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/'+hobbyname+'/main';}   // esc
});
}
  
Template.displaypost.events({            // check this once  -----Roshni
  
  "click #comment": function(e, tmpl){
         var x=$('#data').val();
         var t;
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No comment added!!!!</h3>", function() {
          });
          
           return false;
         }
        
          if(postid!=undefined)          
          {
            $('#data').val("");
            var s=x.split(' ');
            var k=0;
            console.log(s.length);
            for (var i = 0; i <s.length; i++) 
              { 
                   if((Words.findOne({type:s[i]})))
                      { k=1;
                        break;
                      }
              }
          if(k==0)
             Meteor.call('addcomment',postid,x);
           else
              bootbox.alert("<h3>The site prohibits you from using Foul language!!!!</h3>", function() {
          });

           }  
        },
   });

Template.displayvideo.events({            // check this once  -----Roshni
  
  "click #comment": function(e, tmpl){
         var x=$('#vdata').val();
         
         if (x==null || x=="")
         {
           alert("No comment added!!!!");
           return false;
         }
        
          if(videoid!=undefined)
          {
          $('#vdata').val("");
          Meteor.call('addvidcomment',videoid,x);
           }

          
        },

    

   });

//-------------------------------------------

  Template.hobbyedit.rendered = function() {
    $("html,body").animate({scrollTop: 0},500);
  }

  /*Template.hobby_edit.events({
  "click #addnewhobby": function(e, tmpl) {
    
   });*/  
//---------------------------

  Template.newpost.events({
  
  "click #post": function(e, tmpl){
         var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No heading of post found!!</h3>", function() {
          });
           return false;
         }
         if(y==null || y=="")
        {
          bootbox.alert("<h3>No data found!!</h3>", function() {
          });
          return false;
        }
        if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
          Meteor.call('addpost',this.hobbyid,x,y);
          window.location = '/'+this.name+'/main';
          return true;
        }
        else
        {
          bootbox.alert("<h3>You are not subscribed!!!!</h3>", function() {
          });
         
          return false;
        }

          
        },

    

   });






  Template.newpost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/'+hobbyname+'/main';}   // esc
});
}

  Template.editpost.rendered = function() {
  $("html,body").animate({scrollTop: 0},500);
  
  $(document).keyup(function(e) {

  if (e.keyCode == 27) {window.location = '/Posts/'+postid;}   // esc
});

}

  Template.newvideopost.events({
  
  "click #post": function(e, tmpl){
         var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No heading of post found!!</h3>", function() {
          });
          
           return false;
         }
         if(y==null || y=="")
        {
          bootbox.alert("<h3>No data found!!!!</h3>", function() {
          });
         
          return false;
        }
        if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
            var url=y;
            if (url.indexOf('youtube.com') > -1) {
            
                   var id = url.split('v=')[1].split('&')[0];

                if (!id) {
                  bootbox.alert("<h3>Not a valid youtube url!!</h3>", function() {
          });
                      
                      return false;
                }
                var m=('http://i1.ytimg.com/vi/'+id+'/hqdefault.jpg');
                Meteor.call('addvideopost',this.hobbyid,x,y,m);
                window.location = '/'+this.name+'/main';
                return true;}
           else
           {
             bootbox.alert("<h3>Not a valid youtube url!!</h3>", function() {
          });
             return false;
           }
          
          
        }
        else
        {
          bootbox.alert("<h3>You are not subscribed!!</h3>", function() {
          });
          
          return false;
        }

          
        },

    

   });   






  Template.hobbymain.helpers({
    checkhobby: function() {
      if(this.hobbyid==undefined)
        return false;
      else
       return !_.contains(Meteor.user().suscribed,this.hobbyid);
      
    },
    filterpost: function() {
       
         return Posts.find();
    },
    filtervideopost: function() {
      
         return Videoposts.find();
    },


  })

  Template.header.helpers({
    userid: function() {
      
       return Meteor.userId();
      
    }


  })





  Template.displaypost.helpers({
    checklike: function() {
      if(Posts.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Posts.findOne().likeusers,Meteor.userId());
       }
    },
    author: function() {
       
         return Meteor.users.find({_id:this.userid});
    },
    creator: function() {
      
         return (this.userid==Meteor.userId());
    },
    comments: function() {
      
      return Comments.find();
    },
    checklike1: function() {
      if(Posts.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Posts.findOne().likeusers,Meteor.userId());
       }
    },
  })


  Template.displayvideo.helpers({
    checklike: function() {
      if(Videoposts.findOne()==undefined)
      {
       return false;
     }
      else
      {  
      return _.contains(Videoposts.findOne().likeusers,Meteor.userId());
       }
    },
    author: function() {
       
         return Meteor.users.find({_id:this.userid});
    },
    creator: function() {
      
         return (this.userid==Meteor.userId());
    },
    vidcomments : function(){

      return Videocomments.find();
    },

  })

  
  Template.displaypost.events({
  "click #unlike": function(e, tmpl) {
   
    Meteor.call('unlike',this._id,Meteor.userId());
       },
  "click #like": function(e, tmpl) {
    Meteor.call('like',this._id,Meteor.userId());
       },
  "click #unlike1": function(e, tmpl) {
   
    Meteor.call('unlike1',this._id,Meteor.userId());
       },
  "click #like1": function(e, tmpl) {
    Meteor.call('like1',this._id,Meteor.userId());
       },
  "click #delete": function(e, tmpl) {
     var answer=confirm("Are you sure you want to delete this post?");
     if(answer==true)
     {
    Meteor.call('deletepost',postid);
    window.location = '/'+hobbyname+'/main';
    //alert('Deleted your post!!');
      }
       }


   });


  Template.displayvideo.events({
  "click #unlike": function(e, tmpl) {
   
    Meteor.call('unlikevideo',this._id,Meteor.userId());
       },
  "click #like": function(e, tmpl) {
    Meteor.call('likevideo',this._id,Meteor.userId());
       },
  "click #delete": function(e, tmpl) {
     var answer=confirm("Are you sure you want to delete this post?");
     if(answer==true)
     {
    Meteor.call('deletevideo',videoid);
    window.location = '/'+hobbyname+'/main';
   // alert('Deleted your post!!');
      }
       }


   });

 Template.editpost.events({
  "click #submit": function(e, tmpl) {
      var y=$('#data').val();
         var x=$('#topic').val();
         
         if (x==null || x=="")
         {
          bootbox.alert("<h3>No heading of post found!!</h3>", function() {
          });
           return false;
         }
         if(y==null || y=="")
        {
          bootbox.alert("<h3>No data found!!</h3>", function() {
          });
          
          return false;
        }
       // if(_.contains(Meteor.user().suscribed,this.hobbyid))
        {
          Meteor.call("updatepost",postid,x,y); 
          window.location = '/Posts/'+postid;
          return true;
        }
     /*   else
        {
          alert('You are not suscribed!!');
          return false;
        }*/

          

   
     
       }


   });





  Template.header.events({
  "click #logout": function(e, tmpl) {

    Meteor.logout();
   },
  "click #profile": function(e, tmpl) {
        window.location = '/user/'+Meteor.userId();
    
       }
   });
  
  Template.home.helpers({
   resthobbies: function() {
      return Hobbies.find( { first : { $exists : false } } );
    
    },
    hobbies: function() {
      return Hobbies.find();
    
    },
    firsthobby: function() {
      return Hobbies.find( { first : { $exists : true } } );
    
    },
    checkfirst:function(){
      if(carouselIndex==0)
      {
        carouselIndex==1;
        return true;
      }
      else
        return false;
    }
  })
 /*Template.home.firsttimelogin=function(){
       console.log('here');
        var p=Meteor.users.findOne({_id:Meteor.userId()});

    return p.count==1; 
      });
*/

 


  Template.home.rendered = function () {

  $("html,body").animate({scrollTop: 0},1000);
  $(document).keydown(function(e) {
    switch(e.which) {
        /*case 37: // left
        break;*/

        case 38: $("html,body").animate({scrollTop: 0},500);
        break;

      /*  case 39: // right
        break;

        case 40:  $('html, body').animate({scrollTop:$('#posts').offset().top-75}, 'slow');
        break;*/

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    }); 
  
 
  
   
  $(".dropdown-menu li a").mousedown(function() {
    var dropdown = $(this).parents('.dropdown');
    var link = dropdown.children(':first-child');
    link.css('background-color', "#2E3436");
    link.css('color', 'white');
  });
 
  $('.carousel').carousel({
      interval: 4000
   });
};

 



  Template.test.events({
  "click #hi": function(e, tmpl){
          /* alert("you clicked");
            $("#div1").fadeIn();
    $("#div2").fadeIn("slow");
    $("#div3").fadeIn("slow");*/
         $('html, body').animate({
        scrollTop: $("#div5").offset().top+230
    }, 1000);
          
        },

     });

 


}

