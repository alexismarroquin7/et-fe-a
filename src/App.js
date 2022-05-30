
import { Route, Routes } from 'react-router';
import './App.css';
import { Home, Login, Transactions } from './pages';
import { NewTransaction } from './pages/new/transaction';
import { Transaction } from './pages/transactions/[transaction_id]';
import { PrivateRoute } from "./components";

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
          element={
            <PrivateRoute>
              <Transactions/>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/:transaction_id"
          element={
            <PrivateRoute>
              <Transaction/>
            </PrivateRoute>
          }
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
