export default function sum(...args) {
    return args.reduce((total, n) => {
        return total += n
    }, 0)
}