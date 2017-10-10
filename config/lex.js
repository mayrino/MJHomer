'use strict';
// returns an instance of node-greenlock with additional helper methods
var lex = require('greenlock-express').create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  //'https://acme-staging.api.letsencrypt.org/directory'
  server:'staging',
// If you wish to replace the default plugins, you may do so here
//
challenges: { 'http-01': require('le-challenge-fs').create({
  webrootPath: require('homedir')()+'/srv/www/:hostname/.well-known/acme-challenge',   // defaults to os.tmpdir()
 loopbackPort: 5001 ,                                                         // defaults to 80
loopbackTimeout: 3000 ,                                                      // defaults to 3000ms
 debug: true
}) }, 
store: require('le-store-certbot').create({
  configDir: require('homedir')() + '/letsencrypt/etc',          // or /etc/letsencrypt or wherever
 privkeyPath: ':configDir/live/:hostname/privkey.pem' ,         //
 fullchainPath: ':configDir/live/:hostname/fullchain.pem',      // Note: both that :configDir and :hostname
 certPath: ':configDir/live/:hostname/cert.pem'  ,              //       will be templated as expected by
 chainPath: ':configDir/live/:hostname/chain.pem' ,             //       node-letsencrypt

 workDir: require('homedir')() + '/letsencrypt/var/lib',
 logsDir: require('homedir')() + '/letsencrypt/var/log',
 webrootPath: require('homedir')()+'/srv/www/:hostname/.well-known/acme-challenge',
debug: true
}),
// You probably wouldn't need to replace the default sni handler
// See https://git.daplie.com/Daplie/le-sni-auto if you think you do
//, sni: require('le-sni-auto').create({})
 approveDomains:approveDomains,
  debug: true
});

function approveDomains(opts, certs, cb) {
  // This is where you check your database and associated
  // email addresses with domains and agreements and such
  // The domains being approved for the first time are listed in opts.domains
  // Certs being renewed are listed in certs.altnames

   if (certs) {
    opts.domains = certs.altnames;
  }
  else {
    opts.email = 'reyesxie@gmail.com';
    opts.agreeTos = true;
    opts.demains = [ 'www.mayrino.org','localhost.daplie.com', 'localhost' ];
  }
 
  // NOTE: you can also change other options such as `challengeType` and `challenge`
  // opts.challengeType = 'http-01';
  // opts.challenge = require('le-challenge-fs').create({});
  cb(null, { options: opts, certs: certs });
}

module.exports = lex;

