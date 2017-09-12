'use strict';

import * as vscode from 'vscode';

var fs = require('fs');
var Convert = require('ansi-to-html');
var convert = new Convert();


export class HtmlView implements vscode.TextDocumentContentProvider {

    /**
     * Get static instance of HtmlView object
     */
    public static getInstance() : HtmlView {
        return provider;
    }

    /**
     * Provide document for specific URI. This function is used by VSCode
     * @param uri 
     * @param token 
     */
    public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken) : vscode.ProviderResult<string> {

        var uriString: string = uri.toString();

        var xuri = "https://webchat.botframework.com/embed/code-helper-bot?s=ojvqESHqegc.cwA.hS0.ZWEaYONOGWVxP_lRkYjvw41FsBcQjutSNXNfjn0n9hU";
        // TODO: detect failure to load page (e.g. google.com) and display error to user.
        if (!uriString.startsWith('xxx://internal')) {


            //return "<iframe src=\"https://webchat.botframework.com/embed/code-helper-bot?s=ojvqESHqegc.cwA.hS0.ZWEaYONOGWVxP_lRkYjvw41FsBcQjutSNXNfjn0n9hU\" frameBorder=\"0\" width=\"1024\" height=\"1024\"/>";
            return null;
        } else {
            return this.m_InternalPages[uriString];
        }
    };

    /**
     * Used by VSCode
     */
	public onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();

	get onDidChange(): vscode.Event<vscode.Uri> { return this.onDidChangeEmitter.event; }

    /**
     * View HTML document
     * @param uri 
     * @param html 
     * @param title 
     * @param panel 
     */
    public preview(uri: string, html: string, title: string, panel: number, refreshOnly: boolean) {
        this.m_InternalPages[uri] = html; 

        var x = vscode.workspace.textDocuments;

        for (var d of x) {
            if (d.uri.toString() == uri) {
                console.log('FOUND');
                this.onDidChangeEmitter.fire(vscode.Uri.parse(uri));
                return; 
            }
        }

        // document not visible, so don't display it, user requested just refresh
        if (refreshOnly)
            return;

        // only call preview if document really changed
        vscode.commands.executeCommand('vscode.previewHtml', uri, panel, title);
    }

    /**
     * Setting current extension path.
     * It's used to load CSS, JS, and other relevant files.
     * @param path 
     */
    public setExtensionPath(path: string) {
        this.m_ExtensionPath = path;
    }

    /**
     * View text document as HTML
     * @param type 
     * @param text 
     * @param title 
     * @param panel 
     */
    public createPreview(type: string, title: string, param: string, panel: number = 1) {

        this.documentStart(title, type, true);

        this.write("<iframe id='chat' src=\"" + this.m_ExtensionPath + "/html/index.html?" + param + "\" frameBorder=\"0\" />");

        this.documentEnd();

        this.preview('xxx://internal/' + type, this.m_CurrentDocument, title, panel, false);
    }

    /**
     * View AdaptiveCard as HTML
     * @param type 
     * @param title 
     * @param action
     * @param panel 
     */
    public createAdaptiveCardPreview(type: string, title: string, action: object, panel: number = 1) {

        var script = fs.readFileSync(this.m_ExtensionPath + "/html/botchat.js", "utf8");
        var css1 = fs.readFileSync(this.m_ExtensionPath + "/html/botchat.css", "utf8");
        var css2 = fs.readFileSync(this.m_ExtensionPath + "/html/botchat-fullwindow.css", "utf8");
        
        var start = fs.readFileSync(this.m_ExtensionPath + "/html/single-start.html", "utf8");
        var end = fs.readFileSync(this.m_ExtensionPath + "/html/single-end.html", "utf8");
        
        

        this.m_CurrentDocument = start + "<script>" + script + "\r\n\r\n var ACTIVITY = " + JSON.stringify(action) + "; </script>" + end;
        
        //this.write("<iframe id='chat' src=\"" + this.m_ExtensionPath + "/html/single.html\" frameBorder=\"0\" />");


        //var link = encodeURI('command:extension.htmlCardEvent?' + JSON.stringify(['xdocumentx', 'xelementx', 'xeventx', 'xparamx']));
        //this.m_GlobalLinks += "<a href='" + link + "' id='event_handler_a' ></a>";
        
        //this.documentEnd();

        fs.writeFileSync(this.m_ExtensionPath + "/html/updated.html", this.m_CurrentDocument);

        this.preview('xxx://internal/' + type, this.m_CurrentDocument, title, panel, false);
    }
        

    /**
     * Start HTML Document
     * @param title 
     * @param type 
     */
    private documentStart(title: string, type: string, scroll: boolean) {
        this.m_GlobalLinks = '';
        this.m_CurrentDocument = '';
        var css = fs.readFileSync(this.m_ExtensionPath + '/html-lite.css')
        var script = "var documentId='" + type + "'\r\n" + fs.readFileSync(this.m_ExtensionPath + '/html-lite-script.js')

        this.write('<!DOCTYPE "html">');
        this.write("<html>");
        this.write("<head>");
        this.write("<title>" + title + "</title>");
        this.write("</head>");
        this.write('<style type="text/css">' + css + '</style>');
        this.write('<script>' + script + '</script>');
        this.write("<body id='xbodyx' onload='onPageLoaded();' onresize='onPageResize();' onfocusin='onDocumentGotFocus(event)' onfocusout='onDocumentLostFocus(event)'" + (scroll ? "" : " style='overflow:hidden'") + "><div id='muka'></div>");

//        var link = encodeURI('command:extension.htmlCardEvent?' + JSON.stringify(['xdocumentx', 'xelementx', 'xeventx', 'xparamx'])); 

//        this.m_GlobalLinks += "<a href='" + link + "' id='event_handler_a' ></a>";
    }

    /**
     * Finalise HTML document
     */
    private documentEnd() {
        this.write(this.m_GlobalLinks);

        this.write("</body>");
        this.write("</html>");
    }

    
    private write(s: string) {
        this.m_CurrentDocument += s;
    }

    /**
     * Handle event from the view.
     * 
     * @param tab 
     * @param element 
     * @param eventType 
     * @param eventParam 
     */
    public handleEvent(tab: string, element: string, eventType: string, eventParam: string) {
        console.log("Event: " + tab + " " + element + " " + eventType + " " + eventParam);

        if (eventType == 'DoubleClick') {
            this.executeCommand(tab, element, 'onDefault');
            this.executeCommand(tab, element, 'onAltSelect');
        } else if (eventType == 'RightClick') {
            this.executeCommand(tab, element, 'onOptions');
            this.executeCommand(tab, element, 'onSelect');
        } else if (eventType == 'KeyDown') {
            if (eventParam == 'Delete') {
                this.executeCommand(tab, element, 'onDelete');
            } else if (eventParam == 'Escape') {
                this.executeCommand(tab, element, 'onBack');
            }
        }
    }

    /**
     * Execute command
     * 
     * @param tab 
     * @param element 
     * @param type 
     */
    private executeCommand(tab: string, element: string, type: string) {
        // get panel id and element index from element
        var panel: number = 0;
        var idx: number = 0;

        var temp: string[] = element.split('_');
        panel = Number(temp[1]);
        idx = Number(temp[2]);

        // get OnDoubleClick
            // XXX - this should be made obsolete and removed
        // check if we have onAltSelect pattern
        var handler: any[] = undefined;
        if (this.m_PanelData[tab + '_' + panel].hasOwnProperty(type)) {
            handler = this.m_PanelData[tab + '_' + panel][type];
        }
        if (handler) {
            var command = handler[0];
            var params = [ command.split(':')[1] ];

            for (var x: number = 1; x < handler.length; x++) {
                if (handler[x][0] == '$') {
                    // XXX try to get value
                    var field: string = handler[x].substring(1);
                    var value: string = this.m_PanelData[tab + '_' + panel]['rows'][idx][field];

                    params.push(value);
                } else {
                    params.push(handler[x]);
                }
            }
            // XXX - execute command
            console.log('COMMAND: ' + params.toString());
            vscode.commands.executeCommand.apply(vscode.commands, params);
        }
    }


    // global variables -- not all of them should be global
    private m_InternalPages : {} = {};
    private m_CurrentDocument = '';
    private m_GlobalLinks = '';
    private m_ExtensionPath = '';
    private tabIndex = 1;
    private m_NextBtn: number = 0;
    private m_PanelData: object[] = [];

}

var provider = new HtmlView();
// Handle http:// and https://.
var registrationXxx = vscode.workspace.registerTextDocumentContentProvider('xxx', provider);

