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

type Props = {
  display_label: DisplayLabel;
  graph_data: GraphData[];
  display_data: DisplayData[];
  selected_prefec: PrefecName[];
  setDisplay_data: Dispatch<SetStateAction<DisplayData[]>>;
};

const DisplayGraph = ({
  display_label,
  graph_data,
  display_data,
  selected_prefec,
  setDisplay_data,
}: Props) => {
  //表示データの抽出・更新
  useEffect(() => {
    console.log(typeof graph_data);
    const newdisplay_data = extractLabelData({ graph_data, display_label });
    setDisplay_data(newdisplay_data);
  }, [graph_data, display_label]);

  if (!graph_data || graph_data.length === 0) {
    //グラフデータが空の場合
    return (
      <div>
        <h3>Please select prefectures</h3>
      </div>
    );
  }

  if (
    //表示データが揃っていない場合
    Object.keys(display_data[0]).length <= 1 ||
    selected_prefec.length === 0
  ) {
    return (
      <div>
        <h3>データ取得中</h3>
      </div>
    );
  }
  console.log(selected_prefec);
  //グラフの描画
  return (
    <>
      <div>
        <ResponsiveContainer width="80%" height={400}>
          <LineChart data={display_data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis dataKey={selected_prefec[0]} />
            {selected_prefec.map((prefec_name: PrefecName) => {
              //都道府県の色が記録されていない場合、追加
              if (!colorPrefecMap.has(prefec_name)) addPrefecColor(prefec_name);
              return (
                <Line
                  key={prefec_name}
                  type="monotone"
                  dataKey={prefec_name}
                  stroke={colorPrefecMap.get(prefec_name)}
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
