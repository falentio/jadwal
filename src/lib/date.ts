export function parseAsUtc(str: string) {
    const withTz = str.split(" ").join("T") + "Z";
    const date = new Date(withTz);
    return date
}