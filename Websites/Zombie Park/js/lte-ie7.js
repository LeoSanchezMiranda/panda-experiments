/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-phone' : '&#x74;',
			'icon-print' : '&#x66;',
			'icon-facebook' : '&#x46;',
			'icon-twitter' : '&#x54;',
			'icon-location' : '&#x4c;',
			'icon-home' : '&#x48;',
			'icon-target' : '&#x43;',
			'icon-fire' : '&#x41;',
			'icon-mail' : '&#x4d;',
			'icon-user' : '&#x6d;',
			'icon-grin' : '&#x53;',
			'icon-cancel-circle' : '&#x21;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};