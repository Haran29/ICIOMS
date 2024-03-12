import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <h1>Dashboard</h1>
        {!!user && <h1>Hi {user.name}</h1>}
      </div>
    </>
  );
}
