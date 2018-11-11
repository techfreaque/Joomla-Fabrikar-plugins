/**
 * starit Element - List
 *
 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license:   GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

define(['jquery'], function (jQuery) {
	var FbstaritList = new Class({

		options: {
			'imageover'  : '',
			'imageout'   : '',
			'userid'     : '',
			'formid'     : 0,
			'noAccessMsg': '',
			'canUse'     : true
		},

		Implements: [Events, Options],

		initialize: function (id, options) {
			this.setOptions(options);
			//if (this.options.canUse) {
			if (true) {
				this.col = document.getElements('.' + id);
				this.origstaritUp = {};
				this.origstaritDown = {};
				if (Fabrik.bootstrapped || this.options.j3) {
					if (this.options.voteType === 'comment') {
						this.setUpBootstrappedComments();
					} else {
						this.setUpBootstrapped();
					}
				} else {
					this.col.each(function (tr) {
						var row = tr.getParent('.fabrik_row');
						if (row) {
							var rowid = row.id.replace('list_' + this.options.renderContext + '_row_', '');
							var staritup = tr.getElements('.staritup');
							var staritdown = tr.getElements('.staritdown');
							staritup.each(function (staritup) {
								if (this.options.canUse) {
									staritup.addEvent('mouseover', function (e) {
										staritup.setStyle('cursor', 'pointer');
										staritup.src = this.options.imagepath + "starit_up_in.gif";
									}.bind(this));
									staritup.addEvent('mouseout', function (e) {
										staritup.setStyle('cursor', '');
										if (this.options.mystarit[rowid] === 'up') {
											staritup.src = this.options.imagepath + "starit_up_in.gif";
										} else {
											staritup.src = this.options.imagepath + "starit_up_out.gif";
										}
									}.bind(this));
									staritup.addEvent('click', function (e) {
										this.doAjax(staritup, 'up');
									}.bind(this));
								}
								else {
									staritup.addEvent('click', function (e) {
										e.stop();
										this.doNoAccess();
									}.bind(this));
								}
							}.bind(this));

							staritdown.each(function (staritdown) {
								if (this.options.canUse) {
									staritdown.addEvent('mouseover', function (e) {
										staritdown.setStyle('cursor', 'pointer');
										staritdown.src = this.options.imagepath + "starit_down_in.gif";
									}.bind(this));

									staritdown.addEvent('mouseout', function (e) {
										staritdown.setStyle('cursor', '');
										if (this.options.mystarit[rowid] === 'down') {
											staritdown.src = this.options.imagepath + "starit_down_in.gif";
										} else {
											staritdown.src = this.options.imagepath + "starit_down_out.gif";
										}
									}.bind(this));
									staritdown.addEvent('click', function (e) {
										this.doAjax(staritdown, 'down');
									}.bind(this));
								}
								else {
									staritup.addEvent('click', function (e) {
										e.stop();
										this.doNoAccess();
									}.bind(this));
								}
							}.bind(this));
						}
					}.bind(this));
				}
			}
		},

		setUpBootstrappedComments: function () {
			document.addEvent('click:relay(*[data-fabrik-starit])', function (e, target) {
				if (this.options.canUse) {
					var add = target.hasClass('btn-success') ? false : true;
					var dir = target.get('data-fabrik-starit');
					var formid = target.get('data-fabrik-starit-formid');
					var rowid = target.get('data-fabrik-starit-rowid');

					this.doAjax(target, dir, add);
					if (dir === 'up') {
						if (!add) {
							target.removeClass('btn-success');
						} else {
							target.addClass('btn-success');
							var down = document.getElements('button[data-fabrik-starit-formid=' + formid + '][data-fabrik-starit-rowid=' + rowid + '][data-fabrik-starit=down]');
							down.removeClass('btn-danger');
						}
					} else {
						var up = document.getElements('button[data-fabrik-starit-formid=' + formid + '][data-fabrik-starit-rowid=' + rowid + '][data-fabrik-starit=up]');
						if (!add) {
							target.removeClass('btn-danger');
						} else {
							target.addClass('btn-danger');
							up.removeClass('btn-success');
						}
					}
				}
				else {
					e.stop();
					this.doNoAccess();
				}
			}.bind(this));

		},

		setUpBootstrapped: function () {
			this.col.each(function (td) {
				var row = td.getParent('.fabrik_row');

				if (row) {
					var rowid = row.id.replace('list_' + this.options.renderContext + '_row_', '');
					var up = td.getElement('button.starit-up'),
						down = td.getElement('button.starit-down');

					up.addEvent('click', function (e) {
						e.stop();
						if (this.options.canUse) {
							var add = up.hasClass('btn-success') ? false : true;
							this.doAjax(up, 'up', add);

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
								this.doAjax(down, 'down', add);

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
				}
			}.bind(this));
		},

		doAjax: function (e, starit, add) {
			// We shouldn't get here if they didn't have access, but doesn't hurt to check
			if (!this.options.canUse) {
				this.doNoAccess();
			}
			else {
				add = add ? true : false;
				var row = e.getParent();
				var rowid = e.get('data-fabrik-starit-rowid');
				var count_starit = document.id('count_starit' + starit + rowid);
				Fabrik.loader.start(row);
				this.starit = starit;

				var data = {
					'option'     : 'com_fabrik',
					'format'     : 'raw',
					'task'       : 'plugin.pluginAjax',
					'plugin'     : 'starit',
					'method'     : 'ajax_rate',
					'g'          : 'element',
					'element_id' : this.options.elid,
					'row_id'     : rowid,
					'elementname': this.options.elid,
					'userid'     : this.options.userid,
					'starit'      : this.starit,
					'listid'     : this.options.listid,
					'formid'     : this.options.formid,
					'add'        : add
				};

				if (this.options.voteType === 'comment') {
					data.special = 'comments_' + this.options.formid;
				}

				new Request({
					url       : '',
					'data'    : data,
					onComplete: function (r) {
						var count_staritup = document.id('count_staritup' + rowid);
						var count_staritdown = document.id('count_staritdown' + rowid);
						var staritup = row.getElements('.staritup');
						var staritdown = row.getElements('.staritdown');
						Fabrik.loader.stop(row);
						r = JSON.parse(r);

						if (r.error) {
							console.log(r.error);
						} else {
							if (Fabrik.bootstrapped) {
								row.getElement('button.starit-up .starit-count').set('text', r[0]);

								if (typeOf(row.getElement('button.starit-down')) !== 'null') {
									row.getElement('button.starit-down .starit-count').set('text', r[1]);
								}
							} else {
								count_staritup.set('html', r[0]);
								count_staritdown.set('html', r[1]);
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

	return FbstaritList;
});
