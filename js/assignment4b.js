/*
    Assignment 4B
    Chun-Hao Huang
    assignment4b.js   
*/

function getId(id) { //A function to look up an HTML element by id and return the element
    "use strict";
    return document.getElementById(id);
}

/*---------------------------------------------------------------------------------------*/


function updateVoteCount(voteArr) { // The code to update the votes
    "use strict";
    for (var i = 0; i < voteArr.length; i++) {
        getId("voteForC" + (i + 1)).value = voteArr[i];
    }
    var total = getSum(voteArr);
    getId("voteTotal").value = total;
    var votesPercentage = getPercentages(voteArr, total);
    console.log(votesPercentage);
    for (var j = 0; j < votesPercentage.length; j++) {
        getId("votePercentage" + (j + 1)).value = votesPercentage[j];
    }
}

function getSum(arr) { //A function which takes an Array of numbers as a parameter, and returns the sum.
    "use strict";
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        result += Number(arr[i]);
    }
    return result;
}

function getPercentages(arr, total) { //A function which takes an Array of numbers as a parameter, and returns an array of percentages 
    "use strict";
    var percentage = 0;
    var percentagesArray = [];
    for (var i = 0; i < arr.length; i++) {
        percentage = ((Number(arr[i]) / total) * 100).toFixed(1) + "%";
        percentagesArray.push(percentage);
    }
    return percentagesArray;
}

/*---------------------------------------------------------------------------------------*/
function setCandidateName(candidates) { //set all the candidate names
    "use strict";
    for (var i = 0; i < candidates.length; i++) {
        var name = candidates[i].name;
        var party = candidates[i].party;

        getId("party" + (i + 1)).value = party; //set all party

        var candidateName = document.getElementsByClassName("candidateName" + (i + 1));
        //Be careful! getElementsByClassName method return an arry-like object
        for (var j = 0; j < candidateName.length; j++) { 
            candidateName[j].value = name;

        }
    }

}


/*---------------------------------------------------------------------------------------*/
function init() {
    "use strict";
    //The first part set the tag that will only be set once
    getId("date").value = votingData.electionDate;
    var candidates = votingData.candidates;
    setCandidateName(candidates);
    var timeDelayMs = 5000; // 5-second delay

    //The second part set the vote count that will change every 5-second
    var vote = votingData.voting;
    voteUpdates(vote, 0);
    
    function voteUpdates(voting, myIndex) {
        "use strict";
        // The if test prevents the voteUpdates 
        // function from recursing forever
        if (voting.length > myIndex) {
            updateVoteCount(voting[myIndex]);
            console.log("Vote data updates " + (myIndex + 1) + " time")
                // Recursively call voteUpdates function after a delay, passing the voting array and the next index
            setTimeout(voteUpdates, timeDelayMs, voting, myIndex + 1);
        }

    }

}

window.onload = function () {
    init();
};