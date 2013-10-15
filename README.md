CSV-Utility
===========

A javascript utility for taking CSV's, loading them, and formatting them into various data-types.

Use
---
```
var csv = new CSVLoader();
csv.loadFile('mycsv.csv');
csvArray = csv.getArray();
csvObject = csv.getObject();
```