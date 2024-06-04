import { PrefecName, PrefectureInfo } from "@/types";

type Props = {
  prefec_code: number;
  prefec_info: PrefectureInfo[];
  selected_prefec: PrefecName[];
};
export const newSelectedPrefec = ({
  prefec_code,
  prefec_info,
  selected_prefec,
}: Props) => {
  if (!prefec_info[prefec_code - 1].isSelected) {
    //新しく都道府県が選択された
    //選択された都道府県名を更新
    const selectedName = prefec_info[prefec_code - 1].prefecture.prefName;
    if (selected_prefec == undefined || selected_prefec.length == 0) {
      const newselected_prefec: PrefecName[] = [selectedName];
      return newselected_prefec;
    } else {
      const newselected_prefec: PrefecName[] = selected_prefec;
      newselected_prefec.push(selectedName);
      return newselected_prefec;
    }
  } else {
    //都道府県[prefCode:num]のチェックボックスが外れた
    //選択済み都道府県名を更新
    const selectedName = prefec_info[prefec_code - 1].prefecture.prefName;
    const newselected_prefec = selected_prefec.filter(
      (elm: PrefecName) => elm != selectedName
    );
    return newselected_prefec;
  }
};
