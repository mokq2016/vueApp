Date.prototype.format = function (format = 'yyyy-MM-dd') {
    const o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
    };

    let str = format;

    if (/(y+)/.test(format)) {
        str = str.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
    }

    Object.entries(o).forEach(([k, v]) => {
        if (new RegExp(`(${k})`).test(str)) {
            str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? v : `00${v}`.substr(`${v}`.length));
        }
    });

    return str;
};

Date.prototype.toJSON = function () {
    return this.format();
};

Date.prototype.getFirstDayOfMonth = function () {
    this.setDate(1);
    return this;
};

/**
 * 数字转千分位金额
 * @param prefix 前缀，如¥
 * @param digit 小数位数，默认不处理，设置后根据值处理小数位数
 * @returns {string}
 */
String.prototype.toMoney = function (prefix = '', digit) {
    let val = this;
    const re = /^(-?\d+)(\d{3})(\.?\d*)/;
    while (re.test(val)) {
        val = val.replace(re, '$1,$2$3');
    }

    if (digit) {
        val = (val * 1).toFixed(digit);
    }
    return prefix + val;
};
