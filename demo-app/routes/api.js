var express = require('express');
var router = express.Router();
const { execFileSync, spawn } = require('child_process');
const { v4:uuidv4 } = require('uuid');

const fs = require('fs');
const path = require('path');


router.get('/', function(req, res, next) {

	pitch = parseFloat(req.query.pitch);
	yaw = parseFloat(req.query.yaw);
	appearance = parseFloat(req.query.appearance);
	exp = parseFloat(req.query.exp);

	if (isNaN(pitch) ||
		isNaN(yaw) ||
		isNaN(appearance) ||
		isNaN(exp)
	) {
		msg = { msg: "args should be numbers" }
		console.log(msg);
		res.status(400).json(msg);
		return;
	}
	if (pitch <-1.0 || pitch > 1.0 ||
		yaw <-1.0 || yaw > 1.0 ||
		appearance <0 || appearance > 1.0 ||
		exp <-1.0 || exp > 1.0
	) {
		msg = { msg: "args should be inrange -1.0 to 1.0" }
		console.log(msg);
		res.status(400).json(msg);
		return;
	}

	const uuid = uuidv4();
	const filepath = 'results/group0000/'+uuid+'.png';

	var log =  execFileSync (
		'../child_process.sh', [
			'--pitch', req.query.pitch,
			'--yaw', req.query.yaw,
			'--appearance', req.query.appearance,
			'--exp', req.query.exp,
			'--filename', uuid
		]
	);
	
	img = fs.readFileSync(filepath);
	imgbuf = Buffer.from(img, 'binary')
	res.writeHead(200, {
		'Content-Type': 'image/png',
		'Content-Length': imgbuf.length
	});
	res.end(imgbuf);
	delete imgbuf;

	// delete file
	var log =  spawn( 'rm', ['-rf', filepath]);
});


module.exports = router;
