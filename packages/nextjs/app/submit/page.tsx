"use client";

import { useState } from "react";
import { useAllProblems, useRequestEvaluation } from "~~/hooks/contracts/core";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { ProblemInfo } from "~~/types/contracts/core";

// 定义测试结果类型
type TestResult = {
  status: "AC" | "WA" | "RE" | "GLE";
  message: string;
  testCase?: string;
};

export default function Submit() {
  const [selectedQuestion, setSelectedQuestion] = useState<bigint>(-1n);
  const [selectedProblem, setSelectedProblem] = useState<ProblemInfo | null>(null);
  const [answerAddr, setAnswerAddr] = useState("");
  const [showTestResult, setShowTestResult] = useState(false);
  // 模拟测试结果
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const { data: problems, isPending: problemsPending, error: problemsError } = useAllProblems();
  const { requestEvaluation } = useRequestEvaluation();

  // 模拟测试过程""""
  const runTests = async () => {
    // 这里应该是实际的测试逻辑
    if (!selectedProblem) {
      console.error("Problem not selected");
      return;
    }
    await requestEvaluation({
      problemIndex: selectedProblem?.index,
      answerAddress: answerAddr,
    })

    const mockResults: TestResult[] = [
      { status: "AC", message: "测试用例 1 通过", testCase: "输入: 1,2,3" },
      { status: "WA", message: "输出结果错误", testCase: "输入: 4,5,6" },
      { status: "RE", message: "运行时错误", testCase: "输入: 7,8,9" },
      { status: "GLE", message: "超出gas限制", testCase: "大数据测试" },
    ];
    setTestResults(mockResults);
    setShowTestResult(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runTests();
  };

  if (problemsPending) return <div>Loading...</div>;
  if (problemsError) return <div>Error: {problemsError.message}</div>

  // 获取状态对应的样式
  const getStatusStyle = (status: TestResult["status"]) => {
    switch (status) {
      case "AC":
        return "bg-black text-green-500 border-green-500";
      case "WA":
        return "bg-black text-red-500 border-red-500";
      case "RE":
        return "bg-black text-yellow-500 border-yellow-500";
      case "GLE":
        return "bg-black text-orange-500 border-orange-500";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* 左侧题目列表 */}
        <div className="w-1/3 bg-[#009828] rounded-lg p-6 shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-black">题目列表</h2>
          <div className="space-y-3">
            {
              problems?.map(problem => (
                <div
                  key={problem.problemAddress}
                  className={`flex items-center gap-2 p-3 text-black rounded-lg cursor-pointer hover:bg-green-500
                                    ${selectedProblem?.index === problem.index ? "bg-green-500" : ""}`}
                  onClick={() => setSelectedProblem(problem)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border text-black
                                    ${selectedProblem?.index === problem.index ? "bg-green-500 border-green-500" : "border-green-500"}`}
                  />
                  <span className="text-2xl">{problem.title}</span>
                </div>
              ))}
          </div>
        </div>

        {/* 右侧答题区域 */}
        <div className="flex-1 bg-[#009828] rounded-lg p-6 shadow-md">
          <div className="space-y-6">
            {/* 题目详情 */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-black">选择的题目的详情：</h2>
              <div className="min-h-[200px] text-xl p-4 bg-black text-grey rounded-lg">
                {selectedProblem?.title ? selectedProblem.title + "的详细内容" : "请选择一个题目"}
              </div>
            </div>

            {/* 回答区域 */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-black">回答区域：</h2>
              <textarea
                value={answerAddr}
                onChange={e => setAnswerAddr(e.target.value)}
                className="w-full min-h-[200px] text-xl p-4 border rounded-lg bg-black text-[#009829] focus:ring-[#009829] focus:border-[#009829]"
                placeholder="请在这里输入你的答案地址[提示：请前往REMIX IDE进行编写，部署之后将合约地址粘贴到此处]"
              />
            </div>

            {/* 确认按钮 */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-2xl bg-[#00ff40] text-black rounded-lg hover:bg-[#00ff40] transition duration-200"
              >
                确认答题
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 测试结果弹窗 */}
      {showTestResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#00ff40]">测试结果</h3>
              <button onClick={() => setShowTestResult(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getStatusStyle(result.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">
                      测试 #{index + 1} - {result.status}
                    </span>
                    <span className="px-2 py-1 rounded text-sm">{result.status}</span>
                  </div>
                  <p className="text-sm mb-2">{result.message}</p>
                  {result.testCase && <div className="text-sm bg-gray-50 p-2 rounded">{result.testCase}</div>}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setShowTestResult(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                关闭
              </button>
              <button onClick={runTests} className="px-4 py-2 text-black bg-[#009828] rounded-lg hover:bg-[#00ff40]">
                重新测试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
