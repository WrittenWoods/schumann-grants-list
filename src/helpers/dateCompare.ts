export function dateCompare(a, b) {
    let yearCompare = Math.sign(a.year - b.year)
    return yearCompare === 0 ? Math.sign(a.month - b.month) : yearCompare
}