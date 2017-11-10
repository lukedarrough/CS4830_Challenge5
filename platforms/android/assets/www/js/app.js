angular.module('assignment', ['ionic'])

.controller('AssignmentCtrl', function($scope, $ionicModal) {
  // Get data from local storage and create data
  var assignmentString = window.localStorage['assignments'];
  if(assignmentString) $scope.assignments = angular.fromJson(assignmentString);
  else $scope.assignments = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-assignment.html', function(modal) {
    $scope.assignmentModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createAssignment = function(assignment) {
    $scope.assignments.push({
      assignment_name: assignment.assignment_name,
      assignment_class: assignment.assignment_class,
      assignment_due_date: assignment.assignment_due_date,
      assignment_due_time: assignment.assignment_due_time,
      assignment_completed: 'No'
    });
    $scope.assignmentModal.hide();
    assignment.assignment_name = "";
    assignment.assignment_class = "";
    assignment.assignment_due_date = "";
    assignment.assignment_due_time = "";
    window.localStorage['assignments'] = angular.toJson($scope.assignments);

  };

  $scope.removeAssignment = function(assignment) {
    var index = $scope.assignments.indexOf(assignment);
    $scope.assignments.splice(index, 1);
    window.localStorage['assignments'] = angular.toJson($scope.assignments);
  };

  $scope.setAssignmentCompleted = function(assignment) {
    var index = $scope.assignments.indexOf(assignment);
    $scope.assignments[index].assignment_completed = 'Yes';
    window.localStorage['assignments'] = angular.toJson($scope.assignments);
  }

  // Open our new assignment modal
  $scope.newAssignment = function() {
    $scope.assignmentModal.show();
  };

  // Close the new assignment modal
  $scope.closeNewAssignment = function() {
    $scope.assignmentModal.hide();
  };
})