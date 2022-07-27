import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter, Routes, Route, } from "react-router-dom";
import ProtectedRoute from './services/protectedRoute';
import { AuthProvider } from './services/AuthProvider';
import Header from "./components/Header";
import './App.scss';
import CreateStudent from './pages/students/createStudent';
import CreateCareer from './pages/career/CreateCareer';
import EditCareer from './pages/career/EditCareer';
import ListCareer from './pages/career/ListCareer';
import EditQuarter from './pages/quarter/EditQuarter';
import ListQuarter from './pages/quarter/ListQuarter';
import ListStudents from './pages/students/ListStudents';
import EditStudents from './pages/students/EditStudents';
import TeachersList from './pages/teachers/TeacherList';
import CreateTeacher from './pages/teachers/CreateTeacher';
import TeacherEdit from './pages/teachers/EditTeacher';
import AdministrativeList from './pages/administrative/AdministrativeList';
import CreateAdministrative from './pages/administrative/CreateAdministrative';
import AdministrativeEdit from './pages/administrative/EditAdministrative';
import CreateSubject from './pages/subject/createSubject';
import EditSubject from './pages/subject/EditSubject';
import ListSubject from './pages/subject/ListSubjects';
import UserList from './pages/users/UserList';
import UserNew from './pages/users/UserNew';
import UserEdit from './pages/users/UserEdit';
import Login from './pages/auth/Login';
import ConfirmPassword from './pages/auth/ConfirmPassword';
import ChangePassword from './pages/auth/ChangePassword';


function App() {

  return (
    <div className="App">     
      <Header></Header>
      <Container fluid className="page-body">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={
                <ProtectedRoute>
                  <ListStudents/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/students/new' element={
                <ProtectedRoute>
                  <CreateStudent/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/students/list' element={
                <ProtectedRoute>
                  <ListStudents/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/students/edit/:id' element={
                <ProtectedRoute>
                  <EditStudents/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/teachers/list' element={
                <ProtectedRoute>
                  <TeachersList/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/teacher/new' element={
                <ProtectedRoute>
                  <CreateTeacher/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/teacher/edit/:id' element={
                <ProtectedRoute>
                  <TeacherEdit/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/administrative/list' element={
                <ProtectedRoute>
                  <AdministrativeList/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/administrative/new' element={
                <ProtectedRoute>
                  <CreateAdministrative/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/administrative/edit/:id' element={
                <ProtectedRoute>
                  <AdministrativeEdit/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/career/list' element={
                <ProtectedRoute>
                  <ListCareer/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/career/new' element={
                <ProtectedRoute>
                  <CreateCareer/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/career/edit/:id' element={
                <ProtectedRoute>
                  <EditCareer/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/user/new' element={
                <ProtectedRoute>
                  <UserNew/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/user/list' element={
                <ProtectedRoute>
                  <UserList/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/user/edit/:id' element={
                <ProtectedRoute>
                  <UserEdit/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/subject/new' element={
                <ProtectedRoute>
                  <CreateSubject/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/subject/edit' element={
                <ProtectedRoute>
                  <EditSubject/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/subject/list' element={
                <ProtectedRoute>
                  <ListSubject/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/quarter/list/:id' element={
                <ProtectedRoute>
                  <ListQuarter/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/quarter/edit/:id_quarter/:id_career' element={
                <ProtectedRoute>
                  <EditQuarter/>
                </ProtectedRoute>
              }></Route>
              <Route exact path='/login' element={< Login />}></Route>
              <Route exact path='/confirmation/:token' element={< ConfirmPassword />}></Route>
              <Route exact path='/changepassword' element={< ChangePassword />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Container> 
    </div>
  );
}

export default App;
