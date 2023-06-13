type types = (
    'string' |
    'number' |
    'object' |
    'boolean' |
    'function' |
    'undefined' |
    'symbol' |
    'bigint' 
);
type schema = { [key: string]: types };

class Schema {
    schema: schema;
    constructor(schema: schema) {
        this.schema = schema;
    }

    validate(data) {
        try {
            return Object.entries(this.schema).every(([key, val]) => {
                return data[key] !== undefined && val === typeof data[key]
            });
        }
        catch (err) {
            throw err;
        }
    }
}

export default Schema;