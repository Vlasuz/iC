export const Years = () => {

    const dateNow = new Date()

    const year = dateNow.getFullYear();

    return [
        {
            year: year-2,
            isActive: false,
            isDisabled: false,
        },
        {
            year: year-1,
            isActive: false,
            isDisabled: false,
        },
        {
            year: year,
            isActive: true,
            isDisabled: false,
        },
        {
            year: year+1,
            isActive: false,
            isDisabled: true,
        },
    ]
}