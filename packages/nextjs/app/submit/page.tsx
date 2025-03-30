"use client";

import { useState } from "react";

// 定义测试结果类型
type TestResult = {
  status: "AC" | "WA" | "RE" | "GLE";
  message: string;
  testCase?: string;
};

export default function Submit() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showTestResult, setShowTestResult] = useState(false);
  // 模拟测试结果
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  // 模拟题目列表数据
  const questions = [
    { id: 1, title: "题目1" },
    { id: 2, title: "题目2" },
    { id: 3, title: "题目3" },
  ];

  // 模拟测试过程
  const runTests = async () => {
    // 这里应该是实际的测试逻辑
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

  // 获取状态对应的样式
  const getStatusStyle = (status: TestResult["status"]) => {
    switch (status) {
      case "AC":
        return "bg-green-100 text-green-800 border-green-200";
      case "WA":
        return "bg-red-100 text-red-800 border-red-200";
      case "RE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "GLE":
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* 左侧题目列表 */}
        <div className="w-1/3 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">题目列表</h2>
          <div className="space-y-3">
            {questions.map(question => (
              <div
                key={question.id}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-gray-100 
                                    ${selectedQuestion === question.title ? "bg-gray-100" : ""}`}
                onClick={() => setSelectedQuestion(question.title)}
              >
                <div
                  className={`w-4 h-4 rounded-full border 
                                    ${selectedQuestion === question.title ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
                />
                <span>{question.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧答题区域 */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
          <div className="space-y-6">
            {/* 题目详情 */}
            <div>
              <h2 className="text-xl font-bold mb-4">选择的题目的详情：</h2>
              <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg">
                {selectedQuestion ? selectedQuestion + "的详细内容" : "请选择一个题目"}
              </div>
            </div>

            {/* 回答区域 */}
            <div>
              <h2 className="text-xl font-bold mb-4">回答区域：</h2>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                className="w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请在这里输入你的答案..."
              />
            </div>

            {/* 确认按钮 */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">测试结果</h3>
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
              <button onClick={runTests} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                重新测试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
