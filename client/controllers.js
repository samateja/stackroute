myApp.service("userService", function(){
    this.data = [];
});

angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService','userService',
  function ($scope, $location, AuthService,userService) {

    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function (data) {
			console.log(data)
		userService.data.push(data)
          $location.path('/info');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);


angular.module('myApp').controller('ProfileController',  ['$scope', '$http', '$routeParams','userService',
function ($scope, $http, $routeParams,userService) {
	$scope.list = userService.data[0].data;
	
	$scope.profile = [
	{
		username:$scope.list.username,
		email:$scope.list.email,
		phone:$scope.list.phone,
		dateofbirth:$scope.list.dateofbirth,
		address:$scope.list.address
	}];

}]);



angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService','userService',
  function ($scope, $location, AuthService,userService) {

    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
			console.log($scope);
			console.log(userService.data)
		    userService.data = [];
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password,$scope.registerForm.phone,$scope.registerForm.email,$scope.registerForm.dateofbirth,$scope.registerForm.address)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);