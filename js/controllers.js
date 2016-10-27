angular.module("myControllers",['myServices'])
	.controller('NavBarCtrl', function($rootScope, $scope, AuthService) {

		$scope.logIn = AuthService.logIn;
		$scope.logOut = AuthService.logOut;
	})
	.controller('MainCtrl', function($scope, DataService) {

		$scope.messages = DataService.messages;

		$scope.addMessage = function(e) {
			e.preventDefault()
			DataService.addMessage($scope.message);
			$scope.message = ""
		}

	})
