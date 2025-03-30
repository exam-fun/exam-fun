import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { User } from "~~/types/contracts/core";

export const useSubmissionCount = () => {
    const { data } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getSubmissionCount",
    })
    return { data }
}

export const useUserInfo = ({
    userAddress
}: {
    userAddress: string;
}) => {
    const { data } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getUser",
        args: [userAddress]
    })
    return { data: data ? data as User : undefined }
}

export const useUserCount = () => {
    const { data } = useScaffoldReadContract({
        contractName: "Core",
        functionName: "getUserCount",
    })
    return { data }
}

