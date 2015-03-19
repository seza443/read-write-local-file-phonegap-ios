// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {
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
    $rootScope.profileFileName = "profile.json";
	$rootScope.profile = { //default profile
				firstName: "Clark",
				lastName: "Kent",
				imageURL: "img/default.png"
			};
	$rootScope.fileEntry = null;
	$rootScope.fileSystem = null;

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failToGetFileSystem);
	//On iOS, LocalFileSystem.PERSISTENT is the Documents folder under the private app folder
	//On Android, we are in the root folder of the sdcard...
	 
	function failToGetFileSystem() {
	    alert("fail to get file system");
	}
	 
	function gotFS(fs) {
	    $rootScope.fileSystem = fs; //keep the file system accessible
		 //Here we try to get the file. The exclusive attribute sets to true will cause the method to fail if the file already exists. So I now that I should try to read the profile instead of writting the default profile.
	     fs.root.getFile($rootScope.profileFileName, { create: true, exclusive: true },
	                            gotFileEntryForFirstTime, failToGetExclusiveFileEntry);
	}
	 
	/**
	  * File didn't exist and has just been created so we need to write the profile one time at least.
	  */
	function gotFileEntryForFirstTime(fileEntry) {
	      alert("got file entry for first time");
	      alert("url : " + fileEntry.toURL());
	      $rootScope.fileEntry = fileEntry;
	      $rootScope.saveProfile(function () { alert("profile file written"); }, function () { alert("profile file FAIL written"); });
	}
	 
	$rootScope.saveProfile = function (successFunction, errorFunction) {
	     if (!$rootScope.fileEntry) {
	           alert("no file to write in");
	           return;
	      }
	      var contentToWrite = angular.toJson($rootScope.profile); //convert profile to JSON
	      $rootScope.fileEntry.createWriter(function (fileWriter) {
	          fileWriter.onwriteend = successFunction;
	          fileWriter.onerror = errorFunction;

	          fileWriter.write(contentToWrite);
	      },
	       errorFunction);
	}
	 
	function failToGetExclusiveFileEntry() {
	   alert("file maybe exists ?");
	   $rootScope.fileSystem.root.getFile($rootScope.profileFileName, { create: true, exclusive: false },
	                   gotFileEntry, failToGetFileEntry);
	}
	 
	function failToGetFileEntry(error) {
	    alert("fail to get file entry");
	}
	 
	/**
	  * Got file entry but it already exists so we need to read it.
	  */
	function gotFileEntry(fileEntry) {
	   alert("got file entry");
	   alert(fileEntry.toURL());
	   $rootScope.fileEntry = fileEntry;
	   readProfile();
	}
	 
	function readProfile() {
	   if (!$rootScope.fileEntry) {
	     alert("no file to read");
	     return;
	   }
	$rootScope.fileEntry.file(function (profileFile) {
	  var reader = new FileReader();
	  reader.onloadend = function (evt) {
	     alert("read!");
	     alert(evt.target.result);
	     if (typeof this.result == 'string') {
	       $rootScope.profile = JSON.parse(evt.target.result);
	     }
	     else {
	        $rootScope.profile = evt.target.result;
	     }
	  }
	   reader.readAsText(profileFile);
	  }, failToReadProfileFile);
	}
	 
	function failToReadProfileFile(error) {
	    alert("fail to readprofile file");
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
