// Removes redundant options

export function uniqueOptions (arg, except = "") {
    let unique = []

    for (let i = 0; i < arg.length; i++) {
        if (!unique.includes(arg[i].trim()) && arg[i] !== except) { 
            unique.push(arg[i].trim()) 
        } else if (arg[i] === except) {
            unique.push(arg[i])
        }
    }

    return unique.filter( (x) => x.length)
}