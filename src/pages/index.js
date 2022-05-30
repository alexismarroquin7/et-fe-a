import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Grid } from "../components"

export * from "./login"
export * from "./transactions"

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      '/transactions'
    );
  }, [navigate]);

  return <Grid></Grid>
}