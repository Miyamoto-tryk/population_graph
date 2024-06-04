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
import Prefectures from "@/components/Prefectures";
import DisplayGraph from "@/components/DisplayGraph";

export default function Home() {
  //都道府県の選択情報
  const [prefec_info, setPrefec_info] = useState<PrefectureInfo[]>([]);
  //表示される可能性のあるグラフデータ("総人口"、"幼年人口"など全て含む)
  const [glaph_data, setGraph_data] = useState<GraphData[]>([]);
  //選択されている都道府県名の配列
  const [selected_prefec, setSelected_prefec] = useState<PrefecName[]>([]);
  //表示すべきデータの種類(display_abelで指定された人口データのみを含む
  const [display_data, setDisplay_data] = useState<DisplayData[]>([]);
  //表示するデータの種類
  const [display_label, setDisplay_label] = useState<DisplayLabel>("総人口");

  return (
    <>
      <div>
        <h1>都道府県別人口推移グラフ</h1>
      </div>
      <div>
        <Prefectures
          prefec_info={prefec_info}
          graph_data={glaph_data}
          selected_prefec={selected_prefec}
          setPrefec_info={setPrefec_info}
          setGraph_data={setGraph_data}
          setSelected_prefec={setSelected_prefec}
        ></Prefectures>
      </div>
      <div>
        <DisplayGraph
          display_label={display_label}
          graph_data={glaph_data}
          display_data={display_data}
          selected_prefec={selected_prefec}
          setDisplay_data={setDisplay_data}
        />
      </div>
    </>
  );
}
