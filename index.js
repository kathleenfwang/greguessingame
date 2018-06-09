var $button = $('button')
const $game = $('#game')
const $start = $('#start')
const $ul = $('ul')
const $li = $('li')
var maxWords = 0; 
  var winner = false 
const toggleArgs = ['hide','show']
$('#easy').click(function(){
  maxWords = 5
startGame(); 
})
$('#hard').click( function() {
  maxWords = 10 
  startGame();
})
function startGame() {
 toggleClass($game,toggleArgs)
  toggleClass($start,toggleArgs)
  var wordList = randomWords(words)
 appendWords(wordList)
 var definitions = defWords(wordList,wordObj)
 var correct = pickWord(wordList,definitions)
checkWord(correct)
}
 
function toggleClass(element,args) {
  // doesn't need to return anything because this automatically adds/removes classlist onto the element. 
 args.forEach( x => element.toggleClass(x))

}

 function randomWords(arr) {
 var arr1 = arr.slice();
 for (var i =0;i<arr.length;i++) {
   var rand = Math.floor(Math.random() * arr.length); 
   [arr1[i],arr1[rand]] = [arr1[rand],arr1[i]]; 
 }
 return arr1.slice(0,maxWords); 
}

function appendWords(wordList) {
wordList.forEach( word => $ul.append('<li>' + word + '</li>'))
}

function defWords(wordList,wordObj) {
  var definition = [] 
  for (var i=0;i<wordList.length; i++) {
    definition.push(wordObj[wordList[i]])
  }
  return definition 
}

function pickWord(wordList,definition) {
  var randNum = Math.floor(Math.random() * wordList.length) 
  var correctWord = wordList[randNum] 
  var correctDef = definition[randNum]
  $('#correctdef').append('<p> <span id ="def">Definition: </span> ' + correctDef +'</p>')
  return [correctWord,correctDef]
}
 function checkWord(correct) {
   
  $('ul').on('click', 'li',function()
 {
  $('#result').text('')

  if ($(this).text() == correct[0]) {
     winner = true 
    $(this).addClass('correct')
    $('#result').append('<h2>Good job!</h2> <p> Click on the other words to check their definitions. </p>')
    toggleArgs.forEach( x => $('#playagain').toggleClass(x))
    $('button').click( function() {
        location.reload() 
    })
  
  }
  else if ($(this).text() !== correct[0] && !winner) {
    $(this).addClass('wrong')
    $('#result').append('<h2>Try again! </h2>')
    var wor = $(this).text()
    $('#worddefinitionlist').append(`<p> <span> ${wor}:</span> ${wordObj[wor]}`)
  }
  else {
     $(this).addClass('wrong')
    $('#result').append('<h2>Good job! </h2>')
    var wor = $(this).text()
    $('#worddefinitionlist').append(`<p class ="wordanddef"> <span> ${wor}:</span> ${wordObj[wor]} </p>`)
  }
 }) 

 }