import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
// import User from './components/User/User';
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser'
import Dashboard from './components/Admin/Content/DashBoard'
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";


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
                    <Route path="/users" element={<ListQuiz />} />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
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