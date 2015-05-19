module.exports = function(title) {
    return {
        _:"<!DOCTYPE html>",
        html: {
            head: {
                'meta[http-equiv="Content-Type" content="text/html; charset=utf-8"]': {},
                'link[rel="stylesheet" type="text/css" href="styles.css"]': {},
                title: title
            },
            body: {}
        }
    };
};