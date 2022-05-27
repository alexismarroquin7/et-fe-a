
import { Route, Routes } from 'react-router';
import './App.css';
import { Home, Login, Transactions } from './pages';
import { NewTransaction } from './pages/new/transaction';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/new/transaction"
          element={<NewTransaction/>}
        />
        <Route
          path="/transactions"
          element={<Transactions/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/"
          element={<Home/>}
        />
      </Routes>
    </div>
  );
}

export default App;
