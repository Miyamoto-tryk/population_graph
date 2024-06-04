//グラフに表示する都道府県ごとの色を管理する

import { PrefecName } from "@/types";

export const colorPrefecMap = new Map<PrefecName, string>(); // 都道府県ごとの色を管理するオブジェクト

export const getRandomColor = () => {
  // ランダムな色の生成
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const addPrefecColor = (prefecName: PrefecName) => {
  // 都道府県がすでに存在する場合は色を割り当てず、新しい色を生成して追加
  if (!colorPrefecMap.has(prefecName)) {
    colorPrefecMap.set(prefecName, getRandomColor());
  }
};
