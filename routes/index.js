const probeFactory = require('../probes/probeFactory');

const probeViewer = require('../utils/probeViewer');

const express = require('express');
const router = express.Router();

const probeNotFound = function (req, res, next) {
  if (!req.session.currentProbe)
    return res.status(404).json({error: "Não foi encontrado nenhuma sonda em ação!"});
  next();
};

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

router.delete('/probe', probeNotFound, function (req, res) {
  const probe = req.session.currentProbe;
  req.session.currentProbe = null;
  res.status(200).json({probe: probeViewer(probe), deleted: true});
});


router.get('/probe', probeNotFound, function (req, res) {
  res.status(200).json(probeViewer(req.session.currentProbe));
});

module.exports = router;
