//***************************************
// STATE and GLOBALS:
// qData is the STATE object for the quiz
var qData = { 
	questions:[
	  {qNum: 1,
	  q: "In 1946, WWII Veteran's led a rebellion and defeated a corrupt county government in Tennessee. This incident came to be known as : ",
	  qChoices: ['The Springfield Skirmish', 'The Really Big Fight', 'The Battle of Bunker Hill', 'The Battle of Athens'],
	  answerIndex: 3,
	  answerRefLink: 'http://www.constitution.org/mil/tn/batathen.htm'
	  },
	  {qNum: 2,
	  q: 'The phrase "Separation of Church and State" appears where in the founding documents?',
	  qChoices: ['The Good and Plenty Clause', 'It does not appear anywhere in these documents.', 'The Self-Righteous Act', 'The Four Freedoms'],
	  answerIndex: 1,
	  answerRefLink: 'http://www.heritage.org/political-process/report/the-mythical-wall-separation-how-misused-metaphor-changed-church-state-law'
	  },
	    {qNum: 3,
	  q: 'Born into slavery in Missouri, this man became one of the founders of Bio-Chemical Engineering:',
	  qChoices: ['Arnold Palmer', 'Flash Gordon', 'Fatty Arbuckle', 'George Washington Carver'],
	  answerIndex: 3,
	  answerRefLink: 'http://www.biotech-now.org/environmental-industrial/2012/02/honoring-george-washington-carvers-contributions-to-todays-bioeconomy'
	  },
	  {qNum: 4,
	  q: 'This actor piloted more than 20 combat missions over Europe in a B-17 Bomber:',
	  qChoices: ['Burt Reynolds', 'Nancy Sinatra', 'Jimmy Stewart', 'Humphry Bogart'],
	  answerIndex: 2,
	  answerRefLink: 'http://www.historynet.com/mr-stewart-goes-to-war.htm'
	  },
	  {qNum: 5,
	  q: 'What is the significance or purpose of the image of Moses and the Israelites posted above?',
	  qChoices: ['Radical right wing propaganda.', "This was Benjamin Franklin's design intended as the first Great Seal of the U.S. .", "This was from a stained glass window in the Capital's First Baptist Church", 'A business card for the Bishop of Boston.'],
	  answerIndex: 1,
	  answerRefLink: 'http://greatseal.com/committees/firstcomm/reverse.html'
	  }
	  ],
	score: 0,
	currentQ: 0,
	wasCorrect: false
};	

//***************************************
// STATE MODIFICATION and READ.... functions (represent everything you can do to state)
// ! does not read or modify the dom ... no jQuery / pure jscript only

//this will update the player's score
var updateScore = function(qData, qSequence, correct){
    //increment score if correct is true...
    if (correct === true) {
		qData.score = qData.score +=1;
	}
	qData.currentQ = qSequence;
	qData.wasCorrect = correct;
};

function processAnswer(qData, playerSelection) {
    if (parseInt(playerSelection) === (qData.questions[qData.currentQ].answerIndex)) {
        updateScore(qData, qData.currentQ, true);
    } else {
    	updateScore(qData, qData.currentQ, false);
    }
  showQresults(qData);
}

//***************************************
// RENDER MODIFICATION...
// these read or modify the dom

function showQresults(qData) {
	$('.results').removeClass('hideThis');
	$('#qSubmit').addClass('hideThis');

   if (qData.currentQ === (qData.questions.length -1)){
     $('#qNext').addClass('hideThis');
     $('#showResults').removeClass('hideThis');
   }else{
     $('#qNext').removeClass('hideThis');
   }

  //format the results statement:
  var workingQ = qData.questions[qData.currentQ];
  
  // format Correct or Wrong ...
  var rightOrWrong = "Wrong Amigo."
  if (qData.wasCorrect === true){
    rightOrWrong = "Correctamundo!";
  };
  
  $('#resultsP').text(rightOrWrong + " : The answer is: " + workingQ.qChoices[workingQ.answerIndex]); 
    // set question
	$('#resultsRefLink').text("Please click here to see referencing information...");
	$('#resultsRefLink').attr('href', workingQ.answerRefLink);
	$('#rollingTotalScore').text("Your current score is: " + qData.score + "  correct out of " + (qData.currentQ + 1) + " total questions.");
	// increment question number...
  qData.currentQ = qData.currentQ +=1;
  // console.log("showQresults...currentQ is " + qData.currentQ);
}

function showFinalResults(qData) {
  $('#showResults').addClass('hideThis');
  $('#resultsRefLink').addClass('hideThis');
  $('#resultsP').text("Thanks for playing!"); 
	$('#rollingTotalScore').text("Your final score is: " + qData.score + "  correct out of " + qData.questions.length + " total questions.");
}

function makeQ(qData) {
  // clear the radio button value...
  $('input[type=radio]').prop('checked',false);

  // format the question ... 
	$('#qHeader').text("Question " + (qData.currentQ + 1) + " of " + (qData.questions.length));	
	$('.question').text(qData.questions[qData.currentQ].q); // set question
	$('#c1l').text(qData.questions[qData.currentQ].qChoices[0]); // set choice1
  $('#c2l').text(qData.questions[qData.currentQ].qChoices[1]); // set choice2
	$('#c3l').text(qData.questions[qData.currentQ].qChoices[2]); // set choice3
	$('#c4l').text(qData.questions[qData.currentQ].qChoices[3]); // set choice4
	//$('#qTally').text((qData.score) + " correct out of : " + (qData.currentQ + 1) + " questions.");	
}
//***************************************
// initiate listeners...
$(document).ready(function() {
	$('#introSubmit').click(function(event) {
		// console.log("clicked intro button...");
		$('.introContainer').addClass('hideThis');
	  $('.qContainer').removeClass('hideThis');
		makeQ(qData);
	});
	
	$('#qSubmit').click(function(event) {
		// console.log("clicked q button...");
		processAnswer(qData, $('input[name=qRadioBtn]:checked').val());
		$('.qContainer').addClass('hideThis');
		// $('#qTally').removeClass('hideThis');
	});	
	
	$('#qNext').click(function(event) {
		// console.log("next button clicked!!!!!...");
        makeQ(qData);
        $('.qContainer').removeClass('hideThis');
        $('#qSubmit').removeClass('hideThis');
        $('.results').addClass('hideThis');
        $('#qNext').addClass('hideThis');
	});

	$('#showResults').click(function(event) {
	  showFinalResults(qData);
	});

	$('#startOver').click(function(event) {
    location.reload();
	});

}); //end (document).ready here...