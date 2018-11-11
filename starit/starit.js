/**
 * starit Element
 *
 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license:   GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

define(['jquery', 'fab/element'], function (jQuery, FbElement) {
    window.Fbstarit = new Class({
        Extends   : FbElement,
        initialize: function (element, options, starit) {
            this.field = document.id(element);
            this.parent(element, options);
            this.starit = starit;
            this.spinner = new Spinner(this.getContainer());

            if (Fabrik.bootstrapped) {
                this.setupj3();
            } else {
                this.staritup = document.id('staritup');
                this.staritdown = document.id('staritdown');
                if (this.options.canUse) {
                    this.imagepath = Fabrik.liveSite + 'plugins/fabrik_element/starit/images/';

                    this.staritup.addEvent('mouseover', function (e) {
                        this.staritup.setStyle('cursor', 'pointer');
                        this.staritup.src = this.imagepath + 'starit_up_in.gif';
                    }.bind(this));

                    this.staritdown.addEvent('mouseover', function (e) {
                        this.staritdown.setStyle('cursor', 'pointer');
                        this.staritdown.src = this.imagepath + 'starit_down_in.gif';
                    }.bind(this));

                    this.staritup.addEvent('mouseout', function (e) {
                        this.staritup.setStyle('cursor', '');
                        if (this.options.mystarit === 'up') {
                            this.staritup.src = this.imagepath + 'starit_up_in.gif';
                        } else {
                            this.staritup.src = this.imagepath + 'starit_up_out.gif';
                        }
                    }.bind(this));
                    this.staritdown.addEvent('mouseout', function (e) {
                        this.staritdown.setStyle('cursor', '');
                        if (this.options.mystarit === 'down') {
                            this.staritdown.src = this.imagepath + 'starit_down_in.gif';
                        } else {
                            this.staritdown.src = this.imagepath + 'starit_down_out.gif';
                        }
                    }.bind(this));

                    this.staritup.addEvent('click', function (e) {
                        this.doAjax('up');
                    }.bind(this));
                    this.staritdown.addEvent('click', function (e) {
                        this.doAjax('down');
                    }.bind(this));
                }
                else {
                    this.staritup.addEvent('click', function (e) {
                        e.stop();
                        this.doNoAccess();
                    }.bind(this));
                    this.staritdown.addEvent('click', function (e) {
                        e.stop();
                        this.doNoAccess();
                    }.bind(this));
                }
            }
        },

        setupj3: function () {
            var c = this.getContainer();
            var up = c.getElement('button.starit-up');
            var down = c.getElement('button.starit-down');

            up.addEvent('click', function (e) {
                e.stop();
                if (this.options.canUse) {
                    var add = up.hasClass('btn-success') ? false : true;
                    this.doAjax('up', add);
                    if (!add) {
                        up.removeClass('btn-success');
                    } else {
                        up.addClass('btn-success');
                        if (typeOf(down) !== 'null') {
                            down.removeClass('btn-danger');
                        }
                    }
                }
                else {
                    this.doNoAccess();
                }
            }.bind(this));

            if (typeOf(down) !== 'null') {
                down.addEvent('click', function (e) {
                    e.stop();
                    if (this.options.canUse) {
                        var add = down.hasClass('btn-danger') ? false : true;
                        this.doAjax('down', add);
                        if (!add) {
                            down.removeClass('btn-danger');
                        } else {
                            down.addClass('btn-danger');
                            up.removeClass('btn-success');
                        }
                    }
                    else {
                        this.doNoAccess();
                    }
                }.bind(this));
            }
        },

        doAjax: function (th, add) {
            add = add ? true : false;
            if (this.options.editable === false) {
                this.spinner.show();
                var data = {
                    'option'     : 'com_fabrik',
                    'format'     : 'raw',
                    'task'       : 'plugin.pluginAjax',
                    'plugin'     : 'starit',
                    'method'     : 'ajax_rate',
                    'g'          : 'element',
                    'element_id' : this.options.elid,
                    'row_id'     : this.options.row_id,
                    'elementname': this.options.elid,
                    'userid'     : this.options.userid,
                    'starit'      : th,
                    'listid'     : this.options.listid,
                    'formid'     : this.options.formid,
                    'add'        : add
                };

                new Request({
                    url       : '',
                    'data'    : data,
                    onComplete: function (r) {
                        r = JSON.parse(r);
                        this.spinner.hide();
                        if (r.error) {
                            console.log(r.error);
                        } else {
                            if (r !== '') {
                                if (Fabrik.bootstrapped) {
                                    var c = this.getContainer();
                                    c.getElement('button.starit-up .starit-count').set('text', r[0]);
                                    if (typeOf(c.getElement('button.starit-down')) !== 'null') {
                                        c.getElement('button.starit-down .starit-count').set('text', r[1]);
                                    }
                                } else {
                                    var count_staritup = document.id('count_staritup');
                                    var count_staritdown = document.id('count_staritdown');
                                    var staritup = document.id('staritup');
                                    var staritdown = document.id('staritdown');
                                    count_staritup.set('html', r[0]);
                                    count_staritdown.set('html', r[1]);
                                    // Well since the element can't be rendered in
                                    // form view I guess this isn't really needed
                                    this.getContainer().getElement('.' + this.field.id).value =
                                        r[0].toFloat() - r[1].toFloat();
                                    if (r[0] === '1') {
                                        staritup.src = this.imagepath + 'starit_up_in.gif';
                                        staritdown.src = this.imagepath + 'starit_down_out.gif';
                                    } else {
                                        staritup.src = this.imagepath + 'starit_up_out.gif';
                                        staritdown.src = this.imagepath + 'starit_down_in.gif';
                                    }
                                }
                            }
                        }
                    }.bind(this)
                }).send();
            }
        },

        doNoAccess: function () {
            if (this.options.noAccessMsg !== '') {
                window.alert(this.options.noAccessMsg);
            }
        }

    });

    return window.Fbstarit;
});
