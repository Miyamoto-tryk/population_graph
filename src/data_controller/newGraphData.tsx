//都道県の人口構成データを追加or削除する関数

import { fetchCompos } from "@/api/fetcher";
import {
  ComposeDatas,
  GraphData,
  PeoplAndYear,
  PoplData,
  PrefectureInfo,
} from "@/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  prefec_code: number;
  prefec_info: PrefectureInfo[];
  graph_data: GraphData[];
};
export const newGraphData = ({
  prefec_code,
  prefec_info,
  graph_data,
}: Props) => {
  //選択された都道府県のデータをフェッチ
  if (!prefec_info[prefec_code - 1].isSelected) {
    //新しく都道府県が選択された
    //人口構成を取得
    const newgraph_data = fetchCompos(prefec_code).then((compos_data) => {
      const addgraph_data: GraphData[] = compos_data.data.map(
        (elm: ComposeDatas) => {
          /* ComposeDatas{data: PoplAndYear[], label: DisplayLabel } */
          const newpopl_data: PoplData[] = elm.data.map(
            (data: PeoplAndYear) => {
              const prefName = prefec_info[prefec_code - 1].prefecture.prefName;
              return { ...data, PrefName: prefName };
            }
          );
          return {
            prefCode: prefec_code,
            label: elm.label,
            data: newpopl_data,
          };
        }
      );
      const new_graph_data: GraphData[] = [...graph_data, ...addgraph_data];
      return new_graph_data;
    });
    return newgraph_data;
  } else {
    //都道府県[prefCode:num]のチェックボックスが外れた

    //グラフデータから該当都道府県のものを削除
    const newgraph_data: GraphData[] = Object.values(graph_data).filter(
      (elm: GraphData) => elm.prefCode != prefec_code
    );
    return newgraph_data;
  }
};
