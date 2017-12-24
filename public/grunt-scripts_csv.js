!function(){"use strict";var e={};e.RELAXED=!1,e.IGNORE_RECORD_LENGTH=!1,e.IGNORE_QUOTES=!1,e.LINE_FEED_OK=!0,e.CARRIAGE_RETURN_OK=!0,e.DETECT_TYPES=!0,e.IGNORE_QUOTE_WHITESPACE=!0,e.DEBUG=!1,e.COLUMN_SEPARATOR=",",e.ERROR_EOF="UNEXPECTED_END_OF_FILE",e.ERROR_CHAR="UNEXPECTED_CHARACTER",e.ERROR_EOL="UNEXPECTED_END_OF_RECORD",e.WARN_SPACE="UNEXPECTED_WHITESPACE";e.parse=function(r){var t=e.result=[];e.offset=0,e.str=r,e.record_begin(),e.debug("parse()",r);for(var n;;){if(n=r[e.offset++],e.debug("c",n),null==n){e.escaped&&e.error(e.ERROR_EOF),e.record&&(e.token_end(),e.record_end()),e.debug("...bail",n,e.state,e.record),e.reset();break}if(null==e.record){if(e.RELAXED&&("\n"==n||"\r"==n&&"\n"==r[e.offset+1]))continue;e.record_begin()}if(0==e.state){if((" "===n||"\t"===n)&&'"'==e.next_nonspace()){if(e.RELAXED||e.IGNORE_QUOTE_WHITESPACE)continue;e.warn(e.WARN_SPACE)}if('"'==n&&!e.IGNORE_QUOTES){e.debug("...escaped start",n),e.escaped=!0,e.state=1;continue}e.state=1}1==e.state&&e.escaped?'"'==n?'"'==r[e.offset]?(e.debug("...escaped quote",n),e.token+='"',e.offset++):(e.debug("...escaped end",n),e.escaped=!1,e.state=2):(e.token+=n,e.debug("...escaped add",n,e.token)):"\r"==n?("\n"==r[e.offset]?e.offset++:e.CARRIAGE_RETURN_OK||e.error(e.ERROR_CHAR),e.token_end(),e.record_end()):"\n"==n?(e.LINE_FEED_OK||e.RELAXED||e.error(e.ERROR_CHAR),e.token_end(),e.record_end()):n==e.COLUMN_SEPARATOR?e.token_end():1==e.state?(e.token+=n,e.debug("...add",n,e.token)):" "===n||"\t"===n?e.IGNORE_QUOTE_WHITESPACE||e.error(e.WARN_SPACE):e.RELAXED||e.error(e.ERROR_CHAR)}return t},e.json=function(){var e=new require("stream").Transform({objectMode:!0});return e._transform=function(r,t,n){e.push(JSON.stringify(r.toString())+require("os").EOL),n()},e},e.stream=function(){var r=new require("stream").Transform({objectMode:!0});return r.EOL="\n",r.prior="",r.emitter=function(r){return function(t){r.push(e.parse(t+r.EOL))}}(r),r._transform=function(e,r,t){var n=""==this.prior?e.toString().split(this.EOL):(this.prior+e.toString()).split(this.EOL);this.prior=n.pop(),n.forEach(this.emitter),t()},r._flush=function(e){""!=this.prior&&(this.emitter(this.prior),this.prior=""),e()},r},e.reset=function(){e.state=null,e.token=null,e.escaped=null,e.record=null,e.offset=null,e.result=null,e.str=null},e.next_nonspace=function(){for(var r,t=e.offset;t<e.str.length;)if(" "!=(r=e.str[t++])&&"\t"!==r)return r;return null},e.record_begin=function(){e.escaped=!1,e.record=[],e.token_begin(),e.debug("record_begin")},e.record_end=function(){e.state=4,!e.IGNORE_RECORD_LENGTH&&!e.RELAXED&&e.result.length>0&&e.record.length!=e.result[0].length&&e.error(e.ERROR_EOL),e.result.push(e.record),e.debug("record end",e.record),e.record=null},e.resolve_type=function(e){return e.match(/^\d+(\.\d+)?$/)?e=parseFloat(e):e.match(/^(true|false)$/i)?e=Boolean(e.match(/true/i)):"undefined"===e?e=void 0:"null"===e&&(e=null),e},e.token_begin=function(){e.state=0,e.token=""},e.token_end=function(){e.DETECT_TYPES&&(e.token=e.resolve_type(e.token)),e.record.push(e.token),e.debug("token end",e.token),e.token_begin()},e.debug=function(){e.DEBUG&&console.log(arguments)},e.dump=function(r){return[r,"at char",e.offset,":",e.str.substr(e.offset-50,50).replace(/\r/gm,"\\r").replace(/\n/gm,"\\n").replace(/\t/gm,"\\t")].join(" ")},e.error=function(r){var t=e.dump(r);throw e.reset(),t},e.warn=function(r){var t=e.dump(r);try{return void console.warn(t)}catch(e){}try{console.log(t)}catch(e){}},function(e,r,t){"undefined"!=typeof module&&module.exports?module.exports=t():r.CSV=t()}(0,Function("return this")(),function(){return e})}();