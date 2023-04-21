import { useState } from "react";
import BasicSearch from "../../../../../components/dalrun-asj/BasicSearch";
import AdminSearch from "../../../../../components/dalrun-asj/AdminSerach";

function AdminCompetition() {
  const [dataList, setDataList] = useState([]);

  const optionVal = [
    {value : "seq", name : "대회번호"},
    {value : "name", name : "대회명"},
    {value : "location", name : "대회지역"},
    {value : "content", name : "대회내용"},
  ]

  return (
    <div className="bbs">
      <div className="bbs-content">
        <BasicSearch {...optionVal} />
        <div className="info outline">
          대회일정
          <AdminSearch setData={setDataList} />
        </div>
      </div>
    </div>
  );
}

export default AdminCompetition;
