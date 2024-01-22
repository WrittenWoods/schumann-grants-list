// Removes redundant options

export function uniqueOptions (arg) {
    let unique = []

    for (let i = 0; i < arg.length; i++) {
        if (!unique.includes(arg[i])) { unique.push(arg[i]) }
    }

    return unique.filter( (x) => x.trim().length)
}