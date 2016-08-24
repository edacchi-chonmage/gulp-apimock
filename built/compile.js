'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paragraph = 'williamshakespeareaprilbaptisedaprilnbwasanenglishpoetplaywrightandactorwidelyregardedasthegreatestwriterintheenglishlanguageandtheworldspreeminentdramatistheisoftencalledenglandsnationalpoetandthebardofavonnbhisextantworksincludingsomecollaborationsconsistofaboutplaysnbsonnetstwolongnarrativepoemsandafewotherversesofwhichtheauthorshipofsomeisuncertainhisplayshavebeentranslatedintoeverymajorlivinglanguageandareperformedmoreoftenthanthoseofanyotherplaywrightshakespearewasbornandbroughtupinstratforduponavonattheageofhemarriedannehathawaywithwhomhehadthreechildren:susannaandtwinshamnetandjudithbetweenandhebeganasuccessfulcareerinlondonasanactorwriterandpartownerofaplayingcompanycalledthelordchamberlainsmenlaterknownasthekingsmenheappearstohaveretiredtostratfordaroundatagewherehediedthreeyearslaterfewrecordsofshakespearesprivatelifesurviveandtherehasbeenconsiderablespeculationaboutsuchmattersashisphysicalappearancesexualityreligiousbeliefsandwhethertheworksattributedtohimwerewrittenbyothersshakespeareproducedmostofhisknownworkbetweenandnbhisearlyplaysweremainlycomediesandhistoriesandtheseworksremainregardedassomeofthebestworkproducedinthesegenreshethenwrotemainlytragediesuntilaboutincludinghamletkinglearothelloandmacbethconsideredsomeofthefinestworksintheenglishlanguageinhislastphasehewrotetragicomediesalsoknownasromancesandcollaboratedwithotherplaywrightsmanyofhisplayswerepublishedineditionsofvaryingqualityandaccuracyduringhislifetimeinjohnhemingesandhenrycondelltwofriendsandfellowactorsofshakespearepublishedthefirstfolioacollectededitionofhisdramaticworksthatincludedallbuttwooftheplaysnowrecognisedasshakespearesitwasprefacedwithapoembybenjonsoninwhichshakespeareishailedprescientlyasnotofanagebutforalltimeinthethandstcenturyhisworkhasbeenrepeatedlyadoptedandrediscoveredbynewmovementsinscholarshipandperformancehisplaysremainhighlypopulartodayandareconstantlystudiedperformedandreinterpretedindiverseculturalandpoliticalcontextsthroughouttheworld';
var plen = paragraph.length;

function compileObj(obj) {
    var item = null;
    var result = {};

    if (!_lodashNode2.default.isObject(obj)) {
        return compile.buildByVal(obj);
    } else {
        _lodashNode2.default.forOwn(obj, function (val, key) {
            if (~key.indexOf(':') || ~key.indexOf('|')) {
                if (/\|Nullable$/.test(key) && Math.round(Math.random())) {
                    result[key.replace(/\|Nullable$/, '')] = null;
                } else {
                    key = key.replace(/\|Nullable$/, '');

                    item = compile.buildByKey(key, val);
                    result[item[0]] = item[1];
                }
            } else {
                key = key.replace(/\|Nullable$/, '');

                if (_lodashNode2.default.isObject(val)) {
                    result[key] = compile(val);
                } else {
                    result[key] = compile.buildByVal(val);
                }
            }
        });
    }

    return result;
}

var compile = function compile(template) {

    if (Array.isArray(template)) {
        var filter = template[1],
            minl,
            maxl;
        if (filter) {
            filter = filter.split('-');
            if (filter.length === 1) {
                filter[1] = filter[0];
            }
            minl = +filter[0];
            maxl = +filter[1];
        } else {
            minl = 1;
            maxl = 20;
        }
        var i = 0,
            il = _lodashNode2.default.random(minl, maxl);
        var result = [];

        for (; i < il; i++) {
            result.push(compileObj(template[0]));
        }

        return result;
    }

    return compileObj(template);
};

compile.replace = function (source, origin) {
    if (origin) {
        source += '';

        var item = null,
            pointer = 0;
        var matchResult = origin.match(/([x]+)/g);
        var i = 0,
            il = matchResult.length,
            tmp;

        for (; i < il; i++) {
            item = matchResult[i];
            tmp = source.slice(pointer, pointer + item.length);
            pointer = pointer + item.length;
            origin = origin.replace(item, tmp);
        }

        if (isNaN(+origin)) {
            return origin;
        }

        return +origin;
    }

    return source;
};
compile.getImageSize = function (dataFilter) {
    var width = 100,
        height = 100;
    var minW = width,
        maxW = width,
        minH = height,
        maxH = height;
    var tmp = [];
    if (dataFilter) {
        tmp = dataFilter.split('-');
        if (!tmp) {
            return [width, height];
        } else if (tmp.length === 1) {
            tmp[1] = tmp[0];
        }

        minW = tmp[0].split('x')[0];
        maxW = tmp[1].split('x')[0];

        minH = tmp[0].split('x')[1];
        maxH = tmp[1].split('x')[1];

        width = _lodashNode2.default.random(minW, maxW);
        height = _lodashNode2.default.random(minH, maxH);

        return [width, height];
    }

    return [width, height];
};

