import { JudgeState } from "./oj";

export interface User {
    username: string;
    tokenTicker: string;
    walletAddress: string;
    tokenAddress: string;
    isRegistered: boolean;
}

export interface SubmissionRecord {
    problemAddress: string;
    answerAddress: string;
    submitter: string;
    result: JudgeState;
    gasUsage: bigint;
    timestamp: bigint;
    additionalInfo: string;
}

export interface ProblemInfo {
    problemAddress: string;
    problemType: number;
    title: string;
    contentUri: string;
    gasLimit: bigint;
    judgeAddress: string;
}
