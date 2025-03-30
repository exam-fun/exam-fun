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
    gasUsage: number;
    timestamp: number;
    additionalInfo: string;
}
