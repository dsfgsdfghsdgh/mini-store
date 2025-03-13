import { getData } from "@/config/apiConfig";
import { getHighlightsRequest } from "@/lib/apiEndpoint";
import { useEffect, useState } from "react";
import Container from "./Container";
import { HighlightsType } from "@/types/types";
import { Link } from "react-router-dom";

type HighlightProps = {
  message: string,
  data: HighlightsType[]
}

const Hightlights = () => {

  const [highlightsData, setHighlightsData] = useState<HighlightsType[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data:HighlightProps = await getData(getHighlightsRequest);
        setHighlightsData(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlightsData?.map((item) => (
        <div
          key={item?._id}
          className="relative h-60 rounded-lg shadow-md cursor-pointer overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${item?.image})`,
              color: item?.color,
            }}
          ></div>
          <div
            className="relative z-10 p-6 flex flex-col justify-between h-full"
            style={{ color: item?.color }}
          >
            <div>
              <h3 className="text-2xl font-bold max-w-44">{item?.name}</h3>
              <p className="text-base font-bold mt-4">{item?.title}</p>
            </div>
            <Link to={item?._base} className="text-base font-normal">
              {item?.buttonTitle}
            </Link>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Hightlights;