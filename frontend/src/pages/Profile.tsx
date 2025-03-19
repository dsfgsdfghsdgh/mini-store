import { useTypedSelector } from "@/store/store";
import Container from "@/components/app-ui/Container";
import UserInfo from "@/components/app-ui/UserInfo";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useTypedSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }
  return (
    <Container>
      <UserInfo user={user} />
    </Container>
  );
};

export default Profile;
