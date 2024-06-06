//ラベル("総人口","老年人口"など)に該当するデータを抽出する関数

import {
  DisplayLabel,
  PrefectureInfo,
  GraphData,
  DisplayData,
  PoplData,
  addPoplData,
} from "../types";

type Props = {
  displayLabel: DisplayLabel;
  graphData: GraphData[];
};
export const extractLabelData: ({
  graphData,
  displayLabel,
}: Props) => DisplayData[] = ({ graphData, displayLabel }: Props) => {
  const initialDisplayData: DisplayData[] = [{ year: 1960 }];
  for (let i: number = 1; i < 18; i++) {
    const added_data: DisplayData = { year: 1960 + i * 5 };
    initialDisplayData.push(added_data);
  }

  if (graphData != undefined) {
    //graphDataから表示すべきデータを抽出
    const newPoplplDatas: PoplData[][] = Object.values(graphData)
      .filter((elm: GraphData) => {
        console.log(elm); // elmの値を確認
        return elm.label === displayLabel; // 条件に一致する要素のみをフィルタリング
      })
      .map((elm: GraphData) => {
        console.log(elm.data); // elm.dataの値を確認
        return elm.data as PoplData[]; // フィルタリングされた要素から PoplData 配列を取得
      });
    //抽出したデータから新しいdisplay_dataを作成
    if (newPoplplDatas != undefined) {
      //表示すべきデータが存在する場合
      let newDisplayData = initialDisplayData;
      for (const elm of newPoplplDatas) {
        newDisplayData = addPoplData(newDisplayData, elm);
      }
      console.log(newDisplayData);
      return newDisplayData;
    } else {
      //表示すべきデータが存在しない場合
      return initialDisplayData;
    }
  } else {
    //graphDataが空の場合
    return initialDisplayData;
  }
};
