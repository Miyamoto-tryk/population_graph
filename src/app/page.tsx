"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { fetchCompos, fetchPrefec } from "@/api/fetcher";
import { SetStateAction, useEffect, useState } from "react";
import {
  DisplayData,
  DisplayLabel,
  GraphData,
  PrefecName,
  PrefectureInfo,
} from "@/types";
import { PrefecCheckboxes } from "@/components/PrefecCheckboxes";
import DisplayGraph from "@/components/DisplayGraph";
import SetLabelButton from "@/components/SetLabelButton";

export default function Home() {
  //表示される可能性のあるグラフデータ("総人口"、"幼年人口"など全て含む)(選択中の都道府県の人口データだけを持つ)
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  //選択されている都道府県名の配列。グラフ表示する際に、選択中の都道府県のみでmapで展開するために必要
  const [selectedPrefec, setSelectedPrefec] = useState<PrefecName[]>([]);
  //表示すべきデータの種類(display_abelで指定された人口データのみを含む
  const [displayData, setDisplayData] = useState<DisplayData[]>([]);
  //表示するデータの種類
  const [displayLabel, setDisplayLabel] = useState<DisplayLabel>("総人口");

  return (
    <>
      <div>
        <h1>都道府県別人口推移グラフ</h1>
      </div>

      <div>
        <PrefecCheckboxes
          graphData={graphData}
          selectedPrefec={selectedPrefec}
          setGraphData={setGraphData}
          setSelectedPrefec={setSelectedPrefec}
        ></PrefecCheckboxes>
      </div>

      <div>
        <DisplayGraph
          displayLabel={displayLabel}
          graphData={graphData}
          displayData={displayData}
          selectedPrefec={selectedPrefec}
          setDisplayData={setDisplayData}
        />
      </div>

      <div>
        <SetLabelButton setDisplayLabel={setDisplayLabel}></SetLabelButton>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{displayLabel}を表示中</h2>
      </div>
    </>
  );
}
