import { fetchPrefec } from "@/api/fetcher";
import { PrefectureInfo, Prefecture } from "@/types";
import { Dispatch, SetStateAction, FC, useEffect } from "react";

type Props = {
  prefec_info: PrefectureInfo[];

  setPrefec_info: Dispatch<SetStateAction<PrefectureInfo[]>>;
};

//都道府県一覧を表示
const Prefectures: FC<Props> = ({
  prefec_info,

  setPrefec_info,
}: Props) => {
  //都道府県一覧を取得し、選択情報を初期化
  useEffect(() => {
    fetchPrefec().then((prefec_data) => {
      const newprefectures: PrefectureInfo[] = prefec_data.map(
        (elm: Prefecture) => {
          const selected: boolean = false; //未選択で初期化
          return { prefecture: elm, isSelected: selected };
        }
      );
      setPrefec_info(newprefectures);
    });
  }, []);

  const HandleChange = (prefec_code: number) => {
    //都道府県の選択情報を更新
    const newprefecInfo: PrefectureInfo[] = prefec_info.map(
      (elm: PrefectureInfo) => {
        if (elm.prefecture.prefCode == prefec_code) {
          return { prefecture: elm.prefecture, isSelected: !elm.isSelected };
        } else {
          return elm;
        }
      }
    );
    setPrefec_info(newprefecInfo);
    console.log(newprefecInfo);
  };

  //チェックボックスが押されたら選択情報を更新
  if (!prefec_info) {
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
        <div>
          {prefec_info.map((prefecInfo: PrefectureInfo) => (
            //都道府県一覧とチェックボックスを生成
            <div key={prefecInfo.prefecture.prefCode}>
              <input
                type="checkbox"
                checked={prefecInfo.isSelected}
                onChange={() => HandleChange(prefecInfo.prefecture.prefCode)}
              />
              {prefecInfo.prefecture.prefName}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Prefectures;
