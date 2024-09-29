// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import CoursePage from './components/coursePage';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import Feedback from './components/feedback';
import FeaturedCourses from './components/featuredCourses';
import AuthenticatedRoute from './components/authenticatedRoute';
import Rewards from './components/rewards';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<FeaturedCourses />} />
                    <Route path="/home" element={<FeaturedCourses />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/courses/:id" element={
                        <AuthenticatedRoute>
                            <CoursePage />
                        </AuthenticatedRoute>
                    } />
                    <Route path="/feedback" element={
                        <AuthenticatedRoute>
                            <Feedback />
                        </AuthenticatedRoute>
                    } />
                    <Route path="/rewards" element={
                        <AuthenticatedRoute>
                            <Rewards />
                        </AuthenticatedRoute>
                    } />
                </Routes>
                
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
