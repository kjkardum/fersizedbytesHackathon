export default (object: any) => {
    let cache = [];
    return JSON.stringify(object, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (cache.includes(value)) return;
            cache.push(value);
        }
        return value;
    });
};
