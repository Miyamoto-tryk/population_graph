"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { fetchCompos, fetchPrefec } from "@/api/fetcher";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetchPrefec().then((prefec_data) => {
      console.log(prefec_data);
    });
    fetchCompos(13).then((compos_data) => {
      console.log(compos_data);
    });
  }, []);

  return (
    <>
      <div>
        <h1>都道府県別人口推移グラフ</h1>
      </div>
    </>
  );
}
