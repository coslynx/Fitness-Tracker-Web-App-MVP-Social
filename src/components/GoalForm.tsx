import React, { useState } from "react";
import { Goal } from "../utils/types";
import { 
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useAuthContext } from '../hooks/useAuthContext';

const GoalForm: React.FC = () => { 
    const [goalTitle, setGoalTitle] = useState("");
    const [targetValue, setTargetValue] = useState("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [notes, setNotes] = useState(""); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateGoalData(goalTitle, targetValue, deadline)) {
            setSnackbarMessage("Please fill in all fields correctly.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        const goalData: Goal = {
            title: goalTitle,
            targetValue: parseFloat(targetValue),
            deadline: new Date(deadline).toISOString(), 
            notes: notes
        };

        try {
            const response = await axios.post(`${API_URL}/goals`, goalData, { 
                headers: { 
                    'Authorization': `Bearer ${user?.token}` // Assuming you're using JWT auth
                } 
            });
            setSnackbarMessage("Goal created successfully!");
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error saving goal:", error);
            setSnackbarMessage("Error creating goal. Please try again.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
      };

    const validateGoalData = (title: string, targetValue: string, deadline: Date | null): boolean => {
        if (!title || !targetValue || !deadline) {
            return false; 
        } 

        if (isNaN(parseFloat(targetValue))) {
            return false; 
        } 

        return true; 
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                Create a New Goal
            </Typography>

            <TextField 
                label="Goal Title" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                value={goalTitle} 
                onChange={(e) => setGoalTitle(e.target.value)} 
            />

            <TextField 
                label="Target Value" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                value={targetValue} 
                onChange={(e) => setTargetValue(e.target.value)} 
            /> 

            <TextField 
                label="Deadline" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                type="date" 
                value={deadline ? deadline.toISOString().slice(0, 10) : ''} 
                onChange={(e) => setDeadline(new Date(e.target.value))} 
            />

            <TextField 
                label="Notes (Optional)" 
                variant="outlined" 
                fullWidth 
                multiline 
                rows={4} 
                margin="normal" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
            />

            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }}
            >
                Create Goal
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default GoalForm;