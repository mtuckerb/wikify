import * as vscode from 'vscode';
const fs = require('fs');
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('wikify.makeWiki', () => {
		const fileName = vscode.window.activeTextEditor?.document?.fileName;
		if (!fileName) {return};
		const baseName = fileName.split('/').reverse()[0];
		const config = vscode.workspace.getConfiguration('wikify');
		const targetDir = `${config.targetDir}/`;

		fs.link( fileName, `${targetDir}${baseName}`, (err: any) => {
			if (err) {
				vscode.window.showInformationMessage(`Couldn't create link: ${err}`);
			} else {
				vscode.window.showInformationMessage(`Created a hard link from ${fileName} to ${targetDir}!`);
			}

		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
