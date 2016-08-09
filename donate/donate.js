angular.module("donate", []).controller("donateController", function($scope) {
    $scope.amount = 0;
    $scope.percentage = 0;
    $scope.getPercentage = function() {
        $scope.percentage = 1000 / $scope.amount;
    };
});