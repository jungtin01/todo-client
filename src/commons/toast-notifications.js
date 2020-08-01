/* 
    LABELS
*/
export const LABEL = {
    CREATE: {
        SUCCESS: generateToastConfig("create", true, "label"),
        FAIL: generateToastConfig("create", false, "label")
    },
    UPDATE: {
        SUCCESS: generateToastConfig("update", true, "label"),
        FAIL: generateToastConfig("update", false, "label")
    },
    DELETE: {
        SUCCESS: generateToastConfig("delete", true, "label"),
        FAIL: generateToastConfig("delete", false, "label")
    },
}

export const TODO = {
    CREATE: {
        SUCCESS: generateToastConfig("create", true, "todo"),
        FAIL: generateToastConfig("create", false, "todo")
    },
    UPDATE: {
        SUCCESS: generateToastConfig("update", true, "todo"),
        FAIL: generateToastConfig("update", false, "todo")
    },
    DELETE: {
        SUCCESS: generateToastConfig("delete", true, "todo"),
        FAIL: generateToastConfig("delete", false, "todo")
    },
}

export const TASK = {
    CREATE: {
        SUCCESS: generateToastConfig("create", true, "task"),
        FAIL: generateToastConfig("create", false, "task")
    },
    UPDATE: {
        SUCCESS: generateToastConfig("update", true, "task"),
        FAIL: generateToastConfig("update", false, "task")
    },
    DELETE: {
        SUCCESS: generateToastConfig("delete", true, "task"),
        FAIL: generateToastConfig("delete", false, "task")
    },
}



function generateToastConfig(action, success, tag) {
    var content;
    if(success) 
        content = `You've ${action.toLowerCase()} successfully new ${tag.toLowerCase()} !`
    else
        content = `Oops! Error: You can't ${action.toLowerCase()} label due to something !`

    return {
        heading: `${action.toUpperCase()} ${tag.toUpperCase()}`,
        content,
        success
    }
}