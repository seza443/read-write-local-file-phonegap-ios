// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $cordovaDevice, $cordovaFile) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
        
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
         
         function fail(err){
         	alert("fail");
         }
         
         function gotFS(fs) {
            fs.root.getFile("test.txt", {create: true, exclusive: false},
                            gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
			alert("got file entry");
			alert(fileEntry.toURL());
            fileEntry.createWriter(gotFileWriter, fail); //write
            readText(fileEntry); //read
        }

        function gotFileWriter(fileWriter) {
            alert("got filer writer");
            saveText(fileWriter);
        }

        function saveText(fileWritter) {
                fileWritter.onwriteend = function (evt) {
						alert("written");
                }
                fileWritter.write("hello");
        }

  		function readText(fe) {
                fe.file(function (dbFile) {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
						alert("read!");
						alert(evt.target.result);
                    }
                    reader.readAsText(dbFile);
                }, fail);
            }
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
