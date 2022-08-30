import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.scss';
import { useImmerReducer } from "use-immer"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

import Home from './Page/Home';
import Jobs from "./Page/Jobs";
import Profile from "./Page/Profile";
import PostJob from "./Page/Post-job";
import Payslip from "./Page/Payslip";
import Login from "./Page/Login";
import ForgotPassword from "./Page/ForgotPassword";
import SignUp from "./Page/SignUp";
import Qualifications from "./Page/Qualifications";
import Experience from "./Page/Experience";
import Settings from "./Page/Settings";
import PendingAttendance from "./Page/PendingAttendance";
import JobReview from "./Page/JobReview";
import SearchJobs from "./Page/SearchJobs";
import TimeTracking from "./Page/TimeTracking";
import JobDetails from "./Page/JobDetails";
import Schedule from "./Page/Schedule";


function App() {
  const initialState = {
    searchLoading: false,
    getValue: false,
    appEmail: "app@test.com",
    appPassword: "app123456",
    postJob: true
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case ("search-loading"):
        draft.searchLoading = true
        break
      case ("close-search"):
        draft.searchLoading = false
        break
      case ("get-value"):
        draft.getValue = true
        break
      case ("calendarOrPostJob"):
        draft.postJob = action.value
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>

        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/home/job-details/:id" element={<JobDetails />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/payslip" element={<Payslip />}></Route>
          <Route path="/post-job" element={<PostJob />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/experience" element={<Experience />}></Route>
          <Route path="/qualifications" element={<Qualifications />}></Route>
          <Route path="/pending-attendance" element={<PendingAttendance />}></Route>
          <Route path="/job-review/:id" element={<JobReview />}></Route>
          <Route path="/search-jobs" element={<SearchJobs />}></Route>
          <Route path="/search-jobs/job-details/:id" element={<JobDetails />}></Route>
          <Route path="/time-tracking" element={<TimeTracking />}></Route>
          <Route path="/schedule" element={<Schedule />}></Route>
        </Routes>

      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
