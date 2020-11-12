const probeFactory = require('../probes/probeFactory');

const probeViewer = require('../utils/probeViewer');

const express = require('express');
const router = express.Router();

router.post('/probe', function (req, res) {
  const type = req.body.type || "Standard";
  try {
    const probe = probeFactory(type);
    req.session.currentProbe = probe;
    res.status(201).json({probe: probeViewer(probe), id: probe._id, type: probe.type});
  } catch {
    res.status(500).json({error: `Tipo de sonda '${type}' é inválido.`});
  }
});

module.exports = router;
