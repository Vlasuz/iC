import {IEmployee, IProject, IUser} from "../models";

export const initialState = () => {
    return {
        user: <IUser>{},
        accessToken: <string>"",
        employees: <IEmployee[]>[],
        selectedEmployee: <IEmployee>{},

        projects: <IProject[]>[],
    }
}