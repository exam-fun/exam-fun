export interface Judge {
    JudgeState: JudgeState;
    gasUsed: bigint;
    otherInformation: string;
}

export enum JudgeState {
    NON_EXISTENT,
    ACCEPTED,
    WRONG_ANSWER,
    GAS_LIMIT_EXCEEDED,
    RUNTIME_ERROR
}

export function judgeStateFromNumber(num: number | undefined): JudgeState {
    if (!num) return JudgeState.NON_EXISTENT;

    const map = new Map<number, JudgeState>([
        [JudgeState.NON_EXISTENT, JudgeState.NON_EXISTENT],
        [JudgeState.ACCEPTED, JudgeState.ACCEPTED],
        [JudgeState.WRONG_ANSWER, JudgeState.WRONG_ANSWER],
        [JudgeState.GAS_LIMIT_EXCEEDED, JudgeState.GAS_LIMIT_EXCEEDED],
        [JudgeState.RUNTIME_ERROR, JudgeState.RUNTIME_ERROR],
    ]);
    return map.get(num) || JudgeState.NON_EXISTENT;
}
