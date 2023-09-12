import React, {useEffect, useState} from 'react'
import './App.scss';

let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote , setQuote] = useState("Press button for random quote"); 
  const [author, setAuthor] = useState(null) 
  const [quotesArr, setQuotesArr] = useState(null);
  const [randColor, setColor] = useState("#ff5757");
  var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

  const fetchQuotes = async (url) =>{
      const response = await fetch(url);
      const parsedJSON = await response.json()
      setQuotesArr(parsedJSON.quotes)
      console.log(parsedJSON)
    }
  useEffect(() =>{
    fetchQuotes(quoteDB)
  }, [quoteDB])

  const getRandumQuote = () => {
    let rand = Math.floor((Math.random() * quotesArr.length))
    let randColorIndex = Math.floor((Math.random() * colors.length))
    setQuote(quotesArr[rand].quote);
    setAuthor(quotesArr[rand].author)
    setColor(colors[randColorIndex])
  }

  

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: randColor}}>
        <div id='quote-box' className='wrapper'>
          <div className='quote-text' style={{color: randColor}}>
            <p id='text'>{quote}</p>
            </div>
          <div className='author-text' style={{color: randColor}}>
            <p id='author'>- {author}</p>
            </div>
          
          <div className='button-wrapper'>
            <a id='tweet-quote' href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} target="_top" className='button' style={{backgroundColor: randColor}}>
              <i class="fa-brands fa-twitter"></i>
              </a>
            <button id='new-quote' className="button" onClick={() => getRandumQuote()} style={{backgroundColor: randColor}}>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
  