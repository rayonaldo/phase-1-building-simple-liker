// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.querySelector('div#modal').className = 'hidden';

document.addEventListener('DOMContentLoaded', () => clickHeart());


function clickHeart() {
  let heartQuery = document.querySelectorAll('span.like-glyph');
  for (let heart of heartQuery) {
    heart.addEventListener('click', () => {
      if (heart.textContent === EMPTY_HEART) {
        mimicServerCall()
        .then(resp => {
          console.log(resp);
          heart.textContent = FULL_HEART;
          heart.className = 'activated-heart';
        })
        .catch(error => {
          document.querySelector('div#modal').classList.remove('hidden');
          document.querySelector('p#modal-message').textContent = error;
          setTimeout(() => document.querySelector('div#modal').className = 'hidden', 3000);
        })
      } else if (heart.textContent === FULL_HEART) {
        heart.textContent = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    });
  }
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
