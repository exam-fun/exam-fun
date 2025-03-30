"use client";

import { useState } from "react";
import Image from "next/image";
import { useRegisterUser } from "~~/hooks/contracts/core";
import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [tokenName, setTokenName] = useState("");

  const router = useRouter();
  const { registerUser } = useRegisterUser();
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加注册逻辑

    try {
      await registerUser({
        username,
        tokenTicker: tokenName,
        tokenAddress: zeroAddress,  // Temporarily use zeroAddress
      });

      router.push(`/user/${address}`);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gray-50">
      <div className="w-[400px] bg-white rounded-2xl p-8 shadow-lg">
        {/* Logo区域 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">logo</h1>
        </div>

        {/* 表单区域 */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-1">
          {/* 用户名输入框 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">用户名：</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入用户名"
            />
          </div>

          {/* 代币名称输入框 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">代币名称：</label>
            <input
              type="text"
              value={tokenName}
              onChange={e => setTokenName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入代币名称"
            />
          </div>

          {/* 确定按钮 */}
          <button
            type="submit"
            className="w-32 mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            确定
          </button>
        </form>
      </div>
    </div>
  );
}
