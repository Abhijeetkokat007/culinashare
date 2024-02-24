import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import navbar from "./components/navbar";
import { SavedRecipes } from "./pages/saved-recipes";
import Tryeals from "./pages/try/tryeals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DetailsRecipe from "./pages/DetailsRecipe";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Router>
       <navbar/>
        <Routes>
         <Route path="/" element={<Tryeals />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/:recipeId" element={<DetailsRecipe />} />
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
