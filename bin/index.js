#! /usr/bin/env node
import chokidar from 'chokidar';
import { spawn } from 'child_process';

const watcher = (file) => {
    const outputFile = `${file.split('.')[0]}-1.${file.split('.')[1]}`;
    const hbcli = spawn(
        './HandbrakeCLI',
        ['--all-audio', '--preset=H.264 MKV 1080p30','--subtitle-lang-list=en','--subtitle-burned=1',`--input=${file}`, `--output=encoded/${outputFile}`]
    );
    hbcli.stderr.on('data', (data) => console.log(data.toString()));
    // hbcli.stdout.on('data', (data) => {

    //     console.log(data.toString())

    // });

    hbcli.on('exit', (code) => {
        if (code === 0) console.log('finished!')
    })
}

chokidar
    .watch('.', {
        depth: 0,
        usePolling: true,
        interval: 300000
    })
    .on('add', watcher)
