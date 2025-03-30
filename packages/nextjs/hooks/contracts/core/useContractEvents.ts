import { useScaffoldWatchContractEvent } from "~~/hooks/scaffold-eth"
import { JudgeState, judgeStateFromNumber } from "~~/types/contracts/oj"

export const useUserRegistered = (
    action: (
        userAddress: string | undefined,
        username: string | undefined,
        tokenTicker: string | undefined,
    ) => void,
) => {
    useScaffoldWatchContractEvent({
        contractName: "Core",
        eventName: "UserRegistered",
        onLogs: (logs) => {
            logs.map((log) => {
                const { userAddress, username, tokenTicker } = log.args;
                action(userAddress, username, tokenTicker)
            })
        }
    })
}

export const useSubmissionRequested = (
    action: (
        userAddress: string | undefined,
        problemAddress: string | undefined,
        answerAddress: string | undefined,
    ) => void,
) => {
    useScaffoldWatchContractEvent({
        contractName: "Core",
        eventName: "SubmissionRequested",
        onLogs: (logs) => {
            logs.map((log) => {
                const { userAddress, problemAddress, answerAddress } = log.args;
                action(userAddress, problemAddress, answerAddress)
            })
        }
    })
}

export const useSubmissionResult = (
    action: (
        userAddress: string | undefined,
        problemAddress: string | undefined,
        answerAddress: string | undefined,
        result: JudgeState,
        gasUsage: bigint | undefined,
    ) => void,
) => {
    useScaffoldWatchContractEvent({
        contractName: "Core",
        eventName: "SubmissionResult",
        onLogs: (logs) => {
            logs.map((log) => {
                const {
                    userAddress,
                    problemAddress,
                    answerAddress,
                    result,
                    gasUsage
                } = log.args;

                action(
                    userAddress,
                    problemAddress,
                    answerAddress,
                    judgeStateFromNumber(result),
                    gasUsage
                )
            })
        }
    })
}

