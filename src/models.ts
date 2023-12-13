export interface IUser {
    avatar: string | null
    email: string
    first_name: string
    last_name: string
    phone: string
    projects: IProject[]
    role: string
    status: string
}

export interface ITask {
    date: string
    hours: number
    id: string
    project: IProject
    task: string
    time: string
}

export interface IExpense {
    "id": string,
    "description": string,
    "date": string,
    "sum": number,
    "project": IProject
}

export interface IComment {
    "user": {
        "first_name": "string",
        "last_name": "string",
        "avatar": "string",
        "status": "string"
    },
    "text": 'string'
}

export interface ITimesheet {
    id: string
    comments: IComment[]
    date: string
    updated_at: string
    manager: {
        avatar: null
        first_name: string
        last_name: string
        status: string
    }
    status: string
    user: {
        avatar: null
        first_name: string
        last_name: string
        status: string
    }
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
