import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute;
import App from './App';
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/TodoWithUser/ManageUser'
import Dashboard from './components/Admin/Content/DashBoard'
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/LeftContent/ListQuiz";
import DetailQuiz from "./components/User/LeftContent/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";


const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404. Not found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={
                        // <PrivateRoute>
                        <ListQuiz />
                        // </PrivateRoute>
                    }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Layout;