export const datenow = () => {
    const today = new Date();
    const date = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    return `${year}${month}${date}`
}