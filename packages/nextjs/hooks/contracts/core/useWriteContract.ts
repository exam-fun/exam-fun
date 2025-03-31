import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const useRegisterUser = () => {
    const { writeContractAsync, data, isPending, error } = useScaffoldWriteContract({
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

    return { registerUser, data, isPending, error };
}

export const useRequestEvaluation = () => {
    const { writeContractAsync, data, isPending, error } = useScaffoldWriteContract({
        contractName: "Core",
    });

    const requestEvaluation = async ({
        problemIndex,
        answerAddress,
    }: {
        problemIndex: bigint;
        answerAddress: `0x${string}`;
    }) => {
        console.log("Executing requestEvaluation");
        console.table({ problemIndex, answerAddress });

        await writeContractAsync({
            functionName: "requestEvaluation",
            args: [problemIndex, answerAddress],
        });

        console.log("Transaction executed successfully");
    };

    return { requestEvaluation, data, isPending, error };
}

export const useRegisterProblem = () => {
    const { writeContractAsync, data, isPending, error } = useScaffoldWriteContract({
        contractName: "Core",
    });

    const registerProblem = async ({
        problemType,
        title,
        contentUri,
        gasLimit,
        judgeAddress,
    }: {
        problemType: number;
        title: string;
        contentUri: string;
        gasLimit: bigint;
        judgeAddress: string;
    }) => {
        console.log("Executing registerProblem");
        console.table({ problemType, title, contentUri, gasLimit, judgeAddress });

        await writeContractAsync({
            functionName: "registerProblem",
            args: [problemType, title, contentUri, gasLimit, judgeAddress],
        });

        console.log("Transaction executed successfully");
    };

    return { registerProblem, data, isPending, error };
}