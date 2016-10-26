angular.module("myServices",['firebase'])
  .factory("DataService", function( $http, $rootScope, $firebaseArray ) {

    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);

    function addMessage( msg ) {
      messages.$add( {
        username: $rootScope.user.name,
        avatar: $rootScope.user.avatar,
        text: msg
      } )
    }

    return {
      messages: messages,
      addMessage: addMessage
    }

  })
  .factory("AuthService", function( $http, $firebaseAuth, $rootScope ) {

    var Auth = $firebaseAuth();

    Auth.$onAuthStateChanged(function(authData) {
      if (authData) {
        $rootScope.$broadcast("authEvent", {
          name: authData.displayName,
          avatar: authData.photoURL,
          email: authData.email
        });
      }
      else {
        $rootScope.$broadcast("authEvent", null)
      }
    });

    function logIn() {
      if ( Auth.$getAuth() === null ) {
        Auth.$signInWithPopup("google")
      }
    }

    function logOut() {
      Auth.$signOut();
    }

    return {
      logIn: logIn,
      logOut: logOut
    }

  })

