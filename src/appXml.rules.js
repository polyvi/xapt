/**
 * Created with JetBrains WebStorm.
 * User: luckystar
 * Date: 13-7-31
 * Time: 下午12:25
 * To change this template use File | Settings | File Templates.
 */

var _ = require('underscore'),
    check = require('validator').check;

module.exports = function (widget,zip) {
    check(widget, 'widget element is required!').notNull();
    check(widget.$.id, 'widget[id] is required!').notNull();
    check(widget.$.version, 'widget[version] is required!').notNull();

    check(widget.name, 'widget.name is required!').notNull();

    check(widget.icon, 'widget.icon is required!').notNull();
    var iconSrc=widget.icon[0].$.src;
    check(iconSrc, 'widget.icon[src] is required!').notNull();
    check(iconSrc, 'widget.icon[src] must be png!').is(/(.png)$/);

    if(!zip.getEntry(iconSrc)){
        console.log('warning: widget.icon[src]="'+iconSrc.red+'" maybe a bad reference!');
    }

    check(widget.content, 'widget.content is required!').notNull();
    check(widget.content[0].$.encoding, 'widget.content[encoding] must be UTF-8!').equals('UTF-8');
    var contentSrc = widget.content[0].$.src;
    check(contentSrc, 'widget.content[src] is required!').notNull();

    check(widget.preference, 'widget.preference is required!').notNull();
    var type;
    _.each(widget.preference, function (p) {
        var name = p.$.name,
            value = p.$.value;

        check(name, 'widget.preference[X][name] is required!').notNull();
        check(value, 'widget.preference[X][value] is required!').notNull();

        if (name === 'type') {
            type = value;
            check(value, 'type must be xapp or napp!').is(/^[x|n]app$/);
        }

        if (name === 'mode') {
            check(value, 'mode must be local or online!').is(/^(local|online)$/);
        }
    });
    if (type === 'xapp') {
        check(contentSrc, 'xapp widget.content[src] must be html!').is(/(.html)$/);
        if(!zip.getEntry(contentSrc)){
            console.log('warning: widget.content[src]="'+contentSrc.red+'" maybe a bad reference!');
        }
    } else {
//TODO something
    }
};