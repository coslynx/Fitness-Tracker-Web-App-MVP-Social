import React, { useState, useEffect } from "react";
import { Goal } from "../utils/types"; 
import GoalCard from "./GoalCard";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext"; 
import { API_URL } from "../utils/constants";
import { useFetch } from "../hooks/useFetch";
import { useTheme } from "@mui/material/styles";

const GoalList: React.FC = () => {
    const theme = useTheme();
    const [goals, setGoals] = useState<Goal[]>([]); 
    const { user } = useAuthContext();
    const { data: fetchedGoals, isLoading, error } = useFetch<Goal[]>(
        `${API_URL}/goals`,
        user?.token
    ); 

    useEffect(() => {
        if (fetchedGoals) {
            setGoals(fetchedGoals);
        }
    }, [fetchedGoals]); 

    if (isLoading) {
        return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "80vh" }}
            >
                <CircularProgress size={100} />
            </Grid>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center">
                Error fetching goals: {error.message}
            </Typography>
        );
    }

    return (
        <Grid container spacing={2}>
            {goals.map((goal) => (
                <Grid item xs={12} md={6} key={goal.id}>
                    <GoalCard {...goal} /> 
                </Grid>
            ))}
        </Grid>
    );
};

export default GoalList;