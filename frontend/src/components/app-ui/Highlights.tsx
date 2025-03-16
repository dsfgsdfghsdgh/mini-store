import { getData } from "@/config/apiConfig";
import { getHighlightsRequest } from "@/common/lib/apiEndpoint";
import { useEffect, useState } from "react";
import Container from "./Container";
import { HighlightsType } from "@/common/types/types";
import { Link } from "react-router-dom";

type HighlightProps = {
  message: string;
  data: HighlightsType[];
};

const Highlights = () => {
  const [highlightsData, setHighlightsData] = useState<HighlightsType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: HighlightProps = await getData(getHighlightsRequest);
        console.log("API Response:", response); // Debugging
        setHighlightsData(response?.data || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlightsData.map((item) => (
        <div
          key={item?._id}
          className="relative h-60 rounded-lg shadow-md cursor-pointer overflow-hidden group bg-amber-800"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${item?.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",

            }}
          ></div>

          {/* Content */}
          <div
            className="relative z-10 p-6 flex flex-col justify-between h-full"
            style={{ color: item?.color }}
          >
            <div>
              <h3 className="text-2xl font-bold max-w-44">{item?.name}</h3>
              <p className="text-base font-bold mt-4">{item?.title}</p>
            </div>
            <Link to={item?._base || "#"} className="text-base font-normal hover:underline">
              {item?.buttonTitle || "Learn More"}
            </Link>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Highlights;
