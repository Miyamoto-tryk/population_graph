"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { fetchCompos, fetchPrefec } from "@/api/fetcher";
import { SetStateAction, useEffect, useState } from "react";
import { PrefectureInfo } from "@/types";
import Prefectures from "@/components/Prefectures";

export default function Home() {
  //都道府県の選択情報
  const [prefec_info, setPrefec_info] = useState<PrefectureInfo[]>([]);

  return (
    <>
      <div>
        <h1>都道府県別人口推移グラフ</h1>
      </div>
      <div>
        <Prefectures
          prefec_info={prefec_info}
          setPrefec_info={setPrefec_info}
        ></Prefectures>
      </div>
    </>
  );
}
