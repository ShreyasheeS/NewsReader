// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('newsApp', ['ionic']);

app.controller('newsController', function($scope, $http) {



  $scope.items = [];
  $scope.loadMore = function() {
    $http.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ce4c22b173ce4453a4d91cda76911629", {params: parameters}).success(function(items) {
      useItems(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });


    $scope.news = [];
    $http({
      method: "GET",
      url: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ce4c22b173ce4453a4d91cda76911629"

    }).then(function(newsData) {
      $scope.news = newsData.data.articles;
      console.log(newsData);
    })
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless yo u know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
