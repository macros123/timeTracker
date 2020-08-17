const callbackCondition = (param: number, isBigger: boolean, hoursEnd: number): boolean => {
    if(isBigger)
        return true;
    return param < hoursEnd;
}

export {callbackCondition}