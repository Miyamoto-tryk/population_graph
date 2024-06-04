import { fetchPrefec } from "@/api/fetcher";
import { newGraphData } from "@/data_controller/newGraphData";
import { newSelectedPrefec } from "@/data_controller/newSelectedPrefec";
import { PrefectureInfo, Prefecture, GraphData, PrefecName } from "@/types";
import { Dispatch, SetStateAction, FC, useEffect } from "react";

type Props = {
  prefec_info: PrefectureInfo[];
  graph_data: GraphData[];
  selected_prefec: PrefecName[];
  setPrefec_info: Dispatch<SetStateAction<PrefectureInfo[]>>;
  setGraph_data: Dispatch<SetStateAction<GraphData[]>>;
  setSelected_prefec: Dispatch<SetStateAction<PrefecName[]>>;
};

//都道府県一覧を表示
const Prefectures: FC<Props> = ({
  prefec_info,
  graph_data,
  selected_prefec,
  setPrefec_info,
  setGraph_data,
  setSelected_prefec,
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

  const HandleChange = async (prefec_code: number) => {
    //都道府県の選択情報を更新
    const new_prefec_info: PrefectureInfo[] = prefec_info.map(
      (elm: PrefectureInfo) => {
        if (elm.prefecture.prefCode == prefec_code) {
          return { prefecture: elm.prefecture, isSelected: !elm.isSelected };
        } else {
          return elm;
        }
      }
    );
    setPrefec_info(new_prefec_info);
    const new_selected_prefec = newSelectedPrefec({
      prefec_code,
      prefec_info,
      selected_prefec,
    });
    setSelected_prefec(new_selected_prefec);

    const new_graph_data = await newGraphData({
      prefec_code,
      prefec_info,
      graph_data,
    });
    setGraph_data(new_graph_data);
  };

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
