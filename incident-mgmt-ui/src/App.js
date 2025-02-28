import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  const sayHello = () => {
    alert("Hello World!");
  };

  const incrementCount = () => {
    setCount(count + 1);
    alert(`Hello World ${count + 1}!`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={sayHello} className="App-button">
          Click Me!
        </button>
        <button onClick={incrementCount} className="App-button">
          Increment Counter
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
