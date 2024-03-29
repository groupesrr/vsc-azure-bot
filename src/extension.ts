'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { HtmlView } from './html-view';

import { Docker } from './docker';

var html: HtmlView = HtmlView.getInstance();
var docker: Docker = new Docker(vscode.workspace.rootPath, logHandler, closeHandler);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "iot-hub-bot" is now active!');

    {
      let disposable = vscode.commands.registerCommand('extension.htmlCardEvent', (...p:any[]) => {
        // parameters:
        //  1) document
        //  2) element id
        //  3) event type
        //  4) event param
        html.handleEvent(p[0]);
      });
    }

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {

        var items:string[] = [];
        
        items.push('IoT Hub Bot');
        items.push('Azure CLI - Docker');
        
        vscode.window.showQuickPick(items).then( selected => {
            switch (selected) {
            case 'IoT Hub Bot':
                html.createPreview('iot-hub-bot', "IoT Hub Bot", "s=ojvqESHqegc.cwA.hS0.ZWEaYONOGWVxP_lRkYjvw41FsBcQjutSNXNfjn0n9hU", 2);
                break;                
            case 'Azure CLI - Docker':
                // XXX - this must run in a different way
                // XXX - docker shall be started here, and createPreview from inside
                // XXX - but for now, let's just display message

                var activity =
                
                  {
                    type: "message",
                    "attachments":
                    [
                      {
                        "contentType": "application/vnd.microsoft.card.adaptive",
                        "content": {
                          "type": "AdaptiveCard",
                          "body": [
                            {
                              "type": "Container",
                              "items": [
                                {
                                  "type": "TextBlock",
                                  "text": "az",
                                  "weight": "bolder",
                                  "size": "medium"
                                }
                              ]
                            },
                            {
                              "type": "ColumnSet",
                              "separation": "string",
                              "columns": [
                                {
                                  "type": "Column",
                                  "size": 1,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "color": "accent",
                                      "textweight": "bolder",
                                      "text": "account"
                                    }
                                  ],
                                  "selectAction": {
                                    "type": "Action.Submit",
                                    "data": {
                                      "action": "menu",
                                      "param": "az account"
                                    }
                                  }
                                },
                                {
                                  "type": "Column",
                                  "size": 2,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "horizontalAlignment": "left",
                                      "text": "Manage subscriptions.",
                                      "isSubtle": true
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "ColumnSet",
                              "separation": "none",
                              "columns": [
                                {
                                  "type": "Column",
                                  "size": 1,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "color": "accent",
                                      "textweight": "bolder",
                                      "text": "acr"
                                    }
                                  ],
                                  "selectAction": {
                                    "type": "Action.Submit",
                                    "data": {
                                      "action": "menu",
                                      "param": "az acr"
                                    }
                                  }
                                },
                                {
                                  "type": "Column",
                                  "size": 2,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "horizontalAlignment": "left",
                                      "text": "Manage Azure Container Registries.",
                                      "isSubtle": true
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "ColumnSet",
                              "separation": "none",
                              "columns": [
                                {
                                  "type": "Column",
                                  "size": 1,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "color": "accent",
                                      "textweight": "bolder",
                                      "text": "acs"
                                    }
                                  ],
                                  "selectAction": {
                                    "type": "Action.Submit",
                                    "data": {
                                      "action": "menu",
                                      "param": "az acs"
                                    }
                                  }
                                },
                                {
                                  "type": "Column",
                                  "size": 2,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "horizontalAlignment": "left",
                                      "text": "Manage Azure Container Services.",
                                      "isSubtle": true
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "ColumnSet",
                              "separation": "none",
                              "columns": [
                                {
                                  "type": "Column",
                                  "size": 1,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "color": "accent",
                                      "textweight": "bolder",
                                      "text": "ad"
                                    }
                                  ],
                                  "selectAction": {
                                    "type": "Action.Submit",
                                    "data": {
                                      "action": "menu",
                                      "param": "az ad"
                                    }
                                  }
                                },
                                {
                                  "type": "Column",
                                  "size": 2,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "horizontalAlignment": "left",
                                      "text": "Synchronize on-premises directories and manage Azure Active Directory",
                                      "isSubtle": true
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "type": "ColumnSet",
                              "separation": "none",
                              "columns": [
                                {
                                  "type": "Column",
                                  "size": 1,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "color": "accent",
                                      "textweight": "bolder",
                                      "text": "appservice"
                                    }
                                  ],
                                  "selectAction": {
                                    "type": "Action.Submit",
                                    "data": {
                                      "action": "menu",
                                      "param": "az appservice"
                                    }
                                  }
                                },
                                {
                                  "type": "Column",
                                  "size": 2,
                                  "items": [
                                    {
                                      "type": "TextBlock",
                                      "size": "medium",
                                      "horizontalAlignment": "left",
                                      "text": "Manage your App Service plans.",
                                      "isSubtle": true
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
              
                };

                //html.createAdaptiveCardPreview("azure-cli", "Azure CLI", activity, 1, function(r) {
                //  vscode.window.showInformationMessage(JSON.stringify(r));
                //}) 


                startContainerFromTerminal("dockiot/azure-bot-dev", true, function(result) {

                  terminal.sendText("azure --help");
                });
                  
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

var collect: string = "";

function logHandler(data: string) {
  collect += data;

  var parts: string[] = collect.split('\n');

  for (var part of parts) {
    try {
      var activity: any = JSON.parse(part);

      html.createAdaptiveCardPreview("azure-cli", "Azure CLI", activity.data, 1, function(r) {
        //vscode.window.showInformationMessage(JSON.stringify(r));
        terminal.sendText(JSON.stringify(r), true);
        
      });
      
      collect = "";
      return;
        
    } catch (e) {}
  }
}

function closeHandler(id: string) {
  // remove terminal - in original version of docker
}

var terminal = null;

function startContainerFromTerminal(id: string, view: boolean, cb) {
  var name = "azure-cli-bot";

  //if (g_Terminals.hasOwnProperty(name)) {
  //    // just show the terminal if it was already created for this container
  //    if (view) g_Terminals[name].show();
  //} else {

      //var cc :any = g_Config[id];
      //var params: string = cc.config.run;

      var params: string =  "-i -t --rm --name $default-name -v $workspace:$src " + id + " node /bot/server-local.js";

      // create a new terminal and show it
      terminal  = vscode.window.createTerminal(name);
      //terminal.show();

      // check if we already have this process isRunning

      docker.ps(false, function(result) {
          var exists: boolean = false;

          if (result) {
              for (var i = 0; i < result.rows.length; i++) {
                  if (result.rows[i].names == name) {
                      exists = true;
                  }
              }
          }

          if (exists) {
              terminal.sendText('docker attach ' + name, true);
              setTimeout(function() {
                docker.attach(name, false, function(result) {
                    cb();
                });
            }, 3000)
        } else {
              var src = '/src';

              //if (g_Config[id].config.src) {
              //    src = g_Config[id].config.src;
              //}

              params = params.replace('$default-name', name);
              params = params.replace('$workspace', vscode.workspace.rootPath);
              params = params.replace('$src', src);


              terminal.sendText('docker run ' + params, true);

              setTimeout(function() {
                  docker.attach(name, false, function(result) {
                      cb();
                  });
              }, 3000)
          }
      });
  //}

}

