// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//const app = require('electron').remote.app

const electron = require('electron');
const remote = electron.remote;
const {dialog} = require('electron').remote

const fs = require('fs');



//document.getElementById('select-file').addEventListener('click',function(){
//	document.getElementById("actual-file").value = "CAD.txt";
  //  readFile('/home/syon/Om/input/CAD.txt');
	//			},false);
            


 document.getElementById('select-file').addEventListener('click',function(){
    dialog.showOpenDialog(function (fileNames) {
        if(fileNames === undefined){
                  console.log("No file selected");
            }else{
 	           document.getElementById("actual-file").value = fileNames[0];
                readFile(fileNames[0]);
                    }
                }); 
            },false);


document.getElementById('save-changes').addEventListener('click', function(){
	var actualFilePath = document.getElementById('actual-file').value;
	var outputFilePath = '/home/syon/Om/output/CAD_json.txt';
	if (outputFilePath){
		var str =document.getElementById('content-editor').value;
		saveChanges(outputFilePath,str);
	}
	else
	{
		alert("Please select a file first");
	}},false);


         
function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
        
        document.getElementById("content-editor").value = data;
    });
}


function saveChanges(filepath,content){ 
	fs.writeFile(filepath, content, function (err) {
	if(err){
            alert("An error ocurred updating the file"+ err.message);
            console.log(err);
            return;
        }
        console.log(filepath);
        alert("The " + filepath + " has been succesfully saved");
    }); 

 }



