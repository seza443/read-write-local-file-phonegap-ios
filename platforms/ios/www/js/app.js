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
    
    $rootScope.welcome = "Welcome man";
    alert($rootScope.welcome);
    $rootScope.documentsDirectory = cordova.file.documentsDirectory;
    alert($rootScope.documentsDirectory);
    $rootScope.pilotProfileFilePath = "pilotProfile.json";
    $rootScope.pilotProfile = { //default profile
            firstName: "Clark",
            lastName: "Kent",
            imageURL: "img/defaultPilot.png",
            medicalLicenses: {
                authority: "--",
                certificateClass: "--",
                number: "",
                expirationDate: "",
                reminderActived: false,
                remindDaysBeforeExpiration: 3
            }
        };
        
        
        
        test();
        function test(){
        	alert("reach this!");
        }
        
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
         
         function fail(err){
         	alert("fail");
         }
         
         function gotFS(fs) {
            //var fail = failCB('getFile');
            fs.root.getFile("test.json", {create: true, exclusive: false},
                            gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            //var fail = failCB('createWriter');
            //file.entry = fileEntry;
			alert("got file entry");
            //fileEntry.createWriter(gotFileWriter, fail);
            readText(fileEntry);
        }

        function gotFileWriter(fileWriter) {
            //file.writer.available = true;
            //file.writer.object = fileWriter;
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
// 							var textArray = evt.target.result.split("\n");
// 
// 							dbEntries = textArray.concat(dbEntries);
// 
// 							$('definitions').innerHTML = dbEntries.join('');
						alert("read!");
						alert(evt.target.result);
                    }
                    reader.readAsText(dbFile);
                }, fail);
            }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //Mine1
        
       //  
//         window.resolveLocalFileSystemURL($rootScope.appDirectory, function (dir) {
//             //console.log("got main directory", dir);
//             alert("got main directory");
//             // getFile(path, [option: create:true to create the file, exclusive:true to fail if file exists], success, fail)
//             dir.getFile($rootScope.pilotProfileFilePath, { create: true, exclusive: true },
//                 gotFileForFirstTime,
//             function (error) {
//                 //console.log("file maybe exists ?");
//                 alert("file maybe exists ?");
//                 dir.getFile($rootScope.pilotProfileFilePath, { create: false },
//                     readPilotProfile,
//                     cannotReadPilotProfile);
//             });
//         });
//         
// 
//         $rootScope.savePilotProfile = function (successFunction, errorFunction) {
//             if (!$rootScope.pilotProfileFile) {
//                 console.log("no file to write in");
//                 alert("no file to write in");
//                 return;
//             }
//             var contentToWrite = angular.toJson($rootScope.pilotProfile); //convert profile to JSON
//             console.log("going to write " + contentToWrite);
//             $rootScope.pilotProfileFile.createWriter(function (fileWriter) {
//                 fileWriter.onwriteend = successFunction;
//                 fileWriter.onerror = errorFunction;
// 
//                 //var blob = new Blob([log], { type: 'text/plain' });
//                 fileWriter.write(contentToWrite);
//             }, 
//             errorFunction);
//         }
// 
//         function gotFileForFirstTime(file) {
//             console.log("got the file for first time", file);
//             alert("got the file for first time");
//             $rootScope.pilotProfileFile = file;
//             $rootScope.savePilotProfile(function (success) {
//                 console.log("ok, profile writen");
//                 alert("ok, profile writen");
//             }, function (error) {
//                 console.log("cannot write profile", error);
//                 alert("cannot write profile");
//             });
//         }
// 
//         function readPilotProfile(file) {
//             console.log("got the file", file);
//             alert("got the file");
//             $rootScope.pilotProfileFile = file;
//             $rootScope.pilotProfileFile.file(function (file) {
//                 var reader = new FileReader();
// 
//                 reader.onloadend = function (e) {
//                     console.log(this.result);
//                     console.log(this.result);
//                     if (typeof this.result == 'string') {
//                         $rootScope.pilotProfile = JSON.parse(this.result);
//                     }
//                     else {
//                         $rootScope.pilotProfile = this.result;
//                     }
//                     console.log("profile read!");
//                     alert("profile read!");
//                     ionic.trigger("pilotProfileReady", null, null);
//                     navigator.splashscreen.hide();
//                 };
// 
//                 reader.readAsText(file);
//             },
//             function (error) {
//                 console.log("could not get file from file", error);
//                 alert("could not get file from file");
//             });
//         }
// 
//         function cannotReadPilotProfile(error) {
//             console.log("cannot get file", error);
//             alert("cannot get file");
//         }
//         
//         
//         
//         
//         
//         
//         
//         
//         
//         $cordovaFile.createFile($rootScope.documentsDirectory, $rootScope.pilotProfileFilePath, true)
//         	.then(function(success)¶{
//         		alert("file creatde");
//         	},
//         	function(error){
//         		alert("fail");
//         	});
        
        
        
        
    
    
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
