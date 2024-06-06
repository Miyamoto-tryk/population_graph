//年と人口。APIレスポンスの、各年の人口を表す型
export type PeoplAndYear = {
  year: number;
  value: number;
};
//人口データ
export type PoplData = {
  year: number;
  value: number;
  PrefName: PrefecName;
  //DisplayData型へ変換しやすいようにPrefName型も保持している
};
//選択中の都道府県の、すべての人口データを、
//GraphData[]として保持する
export type GraphData = {
  label: DisplayLabel;
  prefCode: number;
  data: PoplData[];
};

//都道府県情報(都道府県名、都道府県コード)
export type Prefecture = {
  prefCode: number;
  prefName: PrefecName; //"北海道"or"青森県"or...
};
//都道府県チェックボックスの情報
export type PrefectureInfo = {
  prefecture: Prefecture;
  isSelected: boolean;
};

//APIレスポンスに含まれる各種人口データの型
export type ComposeDatas = {
  data: PeoplAndYear[]; //[{year , value}, ...]
  label: DisplayLabel; //"総人口"or"年少人口"or...
};
//都道府県別APIレスポンスの返り値型
export type ComposResponse = {
  boundaryYear: number; //2020
  data: ComposeDatas[]; //[0]:総人口,[1]:年少人口,[2]:生産年齢人口,[[3]:老年人口
};

//動的なプロパティ(都道府県名)を持つ。
//recharts(グラフ描画ライブラリ)に渡すためのデータ型
export type DisplayData = {
  [prop in PrefecName]?: number;
} & {
  year: number;
};
//プロパティと人口データの追加
export const addPoplData = (
  displayData: DisplayData[], //元のデータ
  poplData: PoplData[] //追加するデータ
): DisplayData[] => {
  const newData = displayData.map((elm: DisplayData, index: number) => {
    const prefecName = poplData[index].PrefName;
    const poplNum = poplData[index].value;
    return {
      ...elm,
      [prefecName]: poplNum,
    };
  });
  return newData;
};

export type DisplayLabel = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
export type PrefecName =
  | "北海道"
  | "青森県"
  | "岩手県"
  | "宮城県"
  | "秋田県"
  | "山形県"
  | "福島県"
  | "茨城県"
  | "栃木県"
  | "群馬県"
  | "埼玉県"
  | "千葉県"
  | "東京都"
  | "神奈川県"
  | "新潟県"
  | "富山県"
  | "石川県"
  | "福井県"
  | "山梨県"
  | "長野県"
  | "岐阜県"
  | "静岡県"
  | "愛知県"
  | "三重県"
  | "滋賀県"
  | "京都府"
  | "大阪府"
  | "兵庫県"
  | "奈良県"
  | "和歌山県"
  | "鳥取県"
  | "島根県"
  | "岡山県"
  | "広島県"
  | "山口県"
  | "徳島県"
  | "香川県"
  | "愛媛県"
  | "高知県"
  | "福岡県"
  | "佐賀県"
  | "長崎県"
  | "熊本県"
  | "大分県"
  | "宮崎県"
  | "鹿児島県"
  | "沖縄県";
