let LabelModel = function (data) {
    // Create a reference to this for use within callbacks
    let self = this

    // Define defaults
    let defaults = {
        technologies: ['Fixed', 'Mobile'],
        data_units: ['TB', 'GB', 'MB', 'KB'],
        latency_units: ['ns', 'ms', 's'],
        period_units: ['day(s)', 'month(s)', 'year(s)'],
        speed_units: ['Gbps', 'Mbps', 'Kbps'],
        binary_options: ['No', 'Yes'],
        label_css: '',
        label_markup: '',
        id: null,
        provider_name: null,
        service_plan_name: null,
        technology: null,
        intro_price: null,
        intro_period: null,
        intro_period_unit: 'month(s)',
        monthly_price: null,
        contract_length: null,
        contract_length_unit: 'month(s)',
        contract_terms_url: null,
        monthly_fees: [],
        one_time_fees: [],
        early_termination_fee: null,
        discounts_url: null,
        discounts: [],
        acp: 'No',
        download_speed: null,
        download_speed_unit: 'Mbps',
        upload_speed: null,
        upload_speed_unit: 'Mbps',
        latency: null,
        latency_unit: 'ms',
        data_included: null,
        data_included_unit: 'GB',
        additional_data_charge: null,
        additional_data_amount: null,
        additional_data_unit: 'GB',
        network_management_policy_url: null,
        privacy_policy_url: null,
        support_url: null,
        support_phone: null,
        support_email: null
    }

    // Merge defaults with runtime data
    data = $.extend(defaults, data)

    // Initialize model properties
    self.technologies = ko.observableArray(data.technologies)
    self.data_units = ko.observableArray(data.data_units)
    self.latency_units = ko.observableArray(data.latency_units)
    self.period_units = ko.observableArray(data.period_units)
    self.speed_units = ko.observableArray(data.speed_units)
    self.binary_options = ko.observableArray(data.binary_options)
    self.label_css = ko.observableArray(data.label_css)
    self.label_markup = ko.observableArray(data.label_markup)
    self.id = ko.observable(data.id)
    self.provider_name = ko.observable(data.provider_name)
    self.service_plan_name = ko.observable(data.service_plan_name)
    self.technology = ko.observable(data.technology)
    self.intro_price = ko.observable(data.intro_price)
    self.intro_period = ko.observable(data.intro_period)
    self.intro_period_unit = ko.observable(data.intro_period_unit)
    self.monthly_price = ko.observable(data.monthly_price)
    self.contract_length = ko.observable(data.contract_length)
    self.contract_length_unit = ko.observable(data.contract_length_unit)
    self.contract_terms_url = ko.observable(data.contract_terms_url)
    self.monthly_fees = ko.observableArray(data.monthly_fees)
    self.one_time_fees = ko.observableArray(data.one_time_fees)
    self.early_termination_fee = ko.observable(data.early_termination_fee)
    self.discounts_url = ko.observable(data.discounts_url)
    self.discounts = ko.observableArray(data.discounts)
    self.acp = ko.observable(data.acp)
    self.download_speed = ko.observable(data.download_speed)
    self.download_speed_unit = ko.observable(data.download_speed_unit)
    self.upload_speed = ko.observable(data.upload_speed)
    self.upload_speed_unit = ko.observable(data.upload_speed_unit)
    self.latency = ko.observable(data.latency)
    self.latency_unit = ko.observable(data.latency_unit)
    self.data_included = ko.observable(data.data_included)
    self.data_included_unit = ko.observable(data.data_included_unit)
    self.additional_data_charge = ko.observable(data.additional_data_charge)
    self.additional_data_amount = ko.observable(data.additional_data_amount)
    self.additional_data_unit = ko.observable(data.additional_data_unit)
    self.network_management_policy_url = ko.observable(data.network_management_policy_url)
    self.privacy_policy_url = ko.observable(data.privacy_policy_url)
    self.support_url = ko.observable(data.support_url)
    self.support_phone = ko.observable(data.support_phone)
    self.support_email = ko.observable(data.support_email)

    self.data_included_formatted = ko.computed(function () {
        if (!self.data_included() && self.data_included() !== 0) {
            return 'Unlimited';
        }
        return self.data_included() + ' ' + self.data_included_unit();
    }, self);

    self.additional_data_formatted = ko.computed(function () {
        if (!self.additional_data_charge()) {
            return 'None';
        }
        return '$' + self.additional_data_charge() + ' / ' + self.additional_data_amount()
            + ' ' + self.additional_data_unit();
    }, self);

    self.support_phone_formatted = ko.computed(function () {
        area = self.support_phone().substr(0, 3);
        prefix = self.support_phone().substr(3, 3);
        suffix = self.support_phone().substr(6, 4);
        return '(' + area + ') ' + prefix + '-' + suffix;
    }, self);

    self.support_phone_url = ko.computed(function () {
        return 'tel:' + self.support_phone();
    }, self);

    self.addMonthlyFee = function () {
        self.monthly_fees.push({
            label: ko.observable('Fee Label'),
            fee: ko.observable(0),
        });
    };

    self.addOneTimeFee = function () {
        self.one_time_fees.push({
            label: ko.observable('Fee Label'),
            fee: ko.observable(0),
        });
    };

    self.addDiscount = function () {
        self.discounts.push({
            label: ko.observable('Discount Label'),
            amount: ko.observable(''),
            url: ko.observable(''),
        });
    };

    self.removeMonthlyFee = function (fee) {
        self.monthly_fees.remove(fee);
    };

    self.removeOneTimeFee = function (fee) {
        self.one_time_fees.remove(fee);
    };

    self.removeDiscount = function (discount) {
        self.discounts.remove(discount);
    };

    self.selectCode = function (model, event) {
        self.updateLabelMarkup();
        let element = event.target;
        element.select();
        element.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(element.value);
    }

    self.updateLabelCSS = function () {
        let tpl = $("<div>");
        ko.applyBindingsToNode(tpl[0], {template: {name: 'label-css', data: self}});
        let css = '<style>\n'
            + tpl.text()
                .replace(/([^0-9a-zA-Z.#])\s+/g, "$1")
                .replace(/\s([^0-9a-zA-Z.#]+)/g, "$1")
                .replace(/;}/g, "}")
                .replace(/\/\*.*?\*\//g, "")
                .trim()
            + '\n</style>';

        tpl.remove();
        self.label_css(css);
    }

    self.updateLabelMarkup = function () {
        let tpl = $("<div>");
        ko.applyBindingsToNode(tpl[0], {template: {name: 'label-template', data: self}});
        let html = tpl.html()
            .replace(/>[\r\n ]+</g, "><")
            .replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')
            .trim();
        tpl.remove();
        self.label_markup(html);
    }

    self.updateLabelCSS();
    self.updateLabelMarkup();
}