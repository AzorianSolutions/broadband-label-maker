jQuery.validator.addMethod("label", function (value, element) {
    return this.optional(element) || /^[\w\s\(\)\.\-\$#]+$/i.test(value);
}, "Labels may only contain letters, numbers, spaces, and these characters: ( ) . - # $");

jQuery.validator.addMethod("zipcode", function (value, element) {
    return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
}, "Please provide a valid zipcode.");

jQuery.validator.addMethod("macaddress", function (value, element) {
    return this.optional(element) || /^([0-9A-F]{2}[:-]?){5}([0-9A-F]{2})$/i.test(value);
}, "Please provide a valid MAC address.");

jQuery.validator.addMethod("ipv4address", function (value, element) {
    let regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i
    return this.optional(element) || regex.test(value);
}, "Please provide a valid IPv4 address.");

jQuery.validator.addMethod("ipv6prefix", function (value, element) {
    let regex = /^(?:(?:(?:[A-F0-9]{1,4}:){5}[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){4}:[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){3}(?::[A-F0-9]{1,4}){1,2}|(?:[A-F0-9]{1,4}:){2}(?::[A-F0-9]{1,4}){1,3}|[A-F0-9]{1,4}:(?::[A-F0-9]{1,4}){1,4}|(?:[A-F0-9]{1,4}:){1,5}|:(?::[A-F0-9]{1,4}){1,5}|:):(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){6}:[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){5}(?::[A-F0-9]{1,4}){1,2}|(?:[A-F0-9]{1,4}:){4}(?::[A-F0-9]{1,4}){1,3}|(?:[A-F0-9]{1,4}:){3}(?::[A-F0-9]{1,4}){1,4}|(?:[A-F0-9]{1,4}:){2}(?::[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:(?::[A-F0-9]{1,4}){1,6}|(?:[A-F0-9]{1,4}:){1,7}:|:(?::[A-F0-9]{1,4}){1,7}|::)(?:\/[0-9]{2})$/i
    return this.optional(element) || regex.test(value);
}, "Please provide a valid IPv6 prefix.");

let numberOnlyNormalizer = function (value) {
    return $.trim(value.replace(/\D+/g, ''))
}

let alphaNumericOnlyNormalizer = function (value) {
    return $.trim(value.replace(/[^a-z0-9]+/gi, ''))
}

let getRootElement = function (el, selector) {
    el = $(el)
    if (!el.is(selector))
        el = el.parents(selector)
    return el
}

let validateErrorPlacement = function (error, element) {
    error.appendTo(element.parents('.form-group'))
}
