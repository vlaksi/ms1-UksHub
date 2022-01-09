import { useRouter } from "next/router";
import UserLanding from "../../common/components/organisms/UserLanding/UserLanding";
import { getToken } from "../../common/services/authentication/token";

const User = () => {
  const router = useRouter();
  const { user } = router.query;
  if (typeof window !== "undefined") {
    var token = getToken();
  }
  if (token) {
    return (
      <>
        <UserLanding userId={user} />
      </>
    );
  } else {
    return (
      <>
        <h1>You need to log in</h1>
      </>
    );
  }
};

export default User;
