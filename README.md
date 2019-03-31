#	obtions
__Function OPTIONS Schema validator.__

To normalise options argument.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
* 	[Examples](#examples)
*   [ODL, Option Definition Language](#odl)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/ecmascript.obtions)

##	Get Started

```javascript
const obtions = requrie('obtions');

const options = {
    Domain: 'www.example.com',
    Port: 8080,
    path: '/index.html',
};

const def = {
    // Whether the property names of *options* are case sensitive.
    // DEFAULT false
    caseSensitive: false,

    // Whether the property names of returned (parsed) object may keep the case 
    // as what column names look like, even *def.caseSensitive* is false.
    // DEFAULT false
    keepNameCase: false,

    // If set true, properties not explicitly declared will be ignored.
    // DEFAULT false
    explicit: true,

    // Declare properties in *options*.
    columns: [ 
        'port', 
        { name: 'Hostname', alias: 'domain' } 
    ],
};

const po = obtions(options, def);
// RETURN {
//     Hostname: 'www.example.com',
//     port: 8080
// }
```

##	API

*	Object __obtions__( Object *options*, Object *def* )
*   Object __obtions__( Object *options*, Array *columns* )
*	Object __obtions__( Object *options* )

Argument *def* may include following properties:
*	__def.caseSensitive__ *boolean* DEFAULT `false`
*	__def.keepNameCase__ *boolean* DEFAULT `false`
*	__def.explicit__ *boolean* DEFAULT `true`
*	__def.columns__ *Array* NOT NULL

__columns__ or __def.columns__ is an array made up of one or more column definitions. A column definition may be an object with following properties:
*   __name__ *string* 
*   __alias__ *string* | *string[]*
*   __default__ *any* OPTIONAL
*   __parser__ *Function* OPTIONAL
*   __required__ *boolean* DEFAULT `false` 

##  Examples

__obtions__ is an easy way to make your function paramemters more friendly. 

```javascript
function formatUrl(options) {
    
    const optionsDef = {
        caseSensitive: false, 
        explicit: true,

        // Property *columns* of definition may be an array or object.
        columns: [
            // Use object to define/declare a column.
            { name: 'protocol', default: 'http' },
            { name: 'query', alias: [ 'querystring', 'queries' ] },

            // Use description string to define/declare a column.
            'hostname required alias(domain, domainName)',

            // Only column name is also OK.
            'port',
            'path',
            'search',
            'hash'
        ]
    };

    options = obtions(options, optionsDef);

    // ...
}
```

## ODL

OD is abbreviation of __Option Definition Language__ which is a tiny language used to define option. It is an easy alternative for option define object. E.g.

```javascript
// * The option is named "hostname" , or named with alias "domain" or "domainName". 
// * The option SHOULD exist.
'hostname required alias(domain, domainName)'

// * Set default value.
'number DEFAULT(99)'
```

Keywords in ODL is __case-insensitive__:
*   ALIAS
*   DEFAULT
*   NOT
*   REQUIRED
