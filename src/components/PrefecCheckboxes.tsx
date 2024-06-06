import React, { useState } from "react";
import { fetchCompos, fetchPrefec } from "../api/fetcher";
import { getGraphData } from "../data_controller/getGraphData";
import { getSelectedPrefec } from "../data_controller/getSelectedPrefec";
import { PrefectureInfo, Prefecture, GraphData, PrefecName } from "../types";
import { Dispatch, SetStateAction, FC, useEffect } from "react";

import styles from "../app/page.module.css";

type Props = {
  graphData: GraphData[];
  selectedPrefec: PrefecName[];
  setGraphData: Dispatch<SetStateAction<GraphData[]>>;
  setSelectedPrefec: Dispatch<SetStateAction<PrefecName[]>>;
};

//都道府県一覧を表示
export const PrefecCheckboxes: FC<Props> = ({
  graphData,
  selectedPrefec,
  setGraphData,
  setSelectedPrefec,
}: Props) => {
  //都道府県の選択情報
  const [prefecInfo, setPrefecInfo] = useState<PrefectureInfo[]>([]);
  //都道府県一覧を取得し、選択情報を初期化
  useEffect(() => {
    fetchPrefec().then((prefecData) => {
      const newPrefectures: PrefectureInfo[] = prefecData.map(
        (elm: Prefecture) => {
          //未選択で初期化
          return { prefecture: elm, isSelected: false };
        }
      );
      setPrefecInfo(newPrefectures);
    });
  }, []);

  const onCheckboxClicked = async (prefecCode: number) => {
    //都道府県のチェックボックスの情報を更新
    const updatedPrefecInfo: PrefectureInfo[] = prefecInfo.map(
      (elm: PrefectureInfo) => {
        if (elm.prefecture.prefCode == prefecCode) {
          return { prefecture: elm.prefecture, isSelected: !elm.isSelected };
        }

        return elm;
      }
    );

    //選択中の都道府県名を更新
    const updatedSelectedPrefec = getSelectedPrefec({
      prefecCode,
      prefecInfo,
      selectedPrefec,
    });

    //表示される可能性のあるグラフデータを更新
    const updatedGraphData = await getGraphData({
      prefecCode,
      prefecInfo,
      graphData,
    });

    setPrefecInfo(updatedPrefecInfo);
    setSelectedPrefec(updatedSelectedPrefec);
    setGraphData(updatedGraphData);
  };

  //都道府県情報が空である場合
  if (prefecInfo.length === 0) {
    return (
      <div>
        <h2>都道府県を取得中...</h2>
      </div>
    );
  }
  return (
    <>
      <div>
        <h2>都道府県一覧</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 100px)",
          }}
        >
          {prefecInfo.map((prefectureInfo: PrefectureInfo) => (
            //都道府県一覧とチェックボックスを生成
            <label key={prefectureInfo.prefecture.prefName}>
              <input
                type="checkbox"
                id={prefectureInfo.prefecture.prefName}
                checked={prefectureInfo.isSelected}
                onChange={() =>
                  onCheckboxClicked(prefectureInfo.prefecture.prefCode)
                }
              />
              <div style={{ paddingLeft: "4px", display: "inline" }}>
                {prefectureInfo.prefecture.prefName}
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
