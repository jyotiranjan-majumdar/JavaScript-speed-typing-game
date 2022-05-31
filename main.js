const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDispalyElement = document.getElementById('quoteDisplay')
const quoteInputelement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timmer')

quoteInputelement.addEventListener('input', ()=>{
    const arrayQuote = quoteDispalyElement.querySelectorAll('span')
    const arrayValue = quoteInputelement.value.split('')
    
    let correct = true
    arrayQuote.forEach((characterSpan,index)=>{
        const character = arrayValue[index]
        if(character==null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false 
        }else if (character === characterSpan.innerText){
            
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if(correct) renderNewQuote()
})



function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    quoteDispalyElement.innerHTML = ''
    quote.split('').forEach(character=>{
        const characterSpan = document.createElement('span')
        // characterSpan.classList.add('correct')
        characterSpan.innerText = character
        quoteDispalyElement.appendChild(characterSpan)
    })
    quoteInputelement.value = null
    startTimer()
}

    let startTimers
    function startTimer(){
        timerElement.innerText = 0
        startTimers = new Date()
        setInterval(()=>{
           timerElement.innerText = getTimmer()
        }, 1000) 
    }

    function getTimmer(){
      return Math.floor((new Date()-startTimers)/1000)
    }

renderNewQuote()