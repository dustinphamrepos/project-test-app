import axios from "axios";
import NProgress from 'nprogress'
import { store } from "../redux/store";

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

const instance = axios.create({
    baseURL: 'http://localhost:8081/'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // console.log(store.getState());
    const access_token = store?.getState()?.user?.account?.access_token
    // if (access_token === undefined) {
    //     config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjozLCJpYXQiOjE2NzkwOTgyODIsImV4cCI6MTY3OTE4NDY4Mn0.BImHJnfb2FVmH8BJ00nwxaD8AC6JxPzD-QjmDeMkrdA`;
    // } else {
    //     config.headers["Authorization"] = `Bearer ${access_token}`
    // }
    config.headers["Authorization"] = `Bearer ${access_token}`
    // config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjozLCJpYXQiOjE2NzkwOTgyODIsImV4cCI6MTY3OTE4NDY4Mn0.BImHJnfb2FVmH8BJ00nwxaD8AC6JxPzD-QjmDeMkrdA`;
    NProgress.start();

    // Do something before request is sent
    return config;
}, function (error) {
    NProgress.done();
    // Do something with request error
    // token expired
    if (error.response.data && error.response.data.EC === -999) {
        window.location.href = '/login'
    }
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // console.log(">>>: ", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error.response.data)
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance