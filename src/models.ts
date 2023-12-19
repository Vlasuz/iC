export interface IUser {
    avatar: string | null
    email: string
    first_name: string
    last_name: string
    phone: string
    projects_list: IProject[]
    role: string
    status: string
    id?: string
    holidays: number
    recent_projects: {
        count: number
        project: IProject
    }[]
}

export interface ITask {
    date: string
    hours: number
    id: string
    project: IProject
    task: string
    time: string
    percent?: number
}

export interface IExpense {
    id: string
    description: string
    date: string
    sum: number
    project: IProject
}

export interface IComment {
    user: {
        first_name: string
        last_name: string
        avatar: string
        status: string
    }
    text: string
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
        id?: string
    }
}

export interface IProject {
    description: string
    id: string
    name: string
    archive: boolean
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
    archive: boolean
}

interface IElement {
    project: {
        id: string
        name: string
        description: string
    }
    hours?: number
    sum?: number
    percent: number
}

export interface IStatistic {
    all_hours: number
    all_sum: number
    expenses: IElement[]
    tasks: IElement[]
}

export interface ISummaryEmployee {
    all: ITimesheet[]
    favourite: ITimesheet[]
}

export interface INotification {
    id: string
    comment: {
        user: {
            id: string
            first_name: string
            last_name: string
            avatar: string
            status: string
        }
        answer: {
            id: string
            first_name: string
            last_name: string
            avatar: string
            status: string
        }
        text: string
    }
    timesheet: {
        id: string
        date: string
        updated_at: string
        status: string
        user: {
            id: string
            first_name: string
            last_name: string
            avatar: string
            status: string
        }
        manager: {
            id: string
            first_name: string
            last_name: string
            avatar: string
            status: string
        }
        comments: [
            {
                user: {
                    id: string
                    first_name: string
                    last_name: string
                    avatar: string
                    status: string
                }
                answer: {
                    id: string
                    first_name: string
                    last_name: string
                    avatar: string
                    status: string
                }
                text: string
            }
        ]
    }
    type: string
}

export interface IVacation {
    extra: number
    months: {
        month: number
        days: number
    }[]
    remain: number
    user: IUser
}
