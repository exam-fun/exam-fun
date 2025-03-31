"use client";

import { useState } from "react";
import Image from "next/image";

export default function Register() {
  const [username, setUsername] = useState("");
  const [tokenName, setTokenName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加注册逻辑
    console.log("注册信息：", { username, tokenName });
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-black">
      <div className="w-[400px] bg-green-500 rounded-2xl p-8 shadow-lg">
        {/* Logo区域 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-black">exam.fun</h1>
        </div>

        {/* 表单区域 */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-1">
          {/* 用户名输入框 */}
          <div>
            <label className="block text-xl font-medium text-[#00ff40] mb-2">用户名：</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-green-500 bg-black focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="请输入用户名"
            />
          </div>

          {/* 代币名称输入框 */}
          <div>
            <label className="block text-xl font-medium text-[#00ff40] mb-2">代币名称：</label>
            <input
              type="text"
              value={tokenName}
              onChange={e => setTokenName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-black text-green-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="请输入代币名称"
            />
          </div>

          {/* 确定按钮 */}
          <button
            type="submit"
            className="w-32 mx-auto block bg-[#00ff40] text-xl hover:bg-green-600 text-black font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            确定
          </button>
        </form>
      </div>
    </div>
  );
}
