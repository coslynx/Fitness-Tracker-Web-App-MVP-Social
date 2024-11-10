import React, { useState, useEffect } from "react";
import { Grid, Typography, AppBar, Toolbar, Button } from "@mui/material";
import GoalList from "./GoalList";
import ProgressChart from "./ProgressChart";
import SocialFeed from "./SocialFeed";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import GoalService from "../services/GoalService";
import ProgressService from "../services/ProgressService";
import AuthenticationService from "../services/AuthenticationService";
import SocialService from "../services/SocialService";
import { API_URL } from "../utils/constants";

const UserDashboard: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [progressData, setProgressData] = useState<OverallProgressData | null>(
    null
  );
  const [socialFeed, setSocialFeed] = useState<SocialFeedData[]>([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          navigate("/login");
          return;
        }

        const goalsData = await GoalService.getGoals(user.token);
        const progressData = await ProgressService.getOverallProgress(
          new Date(),
          new Date() // Fetch data for today
        );
        const socialFeedData = await SocialService.getSocialFeed(
          user.userId // Assuming user.userId is available
        );

        setGoals(goalsData);
        setProgressData(progressData);
        setSocialFeed(socialFeedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors gracefully (e.g., display a user-friendly message)
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) {
    return null; // Or display a loading indicator
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fitness Tracker
          </Typography>
          <Button color="inherit" onClick={() => AuthenticationService.logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ mt: 2, p: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Your Goals
          </Typography>
          <GoalList goals={goals} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Progress
          </Typography>
          {progressData && (
            <ProgressChart progressData={progressData} goalId="goalId" />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Social Feed
          </Typography>
          <SocialFeed socialFeed={socialFeed} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboard;