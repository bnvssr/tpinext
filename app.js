var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var jsonfile = require('jsonfile');

var port = process.env.PORT || 3001;
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var tpiData = path.normalize(__dirname) + '/' + 'tpiBaseData/tpinextmodel.json'

/*jsonfile.readFile(path.normalize(__dirname + '/' + tpiData), function (err, tpi) {
  if (err !== null) {
    console.log(err)
  };
  tpi.keyareas.forEach(function (keyarea) {
    console.log(keyarea.name);
  });
});*/

app.get('/tpijson', function (req, res) {
  res.sendFile(path.normalize(__dirname + '/' + tpiData))
})

app.get('/tpi', function (req, res) {
  res.render('index');
});

app.get('/tpi/:view', function (req, res) {
  if (req.params.view == "all") {
    jsonfile.readFile(tpiData, function (err, tpifile) {
      res.render('viewAll', {
        tpi: tpifile
      });
    });
  } else if (req.params.view == "keyareas") {
    res.render('viewKeyareas');
  } else if (req.params.view == "clusters") {
    res.render('viewClusters');
  } else {
    res.render('index')
  }
});

app.listen(port);
