const probeFactory = require('../probes/probeFactory');

const probeViewer = require('../utils/probeViewer');

const CommandsManager = require('../commands/CommandsManager');

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
    req.session.commandHistory = [];
    res.status(201).json({probe: probeViewer(probe), id: probe._id, type: probe.type});
  } catch {
    res.status(500).json({error: `Tipo de sonda '${type}' é inválido.`});
  }
});

router.delete('/probe', probeNotFound, function (req, res) {
  const probe = req.session.currentProbe;
  req.session.currentProbe = null;
  req.session.commandHistory = null;
  res.status(200).json({probe: probeViewer(probe), deleted: true});
});

router.get('/probe', probeNotFound, function (req, res) {
  res.status(200).json(probeViewer(req.session.currentProbe));
});

router.put('/probe/undo', probeNotFound, function (req, res) {
  try {
    const command = req.session.commandHistory?.pop();

    if (command) {
      CommandsManager.mapper(command).rollback(req.session.currentProbe);
    } else {
      res.status(404).json({error: "Nada para desfazer"});
    }

    res.status(200).json(req.session.currentProbe.position);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

router.put('/probe', probeNotFound, function (req, res) {
  try {
    if (typeof req.body.movementos !== 'object' || !Array.isArray(req.body.movementos))
      return res.status(400).json({error: "É necessário passar um array de movimentos!"});

    const commands = req.body.movementos.map(CommandsManager.mapper);
    const probe = req.session.currentProbe;

    commands.forEach((command, i) => {
      command.execute(probe);
      req.session.commandHistory = req.session.commandHistory || [];
      req.session.commandHistory.push(req.body.movementos[i]);
    });

    res.status(200).json(probe.position);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});


module.exports = router;
