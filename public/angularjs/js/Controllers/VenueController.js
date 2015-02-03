function VenueController($scope, $http) {
    this.scope = $scope;
    this.http = $http;

    $http.get('/api/venues')
        .success(function(data) {
            $scope.venues = data;
        });
}

