var express = require('express');
var router = express.Router();
const store = require("../services/noteStore.js");

function sort(type, array) {
    function fn(a, b) {
      console.log(a[type]);
      if (a[type] > b[type]) {
        return -1;
      }
      if (a[type] < b[type]) {
        return 1;
      }
      return 0;
    }
    return array.sort(fn)
}


router.get("/", function(req, res, next) {
  console.log(req.query);
  store.all(function(err, notes) {
    let sortNotes = sort(req.query.sort, notes);
    res.render('index', { notes: sortNotes });
  })
});

router.get("/add", function(req, res, next) {
  res.render('add', { });
});

router.post("/notes", function(req, res) {
  store.add(req.body, function(err, note) {
    console.log(req.body); 
  });
});

router.post("/notes/:id", function(req, res) {
  console.log(req.params.id); 
  console.log(req.body);
  store.put(req.params.id, req.body, function(err, note) {
    console.log(req.body); 
  });
});

router.get("/edit/:id", function(req, res) {
  //var note; 
  store.get(req.params.id, function(err, note) {
    console.log(req.params.id);
    res.render('edit', { note: note });
  })
});

/*
router.get("/orders/:id/", orders.showOrder);
router.delete("/orders/:id/", orders.deleteOrder);
*/
module.exports = router;
