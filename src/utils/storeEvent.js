function Events() {}

Events.prototype.events = {}
Events.prototype.on = function (evt, callback) {
    if (!callback || !evt) return this
    this.events[evt] = this.events[evt] || []
    this.events[evt].push(callback)
    return this
}

Events.prototype.once = function (evt, callback) {
    let that = this
    let cb = function () {
        that.off(evt, cb)
        callback(arguments)
    }
    return this.on(evt, cb)
}

Events.prototype.off = function (evt, callback) {
    if (!evt) {
        return this
    }
    let events = this.events[evt]
    if (!callback) {
        delete this[evt]
    } else {
        for (let i = events.length; i--; ) {
            if (events[i] === callback) {
                events.splice(i, 1)
                return this
            }
        }
    }
}

Events.prototype.trigger = function (evt, ...arg) {
    let events = this.events[evt]
    if (!evt || !events) return this
    let len = events.length
    for (let i = 0; i < len; i++) {
        events[i](...arg)
    }
}

Events.prototype.emit = Events.prototype.trigger

Events.mixTo = function (receiver) {
    var proto = Events.prototype

    if (isFunction(receiver)) {
        for (var key in proto) {
            if (proto.hasOwnProperty(key)) {
                receiver.prototype[key] = proto[key]
            }
        }
    } else {
        for (var key in proto) {
            if (proto.hasOwnProperty(key)) {
                receiver[key] = proto[key]
            }
        }
    }
}

function isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]'
}
const events = Events

export default function (store) {
    // store.prototype = store.prototype || {}
    events.mixTo(store)
    store.registerModule('myEvents', {
        mutations: {
            setEvent() {}
        }
    })
    store.$emit = function (evt, ...arg) {
        if (!this.events[evt]) return
        this.trigger(evt, ...arg)
        this.commit('setEvent', evt)
    }
}
