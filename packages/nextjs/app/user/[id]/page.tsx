"use client";

import { useState, use } from "react";
import { useUserInfo } from "~~/hooks/contracts/core";

export default function UserDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [buyAmount, setBuyAmount] = useState<string>("100");
  const [sellAmount, setSellAmount] = useState<string>("");

  const { data: userInfo, isPending, error } = useUserInfo({ userAddress: params.id });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user info:", error);
    return <div>Error: {error.name}</div>;
  }

  // Check if user is registered
  if (!userInfo || !userInfo.isRegistered) {
    return <div className="container mx-auto p-4">User not registered</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-row bg-black">
      {/* 左边内容 */}
      <div className="flex-[7]">
        {/* 顶部信息栏 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200">{/* 头像占位 */}</div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="border rounded px-10 py-1 text-xl">{userInfo?.username}</div>
                <div className="border rounded px-10 py-1 text-xl ">$ {userInfo?.tokenTicker}</div>
              </div>
              <div className="border rounded px-20 py-1 text-xl">{params.id}</div>
            </div>
          </div>
          <div className="text-right">
            <div>market cap</div>
            <div className="font-bold">$18M</div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex flex-col gap-10">
          {/* 代币情况 */}
          <div className="border rounded-lg p-3 flex flex-col bg-[#009828]" style={{ height: "600px" }}>
            <h2 className="text-2xl text-center text-black font-bold mb-4">代币情况</h2>
            <iframe
              height="100%"
              width="100%"
              id="geckoterminal-embed"
              title="GeckoTerminal Embed"
              src="https://www.geckoterminal.com/base/pools/0xd9edc75a3a797ec92ca370f19051babebfb2edee?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=price&resolution=15m"
              frameBorder="0"
              allow="clipboard-write"
              allowFullScreen
            ></iframe>
          </div>

          {/* 近期答题情况 */}
          <div className="border rounded-lg p-4 flex flex-col bg-[#009828]">
            <h2 className="text-2xl mb-6 font-bold text-center text-black">近期答题情况</h2>
            <div className="flex items-center text-2xl text-black justify-between">
              <div>题目</div>
              <div className="border rounded px-2 text-black bg-[#00ff40]">排名</div>
            </div>
          </div>
        </div>
      </div>
      {/* 右边内容 */}
      <div className="flex-[3] ml-5 ">
        {/* 买入卖出区域 */}
        <div className="mt-6 border bg-[#009828] rounded-lg p-4 w-full flex flex-col gap-4">
          {/* 买入部分 */}
          <div>
            <h3 className="text-2xl text-bold mb-4 text-black">买入</h3>
            <div className="space-y-4 text-[#009828]">
              <input
                type="text"
                value={buyAmount}
                onChange={e => setBuyAmount(e.target.value)}
                className="w-full border rounded-lg text-xl p-2"
              />
              <button className="w-full border text-[#009828] bg-black rounded-lg text-xl p-2">币种类</button>
              <button className="w-full bg-[#00ff40] text-black rounded-lg text-xl p-2">确认</button>
            </div>
          </div>

          {/* 卖出部分 */}
          <div>
            <h3 className="text-2xl text-bold mb-4 text-black">卖出</h3>
            <div className="space-y-4 text-[#009828]">
              <input
                type="text"
                value={sellAmount}
                onChange={e => setSellAmount(e.target.value)}
                className="w-full border rounded-lg text-xl p-2"
              />
              <button className="w-full border text-[#009828] bg-black rounded-lg text-xl p-2">币种类</button>
              <button className="w-full bg-[#00ff40] text-black border rounded-lg text-xl p-2">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
