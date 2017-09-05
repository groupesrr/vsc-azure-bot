'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { HtmlView } from './html-view';

var html: HtmlView = HtmlView.getInstance();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "iot-hub-bot" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {

        var items:string[] = [];
        
        items.push('IoT Hub Bot');
        
        vscode.window.showQuickPick(items).then( selected => {
            switch (selected) {
            case 'IoT Hub Bot':
                html.createPreview('iot-hub-bot', "IoT Hub Bot", "code-helper-bot?s=ojvqESHqegc.cwA.hS0.ZWEaYONOGWVxP_lRkYjvw41FsBcQjutSNXNfjn0n9hU", 2);
                break;                
            }
        });
    });

    context.subscriptions.push(disposable);

    html.setExtensionPath(context.extensionPath);
    
}

// this method is called when your extension is deactivated
export function deactivate() {
}