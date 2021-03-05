/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>
var KanbanBoard = DlhSoft.Controls.KanbanBoard;
// Prepare data.
//var state1 = { name: 'New' }, state2 = { name: 'In progress', areNewItemButtonsHidden: true }, state3 = { name: 'Done', isCollapsedByDefaultForGroups: true, areNewItemButtonsHidden: true };
//var resource1 = { name: 'Resource 1', imageUrl: 'Images/Resource1.png' }, resource2 = { name: 'Resource 2', imageUrl: 'Images/Resource2.png' };
//var group1 = { name: 'Story 1', state: statesArray[1], assignedResource: resourceArray[0] }, group2 = { name: 'Story 1', state: statesArray[1], assignedResource: resourceArray[1] };
let statesArray = [
    { name: 'New' },
    { name: 'In progress', areNewItemButtonsHidden: true },
    { name: 'Done', isCollapsedByDefaultForGroups: true, areNewItemButtonsHidden: true }
];
let resourceArray = [
    { name: 'Resource 1', imageUrl: 'Images/Resource1.png' },
    { name: 'Resource 2', imageUrl: 'Images/Resource2.png' }
];
let groupsArray = [
    { name: 'Story 1', state: statesArray[1], assignedResource: resourceArray[0] },
    { name: 'Story 1', state: statesArray[1], assignedResource: resourceArray[1] }
];
let states = [statesArray[0], statesArray[1], statesArray[2]];
let assignableResources = [resourceArray[0], resourceArray[1]];
let groups = [groupsArray[0], groupsArray[1]];
let items = [
    { name: 'Task 1', group: groupsArray[0], state: statesArray[0], assignedResource: resourceArray[0] },
    { name: 'Task 2', group: groupsArray[0], state: statesArray[1], assignedResource: resourceArray[0] },
    { name: 'Bug 1', group: groupsArray[0], state: statesArray[1], assignedResource: resourceArray[0], itemType: KanbanBoard.defaultItemTypes.bug },
    { name: 'Task 3', group: groupsArray[0], state: statesArray[0], assignedResource: resourceArray[1] },
    { name: 'Task 4', group: groupsArray[0], state: statesArray[0], assignedResource: resourceArray[0] },
    { name: 'Task 5', group: groupsArray[1], state: statesArray[0], assignedResource: resourceArray[1] },
    { name: 'Task 6', group: groupsArray[1], state: statesArray[1], assignedResource: resourceArray[1] },
    { name: 'Task 7', group: groupsArray[1], state: statesArray[1], assignedResource: resourceArray[0] },
    { name: 'Task 8', group: groupsArray[1], state: statesArray[2], assignedResource: resourceArray[1] }
];
// Uncomment the following code lines to load more groups and items.
// for (var i = 3; i <= 10; i++) {
//    var group: KanbanGroup = { name: 'Story ' + i, assignedResource: resource1 };
//    groups.push(group);
//    for (var j = 1; j <= 10; j++) {
//        var item: KanbanItem = { name: 'Item ' + i + '.' + j, group: group, state: j % 2 == 0 ? state1 : state2, assignedResource: resource1 };
//        items.push(item);
//    }
// }
var nextIteration = { groups: [], items: [] };
angular.module('KanbanBoardSample', ['DlhSoft.Kanban.Angular.Components'])
    .controller('MainController', function ($scope) {
    // Bind data to the user interface.
    $scope.states = states;
    $scope.groups = groups;
    $scope.items = items;
    $scope.assignableResources = assignableResources;
    // Initialize a newly created item before adding it to the user interface.
    $scope.initializeNewItem = function (item) {
        item.assignedResource = resource1;
        console.log('A new item was created.');
    };
    // Allow item deletion by clicking a button in the user interface.
    $scope.deleteItem = function (item) {
        items.splice(items.indexOf(item), 1);
        console.log('Item ' + item.name + ' was deleted.');
    };
    // Handle changes.
    $scope.onItemStateChanged = function (item, state) {
        console.log('State of ' + item.name + ' was changed to: ' + state.name);
    };
    $scope.onItemGroupChanged = function (item, group) {
        console.log('Group of ' + item.name + ' was changed to: ' + group.name);
    };
    // Move items to the next iteration.
    $scope.nextIteration = nextIteration;
    $scope.moveItemToNextIteration = function (type, index) {
        if (type === DlhSoft.Controls.KanbanBoard.types.group) {
            // Move an entire group (story) and all its items.
            var group = groups[index];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.group === group) {
                    items.splice(i--, 1);
                    nextIteration.items.push(item);
                }
            }
            groups.splice(index, 1);
            if (nextIteration.groups.indexOf(group) < 0)
                nextIteration.groups.push(group);
            console.log('Group ' + group.name + ' and its items were moved to next iteration.');
        }
        else {
            // Move a single item, and copy the group (story) if needed.
            var item = items[index];
            items.splice(index, 1);
            nextIteration.items.push(item);
            var group = item.group;
            if (nextIteration.groups.indexOf(group) < 0)
                nextIteration.groups.push(group);
            console.log('Item ' + item.name + ' was moved to next iteration.');
        }
    };

    // Implement save and load with localStorage
    $scope.save = function() {
        let storage = window.localStorage;
        let data = {};

    }
});
