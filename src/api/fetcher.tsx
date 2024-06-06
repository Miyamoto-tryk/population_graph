import { Prefecture, ComposResponse, ComposeDatas } from "../types";

const api_key = process.env.NEXT_PUBLIC_RESAS_API_KEY;
const headers = new Headers();
if (api_key) {
  headers.append("X-API-KEY", api_key);
}

//都道府県一覧 APIから取得
export const fetchPrefec = async (): Promise<Prefecture[]> => {
  const res = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    { method: "GET", headers: headers }
  );
  //TODO: 型ガード関数の実装
  const prefectures = await res.json();
  console.log(prefectures);
  //console.log(prefectures.result);
  return prefectures.result;
};

//人口構成をAPIから取得
export const fetchCompos = async (
  prefCode: number
): Promise<ComposeDatas[]> => {
  if (prefCode > 47 || prefCode < 1) {
    throw new Error("prefecture code が不正です");
  }
  const res = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    { method: "GET", headers: headers }
  );
  const ans = await res.json();
  console.log(ans);
  const compos: ComposeDatas[] = Object.values(ans.result.data);
  //console.log(compos);
  return compos;
};
