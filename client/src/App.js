import React from 'react';
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyForm from './MyForm';
import Confirmation from './Confirmation';
import Header from './Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MyForm />} />
        <Route path="/confirmation/:outcome" element={<ConfirmationWrapper />} />
      </Routes>
    </Router>
  );
};

const ConfirmationWrapper = () => {
  const { outcome } = useParams();
  return <Confirmation outcome={outcome} />;
};

export default App;