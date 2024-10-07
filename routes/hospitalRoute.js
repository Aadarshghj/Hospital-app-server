const express = require("express");
const router = express.Router();
const fs = require('fs');

// load
const loadHospitals = () => {
  try {
    const dataBuffer = fs.readFileSync('hosdata.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    console.log(error);
    return []; 
  }
}

// Save 
const saveHospitals = (records) => {
  try {
    const dataJSON = JSON.stringify(records);
    fs.writeFileSync('hosdata.json', dataJSON);
  } catch (error) {
    console.log(error);
  }
}


router.get('/', (req, res) => {
  const hospitals = loadHospitals();
  res.send(hospitals);
});

// update
router.post('/', (req, res) => {
  try {
    const records = loadHospitals();
    const newHospital = {
      id: records.length + 1,
      name: req.body.name,
      patient: req.body.patient,
      location: req.body.location
    };
    records.push(newHospital);
    saveHospitals(records);
    res.status(201).send(newHospital);
  } catch (error) {
    res.status(400).send(error);
  }
});

// patch
router.patch('/:id', (req, res) => {
  try {
    const records = loadHospitals();
    const recordy = records.find(i => i.id === parseInt(req.params.id));
    if (!recordy) {
      return res.status(404).send({ error: 'ID not found' });
    }

    recordy.name = req.body.name || recordy.name;
    recordy.patient = req.body.patient || recordy.patient;
    recordy.location = req.body.location || recordy.location;

    saveHospitals(records);
    res.status(200).send(recordy);
  } catch (error) {
    res.status(404).send(error);
  }
});

// delete

router.delete('/:id', (req, res) => {
  try {
    let records = loadHospitals();
    const index = records.findIndex(i => i.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).send({ error: 'ID not found' });
    }

    records.splice(index, 1); 
    saveHospitals(records);

    res.send({ message: 'Record deleted' });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
