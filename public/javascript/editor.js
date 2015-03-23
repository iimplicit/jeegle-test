if ( typeof (editorApp) == typeof (undefined)) {
    editorApp = {};
}


editorApp = {
    data : {
    },

    init : function() {
        this.initCkeditor();
        this.addEventListener();
    },

    addEventListener : function() {
        this.setDragNResizable();
        this.setInlineEdiorDbclick();
    },

    setDragNResizable : function() {
        $('#main-content-text').draggable().resizable();
    },

    initCkeditor : function() {
        // This code is generally not necessary, but it is here to demonstrate
        // how to customize specific editor instances on the fly. This fits well
        // this demo because we have editable elements (like headers) that
        // require less features.

        // The "instanceCreated" event is fired for every editor instance created.
        CKEDITOR.on('instanceCreated', function( event ) {
            var editor = event.editor,
                element = editor.element;

            // Customize editors for headers and tag list.
            // These editors don't need features like smileys, templates, iframes etc.
            if ( element.is( 'h1', 'h2', 'h3' ) || element.getAttribute( 'id' ) == 'taglist' ) {
                // Customize the editor configurations on "configLoaded" event,
                // which is fired after the configuration file loading and
                // execution. This makes it possible to change the
                // configurations before the editor initialization takes place.
                editor.on( 'configLoaded', function() {

                    // Remove unnecessary plugins to make the editor simpler.
                    editor.config.removePlugins = 'colorbutton,find,flash,font,' +
                        'forms,iframe,image,newpage,removeformat,' +
                        'smiley,specialchar,stylescombo,templates';

                    // Rearrange the layout of the toolbar.
                    editor.config.toolbarGroups = [
                        { name: 'editing',		groups: [ 'basicstyles', 'links' ] },
                        { name: 'undo' },
                        { name: 'clipboard',	groups: [ 'selection', 'clipboard' ] },
                        { name: 'about' }
                    ];
                });
            }
        });
    },

    setInlineEdiorDbclick: function() {
        var self = this;
        $('[data-main-content-text]').dblclick(function() {
            // We need to turn off the automatic editor creation first.
            var targetId = 'main-content-text';
            self.editorInit(targetId);
        })
    },

    editorInit: function(targetId) {
        CKEDITOR.disableAutoInline = true;

        var activeEditor = 0;
        var activeEditorElement = 0;
        var activeId = '';

        // Is there already an editor active?
        if (activeEditor) {

            // Is the active editor the same
            // as the one being requested?
            if (activeEditor.element.getId() == activeId) {

                // Then our editor is already running
                // so there's nothing to do!
                return;
            }
            activeEditor.destroy();
        }

        // Find the element that we want to
        // attach the editor to
        if (! (activeEditorElement = document.getElementById(targetId))) {
            return;
        }

        // TODO - verify that the element is either a
        // div or a textarea which are the only two
        // element types supporting contenteditable=true

        // Make the element editable
        activeEditorElement.setAttribute('contenteditable', 'true');

        // Create a new inline editor for this div
        activeEditor = CKEDITOR.inline(targetId);

        // Set up a destruction function that will occur
        // when the user clicks out of the editable space
        activeEditor.on('blur', function() {
            this.element.setAttribute('contenteditable', 'false');
            activeId = '';
            activeEditor = 0;
            activeEditorElement = 0;
            this.destroy();
        });

        // Now set the focus to our editor so
        // that it will open up for business
        activeEditorElement.focus();
    }
}

$(document).ready(function() {
    editorApp.init();
})