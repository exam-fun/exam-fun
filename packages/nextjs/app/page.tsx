"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  // 模拟代币数据
  const tokens = [
    {
      id: "1",
      name: "Token1",
      address: connectedAddress,
      price: "¥0.0001",
      marketCap: "¥3.16m",
      volume: "$105k",
      change: "-4.34%",
    },
    {
      id: "2",
      name: "Token2",
      address: connectedAddress,
      price: "¥0.0002",
      marketCap: "¥6.32m",
      volume: "$105k",
      change: "-4.34%",
    },
    {
      id: "3",
      name: "Token3",
      address: connectedAddress,
      price: "¥0.0003",
      marketCap: "¥9.48m",
      volume: "$105k",
      change: "-4.34%",
    },
    // ... 其他代币数据
  ];

  return (
    <div className="min-h-screen bg-black ">
      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-6">
        {/* 主要内容布局 */}
        <div className="flex gap-6">
          {/* 左侧代币列表 */}
          <div className="flex-[7] bg-[#6B6B6B] rounded-lg border">
            <div className="flex items-center justify-end gap-2 p-2 border-b">
              <span className="px-4 py-1 border rounded bg-[#00ff40] text-xl text-black">价格</span>
              <span className="px-4 py-1 border rounded bg-[#00ff40] text-xl text-black">市值</span>
              <span className="px-2 py-1 border rounded bg-[#00ff40] text-xl text-black">交易量</span>
              <span className="px-1 py-1 border rounded bg-[#00ff40] text-xl text-black">涨跌24h</span>
            </div>
            {tokens.map(token => (
              <div
                key={token.id}
                className="flex items-center gap-4 p-4 border-b hover:bg-gray-500"
                onClick={() => {
                  router.push(`/user/${token.address}`);
                }}>
                <div className="w-12 h-12 rounded-full bg-gray-200" /> {/* 头像 */}
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="px-6 py-1 border rounded text-white">ID: {token.id}</span>
                    <span className="px-6 py-1 border rounded text-white">{token.name}</span>
                  </div>
                  <div className="px-5 py-1 border rounded text-sm text-white">{token.address}</div>
                </div>
                <div className="flex gap-6 items-center">
                  <span className="text-white">{token.price}</span>
                  <span className="text-white">{token.marketCap}</span>
                  <span className="text-white">{token.volume}</span>
                  <span className="text-white">{token.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 右侧排名区域 */}
          <div className="flex-[3] border bg-[#6B6B6B] rounded-lg p-4">
            <ul className="space-y-4">
              {[1, 2].map(rank => (
                <li key={rank} className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border bg-[#00ff40] text-black rounded-lg ">
                    {rank}
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="flex flex-col gap-2">
                      <span className="px-1 py-1 border rounded text-sm text-white">ID</span>
                      <span className="px-1 py-1 border rounded text-sm text-white">地址</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="px-1 py-1 justify-start text-red-700 text-bold text-3xl">100</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
