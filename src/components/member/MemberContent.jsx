import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db from '../../firebase';

const MemberContent = ({name,}) => {

  const [nameData, setNameData] = useState([])
  const [saveData, setSaveData] = useState([])

  const getTotalData = () => {
    const Data = collection(db, "calenders");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
     setNameData(QuerySnapshot.docs.map((doc) => doc.data()));
    })
  }

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      // データのあるコレクション名を指定
      collection(db, "calenders")
    );
    let total = 0;
    // フィルタリングして合計値を計算
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name === name) {
        total += data.save;
      }
    });
    setSaveData(total);
  };

  useEffect(() => {
    getTotalData();
    fetchData();
  },[])

  
  return (
    <div className='per-member' key={name}>
      <h4 className='member-name'>{name}</h4>
      <h4>貯金額: {saveData}円</h4>
    </div>
  )
}

export default MemberContent