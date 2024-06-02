import React, { useEffect, useState } from 'react';
import './mygroup_detail.css'; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container as MapDiv, NaverMap, Marker, useNavermaps, Polyline } from 'react-naver-maps';

function MyMap({ groupDrawPath, color ,center}) {
  const navermaps = useNavermaps();
  console.log(groupDrawPath)
  return (
    <NaverMap
      defaultCenter={center ? new navermaps.LatLng(center.latitude, center.longitude) : new navermaps.LatLng(37.3595704, 127.105399)} 
      defaultZoom={15} 
      scaleControl={false}
      mapDataControl={false}
    >
      { groupDrawPath && Object.keys(groupDrawPath).map((region, index) => (
        <Polyline
          key={region}
          path={groupDrawPath[region].map(p => new navermaps.LatLng(p.latitude, p.longitude))}
          strokeColor={color[index]} // 색상은 props로 받아 사용
          strokeWeight={8}
          strokeOpacity={0.8}
          strokeStyle="solid"
        />
      ))}
    </NaverMap>
  );
}




export default function MyGroupDetail() {
  const groupList = useLocation();
  console.log(groupList.state);
  const [selected, setSelected] = useState(true);

  const [color, setColor]=useState(groupList.state.pathColor);
  const level=groupList.state.level;
  const limitMember= groupList.state.limit_member;
  const location= groupList.state.location;
  const title=groupList.state.title;
  const totalDistance= groupList.state.total_distance;
  const [distance, setDistance]=useState(groupList.state.distance);
  const [drawPath,setDrawPath]=useState(groupList.state.drawPath);
  const [groupMember, setGroupMember]=useState(groupList.state.groupMember)
  const [center, setCenter]=useState(groupList.state.center)
  const [groupDrawPath, setGroupDrawPath]=useState([]);

  useEffect(()=>{
    console.log(drawPath)
    if(drawPath){
      const groupedPaths = groupPathsByRegion(drawPath)
      // console.log(groupedPaths)
      setGroupDrawPath(groupedPaths)
    }
  },[drawPath])
  useEffect(()=>{
    console.log(groupDrawPath)
  },[groupDrawPath])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectClick = () => {
    setSelected(!selected);
  };

  function groupPathsByRegion(drawPath) {
    return drawPath.reduce((acc, path) => {
      if (!acc[path.region_number]) {
        acc[path.region_number] = [];
      }
      acc[path.region_number].push(path);
      return acc;
    }, {});
  }
  return (
    <div className="gd_background">
      <Link to="/mygroup">
        <div className="gd_back">
          <img className='gd_back_icon' src="./icon/arrow.svg" alt="뒤로가기 아이콘" />
        </div>
      </Link>
      <div className="mgd_title">내가 가입한 그룹</div>
      <div className="gd_line"></div>

      {/* <img className="gd_img" src="./images/group1.png" alt="그룹 이미지" /> */}
      <MapDiv className='gd_img'><MyMap groupDrawPath={groupDrawPath} color={color} center={center}/></MapDiv>

      <div className="gd_name">{title}</div>
      <div className="gd_dday">
        <div className="gd_dday_box"></div>
        <div className="gd_dday_text">D - 14</div>
      </div>
      <div className="gd_line1"></div>

      <div className="gd_people">
        <img className='gd_people_icon' src="./icon/person.svg" alt="사람 아이콘" />
      </div>
      <div className="gd_person">
        <div className="gd_person_current">{groupMember.length}</div>
        <div className="gd_slash">/</div>
        <div className="gd_person_total">{limitMember}</div>
      </div>

      <div className="gd_place">
        <img className='gd_place_icon' src="./icon/place.svg" alt="장소 아이콘" />
      </div>
      <div className="gd_place_name">{location}</div>

      <div className="gd_distance">
        <img className='gd_distance_icon' src="./icon/running.svg" alt="거리 아이콘" />
      </div>
      <span className="gd_distance_num">{totalDistance} Km</span>
      <div className="gd_line2"></div>

      {/* 리스트1 */}
      <div className="group_choice_box1"></div>
      <div className="group_num_box1">
        <div className="group_choice_num_box1"></div>
        <span className="group_choice_num1">1</span>
      </div>
      <div className="e359_129">
        <div className="e359_130"></div>
        <span className="e359_131">선택완료</span>
      </div>
      <span className="e359_135">1.0km</span>

      {/* 리스트2 */}
      <div className="group_choice_box2"></div>
      <div className="group_num_box2">
        <div className="group_choice_num_box2"></div>
        <span className="group_choice_num2">2</span>
      </div>
      <span className="e359_143">1.0km</span>
      <button
        className={`select_btn ${selected ? 'selected' : 'unselected'}`}
        onClick={handleSelectClick}
      >
        {selected ? '선택하기' : '선택함'}
      </button>

      {/* 리스트3 */}
      <div className="group_choice_box3"></div>
      <div className="e359_158">
        <div className="e359_159"></div>
        <span className="e359_160">3</span>
      </div>
      <div className="e359_161">
        <div className="e359_162"></div>
        <span className="e359_163">선택하기</span>
      </div>
      <span className="e359_157">0.5km</span>

      <div className="gd_join">
        <div className="gd_join_box"></div>
        <div className="gd_join_text">걷기 시작하기</div>
      </div>
    </div>
  );
}
