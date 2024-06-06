import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  DisplayData,
  DisplayLabel,
  PrefecName,
  PrefectureInfo,
} from "../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GraphData } from "../types";
import { ResponsiveContainer } from "recharts";
import { extractLabelData } from "../data_controller/extractLabelData";
import {
  addPrefecColor,
  colorPrefecMap,
} from "../data_controller/colorPrefecMap";
import styles from "@/app/page.module.css";
type Props = {
  displayLabel: DisplayLabel;
  graphData: GraphData[];
  displayData: DisplayData[];
  selectedPrefec: PrefecName[];
  setDisplayData: Dispatch<SetStateAction<DisplayData[]>>;
};

const DisplayGraph = ({
  displayLabel,
  graphData,
  displayData,
  selectedPrefec,
  setDisplayData,
}: Props) => {
  //表示データの抽出・更新
  useEffect(() => {
    console.log(typeof graphData);
    const newDisplayData = extractLabelData({ graphData, displayLabel });
    setDisplayData(newDisplayData);
  }, [graphData, displayLabel]);

  if (graphData.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          height: 400,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Please select prefectures</h3>
      </div>
    );
  }

  //表示データが揃っていない場合
  if (Object.keys(displayData[0]).length <= 1 || selectedPrefec.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          height: 400,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>データ取得中</h3>
      </div>
    );
  }
  console.log(selectedPrefec);
  //グラフの描画
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            {selectedPrefec.map((prefecName: PrefecName) => {
              //都道府県の色が記録されていない場合、追加
              if (!colorPrefecMap.has(prefecName)) addPrefecColor(prefecName);
              return (
                <Line
                  key={prefecName}
                  type="monotone"
                  dataKey={prefecName}
                  stroke={colorPrefecMap.get(prefecName)}
                />
              );
            })}
            <Legend />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DisplayGraph;
