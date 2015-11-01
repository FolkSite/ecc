ecc.window.Default = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: '',
        url: ecc.config.connector_url,
        cls: 'modx-window ' +  config.cls,
        width: 600,
        autoHeight: true,
        allowDrop: false,
        record: {},
        baseParams: {},
        fields: this.getFields(config),
        keys: this.getKeys(config),
        buttons: this.getButtons(config)
    });
    ecc.window.Default.superclass.constructor.call(this, config);

    this.on('hide', function() {
        var w = this;
        window.setTimeout(function() {
            w.close();
        }, 200);
    });
};
Ext.extend(ecc.window.Default, MODx.Window, {

    getFields: function(config) {
        return [];
    },

    getButtons: function(config) {
        return [{
            text: config.cancelBtnText || _('cancel'),
            scope: this,
            handler: function() {
                config.closeAction !== 'close'
                    ? this.hide()
                    : this.close();
            }
        }, {
            text: config.saveBtnText || _('save'),
            cls: 'primary-button',
            scope: this,
            handler: this.submit,
        }];
    },

    getKeys: function(config) {
        return [{
            key: Ext.EventObject.ENTER,
            fn: function(keyCode, event) {
                var elem = event.getTarget();
                var component = Ext.getCmp(elem.id);
                if (component instanceof Ext.form.TextArea) {
                    return component.append("\n");
                }
                else {
                    this.submit();
                }
            }, scope: this
        }];
    },

    loadDropZones: function() {
    }

});
Ext.reg('ecc-window-default', ecc.window.Default);