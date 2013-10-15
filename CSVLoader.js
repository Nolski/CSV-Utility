function CSVLoader () {
	this._csvString = "";
	this._csvDelimiter = ",";
}


CSVLoader.prototype.getArray = function () {
	return this._CSVToArray(this._csvString);
}

CSVLoader.prototype.getObject = function() {
	return this._ArrayToObject(this._CSVToArray());	
}

/**
 * Load stringData into our CSV object
 * @param {string} csv
 * @param {string} delimiter(OPTIONAL)
 */
CSVLoader.prototype.LoadString = function ( csv, delimiter ) {
	this._csvString =  csv;
	this._csvDelimiter = (delimiter || ",");
}

/**
 * Make an ajax call to fileURL and load string data into loader object
 * @param {string} filename
 * @param {string} delimiter(OPTIONAL)
 */
CSVLoader.prototype.LoadFile = function ( filename, delimiter ) {
	this._csvDelimiter = (delimiter || ",");
	var ajax = new XMLHttpRequest();
	ajax.open("GET", filename, true);
	ajax.onreadystatechange = function() {
        this._csvString = ajax.responseText;
    };
}

/**
 * Takes in a 2d Array and returns an object using row 1 of 2d array as 
 * object keys.
 * @param  {2D Array} my2dArray
 * @return {Object}
 */
CSVLoader.prototype._ArrayToObject = function ( my2dArray ) {
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
CSVLoader.prototype._CSVToArray = function ( strData, strDelimiter  ){
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