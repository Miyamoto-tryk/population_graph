//都道県の人口構成データを追加or削除する関数

import { fetchCompos } from "../api/fetcher";
import {
  ComposeDatas,
  GraphData,
  PeoplAndYear,
  PoplData,
  PrefectureInfo,
} from "../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  prefecCode: number;
  prefecInfo: PrefectureInfo[];
  graphData: GraphData[];
};
export const getGraphData = ({ prefecCode, prefecInfo, graphData }: Props) => {
  //選択された都道府県のデータをフェッチ
  if (!prefecInfo[prefecCode - 1].isSelected) {
    //新しく都道府県が選択された
    //人口構成を取得
    const newGraphData = fetchCompos(prefecCode).then((composData) => {
      const addGraphData: GraphData[] = composData.data.map(
        (elm: ComposeDatas) => {
          /* ComposeDatas{data: PoplAndYear[], label: DisplayLabel } */
          const newPoplData: PoplData[] = elm.data.map((data: PeoplAndYear) => {
            const prefName = prefecInfo[prefecCode - 1].prefecture.prefName;
            return { ...data, PrefName: prefName };
          });
          return {
            prefCode: prefecCode,
            label: elm.label,
            data: newPoplData,
          };
        }
      );
      const newGraphData: GraphData[] = [...graphData, ...addGraphData];
      return newGraphData;
    });
    return newGraphData;
  } else {
    //都道府県[prefCode:num]のチェックボックスが外れた

    //グラフデータから該当都道府県のものを削除
    const newGraphData: GraphData[] = Object.values(graphData).filter(
      (elm: GraphData) => elm.prefCode != prefecCode
    );
    return newGraphData;
  }
};
