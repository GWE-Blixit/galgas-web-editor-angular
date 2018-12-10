export class AbstractModel {
    /**
     * 
     * @param classToken 
     * @param map a standard object whose fields exists in the object
     */
    static from(classToken, map: any) {
        let object = classToken.getInstance();

        Object.keys(map).forEach(item => {
            if (object.hasOwnProperty(item)) {
                object[item] = map[item];
            }
        });

        return object;
    }

    static merge(object: any, map: any) {
        Object.keys(map).forEach(item => {
            if (object.hasOwnProperty(item)) {
                object[item] = map[item];
            }
        });

        return object;
    }
}
