module.exports = {
    xif: function(v1, operator, v2, options) {
        switch (operator) {
            case "===":
                return (v1 === v2) ? options.fn(this) : options.inverse(this);

            case "!==":
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);

            case "&&":
                return (v1 && v2) ? options.fn(this) : options.inverse(this);

            case "||":
                return (v1 || v2) ? options.fn(this) : options.inverse(this);

            case "<":
                return (v1 < v2) ? options.fn(this) : options.inverse(this);

            case "<=":
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);

            case ">":
                return (v1 > v2) ? options.fn(this) : options.inverse(this);

            case ">=":
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                /*jshint -W061 */
            default:
                return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
        }
    },
    url:function(value, options){
        return '/' + value.replace('.', '/');
    }
};
