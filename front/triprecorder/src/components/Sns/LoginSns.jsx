import { Carousel } from "antd";
import api from "api/axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allAtom, photoDataAtom } from "recoil/testAtom";
import "style/sns.scss";

const SliderTest = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [allData, setAllData] = useRecoilState(allAtom);
  const [photoData, setPhotoData] = useRecoilState(photoDataAtom);

  useEffect(() => {
    api.get("/sns/list").then((res) => {
      const picData = res.data;
      setAllData(picData.map((d) => d));
      setPhotoData(picData.map((data) => data.snsPhoto));
      console.log(picData);
    });
  }, []);

  useEffect(() => {
    console.log("사진 데이터 : ", photoData);
  }, [photoData]);

  useEffect(() => {
    console.log("모든 데이터 : ", allData);
  }, [allData]);

  return (
    <div className="bigDiv">
      {allData.map((d, i) => {
        return (
          <div className="all" key={i}>
            <img
              className="profileImg"
              src={d.snsUser.userProfile}
              alt="프로필 이미지"
            />
            <h2>{d.snsUser.userNick}</h2>
            <Carousel afterChange={onChange} style={{ width: "600px" }}>
              {d.snsPhoto.map((a, k) => {
                return (
                  <div key={k}>
                    <img
                      src={a}
                      style={{ width: "600px", height: "600px" }}
                      alt="게시물"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        );
      })}
    </div>
  );
};
export default SliderTest;
