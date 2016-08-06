'use strict';
/**
 * @ngdoc function
 * @name hrdirektApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the hrdirektApp
 */

angular.module('strv').controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.openMenu = false;

}]);


angular.module('strv').controller('CommentsCtrl', ['$scope', '$http', function ($scope, $http) {


	$scope.comments = [];

	$http.get('json/comments.json').success(function(data) {
      $scope.amountComments = data.comments.length;
      $scope.comments = data.comments;

        for (var i=0; i<$scope.amountComments; i++){
            $scope.comments[i].Date = moment($scope.comments[i].Date, "DD MMM YYYY").startOf('day').fromNow();

            var amountReplies = $scope.comments[i].Replies.length;
            if (amountReplies >= 0){
                for(var j=0; j<amountReplies; j++){
                    $scope.comments[i].Replies[j].Date = moment($scope.comments[i].Replies[j].Date, "DD MMM YYYY").startOf('day').fromNow();
                }    
            }
        }
    });

    $scope.myAvatar = "me.jpg";

    $scope.commentNotSent = "";

    $scope.addReview = function(_comment){
    	$scope.objToAdd = {
    		"Avatar": $scope.myAvatar,
    		"Name": "Álvaro José",
    		"Lastname": "Solís",
    		"Date": moment().format("DD MMM YYYY, HH:mm a"),
    		"Comment": _comment,
    		"Replies": []
    	}
		$scope.comments.push($scope.objToAdd);
		$scope.commentNotSent = "";
	};

}]);
