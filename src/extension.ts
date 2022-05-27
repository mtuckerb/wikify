import * as vscode from 'vscode';
const fs = require('fs');
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('wikify.makeWiki', () => {
		const fileName = vscode.window.activeTextEditor?.document?.fileName;
		if (!fileName) {return}
		const baseName = fileName.split('/').reverse()[0];
		const destFilename = `/Users/mtuckerb/workspace/mtuckerb/mtuckerb.github/${baseName}`;
		fs.link( fileName, destFilename, (err: any) => {
			if (err) {
				vscode.window.showInformationMessage(`Couldn't link ${fileName}: ${err}`);
			} else {
				vscode.window.showInformationMessage(`Created a hard link from ${fileName} to ${destFilename}!`);
			}

		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
