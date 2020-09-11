//variables___________________________
var quoteButton;
var quoteBox;
var currentQuote;
var randomNumber;
var html;
// var quotes = [
//   {
//     author: "Princess Diana",
//     quote:
//       "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.",
//     source: "www.brainyquote.com"
//   },
//   {
//     author: "Helen Mirren",
//     quote:
//       "I don't believe that if you do good, good things will happen. Everything is completely accidental and random. Sometimes bad things happen to very good people and sometimes good things happen to bad people. But at least if you try to do good things, then you're spending your time doing something worthwhile.",
//     source: "www.brainyquote.com"
//   },
//   {
//     author: "Steve Jobs",
//     quote: "I believe life is an intelligent thing: that things aren't random.",
//     source: "www.brainyquote.com"
//   },
//   {
//     author: "Albert Camus",
//     quote:
//       "It is necessary to fall in love... if only to provide an alibi for all the random despair you are going to feel anyway.",
//     source: "www.brainyquote.com"
//   }
// ];

//initialize_______________________________
// quoteButton = document.getElementById("quote-button");
// quoteButton.addEventListener("click", changeQuote, false);
// quoteBox = document.getElementById("quote-display");

//functions________________________________
// function changeQuote(){
//   'use strict';

//   html = "";
//   randomNumber = Math.floor(Math.random() *quotes.length);
//   html += '<p>"' + quotes[randomNumber].quote + '"</p>';
//   html += '<p> - ' + quotes[randomNumber].author + '</p>';
//   html += '<p>' + quotes[randomNumber].source + '</p>';
//   quoteBox.innerHTML = html;
//   currentQuote = quotes[randomNumber].quote + " -" + quotes[randomNumber].author;
// }

//uodates quoteBox
function update(response) {
  'use strict';
  
  html = "";
  html += '<p>"' + response.quoteText + '"</p>';
  html += "<p> - " + response.quoteAuthor + "</p>";
  html += "<a href='" + response.quoteLink + "' target = '_blank'>" + response.quoteLink + "</a>";
  
  $('#quote-display').append(html);
  currentQuote = response.quoteText + " -" + response.quoteAuthor;
}

//incase of error
function error(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}

//tweet button pressed function
$("#tweet-button").click(function() {
  window.open("https://twitter.com/intent/tweet?text=" + currentQuote);
});


//gets json from web and performs function
$("#quote-button").click(function() {
  $('#quote-display').html("");
  //using forismatic api
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update).fail(error);
});