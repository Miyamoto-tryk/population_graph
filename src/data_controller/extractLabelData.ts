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
  //"year"プロパティのみを持つDisplayDataを作成
  const initialDisplayData: DisplayData[] = [{ year: 1960 }];
  for (let i: number = 1; i < 18; i++) {
    const added_data: DisplayData = { year: 1960 + i * 5 };
    initialDisplayData.push(added_data);
  }

  if (graphData.length !== 0) {
    //graphDataから表示すべきデータを抽出
    const newPoplplDatas: PoplData[][] = Object.values(graphData)
      .filter(
        (elm: GraphData) => elm.label === displayLabel // 条件に一致する要素のみをフィルタリング
      )
      .map(
        (elm: GraphData) => elm.data // フィルタリングされた要素から PoplData 配列を取得
      );
    //抽出したデータから新しいdisplayDataを作成
    if (newPoplplDatas.length !== 0) {
      //表示すべきデータが存在する場合
      let newDisplayData = initialDisplayData;
      //一つずつ追加
      for (const elm of newPoplplDatas) {
        newDisplayData = addPoplData(newDisplayData, elm);
      }
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
