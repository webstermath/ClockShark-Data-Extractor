function getLogsfromCsvs(csvFiles){
 var csvs = getClockSharkCsvs(csvFiles);
 return csvs.reduce(function(acc,csv,index){
  return acc.concat(getObjectListfromCsv(csv, csvFiles[index].getId(), csvFiles[index].getName()));
 },[]);
}

function getClockSharkCsvs(files) {
  return files.map(function(file){
   return Utilities.parseCsv(file.getBlob().getDataAsString())
  });
}

function getObjectListfromCsv(csv,fileId, fileName){
  var keys = csv.shift().map(_.firstLetterLowerCase);
  
  return csv.map(function(row, rowIndex){
    var item =  row.reduce(function(acc,cell,index){
     acc[keys[index]] = cell;
     return acc;
    },{});
    item.fileId = fileId;
    item.fileName = fileName;
    item.rowIndex = rowIndex+2;
    return item;
  });
}
