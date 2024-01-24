// Removes redundant options

export function uniqueOptions (arg) {
    let unique = []

    for (let i = 0; i < arg.length; i++) {
        if (!unique.includes(arg[i].trim())) { unique.push(arg[i].trim()) }
    }

    return unique.filter( (x) => x.length)
}