import React, {createContext, useEffect, useState} from 'react';
import {Login} from "./pages/login/Login";
import "./styles/style.scss"
import "./styles/Calibri/stylesheet.css"
import {PopupList} from "./components/popup/PopupList";
import {Sprites} from "./components/sprites/Sprites";
import {Wrapper} from "./components/wrapper/Wrapper";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Timesheet} from "./pages/timesheet/Timesheet";
import {Employees} from "./pages/employees/Employees";
import {useDispatch, useSelector} from 'react-redux';
import {getBearer} from "./functions/getBearer";
import axios from "axios";
import {getApiLink} from "./functions/getApiLink";
import {setAccessToken, setExpenses, setProjects, setRefreshToken, setTasks, setUser} from "./storage/toolkit";
import {Projects} from "./pages/projects/Projects";
import {AppStyled} from "./App.styled";
import {Vacations} from "./pages/vacations/Vacations";
import {Costs} from "./pages/costs/Costs";
import {Summary} from "./pages/summary/Summary";
import {SummaryEmployees} from "./pages/summaryEmployees/SummaryEmployees";
import getCookies from "./functions/getCookie";
import {ITimesheet} from "./models";
import {SetTimesheet} from "./api/SetTimesheet";
import {SetStatistic} from "./api/SetStatistic";
import {ResetPassword} from "./pages/resetPassword/ResetPassword";
import {SetNotifications} from "./api/SetNotifications";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setCookie from "./functions/setCookie";
import {GetAccessToken} from "./api/GetAccessToken";

export const PopupContext: any = createContext(null)

function App() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const userData = useSelector((state: any) => state.toolkit.user)

    useEffect(() => {
        if (!getCookies('access_token_ic') && !location.pathname.includes("reset-password")) {
            return navigate("/login");
        } else if (location.pathname.includes("login")) {
            navigate("/");
        } else if (location.pathname.includes("reset-password")) {
            return ;
        }

        setTasks(dispatch)
        setExpenses(dispatch)
        SetTimesheet(dispatch)
        SetNotifications(dispatch)

        getBearer('get')
        axios.get(getApiLink("/api/admin/project/")).then(({data}) => {
            dispatch(setProjects(data))
        }).catch(er => console.log(getApiLink("api/admin/project/"), er))

    }, [userData])



    useEffect(() => {
        getBearer('get')
        axios.get(getApiLink("/api/user/profile/")).then(({data}) => {
            dispatch(setUser(data))
            console.log(data)
        }).catch(er => {
            console.log(getApiLink("/api/user/profile/"), er)
            GetAccessToken(dispatch)
        })
    }, [])


    // useEffect(() => {
    //     if (chosenTimesheet && !Object.keys(chosenTimesheet).length) return;
    //
    //     SetStatistic(dispatch, chosenTimesheet?.id)
    // }, [chosenTimesheet])


    const [popup, setPopup] = useState({
        popup: '',
        data: null
    })

    const isAdmin = userData.status?.includes("admin")
    const isEmployee = userData.status?.includes("employee")
    const isManager = userData.status?.includes("team_lead") || userData.status?.includes("project_lead")

    return (
        <AppStyled>
            <PopupContext.Provider value={setPopup}>
                <Sprites/>
                <PopupList popup={popup}/>

                <Wrapper>

                    <Routes location={location}>

                        <Route path={'/costs'} element={<Costs/>}/>
                        <Route path={'/costs/:timesheetId'} element={<Costs/>}/>
                        <Route path={isEmployee || isManager ? "/" : "/timesheet"} element={<Timesheet/>}/>
                        <Route path={isEmployee || isManager ? "/iC" : "/timesheet"} element={<Timesheet/>}/>
                        <Route path={"/timesheet/:timesheetId"} element={<Timesheet/>}/>
                        <Route path={'/summary-employees'} element={<SummaryEmployees/>}/>
                        <Route path={'/summary'} element={<Summary/>}/>
                        <Route path={'/vacations'} element={<Vacations/>}/>
                        <Route path={'/projects'} element={<Projects/>}/>
                        <Route path={isAdmin ? "/iC" : "/employees"} element={<Employees/>}/>
                        <Route path={isAdmin ? "/" : "/employees"} element={<Employees/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/reset-password/:userCode/:userEmail'} element={<ResetPassword/>}/>

                    </Routes>

                </Wrapper>

                <ToastContainer/>

            </PopupContext.Provider>
        </AppStyled>
    );
}

export default App;
