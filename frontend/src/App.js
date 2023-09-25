import { Button, ButtonGroup } from '@chakra-ui/react';
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from './Pages/HomePage';
import ChatsPage from './Pages/ChatsPage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      <Route path="/chats" component={ChatsPage} />
    </div>
  );
}

export default App;