import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";

import { SavedRecipes } from "./pages/saved-recipes";
import Tryeals from "./pages/try/tryeals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Router>
       
        <Routes>
         <Route path="/" element={<Tryeals />} />
         <Route path="/signup" element={<Signup />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
