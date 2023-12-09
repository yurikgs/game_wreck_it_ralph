const { screenChangeEvent } = require("./common/events/screen-change.event");
const { setScreenChangeListener } = require("./common/utils/event-manager.util");
const { setModalManager } = require("./common/utils/modal-manager.util");
const { setViewManager } = require("./common/utils/view-manager.util");


const customizedEvents = [screenChangeEvent]
setViewManager()
setModalManager()
setScreenChangeListener()






