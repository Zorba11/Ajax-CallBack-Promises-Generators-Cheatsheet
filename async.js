// ...................AJAX Requests JS AND JQUERY Method Basics.......................
// window.onload = function() {
//   var http = new XMLHttpRequest(); //XMLHttpRrequest obect

// //   .......//....with JS...
//   http.onreadystatechange = function() {
//     if (http.readyState == 4 && http.status == 200) {
//       //   console.log(JSON.parse(http.response));
//       //data is available only when the ready state is 4, status 200 means everything is okay, if it is 404 means it couldnt find the reqst
//     }
//   };

//   http.open("GET", "data/tweets.json", true); //just sets up the request, tells JS where we want to get the data from, type of request, whether its syncron or asyncron
//   http.send();

//   //   console.log("test");
// // ...........................................................................
//   //....jQuery method....

//   $.get("data/tweets.json", function(data) {
//     console.log(data);
//   });
//   console.log("test");
// };

/* READY STATES


0 - request not initialized
1 - request has been set up
2 - request has been sent
3 - request is in process
4 - request is complete


*/
// .................................................................

// ...............CallBack Functions........................
// window.onload = function() {

//     // .........synchronous callback.....
//   function CallBack(val) {
//     console.log(val);
//   }

//   var fruits = ["banana", "apple", "pear"];

//   fruits.forEach(CallBack);
//   console.log("done");

// };
// ..........asynchronous callback....
// window.onload = function() {
//   function cb(data) {
//     console.log(data);
//   }

//   $.get("data/tweets.json", cb);

//   console.log("test");
// };

// .......callback hell and tackling it....

// window.onload = function() {
//   $.ajax({
//     type: "GET",
//     url: "data/tweets.json",
//     success: function(data) {
//       console.log(data);

//       $.ajax({
//         type: "GET",
//         url: "data/friends.json",
//         success: function(data) {
//           console.log(data);

//           $.ajax({
//             type: "GET",
//             url: "data/videos.json",
//             success: function(data) {
//               console.log(data);
//             },
//             error: function(jqXHR, textStatus, error) {
//               console.log(error);
//             }
//           });
//         },
//         error: function(jqXHR, textStatus, error) {
//           console.log(error);
//         }
//       });
//     },
//     error: function(jqXHR, textStatus, error) {
//       console.log(error);
//     }
//   });
// };

// ....inorder to tackling the above call back hell, we are seperating everything and will make it neat....

// window.onload = function() {
//   function handleError(jqXHR, textStatus, error) {
//     console.log(error);
//   }

//   $.ajax({
//     type: "GET",
//     url: "data/tweets.json",
//     success: cbTweets,
//     error: handleError
//   });

//   function cbTweets(data) {
//     console.log(data);

//     $.ajax({
//       type: "GET",
//       url: "data/friends.json",
//       success: cbFriends,
//       error: handleError
//     });
//   }

//   function cbFriends(data) {
//     console.log(data);

//     $.ajax({
//       type: "GET",
//       url: "data/videos.json",
//       success: function(data) {
//         console.log(data);
//       },
//       error: handleError
//     });
//   }
// };

// ..........................................................

// ................JS PROMISES.............................

// window.onload = function() {
//   function get(url) {
//     return new Promise(function(resolve, reject) {
//       var xhttp = new XMLHttpRequest();
//       xhttp.open("GET", url, true);
//       xhttp.onload = function() {
//         if (xhttp.status == 200) {
//           resolve(JSON.parse(xhttp.response));
//         } else {
//           reject(xhttp.statusText);
//         }
//       };
//       xhttp.onerror = function() {
//         reject(xhttp.statusText);
//       };
//       xhttp.send();
//     });
//   }

//   var promise = get("data/tweets.json");
//   promise
//     .then(function(tweets) {
//       console.log(tweets);
//       return get("data/friends.json");
//     })
//     .then(function(friends) {
//       console.log(friends);
//       return get("data/videos.json");
//     })
//     .then(function(videos) {
//       console.log(videos);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// };

// ..........PROMISE WITH JQUERY.....

// window.onload = function() {
//   $.get("data/tweets.json")
//     .then(function(tweets) {
//       console.log(tweets);
//       return $.get("data/friends.json");
//     })
//     .then(function(friends) {
//       console.log(friends);
//       return $.get("data/videos.json");
//     })
//     .then(function(videos) {
//       console.log(videos);
//     });
// };

// ......................................................

// ...........GENERATORS................

// window.onload = function() {
//   function* gen() {
//     var x = yield 10;
//     console.log(x);
//   }

//   var myGen = gen(); // this doesnt run the gen method, it just prepares
//   console.log(myGen.next()); // notice that the value from yield i.e 10 is returned here in an object, object also has another boolean property 'done' which is true only when the function is complete. notice that in the next call its true
//   console.log(myGen.next(10)); // the value in the  paranthesis is returned to the yield method,therefore notice that value of x is 10 now.

// };

//.............Generators with ajax............

window.onload = function() {
  genWrap(function*() {
    var tweets = yield $.get("data/tweets.json");
    console.log(tweets);
    var friends = yield $.get("data/friends.json");
    console.log(friends);
    var videos = yield $.get("data/videos.json");
    console.log(videos);
  });

  function genWrap(generator) {
    var gen = generator();

    function handle(yielded) {
      if (!yielded.done) {
        yielded.value.then(function(data) {
          return handle(gen.next(data));
        });
      }
    }
    return handle(gen.next());
  }
};
