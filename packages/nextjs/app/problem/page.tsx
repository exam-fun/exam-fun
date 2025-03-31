"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegisterProblem } from "~~/hooks/contracts/core";

export default function CreateQuestion() {
  const [formData, setFormData] = useState({
    title: "",
    contentUri: "",
    gasLimit: "",
    judgeAddress: "",
  });
  const router = useRouter();

  const { registerProblem } = useRegisterProblem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await registerProblem({
      problemType: 2,
      title: formData.title,
      contentUri: formData.contentUri,
      gasLimit: BigInt(formData.gasLimit),
      judgeAddress: formData.judgeAddress,
    });

    console.log("Transaction executed successfully");

    router.push(`/submit`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto bg-[#3A4039] rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#00ff40] mb-6">创建新题目</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 标题输入 */}
          <div>
            <label className="block text-base text-xl font-medium text-[#00ff40] mb-2">题目标题：</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-black text-[#00ff40] text-xl focus:ring-2 focus:ring-[#00ff40] focus:border-[#00ff40]"
              placeholder="请输入题目标题"
            />
          </div>

          {/* Content URI输入 */}
          <div>
            <label className="block text-base text-xl font-medium text-[#00ff40] mb-2">Content URI：</label>
            <input
              type="text"
              name="contentUri"
              value={formData.contentUri}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-black text-[#00ff40] text-xl focus:ring-2 focus:ring-[#00ff40] focus:border-[#00ff40]"
              placeholder="请输入Content URI"
            />
          </div>

          {/* Gas Limit输入 */}
          <div>
            <label className="block text-base text-xl font-medium text-[#00ff40] mb-2">Gas Limit：</label>
            <input
              type="number"
              name="gasLimit"
              value={formData.gasLimit}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-black text-[#00ff40] text-xl focus:ring-2 focus:ring-[#00ff40] focus:border-[#00ff40]"
              placeholder="请输入Gas Limit"
            />
          </div>

          {/* Judge Address输入 */}
          <div>
            <label className="block text-base text-xl font-medium text-[#00ff40] mb-2">Judge Address：</label>
            <input
              type="text"
              name="judgeAddress"
              value={formData.judgeAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-black text-[#00ff40] text-xl focus:ring-2 focus:ring-[#00ff40] focus:border-[#00ff40]"
              placeholder="请输入Judge Address"
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#00ff40] text-black text-xl rounded-lg hover:bg-[#00ff40]/80 transition duration-200"
            >
              创建题目
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
