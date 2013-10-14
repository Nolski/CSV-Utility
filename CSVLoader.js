function CSVLoader () {
	this._csvString = "";
	this._csvDelimiter = ",";
}

CSVLoader.prototype.LoadString = function (csv, delimiter) {

}

/**
 * Takes in a 2d Array and returns an object using row 1 of 2d array as 
 * object keys.
 * @param  {2D Array} my2dArray
 * @return {Object}
 */
CSVLoader.prototype._ArrayToObject = function (my2dArray) {
    var myObject = {};
    for(var y = 0; y < my2dArray[0].length; y++) {
        myObject[my2dArray[0][y]] = [];
    }
    var col = 0;
    for(var property in myObject) {
        for(var x = 1; x < my2dArray.length; x++) {
            myObject[property].push(my2dArray[x][col]);
        }
        col++;
    }
    return myObject;
}

/**
 * Takes in a .csv formated string and formats it into a 2d array
 * @param  {string} strData
 * @param  {string} strDelimiter (OPTIONAL)
 * @return {2D Array}
 */
CSVLoader.prototype._CSVToArray = function ( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){
            arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            var strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    return( arrData );
}