import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from "./Routs/LogIn"
import Navbar from './Routs/Navbar';
import Home from './Routs/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navbar/>}>
          {/* <Route element={<RequireAuth allowedRoles={['ROLE_LIBRARIAN']}/>}>
              <Route path= '/bookManagment' element={<BookManagement/>} />
              <Route path= '/studentManagment' element={<StudentManagement/>} />
              <Route path= '/borrowedBook' element= { <BorrowedBooks/>} />
          </Route>
          
          <Route element={<RequireAuth allowedRoles={['ROLE_LIBRARIAN','ROLE_STUDENT']}/>}>
              <Route path= '/profile' element= { <Profile/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['ROLE_LIBRARIAN','ROLE_STUDENT']}/>}>
              <Route path= '/books' element= { <Book/>} />
          </Route> */}

          <Route path='/' element={<Home/>} /> 
        </Route>  
          {/* public routs */}
        <Route path= '/login' element= { <LogIn/>} />
      {/* <Route path= '/unauthorized' element= { <Unauthirized/>} />    */}
      
      </Routes>
       
    </BrowserRouter>
  );
}

export default App;
