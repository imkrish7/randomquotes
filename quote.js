function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
var currentQuote = '',
  currentAuthor = '';

function openURL(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}


function getQuote() {
  var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  $.ajax({
    headers: {
      "X-Mashape-Key": "ieO25AS6KOmshVjLDpPPr3v66inOp1vsP4FjsnHltJaUoPzlAT",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
  }).done(function (quotes) {
    currentQuote = quotes.quote;
    currentAuthor = quotes.author;
    $("#quote-text").text(quotes.quote);
    $("#author").text(quotes.author);
  });
  var color = Math.floor(Math.random() * colors.length);
  $(".cont").css({
    "background": colors[color],
    "color": colors[color]
  });
  $(".button").css({
    "background": colors[color],
    "color": "white"
  });
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
}
$(document).ready(function () {
  getQuote();
  $(".button").on("click", getQuote);
  $('#tweet-quote').on('click', function () {
    if (!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
  $('#tumblr-quote').on('click', function () {
    if (!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  });

});