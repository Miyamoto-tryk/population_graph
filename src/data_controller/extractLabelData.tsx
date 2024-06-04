//ラベル("総人口","老年人口"など)に該当するデータを抽出する関数

import {
  DisplayLabel,
  PrefectureInfo,
  GraphData,
  DisplayData,
  PoplData,
  addPoplData,
} from "@/types";

type Props = {
  display_label: DisplayLabel;
  graph_data: GraphData[];
};
export const extractLabelData: ({
  graph_data,
  display_label,
}: Props) => DisplayData[] = ({ graph_data, display_label }: Props) => {
  const initialdisplay_data: DisplayData[] = [{ year: 1960 }];
  for (let i: number = 1; i < 18; i++) {
    const adddata: DisplayData = { year: 1960 + i * 5 };
    initialdisplay_data.push(adddata);
  }

  if (graph_data != undefined) {
    //graph_dataから表示すべきデータを抽出
    const newPoplplDatas: PoplData[][] = Object.values(graph_data)
      .filter((elm: GraphData) => {
        console.log(elm); // elmの値を確認
        return elm.label === display_label; // 条件に一致する要素のみをフィルタリング
      })
      .map((elm: GraphData) => {
        console.log(elm.data); // elm.dataの値を確認
        return elm.data as PoplData[]; // フィルタリングされた要素から PoplData 配列を取得
      });
    //抽出したデータから新しいdisplay_dataを作成
    if (newPoplplDatas != undefined) {
      //表示すべきデータが存在する場合
      let newdisplay_data = initialdisplay_data;
      for (const elm of newPoplplDatas) {
        newdisplay_data = addPoplData(newdisplay_data, elm);
      }
      console.log(newdisplay_data);
      return newdisplay_data;
    } else {
      //表示すべきデータが存在しない場合
      return initialdisplay_data;
    }
  } else {
    //graph_dataが空の場合
    return initialdisplay_data;
  }
};
