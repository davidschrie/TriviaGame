var panel = $('#quiz-area');
var countStartNumber = 30;

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


//Trivia Questions: 


var questions = [{
  question: "Who was the coach of the 1985 Chicago Bears Super Bowl Winning Football Team?",
  answers: ["Jimmy Johnson", "Bill Parcels", "Mike Ditka", "None of the above"],
  correctAnswer: "Mike Ditka",
  image: "https://i.makeagif.com/media/9-11-2013/CpldzK.gif"
}, {
  question: "Which Ingredient isn't included in a classic 'Chicago Dog'? ",
  answers: ["Mustard", "Relish", "Pickle", "Ketchup"],
  correctAnswer: "Ketchup",
  image:"https://i2.wp.com/justgrubbin.com/wp-content/uploads/2018/07/no-ketchup.jpg?fit=600%2C390&ssl=1"
}, {
  question: "Which Chicago Bulls Team in the 90's had the best regular season record?",
  answers: ["1995-96 Chicago Bulls", "1990-91 Chicago Bulls", "1991-92 Chicago Bulls", "1997-98 Chicago Bulls"],
  correctAnswer: "1995-96 Chicago Bulls",
  image:"https://media.giphy.com/media/11ygZ33vkGVfpu/giphy.gif"
}, {
  question: 'Who is the Chicgo Cubs single season Homerun record holder??',
  answers: ["Ernie Banks", "Ron Santo", "Sammy Sosa", "Bill Williams"],
  correctAnswer: "Sammy Sosa",
  image:"https://media.giphy.com/media/ywuYID2EWqUGA/giphy.gif"
}, {
    // correct answer is 2010--answer still won't reflect that?
  question: "What year did the Chicago Blackhawks win the Stanley Cup for the first time in the 21st century?",
  answers: ["2005", "2010", "2009", "2013"], 
  correctAnswer: "2010",
  image:"https://thumbs.gfycat.com/CreativeTanAmurratsnake-size_restricted.gif"
}, {
  question: "Which Chicago Athlete earned the nickname 'Sweetness'?",
  answers: ["Brian Urlacher", "Walter Payton", "Mike Singletary", "Devin Hester"],
  correctAnswer: "Walter Payton",
  image:"http://cdn.pastemagazine.com/www/articles/Sweetness.gif"
}, {
  question: "What year did the Chicago Cubs win the World Series for the first time in franchise history since 1908?",
  answers: ["2003", "2016", "2015", "2017"],
  correctAnswer: "2016",
  image:"https://media.giphy.com/media/3o7TKVJrotqrMJdlao/giphy.gif"
}, {
  question: "Which Chicago team was first featured in SNL's 'Da ______'s'",
  answers: ["Da Bears", "Da Fire", "Da Bulls", "Da Blackhawks"],
  correctAnswer: "Da Bears",
  image:"https://media1.tenor.com/images/d286431efc696b95dfc506615c7bea05/tenor.gif?itemid=4783226"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};