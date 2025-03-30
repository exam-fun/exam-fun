"use client";

import { useState } from "react";

export default function UserDetail({ params }: { params: { id: string } }) {
  const [buyAmount, setBuyAmount] = useState<string>("100");
  const [sellAmount, setSellAmount] = useState<string>("");

  return (
    <div className="container mx-auto p-4 flex flex-row">
      {/* 左边内容 */}
      <div className="flex-[7]">
        {/* 顶部信息栏 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200">{/* 头像占位 */}</div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="border rounded px-10 py-1">{params.id}</div>
                <div className="border rounded px-10 py-1">代币名称</div>
              </div>
              <div className="border rounded px-20 py-1 ">链上地址</div>
            </div>
          </div>
          <div className="text-right">
            <div>market cap</div>
            <div className="font-bold">$18M</div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-3 gap-10">
          {/* 代币情况 */}
          <div className="col-span-2 border rounded-lg p-3 h-screen">
            <h2 className="text-xl mb-4">代币情况</h2>
            <div className="text-3xl font-bold flex justify-evenly items-center">我是K线</div>
          </div>

          {/* 近期答题情况 */}
          <div className="border rounded-lg p-4 h-screen">
            <h2 className="text-xl mb-6 font-bold text-center">近期答题情况</h2>
            <div className="flex items-center justify-between">
              <div>题目</div>
              <div className="border rounded px-2">排名</div>
            </div>
          </div>
        </div>
      </div>
      {/* 右边内容 */}
      <div className="flex-[3] ml-5">
        {/* 买入卖出区域 */}
        <div className="mt-6 border rounded-lg p-4 w-full flex flex-col gap-4">
          {/* 买入部分 */}
          <div>
            <h3 className="text-xl mb-4">买入</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={buyAmount}
                onChange={e => setBuyAmount(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <button className="w-full border rounded-lg p-2">币种类</button>
              <button className="w-full bg-blue-500 text-white rounded-lg p-2">确认</button>
            </div>
          </div>

          {/* 卖出部分 */}
          <div>
            <h3 className="text-xl mb-4">卖出</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={sellAmount}
                onChange={e => setSellAmount(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <button className="w-full border rounded-lg p-2">币种类</button>
              <button className="w-full bg-blue-500 text-white border rounded-lg p-2">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
