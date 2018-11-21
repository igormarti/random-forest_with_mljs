let randomf = require('ml-random-forest')
let csv = require('csvdata')
//const csv = require('csvtojson');

let CsvData = []
let dataformated = [];
let opts = {
    delimiter: ',',
    encoding: 'utf8',
    log: true,
    objName: false,
    parse: true,
    stream: false
  }

    /*csv().fromFile('data.csv')
    .on('data',(data)=>[
         CsvData.push(JSON.parse(data.toString('utf8')))
    ]).on('done',()=>{
        ObjecttoArray()
        formatData()
    })*/

   csv.load('data.csv',opts).then((data)=>{ 
        CsvData = data
        ObjecttoArray()
        formatData()
   }).catch((err)=>{
       console.log(err)
   })

    function ObjecttoArray(){
        
        for(let i = 0 ; i < Object.keys(CsvData).length; i++){
            if(!isNaN(ii(CsvData[i].idade)) && ii(CsvData[i].idade) > 0){
               if(ii(CsvData[i].rotulo) === 0){ 
                   CsvData[i].rotulo = 2    
                   dataformated.push([ii(CsvData[i].salario),ii(CsvData[i].idade),ii(CsvData[i].emprestimo), CsvData[i].rotulo])
               }else{
                   dataformated.push([ii(CsvData[i].salario),ii(CsvData[i].idade),ii(CsvData[i].emprestimo),ii(CsvData[i].rotulo)])
               }
            }   
       }

        
    }

    
    function ii(n){
        return parseInt(n)
    }


    function formatData(){
       
        var attributes = new Array(800);
        var labels = new Array(800);

        for (var i = 0; i < 800; i++) {
            attributes[i] = dataformated[i].slice(0, 3);
            labels[i] = dataformated[i][3];
        }

        makePredict(attributes,labels)
    }

    function makePredict(attributes,labels){
        var options = {
            seed: 4000,
            maxFeatures: 3,
            replacement: true,
            nEstimators: 200,
          };
         
          var regression = new randomf.RandomForestRegression(options)
          regression.train(attributes,labels);
          var result = regression.predict([[27,80,45]]);
          console.log(result);
    }
    


    



 /*var dataset = [
  [73, 80, 75, 2],
  [93, 88, 93, 1],
  [89, 91, 90, 1],
  [96, 98, 100, 2],
  [73, 66, 70, 1],
  [53, 46, 55, 1],
  [69, 74, 77, 1],
  [47, 56, 60, 2],
  [87, 79, 90, 2],
  [79, 70, 88, 2],
  [69, 70, 73, 2],
  [70, 65, 74, 2],
  [93, 95, 91, 1],
  [79, 80, 73, 1],
  [70, 73, 78, 1],
  [93, 89, 96, 2],
  [78, 75, 68, 2],
  [81, 90, 93, 2],
  [88, 92, 86, 1],
  [78, 83, 77, 2],
  [82, 86, 90, 1],
  [86, 82, 89, 2],
  [78, 83, 85, 1],
  [76, 83, 71, 2],
  [96, 93, 95, 1]
];




var trainingSet = new Array(dataset.length);
var predictions = new Array(dataset.length);

for (var i = 0; i < dataset.length; ++i) {
  trainingSet[i] = dataset[i].slice(0, 3);
  predictions[i] = dataset[i][3];
}

var options = {
  seed: 3,
  maxFeatures: 2,
  replacement: false,
  nEstimators: 200
};

var regression = new randomf.RandomForestRegression(options)
console.log(trainingSet)
regression.train(trainingSet, predictions);
var result = regression.predict([[27,80,45]]);
console.log(result);*/