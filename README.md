#	options2
__Function OPTIONS Schema validator.__

To normalise options argument.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
* 	[Examples](#examples)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/ecmascript.options2)

##	Get Started

```javascript
const options2 = requrie('options2');

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

const po = options2(options, def);
// RETURN {
//     Hostname: 'www.example.com',
//     port: 8080
// }
```

##	API

*	Object __options2__( Object *options*,  Object *def* )
*	Object __options2__( Object *options* )

Argument *def* may include following properties:
*	__def.caseSensitive__ *boolean* DEFAULT `false`
*	__def.keepNameCase__ *boolean* DEFAULT `false`
*	__def.explicit__ *boolean* DEFAULT `true`
*	__def.columns__ *Array* NOT NULL

A column definition may be an object with following properties:
*   __name__ *string* 
*   __alias__ *string* | *string[]*
*   __default__ *any* OPTIONAL
*   __parser__ *Function* OPTIONAL
*   __required__ *boolean* DEFAULT `false` 

##  Examples

__options2__ is an easy way to make your function paramemters more friendly. 

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

    options = options2(options, optionsDef);

    // ...
}
```
