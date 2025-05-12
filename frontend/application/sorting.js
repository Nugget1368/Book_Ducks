export class Sorting {
    static sortStringUp(arr = [], propertyName = "", propertyNameDeep = "") {
        console.log(arr[0][propertyName][propertyNameDeep]);
        if (propertyNameDeep !== "")
            arr.sort((a, b) => a[propertyName][propertyNameDeep].localeCompare(b[propertyName][propertyNameDeep]));
        else
            arr.sort((a, b) => a[propertyName].localeCompare(b[propertyName]));
    }

    static sortStringDown(arr = [], propertyName = "", propertyNameDeep = "") {
        console.log(arr[0][propertyName][propertyNameDeep]);
        if (propertyNameDeep !== "")
            arr.sort((a, b) => b[propertyName][propertyNameDeep].localeCompare(a[propertyName][propertyNameDeep]));
        else
            arr.sort((a, b) => b[propertyName].localeCompare(a[propertyName]));
    }

    static sortNumberUp(arr = [], propertyName = "", propertyNameDeep = "") {
        if (propertyNameDeep !== "")
            arr.sort((a, b) => a[propertyName][propertyNameDeep] - b[propertyName][propertyNameDeep]);
        else
            arr.sort((a, b) => a[propertyName] - b[propertyName]);
    }

    static sortNumberDown(arr = [], propertyName = "", propertyNameDeep = "") {
        console.log(arr);
        if (propertyNameDeep !== "")
            arr.sort((a, b) => b[propertyName][propertyNameDeep] - a[propertyName][propertyNameDeep]);
        else
            arr.sort((a, b) => b[propertyName] - a[propertyName]);
    }
}