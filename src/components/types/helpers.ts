const callbackCondition = (param: number, isBigger: boolean, hoursEnd: number, endMin: number): boolean => {
    if(isBigger)
        return true;
    return endMin === 0 ? param <= (hoursEnd) : param <= hoursEnd;
}

export {callbackCondition}