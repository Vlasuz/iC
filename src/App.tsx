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
import {SetTasks} from "./api/SetTasks";
import {SetExpenses} from './api/SetExpenses';
import {setProjects, setUser} from './storage/toolkit';
import {SetSummaryEmployees} from "./api/SetSummaryEmployees";

export const PopupContext: any = createContext(null)

function App() {

    function setZoom() {
        if (window.matchMedia('(min-width: 1200px) and (max-width: 1500px)').matches) {
            // @ts-ignore
            if (document.querySelector(".main__inner section")) {
                // @ts-ignore
                document.querySelector(".main__inner section").style.zoom = "70%";
                // @ts-ignore
                document.querySelector(".main__inner section").style.minHeight = "calc(140vh - 60px)";

                if(document.querySelector(".down-sidebar")) {
                    // @ts-ignore
                    document.querySelector(".main__inner section").style.paddingBottom = "110px"
                } else {
                    // @ts-ignore
                    document.querySelector(".main__inner section").style.paddingBottom = "0px"
                }

            }
        } else {
            // @ts-ignore
            document.body.style.zoom = "100%";
            if (document.querySelector(".main__inner section")) {
                // @ts-ignore
                document.querySelector(".main__inner section").style.zoom = "100%";
                // @ts-ignore
                document.querySelector(".main__inner section").style.minHeight = "calc(95vh - 4px)";

                if(document.querySelector(".down-sidebar")) {
                    // @ts-ignore
                    document.querySelector(".main__inner section").style.paddingBottom = "80px"
                } else {
                    // @ts-ignore
                    document.querySelector(".main__inner section").style.paddingBottom = "0px"
                }

            }
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const userData = useSelector((state: any) => state.toolkit.user)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    useEffect(() => {
        if (!getCookies('access_token_ic') && !location.pathname.includes("reset-password")) {
            return navigate("/login");
        } else if (location.pathname.includes("login")) {
            navigate("/");
        } else if (location.pathname.includes("reset-password")) {
            return;
        }

        SetTasks(dispatch, chosenTimesheet?.id)
        SetExpenses(dispatch, chosenTimesheet?.id)
        SetTimesheet(dispatch)
        SetNotifications(dispatch)
        SetSummaryEmployees(dispatch)

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


        window.addEventListener('resize', setZoom);
    }, [])


    useEffect(() => {
        setZoom();
    }, [location.pathname])


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
                        <Route path={'/expenses/:timesheetId'} element={<Costs/>}/>
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