compile.buildString = function (min, max, dataFilter) {
    if (!max && min) {
        max = Math.abs(min);
        min = 0;
    } else {
        min = Math.abs(min) || 10;
        max = Math.abs(max) || 10;
    }

    var length = _lodashNode2.default.random(min, max);
    while (plen < length) {
        paragraph += paragraph;
        plen = paragraph.length;
    }
    var start = _lodashNode2.default.random(plen - length - 1);
    var result = paragraph.slice(start, start + length);
    if (dataFilter) {
        result = compile.replace(result, dataFilter);
    }
    return result;
};
compile.buildBoolean = function () {
    return Boolean(_lodashNode2.default.random(0, 1));
};
compile.buildNumberRange = function (lenMin, lenMax) {
    var numberRange = [];

    for (var i = lenMin; i <= lenMax; i++) {
        numberRange.push(i);
    }

    return numberRange;
};
compile.buildRandomArray = function (dataFilter) {
    var targetStrings = dataFilter.split('%,');
    var stringsLength = targetStrings.length;

    for (var i = stringsLength - 1; i >= 0; i--) {
        var isRemove = Boolean(Math.round(Math.random()));

        if (isRemove) {
            targetStrings.splice(i, 1);
        }
    }

    return targetStrings;
};
compile.buildRandomValue = function (dataFilter) {
    var targetStrings = dataFilter.split('%,');

    return targetStrings[Math.floor(Math.random() * targetStrings.length)];
};
compile.buildNumber = function (min, max, dataFilter) {
    if (min && !max) {
        max = min;
        min = 0;
    } else {
        min = min || 0;
        max = max || 10;
    }
    var length = _lodashNode2.default.random(min, max) - 1;
    var num = _lodashNode2.default.random(0.0, 0.8);
    num += 0.1;
    num = Math.floor(+('10e' + length) * num);

    return compile.replace(num, dataFilter);
};
compile.buildDate = function (filter) {
    var date = new Date().getTime();
    date = Math.ceil(Math.random() * date);

    if (filter.toLowerCase() === 'iso') {
        return (0, _moment2.default)(date).format();
    } else {
        return (0, _moment2.default)(date).format(filter || 'YYYY-MM-DD');
    }
};
compile.buildImage = function (dataFilter) {
    var size = compile.getImageSize(dataFilter);
    var width = size[0],
        height = size[1];

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'rgba(' + _lodashNode2.default.random(0, 255) + ', ' + _lodashNode2.default.random(0, 255) + ', ' + _lodashNode2.default.random(0, 255) + ', .4)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#666';
    ctx.font = (width / 4 > 12 ? width / 4 : 12) + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.fillText(width + 'x' + height, width / 2, height / 2);

    return canvas.toDataURL('image/png');
};
compile.buildByVal = function (str) {
    if (typeof str !== 'string') return str;

    var arrStr = str.split('|');
    arrStr[0] = arrStr[0].split(':');

    var dataType = arrStr[0][0];
    var dataLength = arrStr[0][1];
    var dataFilter = arrStr[1];
    var lenMin = 0,
        lenMax = 10;

    if (dataLength) {
        dataLength = dataLength.split('-');
        if (dataLength.length === 1) {
            lenMax = +dataLength[0];
            lenMin = +dataLength[0];
        } else {
            lenMin = +dataLength[0];
            lenMax = +dataLength[1];
        }
    }

    switch (dataType) {
        case 'String':
            return compile.buildString(lenMin, lenMax, dataFilter);
            break;
        case 'Number':
            return compile.buildNumber(lenMin, lenMax, dataFilter);
            break;
        case 'Date':
            return compile.buildDate(dataFilter);
            break;
        case 'Image':
            return compile.buildImage(dataFilter);
            break;
        case 'Boolean':
            return compile.buildBoolean();
            break;
        case 'NumberRange':
            return compile.buildNumberRange(lenMin, lenMax);
            break;
        case 'RandomValue':
            return compile.buildRandomValue(dataFilter);
            break;
        case 'RandomArray':
            return compile.buildRandomArray(dataFilter);
            break;
    }

    return str;
};
compile.buildByKey = function (key, val) {
    key = key.split('|');
    key[0] = key[0].split(':');

    var keyType = key[0][0];
    var keyLength = key[0][1];
    var dataLength = key[1];
    var lenMin = 1,
        lenMax,
        i = 0,
        il;

    if (!dataLength) {
        if (keyLength) {
            key = compile.buildByVal(keyType + ':' + keyLength);
        }
    } else {
        dataLength = dataLength.split('-');
        lenMin = +dataLength[0] <= 1 ? 1 : +dataLength[0];
        lenMax = +dataLength[1] >= lenMin ? +dataLength[1] : lenMin;

        il = _lodashNode2.default.random(lenMin, lenMax);

        var result = [];

        if (_lodashNode2.default.isObject(val)) {
            for (; i < il; i++) {
                result.push(compile(val));
            }
        } else {
            for (; i < il; i++) {
                result.push(compile.buildByVal(val));
            }
        }

        if (keyLength) {
            key = compile.buildByVal(keyType + ':' + keyLength);
        } else {
            key = keyType;
        }
        return [key, result];
    }

    if (_lodashNode2.default.isObject(val)) {
        return [key, compile(val)];
    }

    return [key, compile.buildByVal(val)];
};

exports.default = compile;