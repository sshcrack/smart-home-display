class Utils {
    static randomRange(min: number, max: number) {
        return Math.random() * (max - min) + min
    }

    static mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number, clamp: boolean) {
        if (Math.abs(inputMin - inputMax) < Number.EPSILON)
            return outputMin

        let outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
        if (!clamp)
            return outVal;

        if (outputMax < outputMin) {
            if (outVal < outputMax) outVal = outputMax;
            else if (outVal > outputMin) outVal = outputMin;
        } else {
            if (outVal > outputMax) outVal = outputMax;
            else if (outVal < outputMin) outVal = outputMin;
        }

        return outVal
    }
}