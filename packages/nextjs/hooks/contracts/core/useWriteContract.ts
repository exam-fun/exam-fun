import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const useRegisterUser = () => {
    const { writeContractAsync } = useScaffoldWriteContract({
        contractName: "Core",
    });

    const registerUser = async ({
        username,
        tokenTicker,
        tokenAddress,
    }: {
        username: string;
        tokenTicker: string;
        tokenAddress: `0x${string}`;
    }) => {
        await writeContractAsync({
            functionName: "registerUser",
            args: [username, tokenTicker, tokenAddress],
        });
    };

    return { registerUser };
}

export const useRequestEvaluation = () => {
    const { writeContractAsync } = useScaffoldWriteContract({
        contractName: "Core",
    });

    const requestEvaluation = async ({
        problemAddress,
        answerAddress,
    }: {
        problemAddress: `0x${string}`;
        answerAddress: `0x${string}`;
    }) => {
        await writeContractAsync({
            functionName: "requestEvaluation",
            args: [problemAddress, answerAddress],
        });
    };

    return { requestEvaluation };
}