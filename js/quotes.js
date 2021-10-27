const quotes = [
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote: "The world is a book and those who do not travel read only one page.",
    author: "Saint Augustine",
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
  },
  {
    quote: "To Travel is to Live",
    author: "Hans Christian Andersen",
  },
  {
    quote: "Only a life lived for others is a life worthwhile.",
    author: "Albert Einstein",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    quote: "Never go on trips with anyone you do not love.",
    author: "Hemmingway",
  },
  {
    quote: "We wander for distraction, but we travel for fulfilment.",
    author: "Hilaire Belloc",
  },
  {
    quote: "Travel expands the mind and fills the gap.",
    author: "Sheda Savage",
  },
  {
    quote: "You cannot change what you are, only what you do.",
    author: "Philip Pullman",
  },
  {
    quote: "Lay a firm foundation with the bricks that others throw at you.",
    author: "David Brinkley",
  },
  {
    quote: "The greatest mistake you can make in life is to be continually fearing you will make one.",
    author: "Elbert Hubbard",
  },
  {
    quote: "Only I can change my life. No one can do it for me",
    author: "Carol Burnett",
  },
];

const quote = document.querySelector("#quote");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)]; // quote 랜덤 지정

quote.innerText = `${todaysQuote.quote} - ${todaysQuote.author}`;

setQuotesTheme();