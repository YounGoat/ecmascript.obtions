'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')

    /* in-package */
    , parseOptions = noda.inRequire('.')
    ;

describe('options2', () => {

    it('basic & case-insensitive', () => {
        const options = {
            Hostname: 'www.example.com',
        };
        
        let po = parseOptions(options);
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.Hostname, undefined);
    });

    it('case sensitive', () => {
        const options = {
            Host: 'www.example.com',
        };

        let po = parseOptions(options, { caseSensitive: true });
        assert.equal(po.host, undefined);
    });

    it('keep name case', () => {
        const options = {
            Host: 'www.example.com',
        };

        let po = parseOptions(options, { 
            caseSensitive: false, 
            keepNameCase: true,
            columns: [ 'Hostname alias(host)' ] });
        assert.equal(po.hostname, undefined);
        assert.equal(po.Hostname, 'www.example.com');
    });

    it('explicit', () => {
        const options = {
            host: 'www.example.com',
            hostname: 'www.example.com',
        };

        let po = parseOptions(options, { 
            columns: [ 'host' ],
            explicit: true 
        });
        assert(po.host);
        assert.equal(po.hostname, undefined);
    });

    it('alias', () => {
        const options = {
            domain: 'www.example.com',
        };
        let po = parseOptions(options, { 
            columns: [ { name: 'hostname', alias: 'domain' } ],
        });
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.domain, undefined);

        po = parseOptions(options, { 
            caseSensitive: false,
            columns: [ { name: 'hostname', alias: 'Domain' } ],
        });
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.domain, undefined);
    });

    it('parser', () => {
        const options = {
            hostname: ' www.example.com ',
        };

        let po = parseOptions(options, { 
            columns: {
                hostname: { parser: value => value.trim() }
            },
        });
        assert.equal(po.hostname, 'www.example.com');
    });

    it('required', () => {
        assert.throws(() => {
            const options = {};    
            parseOptions(options, { 
                columns: {
                    hostname: { required: true }
                },
            });
        });
    });

    it('column desc', () => {
        assert.throws(() => {
            const options = {};    
            parseOptions(options, { 
                columns: [ 'hostname required' ],
            });
        });

        const options = {
            domain: 'www.example.com',
            subpath: '/index.html'
        };
        let po = parseOptions(options, {
            columns: [ 
                'hostname alias(domain)',
                'path alias (subpath)',
                'port default(8080)'
            ],
        });
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.path, '/index.html');
        assert.equal(po.port, 8080);
    });

    it('column desc, keyword case-insensitive', () => {
        assert.throws(() => {
            const options = {};    
            parseOptions(options, { 
                columns: [ 'hostname REQUIRED' ],
            });
        });

        const options = {
            domain: 'www.example.com',
            subpath: '/index.html'
        };
        let po = parseOptions(options, {
            columns: [ 
                'hostname ALIAS(domain)',
                'path ALIAS (subpath)',
                'port DEFAULT(8080)'
            ],
        });
        assert.equal(po.hostname, 'www.example.com');
        assert.equal(po.path, '/index.html');
        assert.equal(po.port, 8080);
    });

    it('column default', () => {
        const options = {};    
        let po = parseOptions(options, { 
            columns: { 
                protocol: { default: 'http' }
            },
        });
        assert.equal(po.protocol, 'http');
    });

    it('lite mode, regard arrayed def as def.columns', () => {
        const options = {};    
        let po = parseOptions(options, [
            'protocol DEFAULT("http")',
            { name: 'port', default: 80 }
        ]);
        assert.equal(po.protocol, 'http');
        assert.equal(po.port, 80);
    });

});