import React, {createContext, useEffect, useState} from 'react';
import {Login} from "./pages/login/Login";
import "./styles/style.scss"
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
import {setProjects, setUser} from "./storage/toolkit";
import {Projects} from "./pages/projects/Projects";
import {AppStyled} from "./App.styled";
import {Vacations} from "./pages/vacations/Vacations";
import {Costs} from "./pages/costs/Costs";
import {Summary} from "./pages/summary/Summary";
import {SummaryEmployees} from "./pages/summaryEmployees/SummaryEmployees";
import getCookies from "./functions/getCookie";

export const PopupContext: any = createContext(null)

function App() {

    const userData = useSelector((state: any) => state.toolkit.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        if(!getCookies('access_token')) {
            return navigate("/login");
        } else if (location.pathname.includes("login")) {
            navigate("/");
        }


        getBearer('get')
        axios.get(getApiLink("/api/admin/project/")).then(({data}) => {
            dispatch(setProjects(data))
            console.log(data)
        }).catch(er => console.log(getApiLink("api/admin/project/"), er))


        getBearer('get')
        axios.get(getApiLink("/api/user/profile/")).then(({data}) => {
            dispatch(setUser(data))
        }).catch(er => console.log(getApiLink("/api/user/profile/"), er))
    }, [])


    const [popup, setPopup] = useState({
        popup: '',
        data: null
    })

    return (
        <AppStyled>
            <PopupContext.Provider value={setPopup}>
                <Sprites/>
                <PopupList popup={popup}/>

                <Wrapper>

                    <Routes location={location}>
                        <Route path={'/summary/employees'} element={<SummaryEmployees/>}/>
                        <Route path={'/summary'} element={<Summary/>}/>
                        <Route path={'/costs'} element={<Costs/>}/>
                        <Route path={'/vacations'} element={<Vacations/>}/>
                        <Route path={'/projects'} element={<Projects/>}/>
                        <Route path={'/employees'} element={<Employees/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/'} element={<Timesheet/>}/>
                    </Routes>

                </Wrapper>

            </PopupContext.Provider>
        </AppStyled>
    );
}

export default App;
