
export function JSONtoObject<T>(data: any) {
    try {
        return JSON.parse(data)
    } catch (e) {
        return null;
    }
}