// Removes redundant options

export function uniqueOptions(arg:Array<string>, except:string = ""):Array<string> {
    let unique:Array<string> = []

    for (let i = 0; i < arg.length; i++) {
        if (!unique.includes(arg[i].trim()) && arg[i] !== except) { 
            unique.push(arg[i].trim()) 
        } else if (arg[i] === except) {
            unique.push(arg[i])
        }
    }

    return unique.filter( (x) => x.length)
}