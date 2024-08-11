import React, { useEffect, useState, lazy, Suspense } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  PrApplePhone,
  CateFeatures,
  ItemDetails9,
  PrPhone,
  PrTablet,
  PrLaptop,
  PrKeyboard,
  PrMouse,
  PrCable,
  PrBattery,
  PrLoudSpeaker,
  PrEarPhone,
  PrSmartWatch,
  loadPrSale,
  loadPrApplePhone,
  loadPrKeyboard,
  loadPrMouse,
  loadPrCable,
  loadPrBattery,
  loadPrLoudSpeaker,
  loadPrEarPhone,
  loadPrSmartWatch,
  loadPrLaptop,
  loadPrPhone,
  loadPrTablet,
  BannerHomePage,
} from "./CardDetails";
import BannerHome from "./BannerHomePage/BannerHome";
import Danhmuc from "./DanhMuc/Danhmuc";

import SmartWatchSlider from "./SmartWatchSlider";
import Loader from "./Loader";
import BlogHome from "./Blog";
const ItemList = lazy(() => import("./ItemList"));
const Services = lazy(() => import("./Services"));
const TimeDeal = lazy(() => import("./TimeDeal"));
const DynamicSlider = lazy(() => import("./DynamicSlider"));
const Home = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedAssessories, setSelectedAssessories] = useState();
  const [error, setError] = useState(null);
  const RenderCategoryPhone = () => {
    switch (selectedCategory) {
      case "Phone":
        return <ItemList type={PrPhone} heading="phone" />;
      case "Tablet":
        return <ItemList type={PrTablet} heading="tablet" />;
      case "Laptop":
        return <ItemList type={PrLaptop} heading="laptop" />;
      default:
        return <ItemList type={PrPhone} heading="phone" />;
    }
  };
  const RenderCategoryAssessories = () => {
    switch (selectedAssessories) {
      case "Battery":
        return <ItemList type={PrBattery} heading="Battery" />;
      case "Cable":
        return <ItemList type={PrCable} heading="Cable" />;
      case "Earphone":
        return <ItemList type={PrEarPhone} heading="Earphone" />;
      case "LoudSpeaker":
        return <ItemList type={PrLoudSpeaker} heading="LoudSpeaker" />;
      case "Keyboard":
        return <ItemList type={PrKeyboard} heading="Keyboard" />;
      case "Mouse":
        return <ItemList type={PrMouse} heading="Mouse" />;
      default:
        return <ItemList type={PrBattery} heading="Battery" />;
    }
  };
  const loadData = async () => {
    try {
      await Promise.all([
        loadPrSale(),
        loadPrApplePhone(),
        loadPrSmartWatch(),
        loadPrLaptop(),
        loadPrPhone(),
        loadPrTablet(),
        loadPrKeyboard(),
        loadPrMouse(),
        loadPrCable(),
        loadPrBattery(),
        loadPrLoudSpeaker(),
        loadPrEarPhone(),
      ]);
      // Set dataLoaded to true when all data is loaded.
      setDataLoaded(true);
    } catch (error) {
      // Handle errors and set the error state
      setError(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box bg={"#F1F3F7"}>
      <Suspense fallback={<div>Loading</div>}>
        {error ? (
          <div>
            {/* Display a user-friendly error message */}
            <p>Oops! Something went wrong. Please try again later.</p>
          </div>
        ) : dataLoaded ? (
          <>
            <BannerHome type={BannerHomePage} heading=" " />
            <TimeDeal />
            <Danhmuc heading="DANH MỤC" type={CateFeatures} />
            <Box width="80%" margin="auto">
              <div className="option-select">
                <Text className="heading">DANH MỤC NỔI BẬT</Text>
                <div className="options">
                  <button
                    className={selectedCategory === "Phone" ? "selected" : ""}
                    onClick={() => setSelectedCategory("Phone")}
                  >
                    Điện Thoại
                  </button>
                  <button
                    className={selectedCategory === "Tablet" ? "selected" : ""}
                    onClick={() => setSelectedCategory("Tablet")}
                  >
                    Tablet
                  </button>
                  <button
                    className={selectedCategory === "Laptop" ? "selected" : ""}
                    onClick={() => setSelectedCategory("Laptop")}
                  >
                    Laptop
                  </button>
                </div>
              </div>
            </Box>
            {RenderCategoryPhone()}
            <DynamicSlider type={PrSmartWatch} />
            <Box width={{ lg: "80%", base: "90%" }} margin="auto">
              <div className="option-select">
                <Text
                  className="heading"
                  fontSize={{ lg: "2x1", base: "22px" }}
                >
                  CÁC PHỤ KIỆN KHÁC
                </Text>
                <div className="options">
                  <button
                    className={
                      selectedAssessories === "Battery" ? "selected" : ""
                    }
                    onClick={() => setSelectedAssessories("Battery")}
                  >
                    <Text fontSize={{ lg: 16, base: 14 }}>Pin dự phòng</Text>
                  </button>
                  <button
                    className={
                      selectedAssessories === "Cable" ? "selected" : ""
                    }
                    onClick={() => setSelectedAssessories("Cable")}
                  >
                    <Text fontSize={{ lg: 16, base: 14 }}>Cáp sạc</Text>
                  </button>
                  <button
                    className={
                      selectedAssessories === "Earphone" ? "selected" : ""
                    }
                    onClick={() => setSelectedAssessories("Earphone")}
                  >
                    <Text fontSize={{ lg: 16, base: 14 }}> Tai nghe</Text>
                  </button>
                  <button
                    className={
                      selectedAssessories === "LoudSpeaker" ? "selected" : ""
                    }
                    onClick={() => setSelectedAssessories("LoudSpeaker")}
                  >
                    <Text fontSize={{ lg: 16, base: 14 }}>Loa</Text>
                  </button>
                  <button
                    className={
                      selectedAssessories === "Keyboard" ? "selected" : ""
                    }
                    onClick={() => setSelectedAssessories("Keyboard")}
                  >
                    <Text fontSize={{ lg: 16, base: 14 }}>Bàn phím</Text>
                  </button>
                  <button
                    className={
                      selectedAssessories === "Mouse" ? "selected" : ""
                    }
                    onClick={() => setSelectedAssessories("Mouse")}
                  >
                    <Text fontSize={{ lg: 16, base: 14 }}> Chuột</Text>
                  </button>
                </div>
              </div>
            </Box>
            {RenderCategoryAssessories()}
            <SmartWatchSlider
              type={PrApplePhone}
              linked={"/apple/phone"}
              heading="IPHONE"
            />
            <Services type={ItemDetails9} heading="DỊCH VỤ CỦA CHÚNG TÔI" />
            <BlogHome heading="TIN TỨC CÔNG NGHỆ" type={CateFeatures} />
          </>
        ) : (
          <div>
            {/* Display a loading spinner while data is being fetched */}
            <Loader loading={!dataLoaded} />
          </div>
        )}
      </Suspense>
    </Box>
  );
};
export default Home;
