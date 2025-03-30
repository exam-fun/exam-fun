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
        console.log("Executing registerUser");
        console.table({ username, tokenTicker, tokenAddress });

        await writeContractAsync({
            functionName: "registerUser",
            args: [username, tokenTicker, tokenAddress],
        });

        console.log("Transaction executed successfully");
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
        console.log("Executing requestEvaluation");
        console.table({ problemAddress, answerAddress });

        await writeContractAsync({
            functionName: "requestEvaluation",
            args: [problemAddress, answerAddress],
        });

        console.log("Transaction executed successfully");
    };

    return { requestEvaluation };
}