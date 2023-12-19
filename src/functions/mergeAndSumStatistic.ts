export function mergeAndSum(expenses: any, tasks: any) {
    let statistic = Object.values([]);
    if(!expenses && !tasks) return {statistic};

    const projects: any = {};

    // Суммируем расходы
    expenses?.forEach((expense: any) => {
        const projectId = expense.project.id;
        if (!projects[projectId]) {
            projects[projectId] = {
                project: expense.project,
                expense: {sum: 0, percent: 0},
                task: {hours: 0, percent: 0},
            };
        }
        projects[projectId].expense.sum += expense.sum;
        projects[projectId].expense.percent += expense.percent;
    });

    // Суммируем часы
    tasks.forEach((task: any) => {
        const projectId = task.project.id;
        if (!projects[projectId]) {
            projects[projectId] = {
                project: task.project,
                expense: {sum: 0, percent: 0},
                task: {hours: 0, percent: 0},
            };
        }
        projects[projectId].task.hours += task.hours;
        projects[projectId].task.percent += task.percent;
    });

    // Формируем массив statistic
    statistic = Object.values(projects);
    return {statistic};
}