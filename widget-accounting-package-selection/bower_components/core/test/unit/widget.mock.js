var Widget = module.exports = function Widget () {
	this.preferences = {};
};

Widget.prototype.getPreferenceFromParents = function() {};
Widget.prototype.getPreference = function(key) {
	return this.preferences[key];
};
Widget.prototype.setPreference = function(key, value) {
	this.preferences[key] = value;
};