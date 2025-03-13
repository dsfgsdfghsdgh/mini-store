import Categories from "@/components/app-ui/Categories";
import BannerCategories from "@/components/app-ui/CategoryBanner";
import Hightlights from "@/components/app-ui/Highlights";
import HomeBanner from "@/components/app-ui/HomeBanner";

export default function Home() {
  return (
    <>
      <BannerCategories />
      <HomeBanner />
      <Hightlights />
      <Categories />
    </>
  );
}
