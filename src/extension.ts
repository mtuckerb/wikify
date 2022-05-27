// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wikify" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('wikify.makeWiki', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
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

// this method is called when your extension is deactivated
export function deactivate() {}
