var Reflux = require('reflux');

var socket = require('../socket');

var serverActions = Reflux.createActions([
	'connect',
	'disconnect',
	'whois',
	'setNick',
	'load'
]);

serverActions.connect.preEmit = function(server, nick, opts) {
	socket.send('connect', {
		server: server,
		nick: nick,
		username: opts.username || nick,
		password: opts.password,
		realname: opts.realname || nick,
		tls: opts.tls || false,
		name: opts.name || server
	});
};

serverActions.disconnect.preEmit = function(server) {
	socket.send('quit', { server: server });
};

serverActions.whois.preEmit = function(user, server) {
	socket.send('whois', {
		server: server,
		user: user
	});
};

serverActions.setNick.preEmit = function(nick, server) {
	socket.send('nick', {
		server: server,
		new: nick
	});
};

module.exports = serverActions;