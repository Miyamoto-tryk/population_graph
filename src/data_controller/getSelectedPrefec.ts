import { PrefecName, PrefectureInfo } from "../types";

type Props = {
  prefecCode: number;
  prefecInfo: PrefectureInfo[];
  selectedPrefec: PrefecName[];
};
export const getSelectedPrefec = ({
  prefecCode,
  prefecInfo,
  selectedPrefec,
}: Props) => {
  if (!prefecInfo[prefecCode - 1].isSelected) {
    //新しく都道府県が選択された
    //選択された都道府県名を更新
    const selectedName = prefecInfo[prefecCode - 1].prefecture.prefName;
    if (selectedPrefec == undefined || selectedPrefec.length == 0) {
      const newSelectedPrefec: PrefecName[] = [selectedName];
      return newSelectedPrefec;
    } else {
      const newSelectedPrefec: PrefecName[] = selectedPrefec;
      newSelectedPrefec.push(selectedName);
      return newSelectedPrefec;
    }
  } else {
    //都道府県[prefCode:num]のチェックボックスが外れた
    //選択済み都道府県名を更新
    const selectedName = prefecInfo[prefecCode - 1].prefecture.prefName;
    const newSelectedPrefec = selectedPrefec.filter(
      (elm: PrefecName) => elm != selectedName
    );
    return newSelectedPrefec;
  }
};
