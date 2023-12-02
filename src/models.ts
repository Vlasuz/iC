export interface IUser {
    avatar: string | null
    email: string
    first_name: string
    last_name: string
    phone: string
    projects: []
    role: string
}

export interface IProject {
    description: string
    id: string
    name: string
}

export interface IEmployee {
    all_projects: boolean
    email: string
    first_name: string
    holidays: number
    id: string
    last_name: string
    phone: string
    projects: IProject[]
    role: string
    status: string
}
