import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { SubmissionRecord, User } from "~~/types/contracts/core";

export const useSubmissionCount = () => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getSubmissionCount",
    })
    return { data, isPending, error }
}

export const useUserInfo = ({
    userAddress
}: {
    userAddress: string;
}) => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getUser",
        args: [userAddress]
    })
    return { data: data ? data as User : undefined, isPending, error }
}

export const useUserCount = () => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getUserCount",
    })
    return { data, isPending, error }
}

export const useSubmission = ({
    submissionIndex
}: {
    submissionIndex: bigint;
}) => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getSubmission",
        args: [submissionIndex]
    })
    return { data: data ? data as SubmissionRecord : undefined, isPending, error }
}

export const useUserSubmissionIndices = ({
    userAddress
}: {
    userAddress: string;
}) => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getUserSubmissions",
        args: [userAddress]
    })
    return { data, isPending, error }
}

// New hooks for Problem functionality

export const useProblemCount = () => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getProblemCount",
    })
    return { data, isPending, error }
}

export const useProblem = ({
    problemIndex
}: {
    problemIndex: bigint;
}) => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getProblem",
        args: [problemIndex]
    })
    return { data, isPending, error }
}

export const useAllProblems = () => {
    const { data, isPending, error } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getAllProblems",
    })
    return { data, isPending, error }
}
